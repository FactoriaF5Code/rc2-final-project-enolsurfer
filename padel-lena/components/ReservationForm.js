import React, { useState } from "react";
import Calendar from "./Calendar";
import styles from "../styles/ReservationForm.module.css";

const ReservationForm = () => {
  const [playerName, setPlayerName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    const currentTime = new Date();

    const [selectedHours, selectedMinutes] = selectedTime.split(':').map(Number);
    const selectedDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedHours, selectedMinutes);

    if (selectedDateTime < currentTime) {
        alert('No puedes reservar una hora pasada');
        return;
    }

    setSelectedTime(selectedTime);
};

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedDate = selectedDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const reservationData = {
      playerName: playerName,
      date: formattedDate,
      startTime: selectedTime,
    };
    fetch("http://localhost:9000/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert(
          `Tu reserva se ha realizado con éxito para la fecha ${formattedDate} a las ${selectedTime}`
        );
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.centered}>
        Nombre del jugador:
        <input
          type="text"
          value={playerName}
          onChange={handlePlayerNameChange}
          className={styles.player}
        />
      </label>
      <br />
      <label className={styles.centered}>
        Fecha:
        <Calendar onSelectDate={handleDateChange} />
      </label>
      <br />
      <label className={styles.centered}>
        Hora:
        <select
          value={selectedTime}
          onChange={handleTimeChange}
          className={styles.time}
        >
          <option value="">Selecciona una hora</option>
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
      <button type="submit" disabled={!selectedTime} className={styles.button}>
        Reservar
      </button>
    </form>
  );
};

export default ReservationForm;
