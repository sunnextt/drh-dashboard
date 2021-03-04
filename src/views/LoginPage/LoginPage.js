import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "_actions/user_actions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/drh-logo.png";

import { Container, Grid, Link, Typography } from "@material-ui/core";
import Textfield from "Components/FormsUI/Textfield/Textfield";
import Checkbox from "Components/FormsUI/Checkbox/Checkbox";
import ButtonWrapper from "Components/FormsUI/Button/Button";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "4rem",
  },
  header: {
    margin: "10px auto",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  img: {
    height: "100px",
  },
  typo: {
    margin: "1rem auto",
    fontSize: "16px",
    fontWeight: "500",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));


function LoginPage(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
      setRememberMe(!rememberMe);
    };

    const initialEmail = localStorage.getItem("rememberMe")
      ? localStorage.getItem("rememberMe")
      : "";
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Container maxWidth="md">
            <Grid item xs={12} className={classes.header}>
              <div>
                <img className={classes.img} src={logo} alt="drh-log"></img>
              </div>
              <div className={classes.typo}>
                <Typography className={classes.typo}>
                  DRO Health Login
                </Typography>
              </div>
            </Grid>
            <div>
              <Formik
                initialValues={{
                  email: initialEmail,
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Email is invalid")
                    .required("Email is required"),
                  password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  setTimeout(() => {
                    let dataToSubmit = {
                      email: values.email,
                      password: values.password,
                    };
                    dispatch(loginUser(dataToSubmit))
                      .then((response) => {
                        if (response.payload.loginSuccess) {
                          window.localStorage.setItem(
                            "userId",
                            response.payload.userId
                          );
                          if (rememberMe === true) {
                            window.localStorage.setItem(
                              "rememberMe",
                              values.id
                            );
                          } else {
                            localStorage.removeItem("rememberMe");
                          }
                          props.history.push("/");
                        } else {
                          setFormErrorMessage(
                            "Check out your Account or Password again"
                          );
                        }
                      })
                      .catch((err) => {
                        setFormErrorMessage(
                          "Check out your Account or Password again"
                        );
                        setTimeout(() => {
                          setFormErrorMessage("");
                        }, 3000);
                      });
                    setSubmitting(false);
                  }, 500);
                }}
              >
                {(props) => {
                  const { isSubmitting, handleSubmit } = props;
                  return (
                    <div className={classes.formWrapper}>
                      <Form onSubmit={handleSubmit} style={{ width: "350px" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Textfield
                              legend="Email"
                              name="email"
                              label="Email"
                              laceholder="Enter your email"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Textfield
                              legend="Password"
                              name="password"
                              label="Password"
                              type="password"
                              placeholder="Enter your password"
                            />
                          </Grid>
                          {formErrorMessage && (
                            <label>
                              <p
                                style={{
                                  color: "#ff0000bf",
                                  fontSize: "0.7rem",
                                  border: "1px solid",
                                  padding: "1rem",
                                  borderRadius: "10px",
                                }}
                              >
                                {formErrorMessage}
                              </p>
                            </label>
                          )}
                          <Grid item xs={6} style={{ margin: "auto 0" }}>
                            <Checkbox
                              onChange={handleRememberMe}
                              checked={rememberMe}
                              name="rememberMe"
                              label="Remember me"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              margin: "20px 0 0 0",
                              padding: "16px 0px 0 50px",
                            }}
                          >
                            <Link to="/reset_user">forgot password</Link>
                          </Grid>
                          <Grid item xs={12}>
                            <ButtonWrapper
                              onSubmit={handleSubmit}
                              disabled={isSubmitting}
                            >
                              Log in
                            </ButtonWrapper>
                          </Grid>
                        </Grid>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(LoginPage);
