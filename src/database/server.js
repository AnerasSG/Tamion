const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { Player, Pokemon, initDb } = require('./db');
const { createPokemon, getPokemonStarterMoves, getMovesToLearn } = require('../Utils/pokemonUtils');
const Pokedex = require('../data/pokedex');

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON в теле запроса
app.use(express.json());

// Middleware для CORS (позволяет делать запросы с фронтенда)
app.use(cors());

// Инициализация базы данных
initDb().catch(err => console.error('Failed to init DB:', err));

// API endpoint для регистрации игрока
app.post('/api/register', async (req, res) => {
 const { nickname, email, password, confirmPassword } = req.body;

 // Проверка на пустые поля
 if (!nickname || !email || !password || !confirmPassword) {
   return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
 }

 // Проверка, совпадают ли пароли
 if (password !== confirmPassword) {
   return res.status(400).json({ message: 'Пароли не совпадают' });
 }

 try {
   // Проверка, существует ли уже игрок с таким email или никнеймом
   const existingPlayerByEmail = await Player.findOne({ where: { email } });
   if (existingPlayerByEmail) {
     return res.status(400).json({ message: 'Этот email уже зарегистрирован' });
   }

   const existingPlayerByNickname = await Player.findOne({ where: { nickname } });
   if (existingPlayerByNickname) {
     return res.status(400).json({ message: 'Этот никнейм уже занят' });
   }

   // Хеширование пароля
   const hashedPassword = await bcrypt.hash(password, 10);

   // Создание нового игрока в базе данных
   const newPlayer = await Player.create({
     nickname,
     email,
     password: hashedPassword,
   });

   // Ответ после успешной регистрации
   res.status(201).json({
     message: 'Регистрация прошла успешно',
     player: { id: newPlayer.id, nickname: newPlayer.nickname, email: newPlayer.email },
   });
 } catch (error) {
   console.error('Registration error:', error);
   res.status(500).json({ message: 'Внутренняя ошибка сервера' });
 }
});

// API endpoint для входа игрока
app.post('/api/login', async (req, res) => {
 const { email, password } = req.body;

 // Проверка на пустые поля
 if (!email || !password) {
   return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
 }

 try {
   // Поиск игрока по email
   const player = await Player.findOne({ where: { email } });
   if (!player) {
     return res.status(401).json({ message: 'Неверный email или пароль' });
   }

   // Проверка пароля
   const isPasswordValid = await bcrypt.compare(password, player.password);
   if (!isPasswordValid) {
     return res.status(401).json({ message: 'Неверный email или пароль' });
   }

   // Проверка наличия стартового покемона
   const starterPokemon = await Pokemon.findOne({
     where: {
       ownerId: player.id,
       level: 5
     }
   });

   // Ответ после успешного входа
   res.status(200).json({
     message: 'Вход выполнен успешно',
     player: {
       id: player.id,
       nickname: player.nickname,
       email: player.email,
       hasStarterPokemon: !!starterPokemon
     },
   });
 } catch (error) {
   console.error('Login error:', error);
   res.status(500).json({ message: 'Внутренняя ошибка сервера' });
 }
});

// API endpoint для выбора стартового покемона
app.post('/api/choose-starter-pokemon', async (req, res) => {
 const { playerId, pokemonNum } = req.body;

 try {
   // Находим информацию о покемоне в Pokedex
   const pokemonData = Object.values(Pokedex).find(p => p.num === pokemonNum);

   if (!pokemonData) {
     return res.status(400).json({ message: 'Покемон не найден' });
   }

   // Создаем покемона с помощью утилиты
   const pokemonToCreate = createPokemon(pokemonNum, null, null, null, true);

   // Получаем стартовые атаки
   const starterMoves = getPokemonStarterMoves(pokemonData.name.toLowerCase());
   const movesToLearn = getMovesToLearn(pokemonData.name.toLowerCase());

   // Создаем покемона для игрока
   const newPokemon = await Pokemon.create({
     ownerId: playerId,
     name: pokemonData.name,
     num: pokemonNum,
     level: 5,
     experience: 0,
     stats: pokemonToCreate.baseStats,
     ivs: pokemonToCreate.ivs,
     types: pokemonData.types,
     abilities: pokemonData.abilities,
     moves: starterMoves,
     movesToLearn: movesToLearn,
     ability: pokemonToCreate.ability,
     nature: pokemonToCreate.nature,
     inTeam: true
   });

   res.status(201).json({
     message: 'Стартовый покемон выбран',
     pokemon: newPokemon
   });
 } catch (error) {
   console.error('Ошибка при выборе стартового покемона:', error);
   res.status(500).json({ message: 'Внутренняя ошибка сервера' });
 }
});
app.get('/api/pokemon/:playerId', async (req, res) => {
  const { playerId } = req.params;

  try {
    // Ищем покемона, принадлежащего игроку
    const pokemon = await Pokemon.findOne({
      where: {
        ownerId: playerId,
        inTeam: true
      }
    });

    if (!pokemon) {
      return res.status(404).json({ message: 'Покемон не найден' });
    }

    // Возвращаем данные покемона
    res.status(200).json({
      message: 'Покемон найден',
      pokemon: pokemon
    });
  } catch (error) {
    console.error('Ошибка при получении покемона:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// API endpoint для проверки наличия стартового покемона
app.get('/api/check-starter-pokemon/:playerId', async (req, res) => {
  const { playerId } = req.params;

  try {
    // Проверяем, есть ли у игрока покемон
    const pokemon = await Pokemon.findOne({
      where: {
        ownerId: playerId
      }
    });

    res.status(200).json({
      hasStarterPokemon: !!pokemon
    });
  } catch (error) {
    console.error('Ошибка при проверке стартового покемона:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});
// Запуск сервера
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
