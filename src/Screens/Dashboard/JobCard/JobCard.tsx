import React, { FC, useState } from "react";
import "./JobCard.css";
import { Row, Col, Container } from "../../../Components/Common/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import locationImg from "../../../assets/location.png";
import close from "../../../assets/close.png";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import MobileViewApplicatons from "../ModalViewApplicants/ModalViewApplicants";
import pencilandpaper from "../../../assets/pencilandpaper.png";

interface IJobCard {
  description?: any;
  id?: any;
  location?: any;
  title?: any;
  token?: any;
}

const useStyles = makeStyles(() => ({
  button: {
    "&:hover": {
      background: "43AFFF33",
    },

    background: "#43AFFF33",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    width: "125px",
    height: "40px",
    textTransform: "none",
  },
  dialogPaper: {
    height: "77%",
    width: "100%",
  },
}));

const JobCard: FC<IJobCard> = ({ description, id, title, location, token }) => {

  const classes = useStyles();

  const [onejobapplications, setonejobapplications] = useState<any>();
  const [openviewapplication, setopenviewapplication] = useState<any>();

  const onejobapplicationsgetter = () => {
    axios
      .get(
        `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${id}/candidates`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        setonejobapplications(res.data);
        if (res.data.success) {
          setopenviewapplication(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewapplicationsModal = () => {
    if (onejobapplications !== undefined) {
      return (
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={openviewapplication}
        >
          <Container>
            <div className="Modal_top_text">
              <p className="Job_Card_text">Applicants for this job</p>

              <img
                style={{ cursor: "pointer" }}
                onClick={() => setopenviewapplication(false)}
                height="20"
                src={close}
                alt=""
              />
            </div>
            <hr />

            {onejobapplications.data !== undefined && (
              <p className="Job_Card_text">
                Total {onejobapplications.data.length} applications
              </p>
            )}

            {onejobapplications.data === undefined && (
              <p className="Job_Card_text">0 applications</p>
            )}

            <div className="Modal_view_applicants">
              <Row>
                {onejobapplications.data !== undefined &&
                  onejobapplications.data.map((eachApplicant: any) => {
                    return (
                      <Col md={6}>
                        <MobileViewApplicatons
                          key={eachApplicant.id}
                          name={eachApplicant.name}
                          email={eachApplicant.email}
                          skills={eachApplicant.skills}
                        />
                      </Col>
                    );
                  })}
              </Row>

              {onejobapplications.data === undefined && (
                <>
                  <div className="no_applicant_view">
                      <div className="no_applicant_innerview">
                              <img height="40%" src={pencilandpaper} alt=""/>
                              <p className="Job_Card_text">No applications available!</p>
                      </div>
                  </div>
                </>
              )}
            </div>
          </Container>
        </Dialog>
      );
    }
  };

  return (
    <div className="Job_Card_Container">
      <Col className="Job_Card_Col">
        <p className="Job_Card_text">{title}</p>
        <p className="Job_Card_text">{description}</p>
        <Row className="Job_Card_Row">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img style={{marginRight:"5px"}} height="20" src={locationImg} alt="" />
            <p className="Job_Card_text">{location}</p>
          </div>

          <Button
            onClick={onejobapplicationsgetter}
            style={{ fontSize: "10px", color: "#303F60" }}
            className={classes.button}
          >
            View applications
          </Button>
        </Row>
      </Col>

      {viewapplicationsModal()}
    </div>
  );
};

export default JobCard;
