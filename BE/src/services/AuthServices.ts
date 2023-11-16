import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response, response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { loginSchema, userSchema } from "../utils/validation";
import { error } from "console";

class AuthServices {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(reqBody: any): Promise<any> {
    try {
      const { error, value } = userSchema.validate(reqBody);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const isEmailRegistered = await this.authRepository.findOne({
        where: { email: value.email },
      });
      if (isEmailRegistered) {
        throw new Error("Email already registered.");
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);

      const user = this.authRepository.create({
        username: value.username,
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        password: hashedPassword,
      });

      await this.authRepository.save(user);
      return {
        message: "Registration successful!",
        user: user,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(reqBody: any): Promise<any> {
    try {
      const { error } = loginSchema.validate(reqBody);

      if (error) {
        throw new Error(error.details[0].message);
      }
      const user = await this.authRepository.findOne({
        where: { email: reqBody.email },
        select: [
          "id",
          "firstname",
          "username",
          "lastname",
          "email",
          "password",
        ],
      });

      if (!user) {
        throw new Error("Email tidak ditemukan");
      }

      const isPasswordValid = await bcrypt.compare(
        reqBody.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Password salah");
      }

      // Membuat token JWT
      const token = jwt.sign(
        {
          user,
        },
        "inirahasia",
        {
          expiresIn: "1h",
        }
      );
      return {
        message: "Login Successfull",
        user: {
          id: user.id,
          firstname: user.firstname,
          username: user.username,
          email: user.email,
        },
        token: token,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });
      return {
        message: "Token is valid",
        user: {
          id: user.id,
          firstname: user.firstname,
          username: user.username,
          lastname: user.lastname,
          email: user.email,
        },

        // user: user,
      };
    } catch (err) {
      throw new Error("Token is not valid");
    }
  }
}

export default new AuthServices();
