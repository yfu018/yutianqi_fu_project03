import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "../css/Common.css";
import Navbar from './Navbar';
import axios from 'axios';

export default function CreateCar () {
    const [user, setUser] = useState();
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: '',
        description: '',
        date: '',
    });

    let navigate = useNavigate();

    function userLoggedIn() {
        axios.get('/api/user/userLoggedIn')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error(error));
    }
    useEffect(userLoggedIn, []);

    return (
        <div class='vertical'>
            <Navbar />
            <grid-container>
                <box1>
                    <grid-item>
                        <h2>Car Brand:</h2>
                    </grid-item>
                </box1>
                <box2>
                    <grid-item>
                        <input value={car.brand} onChange={(e) => {
                            const title = e.target.value;
                            setCar({
                                ...car,
                                brand: brand
                            })
                        }}/>
                    </grid-item>
                </box2>
                <box3>
                    <grid-item>
                        <h2>Model: </h2>
                    </grid-item>
                </box3>
                <box4>
                    <grid-item>
                        <input value={car.model} onChange={(e) => {
                            const model = e.target.value;
                            setCar({
                                ...car,
                                model: model
                            })
                        }}/>  
                    </grid-item>
                </box4>
                <box5>
                    <grid-item>
                        <h2>Year: </h2>
                    </grid-item>
                </box5>
                <box6>
                    <grid-item>
                        <input value={car.year} onChange={(e) => {
                            const year = e.target.value;
                            setCar({
                                ...car,
                                year: year
                            })
                        }}/>
                    </grid-item>
                </box6>
                <box7>
                    <grid-item>
                        <h2>Description: </h2>
                    </grid-item>
                </box7>
                <box8>
                    <grid-item>
                        <input value={car.description} onChange={(e) => {
                            const description = e.target.value;
                            setCar({
                                ...car,
                                description: description
                            })
                        }}/>
                    </grid-item>
                </box8>
                <box9>
                    <grid-item>
                        <h2>Date</h2>
                    </grid-item>
                </box9>
                <box10>
                    <grid-item>
                    <input value={car.date} onChange={(e) => {
                        const date = e.target.value;
                        setCar({
                            ...car,
                            date: date
                        })
                    }}/>
                    </grid-item>
                </box10>

            </grid-container>

            <button class = 'button' onClick={() => {
                axios.post('/api/car/', car)
                    .then(createCarResponse => {
                        console.log(createCarResponse);
                        let carId = createCarResponse.data._id;
                        axios.post('/api/user/addCreated/' + user + '/' + carId)
                            .then(userCreatedCar => {
                                console.log(userCreatedCar);
                            })
                            .catch(error => console.error(error));
                        navigate("/CarDetail/" + carId);
                    })
                    .catch(error => {
                        console.error(error)
                        alert("Information Missing");
                    });
                
            }}>Create Car</button>
        </div>
    )
}