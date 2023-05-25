import React, { useState } from 'react'
import '../style/Login.css'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [invalidMail, setInvalidMail] = useState()
    const [invalidPass, setInvalidPass] = useState()
    const [user, setUser] = useState({
        email: "",
        pass: ""
    })
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [visible, setVisible] = useState(false);
    const signupClicked = () => {
        navigate('/signup');
    }
    const inputEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name, value);
        setUser({ ...user, [name]: value });
    }
    const handleSubmission = () => {
        if (!user.email || !user.pass) {
            toast.error("Please fill all details!", {
                position: "top-center",
                theme: "dark"
            });
            return;
        }
        setSubmitBtnDisable(true);
        signInWithEmailAndPassword(auth, user.email, user.pass).then(
            async (res) => {
                setSubmitBtnDisable(false);
                navigate('/');
            }).catch((err) => {
                setSubmitBtnDisable(false);
                // console.log("error is", err)
                if (err.message === "Firebase: Error (auth/invalid-email).")
                    setInvalidMail("The email id is invalid!")
                if (err.message === "Firebase: Error (auth/user-not-found).")
                    setInvalidMail("User not found!")
                if (err.message === "Firebase: Error (auth/wrong-password).")
                    setInvalidPass("Password is incorrect!")
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
    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider).then((res) => {
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })
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
                        <label>Email</label>
                        <input type="text" name="email" onChange={inputEvent} />
                        <span className="errorMsg">{invalidMail}</span>

                        <label>Password</label>
                        <input type={visible ? "text" : "password"} name="pass" className="password" onChange={inputEvent} />
                        {visible ?
                            <i className="bi bi-eye-fill visibilityIcon" onClick={visibleClicked}></i>
                            :
                            <i className="bi bi-eye-slash-fill visibilityIcon" onClick={notVisibleClicked}></i>
                        }
                        <span className="errorMsg">{invalidPass}</span>

                        <button className="btn btn-success w-100 loginPageBtn" onClick={handleSubmission} disabled={submitBtnDisable}>Login</button>
                        <button className="w-100 googleBtn mb-3" onClick={handleGoogleSignin} disabled={submitBtnDisable}>Sign In with Google</button>

                        <div className="not_has_account">
                            <span>Need an account? </span>
                            <button className="btn mb-2" onClick={signupClicked}>Signup</button>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}
export default Login;