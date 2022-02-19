import { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import dropdown from "../../assets/dropdown.png";
import { useHistory } from "react-router-dom";
import { signout } from "../../utilties/utils";

const useStyles = makeStyles(() => ({
  button: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    textTransform: "none",
    border: "1px solid #43afff",
    background: "#303F60 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: "1",
    color: "white",
    fontWeight: "bold",
    width: "150px",
    height: "50px",
  },
}));

interface IHeader {
  showbtn?: boolean;
  roleAuth?: any;
  showAvatar?: boolean;
  loggedInUserName?: any;
}

const Header: FC<IHeader> = ({
  showbtn,
  roleAuth,
  showAvatar,
  loggedInUserName,
}) => {
  const classes = useStyles();
  const [toggle, settoggle] = useState<boolean>(false);
  const history = useHistory();


  return (
    <>
      {roleAuth !== undefined ? (
        <div className="header_container">
          <div className="header_innercontainer">
            <h1>
              <span style={{ fontWeight: "bold", color: "white" }}>My</span>
              <span style={{ fontWeight: "bold", color: "#43AFFF" }}>Jobs</span>
            </h1>

            {showbtn && (
              <div className="header_btn_control">
                <Link className="Link" to="/login">
                  <Button className={classes.button} variant="contained">
                    Login/Signup
                  </Button>
                </Link>
              </div>
            )}

            {showAvatar && (
              <div className="avatar_container">
                <div>
                  {roleAuth.recruiter && (
                    <Link className="Link" to="/postjob">
                      <p className="role_based_avatar_text">Post a Job</p>
                    </Link>
                  )}

                </div>

                <div
                  onClick={() => settoggle((prevState: any) => !prevState)}
                  className="avatar_inner_container"
                >
                  <Avatar
                    fgColor="black"
                    color="#D9EFFF"
                    round={true}
                    size="50"
                    name={loggedInUserName}
                  />

                  <img
                    height="20px"
                    style={{ marginLeft: "10%" }}
                    src={dropdown}
                    alt=""
                  />
                  <div className="avatar_inner_tooltip">
                    {toggle && (
                      <div
                        onClick={() => {
                          signout("token");
                          history.push("/");
                        }}
                        className="tooltip_container"
                      >
                        <p style={{ cursor: "pointer" }}>Logout</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr className="header_divider" />
        </div>
      ) : (
        <div className="header_container">
          <div className="header_innercontainer">
            <Link className="Link" to="/">
              <h1>
                <span style={{ fontWeight: "bold", color: "white" }}>My</span>
                <span style={{ fontWeight: "bold", color: "#43AFFF" }}>
                  Jobs
                </span>
              </h1>
            </Link>

            {showbtn && (
              <div className="header_btn_control">
                <Link className="Link" to="/login">
                  <Button className={classes.button} variant="contained">
                    Login/Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <hr className="header_divider" />
        </div>
      )}
    </>
  );
};

export default Header;
