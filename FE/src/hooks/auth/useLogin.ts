import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "../../stores/rootReducer";
import { API } from "../../libs/api";

interface ILogin {
  email: string;
  password: string;
}

export function useLogin() {
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<ILogin>({
    email: "",
    password: "",
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await API.post("/auth/login", form);
      dispatch(AUTH_LOGIN(response.data));
      navigate("/");
      console.log("ini dari login", response.data);
      setSuccessAlert("Login berhasil!");
      setErrorAlert("");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrorAlert(err.response.data.error);
      } else {
        setErrorAlert("Terjadi kesalahan pada server");
      }

      console.log(err);
    }
  };

  return {
    handleSubmit,
    changeHandler,
    setErrorAlert,
    navigate,
    errorAlert,
    successAlert,
    form,
  };
}
