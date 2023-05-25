import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from './firebase'
import { UserContext } from './UserProvider';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const [displayLogoutBtn, setDisplayLogoutBtn] = useState(false);

    const redirectToLogin = () => {
        navigate('/login')
    }
    const handleLogout = () => {
        console.log('logout');
        signOut(auth).then(() => {
            toast.success("Your have been successfully logged out!", {
                position: "top-center",
                theme: "dark"
            });
        }).catch((error) => {
            alert(error.message);
        });
    }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user)
                setDisplayLogoutBtn(true);
            else
                setDisplayLogoutBtn(false);
        })
    })
    return (
        <nav className="navbar bg-body-tertiary bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-light ms-4" to="/">Beyond Imagination</Link>

                {displayLogoutBtn === true
                    ?
                    <div className="d-flex justify-space-evenly">
                        <p className="text-light me-5 mb-0 mt-2">{auth.currentUser.displayName}</p>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                    :
                    <button className="btn btn-primary" onClick={redirectToLogin}>Login</button>
                }
            </div>
            <ToastContainer />
        </nav>
    )
}

export default Navbar