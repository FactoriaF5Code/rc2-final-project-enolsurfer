import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from '../styles/MyReservations.module.css';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9000/api/reservation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setReservations(data))
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1>Mis Reservas</h1>
                {reservations.map((reservation, index) => (
                    <div key={index} className={styles.item}>
                        <p>Nombre del jugador: {reservation.playerName}</p>
                        <p>Fecha: {reservation.date}</p>
                        <p>Hora de inicio: {reservation.startTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReservations;