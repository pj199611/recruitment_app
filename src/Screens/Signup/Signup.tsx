import { FC,useEffect } from "react";
import Header from "../../Components/Header/Header";
import Forms from "../../Components/Forms/Forms";
import "./Signup.css";

interface ISignup {}

const Signup: FC<ISignup> = () => {

    useEffect(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      },[]);

  return (
    <div className="Signup_container">
      <div className="Signup_top">
        <Header showbtn={false} />
        <Forms showSignupform={true} />
      </div>

      <div className="Signup_bottom"></div>
    </div>
  );
};

export default Signup;
