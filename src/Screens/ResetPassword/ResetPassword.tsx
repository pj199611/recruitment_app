import { FC, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Forms from "../../Components/Forms/Forms";
import axios from "axios";
import { getCookie } from "../../utilties/utils";
import { useHistory } from "react-router-dom";
import "./ResetPassword.css";

interface ILogin {}

const ResetPassword: FC<ILogin> = () => {
  const [resetToken, setresetToken] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const token = getCookie("resetToken");
    setresetToken(token);
  }, []);

  useEffect(() => {
    if (resetToken) {
      axios
        .get(
          `https://jobs-api.squareboat.info/api/v1/auth/resetpassword/${resetToken}`
        )
        .then((res: any) => {
          const d1 = new Date(res.data.data.exp * 1000);
          const d2 = new Date(res.data.data.iat * 1000);

          if (d1 === d2) {
            history.push("/");
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [history, resetToken]);

  return (
    <div className="Forget_container">
      <div className="Forget_top">
        <Header showbtn={false} />
        <Forms showResetPasswordform={true} />
      </div>

      <div className="Forget_bottom"></div>
    </div>
  );
};

export default ResetPassword;
