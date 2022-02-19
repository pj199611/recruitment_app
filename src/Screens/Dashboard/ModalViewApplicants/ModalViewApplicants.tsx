import React, { FC } from "react";
import "./ModalViewApplicants.css";
import Avatar from "react-avatar";
import { Container } from "../../../Components/Common/Grid";

interface IModalViewApplicants {
  name?: any;
  email?: any;
  skills?: any;
}

const ModalViewApplicants: FC<IModalViewApplicants> = ({
  name,
  email,
  skills,
}) => {
  return (
    <div className="MobileViewApplicantscontainer">
      <Container>
        <div className="MobileViewApplicantscontainer_top">
          <Avatar
            fgColor="black"
            color="#D9EFFF"
            round={true}
            size="50"
            name={name}
          />
          <div className="MobileViewApplicantscontainer_top_name_email">
            <span>{name}</span>
            <span>{email}</span>
          </div>
        </div>

        <div className="MobileViewApplicantscontainer_bottom">
          <span style={{ color: "#303F60" }}>Skills</span>
          <br />
          <br />
          <span>{skills}</span>
        </div>
      </Container>
    </div>
  );
};

export default ModalViewApplicants;
