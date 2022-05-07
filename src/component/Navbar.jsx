import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import "../css/Common.css";
import axios from 'axios';

export default function Navbar() {
    const [user, setUser] = useState();

    function userLoggedIn() {
        axios.get('/api/user/userLoggedIn')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error(error));
    }
    useEffect(userLoggedIn, []);

    let navigate = useNavigate();

    if (user) {
        return (
            <div class="navbar">
                <Link style={{textDecoration: 'none', fontSize: 36, fontWeight: "bold", color: "black"}} to="/"><div>Car Review</div></Link>
                <div class="horizontal">
                    <Link style={{textDecoration: 'none', color: "black"}} to='/home'><div>Home Page</div></Link>
                    <Link style={{textDecoration: 'none', color: "black"}} to='/createCar'><div>Create Post</div></Link>
                    <div>Logged in as {user}</div>

                    <button class='button'
                        onClick={() => {
                            axios.delete('/api/user/logout')
                                .then(response => {
                                    console.log(response);
                                    setUser('');
                                    navigate('/');
                                })
                                .catch(error => console.log(error));
                        }}>Logout</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div class="navbar">
                <Link style={{textDecoration: 'none', fontSize: 34, fontWeight: "bold", color: "black"}} to="/"><div>Car Review</div></Link>
                <div class="horizontal">
                    <Link style={{textDecoration: 'none', color: "black"}} to='/SearchCar'><div>Search</div></Link>
                    <Link style={{textDecoration: 'none', color: 'black'}} to="/loginsignup">Log In / Sign Up</Link>
                </div>
            </div>
        )
    }
}