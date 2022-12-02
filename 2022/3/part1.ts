import { syncReadFile } from './readFile';

const strategyGuide = syncReadFile('./input.txt');

type Round = ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];

enum OpponentChoice {
  A = 'ROCK',
  B = 'PAPER',
  C = 'SCISSORS',
}

enum MyChoice {
  X = 'ROCK',
  Y = 'PAPER',
  Z = 'SCISSORS',
}

enum ShapeValue {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum OutcomeValue {
  LOSS = 0,
  DRAW = 3,
  WIN = 6,
}

function roundStringToRound(roundString: string): Round {
  return [roundString.charAt(0), roundString.charAt(2)] as Round;
}

function roundToChoices(round: Round): [OpponentChoice, MyChoice] {
  return [OpponentChoice[round[0]], MyChoice[round[1]]];
}

function outcome(round: [OpponentChoice, MyChoice]): string {
  const opponentChoice = round[0];
  const myChoice = round[1];

  if (opponentChoice === 'ROCK') return myChoice === 'ROCK' ? 'DRAW' : myChoice === 'PAPER' ? 'WIN' : 'LOSS';
  if (opponentChoice === 'PAPER') return myChoice === 'ROCK' ? 'LOSS' : myChoice === 'PAPER' ? 'DRAW' : 'WIN';
  if (opponentChoice === 'SCISSORS') return myChoice === 'ROCK' ? 'WIN' : myChoice === 'PAPER' ? 'LOSS' : 'DRAW';
  throw new Error('No possible outcome');
}

// function getSingleScore(round) {
//   const outcomeScore = OutcomeValue[outcome(round)];
//   const shapeScore = ShapeValue[round[1]];
//   return outcomeScore + shapeScore;
// }

function getTotalScore() {
  const rounds = strategyGuide.map((roundString) => roundToChoices(roundStringToRound(roundString)));
  return rounds;
  // const score = rounds
  //   .map((round) => getSingleScore(round))
  //   .reduce((finalScore, nextScore) => finalScore + nextScore, 0);
  // return score;
}

console.log('Total score:', getTotalScore());
