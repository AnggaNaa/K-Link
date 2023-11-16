import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../libs/api";
import { IUSER } from "../../interface/auth";

interface ICreateUser {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string[]>([]);
  const [successAlert, setSuccessAlert] = useState("");

  const navigate = useNavigate();
  const [_, setUser] = useState<IUSER[]>([]);
  const [form, setForm] = useState<ICreateUser>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get("/user");
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await API.post("/auth/register", form);

      console.log(response.data, "ini post");
      setForm({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      navigate("/login");
      setSuccessAlert("Registrasi berhasil!");
      setErrorAlert([]);

      //   fetchData();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.error &&
        Array.isArray(error.response.data.error)
      ) {
        setErrorAlert(error.response.data.error);
      } else {
        console.log("salah", error.response.data.error as string);
        setErrorAlert([, error.response.data.error]);
      }
    }
  };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  return {
    handleSubmit,
    changeHandler,
    setErrorAlert,
    setShowPassword,
    errorAlert,
    successAlert,
    showPassword,
    form,
  };
}
