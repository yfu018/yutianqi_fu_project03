import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import "../css/Common.css";
import axios from 'axios';

export default function EditReview () {
    const [user, setUser] = useState();
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: '',
        description: '',
        date: '',
    });

    let navigate = useNavigate();
    let { carId } = useParams();
}