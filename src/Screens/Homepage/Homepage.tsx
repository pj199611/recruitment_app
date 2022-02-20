import { FC, useEffect } from "react";
import { Container } from "../../Components/Common/Grid";
import Header from "../../Components/Header/Header";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "../../Components/Common/Grid";
import Card from "../../Components/Card/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { getCookie } from "../../utilties/utils";
import { useHistory, Link } from "react-router-dom";
import HomepageBanner from "../../assets/Homepage_banner.png";
import first from "../../assets/first.png";
import second from "../../assets/second.png";
import third from "../../assets/third.png";
import fourth from "../../assets/fourth.png";
import sixth from "../../assets/sixth.png";
import seventh from "../../assets/seventh.png";
import eight from "../../assets/eigth.png";
import nine from "../../assets/nine.png";
import cross from "../../assets/cross.svg";
import IconButton from '@mui/material/IconButton';
import { CLOSE } from "../../store/LogoutReducer/LogoutActions";
import { useSelector, useDispatch } from "react-redux";
import "./Homepage.css";

interface IHomepage {}

const useStyles = makeStyles(() => ({
  button: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    border: "1px solid #43afff",
    background: "#43AFFF 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: "1",
    color: "white",
    fontWeight: "bold",
    width: "150px",
    height: "50px",
    textTransform: "none",
    marginBottom: "5%",
  },
}));

const Homepage: FC<IHomepage> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();
  const logout = useSelector((state: any) => state.LogoutReducer.logout);
  const dispatch=useDispatch();

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

  const Logout = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          backgroundColor: "#FFFFFF",
          height: "99px",
          width: "343px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: "#43AFFF" }}>Logout</p>
          <IconButton onClick={()=>dispatch(CLOSE())}><img src={cross} alt="cross" /></IconButton>
        </div>

        <span style={{ color: "#303F60" }}>
          You have successfully logged out.
        </span>
      </div>
    );
  };
  return (
    <div className="Homepage_container">
      <div className="Homepage_top">
        <Header showbtn={true} />
        <Container className="Homepage_top_container">
          <div className="Homepage_top_container_left">
            <p className="Homepage_top_text">
              <span>Welcome to</span>
              <br />
              <span>My</span>
              <span style={{ color: "#43AFFF" }}>Jobs</span>
            </p>
            <Link className="Link" to="/login">
              <Button className={classes.button}>Get Started</Button>
            </Link>
          </div>
          {matches && (
            <img
              alt="homepage_banner"
              className="image_banner"
              src={HomepageBanner}
            />
          )}
        </Container>
        {logout && <Logout />}
      </div>

      <div className="Homepage_bottom">
        <Container style={{ marginTop: "5%" }}>
          <p style={{ fontWeight: "bold", color: "#303F60" }}>Why Us</p>
          <Row className="Homepage_bottom_row_container">
            <Col xs={12} sm={12} md={4} lg={3} xl={3}>
              <Card>
                <div className="Homepage_card_container">
                  <span className="Homepage_card_heading">
                    Get more
                    <br /> visibility
                  </span>
                  <br />
                  <p className="Homepage_card_body">
                    Lorem ipsum dolor sit amet, consectetur <br />
                    adipiscing elit, sed do eiusmod tempor
                    <br /> incididunt.
                  </p>
                </div>
              </Card>
            </Col>

            <Col xs={12} sm={12} md={4} lg={3} xl={3}>
              <Card>
                <div className="Homepage_card_container">
                  <span className="Homepage_card_heading">
                    Organize your
                    <br /> candidates
                  </span>
                  <br />
                  <p className="Homepage_card_body">
                    Lorem ipsum dolor sit amet, consectetur
                    <br /> adipiscing elit, sed do eiusmod tempor
                    <br /> incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </Card>
            </Col>

            <Col xs={12} sm={12} md={4} lg={3} xl={3}>
              <Card>
                <div className="Homepage_card_container">
                  <span className="Homepage_card_heading">
                    Verify their
                    <br /> abilities
                  </span>
                  <br />
                  <p className="Homepage_card_body">
                    Lorem ipsum dolor sit amet, consectetur
                    <br /> adipiscing elit, sed do eiusmod tempor
                    <br /> incididunt ut labore.
                  </p>
                </div>
              </Card>
            </Col>
          </Row>

          <p style={{ fontWeight: "bold", color: "#303F60", marginTop: "10%" }}>
            Companies who trust us
          </p>

          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={first} alt="" />
            </Col>
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={second} alt="" />
            </Col>
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={third} alt="" />
            </Col>
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={fourth} alt="" />
            </Col>
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={second} alt="" />
            </Col>
          </Row>

          <Row
            style={{ display: "flex", justifyContent: "center", width: "111%" }}
          >
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={sixth} alt="" />
            </Col>
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={seventh} alt="" />
            </Col>
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={eight} alt="" />
            </Col>
            <Col sm={12} md={2} xl={2}>
              <img height="60" src={nine} alt="" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Homepage;
