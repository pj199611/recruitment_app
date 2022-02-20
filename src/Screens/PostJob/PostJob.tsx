import { FC, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Forms from "../../Components/Forms/Forms";
import { checkRole, getCookie } from "../../utilties/utils";
import home from "../../assets/home.png";
import { Container } from "../../Components/Common/Grid";
import { Link } from "react-router-dom";
import "./PostJob.css";

interface IPostJob {}

const PostJob: FC<IPostJob> = () => {
  const [roleobj, setroleobj] = useState<any>();
  const [loggedinname, setloggedinname] = useState<any>();
  const [token, settoken] = useState<any>();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const obj = checkRole();
    setroleobj(obj.roleAuthObj);
    setloggedinname(obj.name);
    settoken(getCookie("token"));
  }, []);

  return (
    <div className="post_container">
      <div className="post_top">
        <Header
          roleAuth={roleobj}
          showAvatar={true}
          loggedInUserName={loggedinname}
        />
        <Forms token={token} showpostajobform={true} />
        <Container className="post_top_container">
          <div className="post_top_container_text">
            <img src={home} alt="" />
            <Link to="/dashboard" className="Link">
              <p style={{ marginLeft: "25%", color: "white",fontSize:"12px" }}>Home</p>
            </Link>
          </div>
        </Container>
      </div>

      <div className="post_bottom" />
    </div>
  );
};

export default PostJob;
