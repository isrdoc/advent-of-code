import { syncReadFile } from './readFile';

const rucksacks = syncReadFile('./input1.txt');

const alphabetLowercase = 'abcdefghijklmnopqrstuvwxyz';
const alphabetUppercase = alphabetLowercase.toUpperCase();
const alphabet = alphabetLowercase + alphabetUppercase;

function getPriority(item: string): number {
  return alphabet.indexOf(item) + 1;
}

function findDuplicate(rucksack: string): string {
  const characters: Record<string, boolean> = {};
  for (let i = 0; i < rucksack.length; i++) {
    const nextCharacter = rucksack[i];
    if (i >= rucksack.length / 2 && characters[nextCharacter]) return nextCharacter;
    if (i < rucksack.length / 2) characters[nextCharacter] = true;
  }
  throw new Error(`No duplicate character found ${rucksack}`);
}

function getScore(rucksacks: string[]) {
  return rucksacks
    .map((rucksack) => findDuplicate(rucksack))
    .map((item) => getPriority(item))
    .reduce((sum, priority) => sum + priority, 0);
}

console.log('Score: ', getScore(rucksacks));
