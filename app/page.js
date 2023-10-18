'use client'
import React, { useRef, useState, useEffect } from 'react';

function Home() {
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [lapVisible, setLapVisible] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const startTimer = () => {
    if (!timerRunning) {
      startTimeRef.current = Date.now() - currentTime;
      intervalRef.current = setInterval(updateTime, 10);
      setTimerRunning(true);
    }
  };

  const stopTimer = () => {
    if (timerRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimerRunning(false);
    }
  };

  const lapTimer = () => {
    if (timerRunning) {
      const newLapTime = currentTime;
      setLaps((prevLaps) => [...prevLaps, newLapTime]);
      setLapVisible(true);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCurrentTime(0);
    setLaps([]);
    setLapVisible(false);
    setTimerRunning(false);
  };

  const updateTime = () => {
    setCurrentTime(Date.now() - startTimeRef.current);
  };

  useEffect(() => {
    if (intervalRef.current) {
      updateTime();
    }
  }, []);

  const formatTime = (time) => {
    if (time === 0) return '';
    const seconds = Math.floor(time / 1000);
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    return `${seconds}.${milliseconds}`;
  };

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">Stopwatch Time</h1>
        <p className="stopwatch-time">
          {formatTime(currentTime)}
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
              <p key={index}>Lap {index + 1}: {formatTime(lapTime)}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  );
}

export default Home;
