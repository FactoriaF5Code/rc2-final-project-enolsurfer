import React, { useState } from 'react';
import Calendar from './Calendar';
import styles from '../styles/ReservationForm.module.css';

const ReservationForm = () => {
    const [playerName, setPlayerName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const reservationData = {
            playerName: playerName,
            selectedDate: selectedDate,
            selectedTime: selectedTime
        };
        fetch('/api/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Nombre del jugador:
                <input type="text" value={playerName} onChange={handlePlayerNameChange} />
            </label>
            <br />
            <label>
                Fecha:
                <Calendar onSelectDate={handleDateChange} />
            </label>
            <br />
            <label>
            Hora:
            <select value={selectedTime} onChange={handleTimeChange}>
                <option value="10:00">10:00--11:30</option>
                <option value="11:30">11:30--13:00</option>
                {selectedDate && [6, 0].includes(selectedDate.getDay()) ? null : (
                    <>
                        <option value="16:00">16:00--17:30</option>
                        <option value="17:30">17:30--19:00</option>
                        <option value="19:00">19:00--20:30</option>
                        <option value="20:30">20:30--22:00</option>
                    </>
                )}
            </select>
            </label>
            <br />
            <button type="submit">Reservar</button>
        </form>
    );
};

export default ReservationForm;