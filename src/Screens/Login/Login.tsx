import { FC, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Forms from "../../Components/Forms/Forms";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../utilties/utils";
import "./Login.css";

interface ILogin {}

const Login: FC<ILogin> = () => {
  const history = useHistory();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const token = getCookie("token");
    if (token) {
      history.push("/dashboard");
    }
  }, [history]);

  return (
    <div className="Login_container">
      <div className="Login_top">
        <Header showbtn={false} />
        <Forms showLoginform={true} />
      </div>

      <div className="Login_bottom" />
    </div>
  );
};

export default Login;
