const gen = require('@faker-js/faker');
const fs = require("fs");

const faker = gen.faker;

faker.locale = 'ru';

let arrUser = [];

for(let i = 0; i < 10; i++) {
    arrUser[i] = {
        id: i,
        name: faker.music.songName(),
        author: faker.name.fullName(),
        year: faker.date.past().getFullYear(),
        tags: faker.word.adjective(4),
        promiser: faker.name.fullName(),
        dateTook: faker.date.past().toLocaleDateString('ru-RU'),
        dateReturn: faker.date.future().toLocaleDateString('ru-RU')
    }    
}

// console.log(arrUser)
fs.writeFileSync('db.json', JSON.stringify(arrUser));
