import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/GamePage.css';

// Определение типов для TypeScript
interface Pokemon {
  id: string;
  name: string;
  level: number;
  experience: number;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  types: string | string[]; // Updated to allow string or string[]
  ability: string;
  nature: {
    name: string;
    plus?: string;
    minus?: string;
  };
  moves: string | string[]; // Updated to allow string or string[]
  ivs: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
}

interface Player {
  id: string;
  nickname: string;
  email: string;
}

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Получаем данные игрока из localStorage
    const storedPlayer = localStorage.getItem('player');

    if (!storedPlayer) {
      navigate('/login');
      return;
    }

    const playerData = JSON.parse(storedPlayer);
    setPlayer(playerData);

    // Загружаем покемона из базы данных
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/pokemon/${playerData.id}`);

        if (!response.ok) {
          throw new Error('Не удалось загрузить покемона');
        }

        const data = await response.json();

        if (data.pokemon) {
          // Преобразуем данные, если необходимо
          // Ensure types and moves are arrays
          const processedPokemon = {
            ...data.pokemon,
            types: ensureArray(data.pokemon.types),
            moves: ensureArray(data.pokemon.moves)
          };

          setPokemon(processedPokemon);
          console.log("Полученные данные покемона:", data.pokemon);
          console.log("Обработанные данные покемона:", processedPokemon);
        } else {
          // Если у игрока нет покемона, перенаправляем на страницу выбора
          navigate('/');
        }
      } catch (err) {
        setError('Ошибка при загрузке данных покемона');
        console.error('Error fetching pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [navigate]);

  // Функция для преобразования значения в массив
  const ensureArray = (value: any): any[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        // Попытка разобрать JSON строку, если это массив
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
      } catch (e) {
        // Если не удалось разобрать как JSON, возвращаем строку как элемент массива
        return [value];
      }
    }
    return [value];
  };

  // Функция для форматирования IVs в компактный формат
  const formatIVs = (ivs: any): string => {
    if (!ivs) return '';

    // Проверка, является ли ivs строкой (возможно JSON строка)
    if (typeof ivs === 'string') {
      try {
        ivs = JSON.parse(ivs);
      } catch (e) {
        console.error('Ошибка при разборе JSON строки IVs:', e);
        return '';
      }
    }

    // Обработка случая, когда ivs точно объект
    const hp = parseInt(ivs.hp) || 0;
    const atk = parseInt(ivs.atk) || 0;
    const def = parseInt(ivs.def) || 0;
    const spa = parseInt(ivs.spa) || 0;
    const spd = parseInt(ivs.spd) || 0;
    const spe = parseInt(ivs.spe) || 0;

    return `H${hp}A${atk}D${def}SA${spa}SD${spd}S${spe}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('player');
    navigate('/login');
  };

  // Функция для расчета процента опыта
  const calculateExpPercentage = () => {
    if (!pokemon) return 0;
    const maxExp = pokemon.level * 100;
    return (pokemon.experience / maxExp) * 100;
  };

  if (loading) {
    return (
      <div className="game-loading">
        <div className="pokeball-spinner"></div>
        <p>Загрузка мира покемонов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-error">
        <h2>Произошла ошибка</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Вернуться на главную</button>
      </div>
    );
  }

  const typesArray = ensureArray(pokemon?.types);
  const movesArray = ensureArray(pokemon?.moves);

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Tamion Game</h1>
        <div className="player-info">
          <span>Тренер: {player?.nickname}</span>
          <button onClick={handleLogout} className="logout-button">Выйти</button>
        </div>
      </header>

      <main className="game-content">
        <div className="game-layout">
          <div className="pokemon-showcase">
            <div className="pokemon-card">
              <div className="pokemon-header">
                <h2>{pokemon?.name}</h2>
                <span className="pokemon-level">Уровень {pokemon?.level}</span>
              </div>

              <div className="pokemon-image">
                {/* Здесь можно добавить изображение покемона */}
                <div className="pokemon-placeholder">
                  {pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : 'Покемон'}
                </div>
              </div>

              <div className="pokemon-info">
                <div className="pokemon-types">
                  {typesArray.length > 0 ? (
                    typesArray.map((type, index) => (
                      <span key={index} className={`type-badge type-${type.toLowerCase()}`}>
                        {type}
                      </span>
                    ))
                  ) : (
                    <span>Нет типов</span>
                  )}
                </div>
              </div>

              <div className="pokemon-ability">
                <h3>Способность</h3>
                <p>{pokemon?.ability || 'Неизвестно'}</p>
              </div>

              <div className="pokemon-nature">
                <h3>Характер</h3>
                <p>{pokemon?.nature?.name || 'Неизвестно'}</p>
                {pokemon?.nature?.plus && (
                  <p className="nature-buff">+{pokemon.nature.plus}</p>
                )}
                {pokemon?.nature?.minus && (
                  <p className="nature-debuff">-{pokemon.nature.minus}</p>
                )}
              </div>

              <div className="pokemon-stats">
                <h3>Характеристики</h3>
                <div className="stat-bars">
                  {pokemon?.stats && Object.entries(pokemon.stats).map(([stat, value]) => (
                    <div key={stat} className="stat-item">
                      <span className="stat-label">{stat.toUpperCase()}</span>
                      <div className="stat-bar-container">
                        <div className="stat-bar" style={{ width: `${(value || 0) / 2}%` }}></div>
                      </div>
                      <span className="stat-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pokemon-moves">
                <h3>Атаки</h3>
                <div className="moves-list">
                {movesArray.length > 0 ? (
                  movesArray.map((move, index) => (
                    <span key={index} className="move-badge">
                      {move}
                    </span>
                  ))
                ) : (
                  <span>Нет атак</span>
                )}
                </div>
              </div>

              <div className="pokemon-ivs">
                <h3>Индивидуальные значения (IVs)</h3>
                <div className="ivs-compact">
                  {pokemon?.ivs ? formatIVs(pokemon.ivs) : 'Нет данных'}
                </div>
              </div>
            </div>
          </div>

          <div className="game-actions">
            <h3>Действия</h3>
            <div className="action-buttons">
              <button className="action-button explore">Исследовать</button>
              <button className="action-button train">Тренировать</button>
              <button className="action-button battle">Сражаться</button>
              <button className="action-button catch">Поймать покемона</button>
              <button className="action-button shop">Магазин</button>
            </div>

            <div className="player-progress">
              <h3>Прогресс</h3>
              <p>Опыт покемона: {pokemon?.experience || 0}/{(pokemon?.level || 1) * 100}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${calculateExpPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="game-footer">
        <p>Tamion © 2025 - Мир покемонов ждет тебя!</p>
      </footer>
    </div>
  );
};

export default GamePage;
