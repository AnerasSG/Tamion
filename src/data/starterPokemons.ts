    // Определение интерфейса для покемона
    export interface StarterPokemon {
        id: number;
        name: string;
        type: string[];
        description: string;
        baseStats: {
            hp: number;
            attack: number;
            defense: number;
            specialAttack: number;
            specialDefense: number;
            speed: number;
        };
        imageUrl?: string;
    }

    export const STARTER_POKEMONS: StarterPokemon[] = [
        {
            id: 1,
            name: 'Bulbasaur',
            type: ['Grass', 'Poison'],
            description: 'Травяной покемон с бутоном на спине. Любит тихие и спокойные места.',
            baseStats: {
                hp: 45,
                attack: 49,
                defense: 49,
                specialAttack: 65,
                specialDefense: 65,
                speed: 45
            },
            imageUrl: '/images/bulbasaur.png'
        },
        {
            id: 4,
            name: 'Чармандер',
            type: ['Fire'],
            description: 'Огненный покемон с горящим хвостом. Полный энергии и страсти.',
            baseStats: {
                hp: 39,
                attack: 52,
                defense: 43,
                specialAttack: 60,
                specialDefense: 50,
                speed: 65
            },
            imageUrl: '/images/charmander.png'
        },
        {
            id: 7,
            name: 'Сквиртл',
            type: ['Water'],
            description: 'Водный покемон с твердым панцирем. Любит играть в воде.',
            baseStats: {
                hp: 44,
                attack: 48,
                defense: 65,
                specialAttack: 50,
                specialDefense: 64,
                speed: 43
            },
            imageUrl: '/images/squirtle.png'
        },
        {
            id: 152,
            name: 'Чикорита',
            type: ['Grass'],
            description: 'Залупа ебаная, просто мусор, выкинь нахуй',
            baseStats: {
                hp: 45,
                attack: 49,
                defense: 65,
                specialAttack: 49,
                specialDefense: 65,
                speed: 45
            },
            imageUrl: '/images/chikorita.png'
        },

        {
            id: 155,
            name: 'Синдаквил',
            type: ['Fire'],
            description: 'Юра с Арсеном рекомендуют.',
            baseStats: {
                hp: 39,
                attack: 52,
                defense: 43,
                specialAttack: 60,
                specialDefense: 50,
                speed: 65
            },
            imageUrl: '/images/cyndaquil.png'
        },

        {
            id: 158,
            name: 'Тотодайл',
            type: ['Water'],
            description: 'Я кродил, крокожу и буду крокодить',
            baseStats: {
                hp: 50,
                attack: 65,
                defense: 64,
                specialAttack: 44,
                specialDefense: 48,
                speed: 43
            },
            imageUrl: '/images/totodile.png'
        },
        {
            id: 252,
            name: 'Трикко',
            type: ['Grass'],
            description: 'Станет карманным Септайлом и будет диктовать ходы на туры',
            baseStats: {
                hp: 40,
                attack: 45,
                defense: 35,
                specialAttack: 65,
                specialDefense: 55,
                speed: 70
            },
            imageUrl: '/images/treecko.png'
        },

        {
            id: 255,
            name: 'Торчик',
            type: ['Fire'],
            description: 'Петух на спидах.',
            baseStats: {
                hp: 45,
                attack: 60,
                defense: 40,
                specialAttack: 70,
                specialDefense: 50,
                speed: 45
            },
            imageUrl: '/images/torchic.png'
        },

        {
            id: 258,
            name: 'Мадкип',
            type: ['Water'],
            description: 'Ну типа жаба',
            baseStats: {
                hp: 50,
                attack: 70,
                defense: 50,
                specialAttack: 50,
                specialDefense: 50,
                speed: 40
            },
            imageUrl: '/images/mudkip.png'
        },
        {
            id: 387,
            name: 'Тортвиг',
            type: ['Grass'],
            description: 'Ну типа черепашка, но не ниндзя',
            baseStats: {
                hp: 55,
                attack: 68,
                defense: 64,
                specialAttack: 45,
                specialDefense: 55,
                speed: 31
            },
            imageUrl: '/images/turtwig.png'
        },

        {
            id: 390,
            name: 'Чимчар',
            type: ['Fire'],
            description: 'Приколдесный бибизянус.',
            baseStats: {
                hp: 44,
                attack: 58,
                defense: 44,
                specialAttack: 58,
                specialDefense: 44,
                speed: 61
            },
            imageUrl: '/images/chimchar.png'
        },

        {
            id: 393,
            name: 'Пиплап',
            type: ['Water'],
            description: 'Ну типа пингвинчекс, но не из Мадагаскара',
            baseStats: {
                hp: 53,
                attack: 51,
                defense: 53,
                specialAttack: 61,
                specialDefense: 56,
                speed: 40
            },
            imageUrl: '/images/piplup.png'
        },
        {
            id: 495,
            name: 'Snivy',
            type: ['Grass'],
            description: 'Змей, но душить не желательно.',
            baseStats: {
                hp: 45,
                attack: 45,
                defense: 55,
                specialAttack: 45,
                specialDefense: 55,
                speed: 63
            },
            imageUrl: '/images/snivy.png'
        },

        {
            id: 498,
            name: 'Tepig',
            type: ['Fire'],
            description: 'Отжаренная Свинка Пеппа.',
            baseStats: {
                hp: 44,
                attack: 58,
                defense: 44,
                specialAttack: 58,
                specialDefense: 44,
                speed: 61
            },
            imageUrl: '/images/tepig.png'
        },

        {
            id: 501,
            name: 'Oshawott',
            type: ['Water'],
            description: 'Да хуй знает кто он такой.',
            baseStats: {
                hp: 55,
                attack: 55,
                defense: 45,
                specialAttack: 63,
                specialDefense: 45,
                speed: 45
            },
            imageUrl: '/images/oshawott.png'
        },
        {
            id: 650,
            name: 'Chespin',
            type: ['Grass'],
            description: 'Вроде бибизян, а вроде и нет.',
            baseStats: {
                hp: 56,
                attack: 61,
                defense: 65,
                specialAttack: 48,
                specialDefense: 45,
                speed: 38
            },
            imageUrl: '/images/chespin.png'
        },

        {
            id: 653,
            name: 'Fennekin',
            type: ['Fire'],
            description: 'Ничего не придумал, просто лисица.',
            baseStats: {
                hp: 40,
                attack: 45,
                defense: 40,
                specialAttack: 62,
                specialDefense: 60,
                speed: 60
            },
            imageUrl: '/images/fennekin.png'
        },

        {
            id: 656,
            name: 'Froakie',
            type: ['Water'],
            description: 'Водний жабий.',
            baseStats: {
                hp: 41,
                attack: 56,
                defense: 40,
                specialAttack: 62,
                specialDefense: 44,
                speed: 71
            },
            imageUrl: '/images/froakie.png'
        },
        {
            id: 722,
            name: 'Rowlet',
            type: ['Grass'],
            description: 'Травяной птиц, он же сов.',
            baseStats: {
                hp: 68,
                attack: 55,
                defense: 55,
                specialAttack: 50,
                specialDefense: 50,
                speed: 42
            },
            imageUrl: '/images/rowlet.png'
        },

        {
            id: 725,
            name: 'Litten',
            type: ['Fire'],
            description: 'Котейка огонь, мечтает стать борцуном.',
            baseStats: {
                hp: 45,
                attack: 65,
                defense: 40,
                specialAttack: 60,
                specialDefense: 40,
                speed: 70
            },
            imageUrl: '/images/litten.png'
        },

        {
            id: 728,
            name: 'Popplio',
            type: ['Water'],
            description: 'Тюленчекс.',
            baseStats: {
                hp: 50,
                attack: 54,
                defense: 54,
                specialAttack: 66,
                specialDefense: 56,
                speed: 40
            },
            imageUrl: '/images/popplio.png'
        },
        {
            id: 810,
            name: 'Grookey',
            type: ['Grass'],
            description: 'Лютый травяной бибизян, все бибизяны мечтають стать таким.',
            baseStats: {
                hp: 50,
                attack: 65,
                defense: 50,
                specialAttack: 40,
                specialDefense: 40,
                speed: 65
            },
            imageUrl: '/images/grookey.png'
        },

        {
            id: 813,
            name: 'Scorbunny',
            type: ['Fire'],
            description: 'Кроль на спидах.',
            baseStats: {
                hp: 50,
                attack: 71,
                defense: 40,
                specialAttack: 40,
                specialDefense: 40,
                speed: 69
            },
            imageUrl: '/images/scorbunny.png'
        },

        {
            id: 816,
            name: 'Sobble',
            type: ['Water'],
            description: 'Жидкий ящер.',
            baseStats: {
                hp: 50,
                attack: 40,
                defense: 40,
                specialAttack: 70,
                specialDefense: 40,
                speed: 70
            },
            imageUrl: '/images/sobble.png'
        },

        {
            id: 906,
            name: 'Sprigatito',
            type: ['Grass'],
            description: 'Кот, практикует фокусы, знает опасный фокус с исчезновением твоей анальной девственности.',
            baseStats: {
                hp: 40,
                attack: 61,
                defense: 54,
                specialAttack: 45,
                specialDefense: 45,
                speed: 65
            },
            imageUrl: '/images/sprigatito.png'
        },

        {
            id: 909,
            name: 'Fuecoco',
            type: ['Fire'],
            description: 'Плотный такой КОК.',
            baseStats: {
                hp: 67,
                attack: 45,
                defense: 59,
                specialAttack: 63,
                specialDefense: 40,
                speed: 36
            },
            imageUrl: '/images/fuecoco.png'
        },

        {
            id: 912,
            name: 'Quaxly',
            type: ['Water'],
            description: 'Мокри птиц, вырастет и сможет кому-то уебать.',
            baseStats: {
                hp: 55,
                attack: 65,
                defense: 45,
                specialAttack: 50,
                specialDefense: 45,
                speed: 50
            },
            imageUrl: '/images/quaxly.png'
        }


    ];
