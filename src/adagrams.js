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

const LETTER_VALUE = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
  I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
  Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
  Y: 4, Z: 10
};

//TC: O(n) n: total number of letters in the pile; 
//SC: O(n)
export const drawLetters = () => {
  // generate a pile of letters from letter_pool
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
// helper func: randomly pick one letter from letters pile, return the letter
//TC: O(1); SC: O(1)
const drawOneLetter = (letters) => {
    const num = letters.length;
    const index = Math.floor(Math.random()*num) //random num from [0, num-1]
    //swap with last element in arr and then pop from end of arr
    const temp = letters[index];
    letters[index] = letters[num - 1];
    letters[num - 1] = temp;
    return letters.pop();
};
//m is the size of letterInHand
// TC: O(m) or O(1): all input have a length of 10 or smaller, two loops have a TC of O(10) which can also be considered as constant.
//SC: O(m) or O(1): letterMap has a size of 10 or smaller;
export const usesAvailableLetters = (input, lettersInHand) => {
  // assume all letters are uppercase
  // check length of input word
  if(input.length > lettersInHand.length) {
    return false;
  };
  // build a dict for letters in hand
  const letterMap = {}
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

//TC: O(m): m is the length of word (it is <= 10), so we can also say TC is O(1) given m is really small; 
//SC: O(1)
export const scoreWord = (word) => {
  //define LETTER_VALUE as a global variable (top of file)
  // iterate through word to add up all values
  let score = 0;
  for (const char of word.toUpperCase()) {
    score += LETTER_VALUE[char];
  };
  // add addiontional 8 points for length 7, 8, 9, 10
  if (word.length >= 7) {
    score += 8;
  };
  return score;
};

//TC: O(k): k is the number of words in the words list;
//SC: O(k): worst case if all words are tie;
export const highestScoreFrom = (words) => {
  //build a word-score map
  const scores = buildScoresMap(words);
  //get topScore
  const topScore = getTopScore(scores);  
  //iterate through the key-value pairs to get the all words with highest score, add to an array
  let topWords = [];
  Object.entries(scores).forEach(([word, score]) => {
    if (score === topScore) {
      topWords.push(word);
    }
  });
  //get topWord using helper
  const topWord = findTopWord(topWords);
  
  return {
    'word': topWord,
    'score': topScore
  };  
};

//helper func:get score for each word and store word: score as key-value pairs in an object
const buildScoresMap = (words) => {
  const scores = {};
  words.forEach((word) => {
    scores[word] = scoreWord(word);
  });
  return scores;
}

//helper func: get topScore
const getTopScore= (scores) => {
  let topScore = 0;
  Object.values(scores).forEach((score) => {
    if (score > topScore) {
      topScore = score;
    };    
  });
  return topScore;
}
// helper func: find topWord from a list of topWords
//iterate array, check if word.length == 10, if yes, return; if not, compare with min_length; return word with min length;
const findTopWord = (topWords) => {
  let topWord = topWords[0];

  for (const word of topWords) {
    if (word.length === 10) {
      return word;
    };
    if (word.length < topWord.length) {
      topWord = word;
    };
  };
  return topWord;
};
