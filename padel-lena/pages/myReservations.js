import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from '../styles/MyReservations.module.css';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);

    const isPastReservation = (reservationDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentYear = today.getFullYear();
        const [day, month] = reservationDate.split("/");
        const reservation = new Date(Date.UTC(currentYear, month - 1, day));
        return reservation.getTime() < today.getTime();
    }

    const isOldReservation = (reservationDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const twoDaysAgo = new Date(today.getTime() - (2 * 24 * 60 * 60 * 1000));
        const currentYear = today.getFullYear();
        const [day, month] = reservationDate.split("/");
        const reservation = new Date(Date.UTC(currentYear, month - 1, day));
        return reservation.getTime() < twoDaysAgo.getTime();
    }

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
                {reservations.filter(reservation => !isOldReservation(reservation.date)).map((reservation, index) => (
                    <div key={index} className={isPastReservation(reservation.date) ? styles.itemPast : styles.item}>
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