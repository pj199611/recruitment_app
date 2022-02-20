import { FC, useState } from "react";
import { Formik, Form } from "formik";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import RecruitmentLogo from "../../assets/recruitment.png";
import CandidateLogo from "../../assets/candidate.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  authenticate,
  resetpasswordtoken,
  getCookie,
} from "../../utilties/utils";
import {
  loginFormSchema,
  signupFormSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  jobPostSchema,
} from "./validations";
import "./Forms.css";

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
    textTransform: "none",
  },
  default:{
    textTransform: "none",
    width: "150px",
  }
}));

interface IForms {
  showLoginform?: Boolean;
  showSignupform?: Boolean;
  showForgetPasswordform?: Boolean;
  showResetPasswordform?: Boolean;
  showpostajobform?: Boolean;
  token?: any;
}

const Forms: FC<IForms> = ({
  showLoginform,
  showSignupform,
  showForgetPasswordform,
  showResetPasswordform,
  showpostajobform,
  token,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [roleTypeFlag, setroleTypeFlag] = useState<any>({
    recruiter: true,
    candidate: false,
  });

  const btnrolechanger = (role: String) => {
    if (role === "candidate") {
      setroleTypeFlag({ recruiter: false, candidate: true });
    }

    if (role === "recruiter") {
      setroleTypeFlag({ candidate: false, recruiter: true });
    }
  };

  const recruiterposthandler = (values: any) => {
    axios
      .post("https://jobs-api.squareboat.info/api/v1/jobs", values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signuphandler = (values: any) => {
    axios
      .post(
        "https://jobs-api.squareboat.info/api/v1/auth/register",
        { ...values, userRole: roleTypeFlag.recruiter ? 0 : 1 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginhandler = (values: any) => {
    axios
      .post("https://jobs-api.squareboat.info/api/v1/auth/login", values)
      .then((res) => {
        authenticate(res);
        if (res.status === 200) {
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postresetpassword = (values: any) => {
    const resetTokenGetter = () => {
      return new Promise((resolve, reject) => {
        const resetToken = getCookie("resetToken");

        if (resetToken) {
          resolve(resetToken);
        }
        if (resetToken === undefined) {
          reject();
        }
      });
    };

    resetTokenGetter()
      .then((resetToken) => {
        const resetObj = {
          password: values.newpassword,
          confirmPassword: values.confirmnewpassword,
          token: resetToken,
        };

        axios
          .post(
            "https://jobs-api.squareboat.info/api/v1/auth/resetpassword",
            resetObj
          )
          .then((res) => {
            if (res.data.success) {
              history.push("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const forgetpasswordhandler = (values: any) => {
    const { resetEmail } = values;
    axios
      .get(
        `https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${resetEmail}`
      )
      .then((res) => {
        resetpasswordtoken(res.data.data.token);

        if (res.data.success) {
          history.push("/resetpassword");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/*------------- login form ------------*/}
      {showLoginform && (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginFormSchema}
          onSubmit={loginhandler}
        >
          {({ values, handleChange, errors, handleSubmit, handleBlur }) => (
            <Form>
              <div className="Form_container">
                <span className="heading_fontSize">Login</span>
                <div className="Form_input_control">
                  <p className="Form_input_text">Email Address</p>
                  <FormControl>
                    <OutlinedInput
                      value={values.email}
                      id="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.email)}
                    />
                  </FormControl>
                </div>

                <div className="Form_input_control">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="Form_input_text">Password</p>
                    <Link className="Link" to="/forgetpassword">
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#43AFFF",
                          cursor: "pointer",
                        }}
                      >
                        Forgot your password?
                      </p>
                    </Link>
                  </div>

                  <FormControl>
                    <OutlinedInput
                      value={values.password}
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.password)}
                    />
                  </FormControl>
                </div>

                <div className="error right">
                  {(errors.email || errors.password) && (
                    <div>{errors.email || errors.password}</div>
                  )}
                </div>
                <div className="btn_container">
                  <Button
                    onClick={() => handleSubmit()}
                    type="submit"
                    className={classes.button}
                  >
                    Login
                  </Button>
                </div>

                <div className="bottom_text_login">
                  <p>
                    New to MyJobs?
                    <Link className="Link" to="/signup">
                      <span
                        style={{
                          color: "#43AFFF",
                          marginLeft: "1%",
                          cursor: "pointer",
                        }}
                      >
                        Create an account
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {/* ---------------Signup form ----------------*/}

      {showSignupform && (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            skills: "",
          }}
          validationSchema={signupFormSchema}
          onSubmit={signuphandler}
        >
          {({ values, handleChange, errors, handleBlur }) => (
            <Form>
              <div className="Form_container_signup">
                <span className="heading_fontSize">Signup</span>
                <div className="Form_container_inner_signup">
                  <p>I’m a*</p>

                  <div className="Form_container_inner_btn_container">
                    <Button
                      className={roleTypeFlag.recruiter ? classes.button : classes.default}
                      onClick={() => btnrolechanger("recruiter")}
                      variant="outlined"
                    >
                      <div className="btn_container_text_with_logo">
                        <img src={RecruitmentLogo} alt="" />
                        Recruiter
                      </div>
                    </Button>

                    <Button
                      style={{ marginLeft: "5%" }}
                      className={roleTypeFlag.candidate ? classes.button : classes.default}
                      onClick={() => btnrolechanger("candidate")}
                      variant="outlined"
                    >
                      <div className="btn_container_text_with_logo"></div>
                      <img src={CandidateLogo} alt="" />
                      Candidate
                    </Button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p>Full Name*</p>

                    <FormControl>
                      <OutlinedInput
                        onBlur={handleBlur}
                        value={values.name}
                        id="name"
                        placeholder="Enter you full name"
                        type="text"
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                      />
                    </FormControl>
                    {errors.name && <div className="error">{errors.name}</div>}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p>Email Address*</p>
                    <FormControl>
                      <OutlinedInput
                        onBlur={handleBlur}
                        value={values.email}
                        id="email"
                        placeholder="Enter your email"
                        type="text"
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                      />
                    </FormControl>
                    {errors.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "45%",
                      }}
                    >
                      <p>Create Password*</p>
                      <FormControl>
                        <OutlinedInput
                          onBlur={handleBlur}
                          value={values.password}
                          id="password"
                          placeholder="Enter your password"
                          type="password"
                          onChange={handleChange}
                          error={Boolean(errors.password)}
                        />
                      </FormControl>
                      {errors.password && (
                        <div className="error">{errors.password}</div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "45%",
                      }}
                    >
                      <p>Confirm Password*</p>
                      <FormControl>
                        <OutlinedInput
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                          id="confirmPassword"
                          placeholder="Enter your password"
                          type="password"
                          onChange={handleChange}
                          error={Boolean(errors.confirmPassword)}
                        />
                      </FormControl>
                      {errors.confirmPassword && (
                        <div className="error">{errors.confirmPassword}</div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p>Skills</p>
                    <FormControl>
                      <OutlinedInput
                        onBlur={handleBlur}
                        value={values.skills}
                        id="skills"
                        placeholder="Enter comma separated skills"
                        type="text"
                        onChange={handleChange}
                        error={Boolean(errors.skills)}
                      />
                    </FormControl>
                    {errors.skills && (
                      <div className="error">{errors.skills}</div>
                    )}
                  </div>
                </div>

                <div className="btn_container">
                  <Button type="submit" className={classes.button}>
                    Signup
                  </Button>
                </div>

                <div className="bottom_text_login">
                  <p>
                    Have an account ?
                    <Link className="Link" to="/login">
                      <span
                        style={{
                          color: "#43AFFF",
                          marginLeft: "1%",
                          cursor: "pointer",
                        }}
                      >
                        Login
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {/*-------------- Forget your password Form----------- */}
      {showForgetPasswordform && (
        <Formik
          initialValues={{
            resetEmail: "",
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={forgetpasswordhandler}
        >
          {({ values, handleChange, errors, handleBlur }) => (
            <Form>
              {console.log("errors", errors)}
              <div className="Form_container_forgot">
                <span className="heading_fontSize">Forgot your password?</span>
                <br />
                <p>
                  Enter the email associated with your account and we’ll send
                  you instructions to reset your password.
                </p>
                <div className="Form_input_control">
                  <p className="Form_input_text">Email address</p>
                  <FormControl>
                    <OutlinedInput
                      value={values.resetEmail}
                      id="resetEmail"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.resetEmail)}
                    />
                  </FormControl>
                  {errors.resetEmail && (
                    <div className="error">{errors.resetEmail}</div>
                  )}
                </div>

                <div className="btn_container">
                  <Button type="submit" className={classes.button}>
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {/*-------Reset password----- */}
      {showResetPasswordform && (
        <Formik
          initialValues={{
            newpassword: "",
            confirmnewpassword: "",
          }}
          validationSchema={resetPasswordSchema}
          enableReinitialize={true}
          onSubmit={postresetpassword}
        >
          {({ values, handleChange, errors, handleBlur }) => (
            <Form>
              {console.log("errors", errors)}
              <div className="Form_container_reset">
                <span className="heading_fontSize">Reset Your Password</span>
                <br />
                <p>Enter your new password below.</p>
                <div className="Form_input_control">
                  <p className="Form_input_text">New Password</p>
                  <FormControl>
                    <OutlinedInput
                      value={values.newpassword}
                      id="newpassword"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      type="password"
                      error={Boolean(errors.newpassword)}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  {errors.newpassword && (
                    <div className="error">{errors.newpassword}</div>
                  )}
                </div>

                <div className="Form_input_control">
                  <p className="Form_input_text">Confirm New Password</p>
                  <FormControl>
                    <OutlinedInput
                      value={values.confirmnewpassword}
                      id="confirmnewpassword"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      type="password"
                      error={Boolean(errors.confirmnewpassword)}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  {errors.confirmnewpassword && (
                    <div className="error">{errors.confirmnewpassword}</div>
                  )}
                </div>

                <div className="btn_container">
                  <Button type="submit" className={classes.button}>
                    Reset
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {/* -------post  a job form -------- */}

      {showpostajobform && (
        <Formik
          initialValues={{
            title: "",
            description: "",
            location: "",
          }}
          validationSchema={jobPostSchema}
          onSubmit={recruiterposthandler}
        >
          {({ values, handleChange, errors, handleBlur }) => (
            <Form>
              {console.log("errors", errors)}
              <div className="Form_container_postjob">
                <span className="heading_fontSize">Post a Job</span>

                <div className="Form_input_control">
                  <p className="Form_input_text">Job title *</p>
                  <FormControl>
                    <OutlinedInput
                      value={values.title}
                      id="title"
                      placeholder="Enter job title"
                      onChange={handleChange}
                      error={Boolean(errors.title)}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  {errors.title && <div className="error">{errors.title}</div>}
                </div>

                <div className="Form_input_control">
                  <p className="Form_input_text">Description *</p>
                  <FormControl>
                    <OutlinedInput
                      multiline={true}
                      rows={4}
                      id="description"
                      value={values.description}
                      placeholder="Enter job description"
                      onChange={handleChange}
                      error={Boolean(errors.description)}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  {errors.description && (
                    <div className="error">{errors.description}</div>
                  )}
                </div>

                <div className="Form_input_control">
                  <div className="Form_input_control">
                    <p className="Form_input_text">Location *</p>
                    <FormControl>
                      <OutlinedInput
                        value={values.location}
                        id="location"
                        placeholder="Enter location"
                        onChange={handleChange}
                        error={Boolean(errors.location)}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    {errors.location && (
                      <div className="error">{errors.location}</div>
                    )}
                  </div>
                </div>

                <div className="btn_container">
                  <Button type="submit" className={classes.button}>
                    Post
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Forms;
