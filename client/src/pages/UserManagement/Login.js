import React, { useEffect,useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import UserPool from "./UserPool";
import { CognitoUser,AuthenticationDetails } from "amazon-cognito-identity-js";
import axios from "axios";


function Login() {
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault();

    console.log(formValues.email);
    console.log(formValues.password);

    const user = new CognitoUser({
      Username: formValues.email,
      Pool: UserPool
    });

    const authDetails = new AuthenticationDetails({
      Username: formValues.email,
      Password: formValues.password
    });

    user.authenticateUser(authDetails,{
      onSuccess: (data) => {
        console.log(data)
        if(data.idToken.payload.email){
          navigate("/home", {state: {'data':data}})
        }
      },
      onFailure: (err) => {
        console.log("Failure: ", err)
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data)
      }
    })

  };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  return (
    <div>
      <div className="d-none d-sm-block">
        <div className="blue-main-gradient py-5">
          <div className="container">
            <div className="row">
              <div className="card">
                <div className="container my-5">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-12 d-flex justify-content-center">
                      <h1>WELCOME</h1>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-lg-6 px-md-5 c-border-right ">
                      <div className="row">
                        <div className="col-12">
                          <h2>LOGIN</h2>
                        </div>
                        <div className="col-12 ">
                          <div className="">
                            <form onSubmit={handleSubmit}>
                              <TextField
                                className="w-100 mt-2"
                                label="Email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                error={emailError}
                                helperText={
                                  emailError &&
                                  "Please enter email in a valid format"
                                }
                              />
                              <TextField
                                className="w-100 mt-4"
                                label="Password"
                                name="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                type="password"
                                error={passwordError}
                                helperText={
                                  passwordError && "Please enter password"
                                }
                              />
                              <button
                                type="submit"
                                className="w-100 my-5 blue-main-gradient border-button-blue
                                        height-40 border-radius-20 fw-bold fs-16 text-uppercase l-spacing-2-0 "
                                onClick={handleSubmit}
                              >
                                Submit
                              </button>
                            </form>
                            <div className="d-flex justify-content-center">
                              <a href="/forgotpassword">
                                <small className="text-decoration-none align-content-center text-center fw-bold fc-light-black cursor-pointer l-spacing-2-0">
                                  Forgot password?
                                </small>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 px-md-5">
                      <div className="row">
                        <div className=" ">
                          <h2>New User?</h2>
                        </div>
                        <div className="mt-3">
                          <h3>Create an account</h3>
                        </div>
                        <small className="fc-light-black mt-2">
                          By creating an account, you get access to early deals,
                          offers, and various coupon codes to use on the website
                        </small>
                        <div className="">
                          <a href="/register">
                            <button
                              type="submit"
                              className="w-100 my-3 blue-main-gradient border-button-blue
                                            height-40 border-radius-20 fw-bold fs-16 text-uppercase l-spacing-2-0 "
                            >
                              Register
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login