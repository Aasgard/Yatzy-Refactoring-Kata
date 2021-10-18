import * as _ from "lodash";

export default class Yatzy {
  private dice: number[];

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.dice = [d1, d2, d3, d4, d5];
  }

  static chance(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return _.sum([d1, d2, d3, d4, d5])
  }

  static computeUniques(dices: number[], searchedNumber: number): number {
    return dices.filter(dice => dice === searchedNumber).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

  static ones(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return this.computeUniques([d1, d2, d3, d4, d5], 1)
  }

  static twos(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return this.computeUniques([d1, d2, d3, d4, d5], 2)
  }

  static threes(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return this.computeUniques([d1, d2, d3, d4, d5], 3)
  }

  fours(): number {
    return Yatzy.computeUniques(this.dice, 4)
  }

  fives(): number {
    return Yatzy.computeUniques(this.dice, 5)
  }

  sixes(): number {
    return Yatzy.computeUniques(this.dice, 6)
  }

  static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const dices = [d1, d2, d3, d4, d5];
    return (new Set(dices).size === 5 && dices.includes(1)) ? 15 : 0;
  }

  static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const dices = [d1, d2, d3, d4, d5];
    return (new Set(dices).size === 5 && dices.includes(6)) ? 20 : 0;
  }

  static yatzy(...args: number[]): number {
    return new Set([...args]).size === 1 ? 50 : 0
  }

  static diceObjRepresentation(dice: number[]): {[key: string]: number} {
    let diceObj: {[key: string]: number} = {};
    dice.forEach(function (dice) {
      diceObj[dice] = (diceObj[dice] ? diceObj[dice] : 0) + 1;
    });
    return diceObj;
  }

  static diceArrayRepresentation(dice: number[]) {
    const diceObj: {[key: string]: number } = this.diceObjRepresentation(dice)
    let arr: number[] = new Array(6).fill(0)
    Object.keys(diceObj).forEach(item => {
      if (diceObj[item] === 2 || diceObj[item] === 3) {
        arr[+item - 1] = diceObj[item] * (+item)
      }
    })
    return arr;
  }

  static score_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return Math.max.apply(Math, this.diceArrayRepresentation([d1, d2, d3, d4, d5]))
  }

  static four_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const obj = this.diceObjRepresentation([d1, d2, d3, d4, d5])
    const search = Object.keys(obj).find(item => obj[item] >= 4);
    return search ? +search * 4 : 0
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const obj = this.diceObjRepresentation([d1, d2, d3, d4, d5])
    const search = Object.keys(obj).find(item => obj[item] >= 3);
    return search ? +search * 3 : 0
  }

  static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return this.three_of_a_kind(d1, d2, d3, d4, d5) + this.score_pair(d1, d2, d3, d4, d5)
  }






  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1 - 1]++;
    counts[d2 - 1]++;
    counts[d3 - 1]++;
    counts[d4 - 1]++;
    counts[d5 - 1]++;
    var n = 0;
    var score = 0;
    for (let i = 0; i < 6; i += 1)
      if (counts[6 - i - 1] >= 2) {
        n++;
        score += 6 - i;
      }
    if (n == 2) return score * 2;
    else return 0;
  }
}
