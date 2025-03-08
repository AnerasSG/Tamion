const Pokedex = require('../data/pokedex');
const { PokemonLearnsets, LEARN_METHODS } = require('../data/learnsets');
const { Natures, getRandomNature, calculateNatureMultipliers } = require('../data/natures');

function getRandomAbility(pokemonAbilities) {
 if (Object.keys(pokemonAbilities).length === 1) {
   return Object.values(pokemonAbilities)[0];
 }

 const hiddenAbilityChance = 0.05;

 if (pokemonAbilities.H && Math.random() < hiddenAbilityChance) {
   return pokemonAbilities.H;
 }

 const regularAbilities = Object.keys(pokemonAbilities)
   .filter(key => key !== 'H')
   .map(key => pokemonAbilities[key]);

 return regularAbilities[Math.floor(Math.random() * regularAbilities.length)];
}

function generateRandomIVs(isStarterPokemon = false, minOrRange = null, maxRange = null) {
  if (isStarterPokemon) {
     return {
       hp: 36,
       atk: 36,
       def: 36,
       spa: 36,
       spd: 36,
       spe: 36
     };
   }
 if (minOrRange === null) {
   return {
     hp: Math.floor(Math.random() * 37),
     atk: Math.floor(Math.random() * 37),
     def: Math.floor(Math.random() * 37),
     spa: Math.floor(Math.random() * 37),
     spd: Math.floor(Math.random() * 37),
     spe: Math.floor(Math.random() * 37)
   };
 }

 // Если передан один аргумент - это максимум
 if (maxRange === null) {
   return {
     hp: minOrRange,
     atk: minOrRange,
     def: minOrRange,
     spa: minOrRange,
     spd: minOrRange,
     spe: minOrRange
   };
 }

 // Если переданы два аргумента - диапазон
 return {
   hp: Math.floor(Math.random() * (maxRange - minOrRange + 1)) + minOrRange,
   atk: Math.floor(Math.random() * (maxRange - minOrRange + 1)) + minOrRange,
   def: Math.floor(Math.random() * (maxRange - minOrRange + 1)) + minOrRange,
   spa: Math.floor(Math.random() * (maxRange - minOrRange + 1)) + minOrRange,
   spd: Math.floor(Math.random() * (maxRange - minOrRange + 1)) + minOrRange,
   spe: Math.floor(Math.random() * (maxRange - minOrRange + 1)) + minOrRange
 };
}

function getPokemonStarterMoves(pokemonName, maxLevel = 5) {
  const pokemonData = PokemonLearnsets[pokemonName.toLowerCase()];
  if (!pokemonData) return [];

  const moves = Object.entries(pokemonData.learnset)
      .filter(([move, methods]) => {
        // Проверяем все методы обучения для атаки
        return methods.some(method => {
          // Проверяем на формат "9L1" (поколение + L + уровень)
          if (method.includes('L')) {
            const levelPart = method.split('L')[1]; // Берем часть после "L"
            const level = parseInt(levelPart);
            return level <= maxLevel;
          }
          return false;
        });
      })
      .map(([move]) => move);
      return moves.slice(0, 4);
}

function getMovesToLearn(pokemonName, startLevel = 5) {
 const pokemonData = PokemonLearnsets[pokemonName.toLowerCase()];
 if (!pokemonData) return [];

 return Object.entries(pokemonData.learnset)
   .filter(([move, methods]) =>
     methods.some(method => {
       // Проверяем на формат "9L10" (поколение + L + уровень)
       if (method.includes('L')) {
         const levelPart = method.split('L')[1]; // Берем часть после "L"
         const level = parseInt(levelPart);
         return level > startLevel;
       }
       return false;
     })
   )
   .map(([move, methods]) => {
     // Находим метод с указанием уровня
     const levelMethod = methods.find(method => method.includes('L'));
     const level = parseInt(levelMethod.split('L')[1]);

     return {
       name: move,
       level: level
     };
   })
   .sort((a, b) => a.level - b.level);
}

function createPokemon(
 pokemonNum,
 ability = null,
 nature = null,
 ivs = null,
 isStarterPokemon = null
) {
 // Находим покемона по номеру
 const pokemonData = Object.values(Pokedex).find(p => p.num === pokemonNum);

 if (!pokemonData) {
   throw new Error(`Покемон с номером ${pokemonNum} не найден`);
 }

 // Выбор способности
 const selectedAbility = ability ?? getRandomAbility(pokemonData.abilities);

 // Выбор характера
 const selectedNature = nature ?? getRandomNature();

 // Генерация генов (IVs)
 const selectedIVs = isStarterPokemon
     ? generateRandomIVs(true)
     : (typeof ivs === 'number'
       ? generateRandomIVs(false)
       : (ivs ?? generateRandomIVs(false)));
 // Расчет статов с учетом природы
 const natureMultipliers = calculateNatureMultipliers(selectedNature);

 return {
   ...pokemonData,
   ability: selectedAbility,
   nature: selectedNature,
   ivs: selectedIVs,
   natureMultipliers
 };
}

module.exports = {
 createPokemon,
 getPokemonStarterMoves,
 getMovesToLearn,
 generateRandomIVs,
 getRandomAbility
};
