import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../css/Common.css";
import Navbar from './Navbar';
import axios from 'axios';

// All good
export default function SearchResult() {
    const [allCars, setAllCars] = useState([]);
    let { car } = useParams();

    function findAllCars() {
        axios.get('http://localhost:3050/api/car/findAll')
                .then(response => {
                    console.log(response)
                    setAllCars(response.data)
                })
                .catch(error => console.error(error));
    }

    useEffect(findAllCars, []);

    return (
        <div class='vertical'>
            <Navbar />
            <h2>Search results for: {car ? car : "All cars"} ({allCars.length} cars found)</h2>
            <div>
                {allCars.map(car => 
                    <Link to={{ pathname: `/carDetail/${car._id}` }}>
                        <div class='box'>
                            <span style={{textDecoration: 'none', fontSize: 36, fontWeight: "bold"}}>{car.brand}</span>
                            <span style={{textDecoration: 'none', fontSize: 18}}>{car.model}</span>
                            <span style={{textDecoration: 'none', fontSize: 18}}>{car.year}</span>
                            <span style={{textDecoration: 'none', fontSize: 18}}>{car.description}</span>

                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}