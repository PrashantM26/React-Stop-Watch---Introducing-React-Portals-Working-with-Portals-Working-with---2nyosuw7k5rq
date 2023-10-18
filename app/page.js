'use client'
import React, { useRef, useState, useEffect } from 'react';

function Home() {
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [lapVisible, setLapVisible] = useState(false);

  const startTimer = () => {
    startTimeRef.current = Date.now() - currentTime;
    intervalRef.current = setInterval(updateTime, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const lapTimer = () => {
    const newLapTime = currentTime;
    setLaps((prevLaps) => [...prevLaps, newLapTime]);
  };

  const resetTimer = () => {
    stopTimer();
    setCurrentTime(0);
    setLaps([]);
    setLapVisible(false);
  };

  const updateTime = () => {
    setCurrentTime(Date.now() - startTimeRef.current);
  };

  useEffect(() => {
    if (intervalRef.current) {
      updateTime();
    }
  }, []);

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">Stopwatch Time</h1>
        <p className="stopwatch-time">
          {currentTime / 1000.0}
          <span className="decimal-places">
            {currentTime % 1000 / 1000.0}
          </span>
        </p>
        <section className="buttons">
          <button className="start-btn" onClick={startTimer}>
            START
          </button>
          <button className="stop-btn" onClick={stopTimer}>
            STOP
          </button>
          <button className="lap-btn" onClick={lapTimer}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetTimer}>
            RESET
          </button>
        </section>
      </section>
      {lapVisible && (
        <section className="lap-section">
          <h2>Laps</h2>
          <section className="laps">
            {laps.map((lapTime, index) => (
              <p key={index}>Lap {index + 1}: {lapTime / 1000.0}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  );
}

export default Home;
