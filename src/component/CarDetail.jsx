import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from './Navbar';
import "../css/Common.css";
import axios from 'axios';
import dateFormat from "dateformat";

export default function CarDetail () {
    const [user, setUser] = useState();
    const [Car, setCar] = useState([]);

    let { carId } = useParams();

    function userLoggedIn() {
        axios.get('/api/user/userLoggedIn')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error(error));
    }   
    useEffect(userLoggedIn, []);

    function findCar() {
        axios.get('http://localhost:3050/api/car/findCarById/' + carId)
            .then(response => {
                setCar(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findCar, []);

    return (
        <div class='vertical'>
            <Navbar />
            <grid-container>
                <box1>
                    <grid-item>
                        <h2>Car Brand: </h2>
                    </grid-item>
                </box1>
                <box2>
                    <grid-item>
                        <h2>{Car.brand}</h2>
                    </grid-item>
                </box2>
                <box3>
                    <grid-item>
                        <h2>Model: </h2>
                    </grid-item>
                </box3>
                <box4>
                    <grid-item>
                        <h2>{Car.model}</h2>
                    </grid-item>
                </box4>
                <box5>
                    <grid-item>
                        <h2>Year: </h2>
                    </grid-item>
                </box5>
                <box6>
                    <grid-item>
                        <h2>{Car.year}</h2>
                    </grid-item>
                </box6>
                <box7>
                    <grid-item>
                        <h2>Car Description: </h2>
                    </grid-item>
                </box7>
                <box8>
                    <grid-item>
                        <h2>{Car.description}</h2>
                    </grid-item>
                </box8>
                <box9>
                    <grid-item>
                        <h2>Release Year: </h2>
                    </grid-item>
                </box9>
                <box10>
                    <grid-item>
                        <h2>{dateFormat(Car.date, "yyyy-mm-dd")}</h2>
                    </grid-item>
                </box10> 
            </grid-container>
        </div>
    )
}