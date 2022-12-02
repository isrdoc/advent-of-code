import { syncReadFile } from './readFile.mjs';

const strategyGuide = syncReadFile('./input.txt');

const OpponentChoice = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
};

const MyChoice = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS',
};

const ShapeValue = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const OutcomeValue = {
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
};

function roundStringToRound(roundString) {
  return [roundString.charAt(0), roundString.charAt(2)];
}

function roundToChoices(round) {
  return [OpponentChoice[round[0]], MyChoice[round[1]]];
}

function outcome(round) {
  const opponentChoice = round[0];
  const myChoice = round[1];

  if (opponentChoice === 'ROCK') return myChoice === 'ROCK' ? 'DRAW' : myChoice === 'PAPER' ? 'WIN' : 'LOSS';
  if (opponentChoice === 'PAPER') return myChoice === 'ROCK' ? 'LOSS' : myChoice === 'PAPER' ? 'DRAW' : 'WIN';
  if (opponentChoice === 'SCISSORS') return myChoice === 'ROCK' ? 'WIN' : myChoice === 'PAPER' ? 'LOSS' : 'DRAW';
}

function getSingleScore(round) {
  const outcomeScore = OutcomeValue[outcome(round)];
  const shapeScore = ShapeValue[round[1]];
  return outcomeScore + shapeScore;
}

function getTotalScore() {
  const rounds = strategyGuide.map((roundString) => roundToChoices(roundStringToRound(roundString)));
  const score = rounds
    .map((round) => getSingleScore(round))
    .reduce((finalScore, nextScore) => finalScore + nextScore, 0);
  return score;
}

console.log('Total score:', getTotalScore());
