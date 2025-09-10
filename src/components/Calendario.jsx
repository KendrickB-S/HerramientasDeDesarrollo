import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { es } from "date-fns/locale";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function Calendario() {
  const [eventos, setEventos] = useState([
    {
      title: "📚 Estudiar React",
      start: new Date(2025, 8, 6, 10, 0), // 6 septiembre 2025, 10:00
      end: new Date(2025, 8, 6, 12, 0),   // 6 septiembre 2025, 12:00
    },
  ]);

  const agregarEvento = () => {
    const titulo = prompt("Ingrese el título del evento:");
    if (!titulo) return;

    const fecha = prompt("Ingrese la fecha (YYYY-MM-DD):");
    if (!fecha) return;

    const nuevoEvento = {
      title: titulo,
      start: new Date(`${fecha}T10:00:00`), // comienza a las 10am
      end: new Date(`${fecha}T11:00:00`),   // termina a las 11am
    };

    setEventos([...eventos, nuevoEvento]);
  };