import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response, response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { productSChema } from "../utils/validation";
import cloudinaryConfig from "../libs/config";
import { Products } from "../entities/Product";

class ProductServices {
  private readonly productsRepository: Repository<Products> =
    AppDataSource.getRepository(Products);

  async find(reqQuery?: any, loginSession?: any): Promise<any> {
    try {
      const limit = parseInt(reqQuery.limit ?? 0);

      const products = await this.productsRepository.find({
        relations: ["user"],
        order: {
          id: "DESC",
        },
        take: limit,
      });

      return products.map((element) => ({
        id: element.id,
        harga: element.harga,
        prdnm: element.prdnm,
        image: element.image,
        user: element.user,
      }));
    } catch (err) {
      throw new Error("error find product");
    }
  }

  async findOne(id: number, loginSession?: any): Promise<any> {
    try {
      const products = await this.productsRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "likes.user", "replies"],
      });

      return {
        id: products.id,
        prdnm: products.prdnm,
        harga: products.harga,
        image: products.image,
        user: products.user,
      };
    } catch (err) {
      throw new Error("error findOne products");
    }
  }
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const loginSession = res.locals.loginSession;
      const filename = res.locals.filename;

      const { error } = productSChema.validate(data);
      if (error) {
        return res.status(400).json({
          error: error,
        });
      }

      cloudinaryConfig();

      if (filename) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          "./uploads/" + filename
        );
        console.log("ini cloudinary : ", cloudinaryResponse);

        const product = this.productsRepository.create({
          user: loginSession.user.id,
          image: cloudinaryResponse.secure_url,
          harga: data.harga,
          prdnm: data.prdnm,
        });

        const createProduct = this.productsRepository.save(product);
        return res.status(200).json(createProduct);
      } else {
        const product = this.productsRepository.create({
          user: loginSession.user.id,
          harga: data.harga,
          prdnm: data.prdnm,
        });

        const createProduct = this.productsRepository.save(product);
        return res.status(200).json(createProduct);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error while create products" });
    }
  }
  async delete(id: number): Promise<any> {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          id,
        },
        relations: ["user"],
      });

      const product1 = await this.productsRepository.delete({
        id: product.id,
      });
      return console.log("berhasil delete");
    } catch (err) {
      throw new Error("error delete produck");
    }
  }
}

export default new ProductServices();
