import React, { FC, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Forms from "../../Components/Forms/Forms";
import "./ForgetPassword.css";

interface IForgetPassword {}

const ForgetPassword: FC<IForgetPassword> = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="Forget_container">
      <div className="Forget_top">
        <Header showbtn={false} />
        <Forms showForgetPasswordform={true} />
      </div>

      <div className="Forget_bottom"></div>
    </div>
  );
};

export default ForgetPassword;
