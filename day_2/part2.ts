import * as fs from 'fs';
import * as path from 'path';

type Cubes = {
  red: number,
  green: number,
  blue: number,
}

const filePath = path.join(__dirname, './input.txt')
const allGames = fs.readFileSync(filePath, { encoding: 'utf-8' });

function generatePower(allGames: string) {

  let powerSum = 0;

  const gamesArr = allGames.split('\n');

  gamesArr.forEach((game) => {

  const smallestCubeCount: Cubes = {
    red: 0,
    green: 0,
    blue: 0,
  }

    const gameResults = game.split(':')[1];
    const sanitizedGameResults = gameResults.replace(/;/g, ',');
    const resultsArr = sanitizedGameResults.split(',');
    for (let i = 0; i < resultsArr.length; i++) {
      const colorCube = resultsArr[i];
      const sanitizedColorCube = colorCube.trim();
      const [strCount, strColor] = sanitizedColorCube.split(' ');
      const count = Number(strCount);
      const color = strColor.toLowerCase() as keyof Cubes;
      if(count > smallestCubeCount[color]) {
        smallestCubeCount[color] = count;
      }
    }
    const power = Object.values(smallestCubeCount).reduce((acc, curr) => {

      return acc * curr;
    })
    powerSum+= power;
  })
  

  return powerSum;
}
// Game 1: 1 green, 2 blue; 15 blue, 12 red, 2 green; 4 red, 6 blue; 10 blue, 8 red; 3 red, 12 blue; 1 green, 12 red, 8 blue;
// Game 2: 5 green, 2 red, 18 blue; 18 blue, 6 red, 9 green; 6 blue, 3 green; 6 green, 1 red, 9 blue; 19 blue, 2 green, 6 red
// Game 3: 16 red, 10 green; 12 red, 6 blue, 9 green; 10 green, 5 blue; 10 green, 16 red; 5 red, 8 green, 8 blue
// Game 4: 9 blue, 20 green; 1 red, 3 blue, 10 green; 7 blue, 18 green; 4 blue, 20 green; 8 blue, 1 green, 1 red; 1 green
// Game 5: 3 green, 8 red; 1 blue, 10 red; 6 red, 4 green; 8 red, 1 blue, 3 green; 1 blue, 4 green, 3 red; 1 green, 1 blue, 4 red
console.log('result', generatePower(allGames))
