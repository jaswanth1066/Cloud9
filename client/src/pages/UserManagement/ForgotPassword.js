import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import TextField from "@material-ui/core/TextField";

function ForgotPassword() {
    
    let navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: "",
    });
    const [emailError,setEmailError] = useState(false);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () =>{
        console.log("Submit")
    }
    return(
        <div>
        <div className="blue-main-gradient py-5">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-4 col-md-8 col-12 ">
                        <div className="card text-center">
                            <h1 className="my-4"> Forgot Password</h1>
                            <div className="container">
                                <hr className="mt-0"/>
                                <small className="fc-light-black mt-2">
                                    If you have an account with us, you will receive an email with a link to change the password.
                                </small>
                                <small className="fc-light-black mt-2">
                                    Please check your spam folder.
                                </small>
                                <TextField
                                    className="w-100 mt-1"
                                    label="Enter your email*"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    error={emailError}
                                    helperText={emailError && "Please enter email"}
                                />
                                <button type="submit" className="w-100 my-5 blue-main-gradient border-button-blue
                                    height-40 border-radius-20 fw-bold fs-16 text-uppercase l-spacing-2-0 "
                                        onClick={handleSubmit}>Submit</button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ForgotPassword