import { useState } from "react";
import styles from "../styles/Reservation.module.css";
import Header from "../components/Header";
import Body from "../components/Body";
import ReservationForm from "../components/ReservationForm";
import withAuth from "../hoc/withAuth";

const ReservasPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Header />
      <Body>
        <div className={styles.container}>
          <h2>
            Para realizar una reserva mande un mensaje al 578362987 y le
            responderemos con la mayor brevedad posible indicandole las horas
            disponibles y si hay gente para jugar. O si
            lo prefiere puede usar nuestro formulario de reservas:
          </h2>
          <div className={styles.shadow}>
            <h1>Realiza tu reserva</h1>
            <ReservationForm />
          </div>
        </div>
      </Body>
    </div>
  );
};

export default withAuth(ReservasPage);
