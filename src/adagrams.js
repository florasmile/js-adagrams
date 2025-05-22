const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

export const drawLetters = () => {
  // generate a pile of letters
  let letters = []
  Object.entries(LETTER_POOL).forEach(([key, value]) => {
    for (let i = 0; i < value; i++) {
      letters.push(key);
    }
  });

  let hand = [];
  //pick a letter from the pile randomly for 10 times
  for(let i = 0; i < 10; i++) {
    const letter = drawOneLetter(letters);
    hand.push(letter);
  };

  return hand;
};
// helper function: randomly pick one letter from letters pile, return the letter
const drawOneLetter = (letters) => {
    const num = letters.length;
    const index = Math.floor(Math.random()*num)
    //swap with last element in arr to optimize time complexity
    const temp = letters[index];
    letters[index] = letters[num - 1];
    letters[num - 1] = temp;
    return letters.pop();
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  // assume all letters are uppercase
  // check length of input word
  if(input.length > lettersInHand.length) {
    return false;
  };
  // build a dict for letters in hand
  let letterMap = {}
  lettersInHand.forEach((letter) => {
    if (!letterMap[letter]) {
      letterMap[letter] = 0;
    } 
    letterMap[letter]++;
  });
  // loop through input word and check if each letter is in letterMap
  for (const char of input) {
    if (!letterMap[char]) {
      return false;
    }
    letterMap[char]--;
  };
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
