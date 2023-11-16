import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./libs/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./stores/types/rootState";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());

      setIsLoading(false);
      navigate("/login");
      console.log("auth error:", err);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  function IsLogin() {
    if (!auth.username) {
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsNotLogin() {
    if (auth.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<IsLogin />}>
            <Route path="/" element={<Home />}>
            </Route>
          </Route>

          <Route path="/" element={<IsNotLogin />}>
            <Route path="/register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
