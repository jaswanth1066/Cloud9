import React, { useEffect,useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./Login.css"
import UserPool from "./UserPool";

function Register() {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) =>{
      console.log("Submit")
      event.preventDefault();
      console.log(formValues.email);
      console.log(formValues.password);
      UserPool.signUp(formValues.email,formValues.password,[],null, (err,data) => {
        if(err){
          console.log(err);
        }
        if(data.user.userDataKey){
          toast('Registered Successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            transition: null,
            // progress: undefined,
        });
          setTimeout(() => { navigate("/")},2000);
         
        }
        else{
          toast('Registration Unsuccessful', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            transition: null,
            // progress: undefined,
        });
        }
      })


  }

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  return (
    <div >
       <ToastContainer
                autoClose={10}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
            />
            <ToastContainer />
      <div className="blue-main-gradient py-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="card col-sm-12 col-md-10 col-lg-6 ">
              <div className="d-flex justify-content-center mt-5">
                <h1>Create an account</h1>
              </div>
              <div className="d-flex justify-content-center">
                <small className="fc-light-black">
                  Have an account?{" "}
                  <a
                    href="/login"
                    className="fw-bold cursor-pointer text-black text-decoration-underline"
                  >
                    Login
                  </a>
                </small>
              </div>
              <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                  <div className="row mt-4">
                    <div className="col-lg-6">
                      <TextField
                        label="First Name"
                        className="w-100 "
                        margin="normal"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleInputChange}
                        error={firstNameError}
                        helperText={
                          firstNameError && "First Name only accepts letters"
                        }
                      />
                    </div>
                    <div className="col-lg-6">
                      <TextField
                        label="Last Name"
                        className="w-100 "
                        margin="normal"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleInputChange}
                        error={lastNameError}
                        helperText={
                          lastNameError && "Last Name only accepts letters"
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    <TextField
                      className="w-100 mt-1"
                      label="Email"
                      name="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      error={emailError}
                      helperText={
                        emailError && "Please enter in correct email format"
                      }
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      className="w-100"
                      label="Password"
                      name="password"
                      value={formValues.password}
                      onChange={handleInputChange}
                      
                      error={passwordError}
                      
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      className="w-100 mt-1"
                      label="Confirm Password"
                      name="confirmPassword"
                      value={formValues.confirmPassword}
                      onChange={handleInputChange}
                      
                      error={confirmPasswordError}
                      helperText={
                        confirmPasswordError &&
                        "Password and confirm password should match"
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-100 my-3 blue-main-gradient border-button-blue
                                                height-40 border-radius-20 fw-bold fs-16 text-uppercase l-spacing-2-0 my-5 cursor-pointer"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register
