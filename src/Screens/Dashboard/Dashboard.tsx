import React, { FC, useEffect, useState } from "react";
import "./Dashboard.css";
import Header from "../../Components/Header/Header";
import { Container, Row, Col } from "../../Components/Common/Grid";
import { checkRole } from "../../utilties/utils";
import home from "../../assets/home.png";
import JobCard from "./JobCard/JobCard";
import axios from "axios";
import { getCookie } from "../../utilties/utils";
import { makeStyles } from "@material-ui/core/styles";
import pencilandpaper from "../../assets/pencilandpaper.svg";
import Pagination from "@mui/material/Pagination";
import { useHistory } from "react-router-dom";

interface IDashboard {}

const useStyles = makeStyles(() => ({
  button: {
    "&:hover": {
      background: "#43AFFF 0% 0% no-repeat padding-box",
    },
    border: "1px solid #43afff",
    background: "#43AFFF",
    borderRadius: "5px",
    opacity: "1",
    color: "white",
    fontWeight: "bold",
    width: "150px",
    height: "50px",
    textTtransform: "unset !important",
  },
  root: {
    "& .Mui-selected": {
      color: "#303F60",
      backgroundColor: "#D9EFFF !important",
      fontWeight:"bold"
    },
  },
}));

const Dashboard: FC<IDashboard> = () => {
  const [roleobj, setroleobj] = useState<any>();
  const [loggedinname, setloggedinname] = useState<any>();
  const [token, settoken] = useState<any>();
  const [postedjobs, setpostedjobs] = useState<any>();
  const [jobstoapply, setjobstoapply] = useState<any>();
  const [currentItems, setCurrentItems] = useState<any>(null);
  const [pageCount, setPageCount] = useState<any>();
  const [itemOffset, setItemOffset] = useState<any>(0);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const endOffset = itemOffset + 12;
    if (postedjobs?.length) {
      setCurrentItems(postedjobs && postedjobs?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(postedjobs?.length / 12));
    }

    if (jobstoapply?.length) {
      setCurrentItems(jobstoapply && jobstoapply?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(jobstoapply?.length / 12));
    }
  }, [itemOffset, jobstoapply, postedjobs]);

  useEffect(() => {
    const obj = checkRole();
    setroleobj(obj.roleAuthObj);
    setloggedinname(obj.name);
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      settoken(token);
    }
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    if (token === undefined) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    //------------- getting available jobs to apply----------------
    if (roleobj?.candidate && token) {
      axios
        .get("https://jobs-api.squareboat.info/api/v1/candidates/jobs", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          const {
            data: { data },
          } = res;
          setjobstoapply(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //---------- getting jobs added by the recruiter----------//
    if (roleobj?.recruiter && token) {
      axios
        .get("https://jobs-api.squareboat.info/api/v1/recruiters/jobs", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          const {
            data: {
              data: { data },
            },
          } = res;
          setpostedjobs(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, roleobj]);

  const headingAuth = () => {
    if (roleobj) {
      if (roleobj.recruiter) {
        return <p className="heading_auth">Jobs posted by you</p>;
      }

      if (roleobj.candidate) {
        return <p className="heading_auth">Jobs for you</p>;
      }
    }
  };

  const postajobbackgroundbtnauth = () => {
    if (!postedjobs?.length && roleobj?.recruiter) {
      return (
        <div className="Dashboard_bottom_no_job">
          <div className="no_job_bottom_container">
            <img src={pencilandpaper} alt="" />
            <p className="no_job_bottom_text">
              Your posted jobs will show here!
            </p>
          </div>
        </div>
      );
    }
  };

  const handlePageClick = (event: any, page: any) => {
    let newOffset;
    if (postedjobs && postedjobs.length > 0) {
      newOffset = ((page - 1) * 12) % postedjobs?.length;
    }
    if (jobstoapply && jobstoapply.length > 0) {
      newOffset = ((page - 1) * 12) % jobstoapply?.length;
    }
    setItemOffset(newOffset);
  };

  return (
    <div className="container">
      <div className="Dashboard_top">
        <Header
          roleAuth={roleobj}
          showAvatar={true}
          loggedInUserName={loggedinname}
        />

        <Container className="Dashboard_top_container">
          <div className="Dashboard_top_container_text">
            <img src={home} alt="" />
            <p style={{ marginLeft: "1%", color: "white",fontSize:"12px" }}>Home</p>
          </div>

          {headingAuth()}

          <Row>
            {currentItems &&
              currentItems?.map((eachJob: any) => {
                return (
                  <Col
                    key={eachJob.id}
                    className="Dashboard_top_container_card_col"
                    xl={2}
                    md={2}
                    sm={12}
                  >
                    <JobCard
                      id={eachJob.id}
                      description={eachJob.description}
                      location={eachJob.location}
                      title={eachJob.title}
                      token={token}
                    />
                  </Col>
                );
              })}
          </Row>
        </Container>
        {currentItems?.length && (
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "90vh",
              left: "45%",
            }}
          >
            <Pagination
              className={classes.root}
              onChange={handlePageClick}
              count={pageCount}
              variant="outlined"
              shape="rounded"
            />
          </div>
        )}
      </div>

      {postajobbackgroundbtnauth()}
    </div>
  );
};

export default Dashboard;
