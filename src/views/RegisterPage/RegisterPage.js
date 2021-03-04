import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/drh-logo.png";

import { Container, Grid, Typography } from "@material-ui/core";
import Textfield from "Components/FormsUI/Textfield/Textfield";
import ButtonWrapper from "Components/FormsUI/Button/Button";
import Select from "Components/FormsUI/Select/Select";
import DateTimePicker from "Components/FormsUI/DataTimePicker/DataTimePicker";
import countries from "data/countries.json";

import { registerUser } from "_actions/user_actions";
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
    width: "100%",
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
    width: "80%",
    margin: "1rem auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  user: {
    display: "flex",
    margin: 10,
  },
}));

function RegisterPage(props) {
  const [country, setCountry] = useState({});

  const url = "http://dev.drohealth.com/patients/api/country/";
  const headers = {
    allow: "GET, HEAD, OPTIONS",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const getCountries = async () => {
    const response = await Axios.get(url, headers);
    if (response.status === 200) {
      setCountry(response.data);
    } else {
      alert("Failed to fectch product datas");
    }
  };

  useEffect(() => {
    getCountries();
  });

  console.log(country);

  const classes = useStyles();

  const dispatch = useDispatch();
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
                  DRO Health Sign up
                </Typography>
              </div>
            </Grid>
            <div>
              <Formik
                initialValues={{
                  user: [{}],
                  gender: "",
                  phone: "",
                  birth_date: "",
                  city: "",
                  state: "",
                  country: "",
                  timezone: "",
                  ref_methods: "",
                }}
                validationSchema={Yup.object().shape({
                  user: Yup.array().of(
                    Yup.object().shape({
                      username: Yup.string().required("Username is required"),
                      first_name: Yup.string().required("Name is required"),
                      last_name: Yup.string().required("Last Name is required"),
                      email: Yup.string()
                        .email("Email is invalid")
                        .required("Email is required"),
                      password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is required"),
                      confirmPassword: Yup.string()
                        .oneOf(
                          [Yup.ref("password"), null],
                          "Passwords must match"
                        )
                        .required("Confirm Password is required"),
                    })
                  ),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    let dataToSubmit = {
                      email: values.email,
                      password: values.password,
                      first_name: values.first_name,
                      last_name: values.last_name,
                    };

                    dispatch(registerUser(dataToSubmit)).then((response) => {
                      if (response.payload.success) {
                        props.history.push("/login");
                      } else {
                        alert(response.payload.err.errmsg);
                      }
                    });

                    setSubmitting(false);
                  }, 500);
                }}
              >
                {(props) => {
                  const { isSubmitting, handleSubmit, values } = props;
                  const { user } = values;
                  return (
                    <div className={classes.formWrapper}>
                      <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <FieldArray
                            name="user"
                            render={(arrayHelpers) => (
                              <div>
                                {user.map((user, index) => (
                                  <div key={index} className={classes.user}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} sm={6} md={6}>
                                        <Textfield
                                          legend="username"
                                          name={`user[${index}].username`}
                                          label="username"
                                          placeholder="Enter your Username"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6} md={6}>
                                        <Textfield
                                          legend="name"
                                          name={`user[${index}].first_name`}
                                          label="First Name"
                                          placeholder="Enter your First Name"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6} md={6}>
                                        <Textfield
                                          legend="name"
                                          name={`user[${index}].last_name`}
                                          label="Last Name"
                                          placeholder="Enter your Lastname"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6} md={6}>
                                        <Textfield
                                          legend="Email"
                                          name={`user[${index}].email`}
                                          label="Email"
                                          placeholder="Enter your Email"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6} md={6}>
                                        <Textfield
                                          legend="Password"
                                          name={`user[${index}].password`}
                                          label="Password"
                                          type="password"
                                          placeholder="Enter your Password"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6} md={6}>
                                        <Textfield
                                          legend="Password"
                                          name={`user[${index}].comfirmPassword`}
                                          label="Comfirm Password"
                                          type="password"
                                          placeholder="Comfirm Password"
                                        />
                                      </Grid>
                                    </Grid>
                                  </div>
                                ))}
                              </div>
                            )}
                          />
                          <Grid item xs={6}>
                            <Select
                              name="gender"
                              label="Gender"
                              options={["female", "male"]}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <DateTimePicker
                              name="Date of Birth"
                              label="birth_date"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Textfield name="phone" label="Phone" />
                          </Grid>
                          <Grid item xs={6}>
                            <Select
                              name="state"
                              label="State"
                              options={countries}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Select
                              name="country"
                              label="Country"
                              options={countries}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Textfield
                              name="timezone"
                              label="Time Zone"
                              placeholder="Africa/Lagos"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Textfield
                              name="ref_methods"
                              label="Ref"
                              placeholder="2"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <ButtonWrapper
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Submit
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

export default RegisterPage;
