import { syncReadFile } from './readFile';

const rucksacks = syncReadFile('./input2.txt');

const alphabetLowercase = 'abcdefghijklmnopqrstuvwxyz';
const alphabetUppercase = alphabetLowercase.toUpperCase();
const alphabet = alphabetLowercase + alphabetUppercase;

function getPriority(item: string): number {
  return alphabet.indexOf(item) + 1;
}

function getGroups(rucksacks: string[]): string[][] {
  let elvesInGroup = 0;
  let group: string[] = [];
  return rucksacks.reduce((groups, rucksack) => {
    if (elvesInGroup === 3) {
      elvesInGroup = 0;
      group = [];
    }
    elvesInGroup++;
    group.push(rucksack);
    if (elvesInGroup === 3) groups.push(group);
    return groups;
  }, []);
}

function findDuplicate(group: string[]): string {
  let characters: Record<string, boolean> = {};
  let duplicates: Record<string, boolean> = {};

  for (let g = 0; g < group.length; g++) {
    const rucksack = group[g];

    // Store items from first rucksack
    if (g === 0) {
      for (let i = 0; i < rucksack.length; i++) {
        characters[rucksack[i]] = true;
      }
      continue;
    }

    // Find duplicate character in last group
    if (g === group.length - 1) {
      for (let i = 0; i < rucksack.length; i++) {
        if (characters[rucksack[i]]) return rucksack[i];
      }
      continue;
    }

    // Each group between first and last filters out non-duplicate characters
    for (let i = 0; i < rucksack.length; i++) {
      if (characters[rucksack[i]]) duplicates[rucksack[i]] = true;
    }
    characters = duplicates;
    duplicates = {};
  }

  throw new Error(`No duplicate character found ${group}`);
}

function getScore(rucksacks: string[]) {
  return getGroups(rucksacks)
    .map((group) => findDuplicate(group))
    .map((item) => getPriority(item))
    .reduce((sum, priority) => sum + priority, 0);
}

console.log('Score: ', getScore(rucksacks));
