import React, { useState } from 'react';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const [invalidMail, setInvalidMail] = useState()
    const [invalidPass, setInvalidPass] = useState()
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        pass: ""
    })
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [visible, setVisible] = useState(false);
    const loginClicked = () => {
        navigate('/login');
    }
    const inputEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name, value);
        setUser({ ...user, [name]: value });
    }
    const handleSubmission = () => {
        if (!user.fullname || !user.email || !user.pass) {
            // alert("Please fill all fields!");
            toast.error("Please fill all details!", {
                position: "top-center",
                theme: "dark"
            });
            return;
        }
        setSubmitBtnDisable(true);
        createUserWithEmailAndPassword(auth, user.email, user.pass).then(
            async (res) => {
                setSubmitBtnDisable(false);
                const x = res.user;
                await updateProfile(x, {
                    displayName: user.fullname
                })
                navigate('/');
            }).catch((err) => {
                setSubmitBtnDisable(false);
                // console.log("error is", err)
                if (err.message === "Firebase: Error (auth/invalid-email).")
                    setInvalidMail("The email id is invalid!")
                if (err.message === "Firebase: Error (auth/email-already-in-use).")
                    setInvalidMail("Email already in use!")
                if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
                    setInvalidPass("Password should be at least 6 characters!")
                setTimeout(() => {
                    setInvalidMail()
                    setInvalidPass()
                }, 2000)
            });
        // function removeVal() {
        //     document.querySelectorAll('input').forEach(element => {
        //         element.value = "";
        //     });
        // }
        // if (!setInvalidMail && !setInvalidPass)
        //     setTimeout(removeVal, 500);
    }
    const visibleClicked = () => {
        setVisible(false);
    }
    const notVisibleClicked = () => {
        setVisible(true);
    }
    return (
        <>
            <div className="loginSec">
                <div className='loginDiv'>
                    <div className="loginFormDiv">
                        <label>Name</label>
                        <input type="text" name="fullname" onChange={inputEvent} />

                        <label>Email</label>
                        <input type="text" name="email" onChange={inputEvent} />
                        <span className="errorMsg text-danger fw-semibold d-block">{invalidMail}</span>

                        <label className='label'>Password</label>
                        <input type={visible ? "text" : "password"} name="pass" onChange={inputEvent} />
                        <span className="errorMsg text-danger fw-semibold d-block">{invalidPass}</span>

                        {visible ?
                            <i className="bi bi-eye-fill vIcon" onClick={visibleClicked}></i>
                            :
                            <i className="bi bi-eye-slash-fill vIcon" onClick={notVisibleClicked}></i>
                        }
                        <button className="btn btn-success w-100 loginPageBtn" onClick={handleSubmission} disabled={submitBtnDisable}>Signup</button>

                        <div className="not_has_account">
                            <span>Already have an account? </span>
                            <button className="btn mb-2" onClick={loginClicked}>Login</button>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}

export default Signup