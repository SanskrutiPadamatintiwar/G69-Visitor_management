import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const response = await axios.get('http://localhost:5000/slots');
      setSlots(response.data);
    };
    fetchSlots();
  }, []);

  const handleSlotClick = async (slot) => {
    try {
      const response = await axios.patch(`http://localhost:5000/slots/${slot._id}/toggle`);
      const updatedSlot = response.data;
      setSlots((prevSlots) =>
        prevSlots.map((s) => (s._id === updatedSlot._id ? updatedSlot : s))
      );
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  };

  return (
    <div className="app">
      <div className="parking-lot">
        {slots.map((slot) => (
          <div
            key={slot.number}
            className={`slot ${slot.isOccupied ? 'occupied' : 'empty'}`}
            onClick={() => handleSlotClick(slot)}
          >
            <div className="slot-info">
              <span className="slot-number">Slot {slot.number}</span>
              <span className="slot-status">{slot.isOccupied ? 'Occupied' : 'Empty'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
