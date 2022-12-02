import { syncReadFile } from './readFile.mjs';

const strategyGuide = syncReadFile('./input.txt');

const OpponentChoice = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
};

const RequiredOutcome = {
  X: 'LOSS',
  Y: 'DRAW',
  Z: 'WIN',
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
  return [OpponentChoice[round[0]], RequiredOutcome[round[1]]];
}

function myChoice(round) {
  const opponentChoice = round[0];
  const outcome = round[1];

  if (opponentChoice === 'ROCK') return outcome === 'LOSS' ? 'SCISSORS' : outcome === 'DRAW' ? 'ROCK' : 'PAPER';
  if (opponentChoice === 'PAPER') return outcome === 'LOSS' ? 'ROCK' : outcome === 'DRAW' ? 'PAPER' : 'SCISSORS';
  if (opponentChoice === 'SCISSORS') return outcome === 'LOSS' ? 'PAPER' : outcome === 'DRAW' ? 'SCISSORS' : 'ROCK';
}

function getSingleScore(round) {
  const outcomeScore = OutcomeValue[round[1]];
  const shapeScore = ShapeValue[myChoice(round)];
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
