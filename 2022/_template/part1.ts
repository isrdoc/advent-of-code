import { syncReadFile } from '../../utils/readFile';

const input: string[] = syncReadFile('./input.txt');

function getResult() {
  return input;
}

console.log('Result: ', getResult());
