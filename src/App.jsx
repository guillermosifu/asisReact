import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendanceList')) || [];
    setAttendanceList(storedAttendance);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && date && time) {
      const newRecord = { name, date, time };
      const updatedList = [...attendanceList, newRecord];
      setAttendanceList(updatedList);
      localStorage.setItem('attendanceList', JSON.stringify(updatedList));

      setName('');
      setDate('');
      setTime('');
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const handleClear = () => {
    setAttendanceList([]);
    localStorage.removeItem('attendanceList');
  };

  return (
    <div className="container">
      <h1>Control de Asistencia</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <label htmlFor="date">Fecha:</label>
        <input 
          type="date" 
          id="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <label htmlFor="time">Hora:</label>
        <input 
          type="time" 
          id="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          required 
        />
        <button type="submit">Registrar Asistencia</button>
      </form>
      <div id="attendanceList">
        <h2>Lista de Asistencia</h2>
        <ul id="list">
          {attendanceList.map((record, index) => (
            <li key={index}>
              Nombre: {record.name}, Fecha: {record.date}, Hora: {record.time}
            </li>
          ))}
        </ul>
        <button onClick={handleClear}>Borrar Lista de Asistencia</button>
      </div>
    </div>
  );
}

export default App;
