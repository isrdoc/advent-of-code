import { syncReadFile } from '../../utils/readFile';

const input: string[] = syncReadFile('./input.txt');

type Range = {
  low: number;
  high: number;
};

function parsePairs(pairsString: string): [Range, Range] {
  const rangesString: string[] = pairsString.split(',');
  return rangesString.map((rangeString) =>
    rangeString.split('-').reduce(
      (range, number, index) => ({
        ...range,
        low: range.low || (index === 0 && Number(number)),
        high: range.high || (index === 1 && Number(number)),
      }),
      {} as Range
    )
  ) as [Range, Range];
}

function doRangesOverlap(ranges: [Range, Range]): boolean {
  const firstOverlapsSecond = ranges[0].high >= ranges[1].low && ranges[0].low <= ranges[1].high;
  const secondOverlapsFirst = ranges[1].high >= ranges[0].low && ranges[1].low <= ranges[0].high;
  return firstOverlapsSecond || secondOverlapsFirst;
}

function getResult(): any {
  return input
    .map((pairsString) => parsePairs(pairsString))
    .reduce((overlapsCount, ranges) => overlapsCount + (doRangesOverlap(ranges) ? 1 : 0), 0);
}

console.log('Result: ', getResult());
