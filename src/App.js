import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './auth/RegisterPage';
import LoginPage from './auth/LoginPage';
import HomePage from './auth/HomePage';
import GamePage from './components/GamePage';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли информация о зарегистрированном пользователе в localStorage
    const player = localStorage.getItem('player');
    if (player) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('player');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Перенаправление на логин или домашнюю страницу в зависимости от статуса авторизации */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          {/* Страница логина */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          {/* Страница регистрации */}
          <Route path="/register" element={isLoggedIn ? <Navigate to="/home" /> : <RegisterPage />} />

          {/* Домашняя страница (доступна только авторизованным пользователям) */}
          <Route path="/home" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />

          <Route path="/game" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
