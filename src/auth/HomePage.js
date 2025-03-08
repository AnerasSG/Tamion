import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pokedex from '../data/pokedex';

const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [starterPokemon, setStarterPokemon] = useState(null);

  useEffect(() => {
    // Получаем данные игрока из localStorage
    const storedPlayer = localStorage.getItem('player');
    if (storedPlayer) {
      const playerData = JSON.parse(storedPlayer);
      setPlayer(playerData);

      // Проверяем наличие стартового покемона
      const checkStarterPokemon = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/check-starter-pokemon/${playerData.id}`);
          const data = await response.json();

          if (data.hasStarterPokemon) {
            // Если покемон есть, перенаправляем на главную игровую страницу
            navigate('/game');
          }
        } catch (error) {
          console.error('Ошибка проверки стартового покемона:', error);
        }
      };

      checkStarterPokemon();
    } else {
      // Если данных нет, перенаправляем на страницу входа
      navigate('/login');
    }
  }, [navigate]);

  const handlePokemonSelect = async (pokemonNum) => {
    try {
      const response = await fetch('http://localhost:3000/api/choose-starter-pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId: player.id,
          pokemonNum: pokemonNum
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Перенаправляем на главную игровую страницу
        navigate('/game');
      } else {
        // Обработка ошибки
        console.error(data.message);
      }
    } catch (error) {
      console.error('Ошибка при выборе покемона:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  // Если данные игрока еще не загружены, показываем загрузку
  if (!player) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="home-container">
      <header className="game-header">
        <h1>Tamion</h1>
        <div className="player-info">
          <span>Тренер:  {player.nickname} </span>
          <button onClick={handleLogout} className="logout-button">Выйти</button>
        </div>
      </header>

      <main className="game-content">
        <h2>Добро пожаловать в мир Покемонов!</h2>
        <p>Здесь вы можете начать свое приключение как тренер покемонов.</p>

        <div className="game-sections">
          <div className="game-section">
            <h3>Выберите своего стартового покемона</h3>
            <div className="starter-pokemon">
              {Object.values(Pokedex)
                .filter(pokemon => [1, 4, 7].includes(pokemon.num))
                .map(pokemon => (
                  <div key={pokemon.num} className="pokemon-option">
                    <img
                      src={`/images/${pokemon.name.toLowerCase()}.png`}
                      alt={pokemon.name}
                    />
                    <h4>{pokemon.name}</h4>
                    <p>Тип: {pokemon.types.join('/')}</p>
                    <button onClick={() => handlePokemonSelect(pokemon.num)}>
                      Выбрать
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </main>

      <footer className="game-footer">
        <p>Tamion © 2025</p>
      </footer>
    </div>
  );
};

export default HomePage;
