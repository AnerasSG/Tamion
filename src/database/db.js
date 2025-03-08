const { Sequelize, DataTypes } = require('sequelize');

// Создаем подключение к базе данных MySQL
const sequelize = new Sequelize('tamion', 'root', '', {
 host: 'localhost',
 dialect: 'mysql',
});

// Проверка подключения
sequelize.authenticate()
 .then(() => {
   console.log('Connection to the database successful.');
 })
 .catch((err) => {
   console.error('Unable to connect to the database:', err);
 });

// Определение модели для игроков (Player)
const Player = sequelize.define('Player', {
 id: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true,
 },
 nickname: {
   type: DataTypes.STRING,
   allowNull: false,
   unique: true,
 },
 email: {
   type: DataTypes.STRING,
   allowNull: false,
   unique: true,
 },
 password: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 createdAt: {
   type: DataTypes.DATE,
   defaultValue: DataTypes.NOW,
 },
});

// Определение модели для покемонов (Pokemon)
const Pokemon = sequelize.define('Pokemon', {
 id: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true,
 },
 ownerId: {
   type: DataTypes.UUID,
   allowNull: false,
   references: {
     model: 'Players',
     key: 'id',
   },
 },
 name: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 num: {
   type: DataTypes.INTEGER,
   allowNull: false,
 },
 level: {
   type: DataTypes.INTEGER,
   defaultValue: 5,
 },
 experience: {
   type: DataTypes.INTEGER,
   defaultValue: 0,
 },
 stats: {
   type: DataTypes.JSON,
   allowNull: false,
 },
 ivs: {
   type: DataTypes.JSON,
   allowNull: false,
   defaultValue: {
     hp: 36,
     atk: 36,
     def: 36,
     spa: 36,
     spd: 36,
     spe: 36
   }
 },
 types: {
   type: DataTypes.JSON,
   allowNull: false,
 },
 abilities: {
   type: DataTypes.JSON,
   allowNull: false,
 },
 moves: {
   type: DataTypes.JSON,
   defaultValue: []
 },
 movesToLearn: {
   type: DataTypes.JSON,
   defaultValue: []
 },
 ability: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 nature: {
   type: DataTypes.JSON,
   allowNull: false,
 },
 inTeam: {
   type: DataTypes.BOOLEAN,
   defaultValue: false,
 },
 createdAt: {
   type: DataTypes.DATE,
   defaultValue: DataTypes.NOW,
 },
});

// Функция для синхронизации базы данных
const initDb = async () => {
 try {
   await sequelize.sync({ force: false });
   console.log('Database synchronized');
 } catch (error) {
   console.error('Error syncing database:', error);
 }
};

module.exports = {
 sequelize,
 Player,
 Pokemon,
 initDb
};
