// CHALLENGE 1

function createFunction() {
	function hello() {
    return 'hello';
  }
  return hello
}


// CHALLENGE 2
function createFunctionPrinter(input) {
  function returnInput() {
    return input;
  }
  return returnInput
}


// CHALLENGE 3
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter () {
    counter ++;
    return counter;
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// /*** Uncomment these to check your work! ***/
willCounter();
// 1
willCounter();
// 2
willCounter();
// 3

jasCounter();
// 1
willCounter();
// 4


function addByX(x) {
  function addByParam(param) {
    var result = x + param
    return result;
  }
  return addByParam
}

const addByTwo = addByX(2);
addByTwo(1); // => should return 3
addByTwo(2); // => should return 4
addByTwo(3); // => should return 5

const addByThree = addByX(3);
addByThree(1); // => should return 4
addByThree(2); // => should return 5

const addByFour = addByX(4);
addByFour(4); // => should return 8
addByFour(5); // => should return 9


// CHALLENGE 4
function once(func) {
  let counter = 0;
  let result;
	function output (num) {
	  if(counter === 1) {
      return result;
    } else {
      counter +=1;
      result = func(num);
      return result;
    }
  }
  return output;
}


// function once(func) {
//   let counter = 0;
//   let result;
//   function callCallback(num) {
//     counter++;
//     return counter < 2 ? (result = func(num)) : result;
//   }
//   return callCallback;
// }

// /*** Uncomment these to check your work! ***/
// const addByTwo = addByX(2)

// CHALLENGE 5;
function after(count, func) {
	let counter = 0

	function callback () {
  	counter +=1

    if(counter === count) {
      return func();
    } else {
      return ''
    }
  }
  return callback
}

// CHALLENGE 6
function delay(func, wait) {
  function callback(param) {
  	setTimeout(function(){ func(param) }, wait);
  }
  return callback
}

const callbackFunction = function(param){console.log('callback been called', param)}

const myDelay = delay(callbackFunction, 3000)

myDelay('eggs')

// CHALLENGE 7
function rollCall(names) {
  let counter = 0;
	function callback() {
	  const currentCounterName = names[counter];
    if(counter === names.length) {
      return 'Everyone accounted for'
    } else {
      counter ++
      return currentCounterName;
    }
  }
  return callback
};


// CHALLENGE 8
function saveOutput(func, magicWord) {
  let rule = func
  let previousArguments = {}
	function callback(value){
    if(magicWord === value) {
      return previousArguments;
    } else {
      previousArguments[value] = rule(value)
      return rule(value)
    }
  }
  return callback;
}

// CHALLENGE 9
function cycleIterator(array) {
  let counter = 0
  function callback() {
    if(counter === array.length) {
      counter = 0
    }

    const currentElement = array[counter]
  	counter +=1

    return currentElement
  }

  return callback;
}

// CHALLENGE 10
function defineFirstArg(func, arg) {
	function callback(param) {
    return func(arg, param)
  }
  return callback
}


// CHALLENGE 11
function dateStamp(func) {
  let dateStamp = null

	function callback(args) {
    dateStamp = new Date().toISOString().slice(0,10);
    return {
      date: dateStamp,
      output: func(args)
    }
  }

  return callback;
}

// CHALLENGE 12
function censor() {
  // not complete
  let stringPair = {
    stringOne: null,
  	stringTwo: null
  }

	function callback(stringOne, stringTwo){
    if(stringTwo) {
      stringOne
    }
  }

  return callback
}

// /*** Uncomment these to check your work! ***/
const changeScene = censor();
changeScene('dogs', 'cats');
changeScene('quick', 'slow');
console.log(changeScene('The quick, brown fox jumps over the lazy dogs.'));
// => should log 'The slow, brown fox jumps over the lazy cats.'


// CHALLENGE 13
function createSecretHolder(secretInput) {
  let secret = secretInput;

  return {
    getSecret: () => {
      return secret;
    },
    setSecret: (newSecretInput) => {
      secret = newSecretInput;
    }
  }
}

// challenge 14

/*
  Write a function, callTimes, that returns a new function.
  The new function should return the number of times it’s been called.
*/

function callTimes() {
  let callTimesValue = 0;
  function callback() {
    callTimesValue += 1;
    return callTimesValue;
  }
  return callback
}

// challenge 15

  /* Create a function russianRoulette that accepts a number (let us call it n), and returns a function.
    The returned function will take no arguments, and will return the string 'click' the first n - 1 number of times
    it is invoked. On the very next invocation (the nth invocation),
    the returned function will return the string 'bang'. On every invocation after that,
    the returned function returns the string 'reload to play again'. */

function russianRoulette(n) {
  let numberOfTimesFired = 0;
  let personIsDead = false;
  function callback () {
    numberOfTimesFired +=1;

    if(personIsDead) {
      return 'reload to play again'
    }

    if(numberOfTimesFired > n -1) {
      personIsDead = true;
      return 'BANG'
    }

    return 'Click';
  }
  return callback
}

  /* Create a function makeFuncTester that accepts an array (of two-element sub-arrays), and
    returns a function (that will accept a callback).
    The returned function should return true if the first elements (of each sub-array)
    being passed into the callback all yield the corresponding second elements (of the same sub-array).
    Otherwise, the returned function should return false. */

function makeFuncTester(capLastTestCasesArr) {
  const arr1 = capLastTestCasesArr[0][0]
  const arr2 = capLastTestCasesArr[0][1]
  // somehow run the function passed in, then return the expected out come
  function callback(ruleFunction) {

	// Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
      const elementOneWithRule = ruleFunction(arr1[i]);
      const elementTwoWithRule = ruleFunction(arr2[i]);
      if (elementOneWithRule !== elementTwoWithRule) return false;
    }

    // Otherwise, return true
    return true;
  }
  return callback;
}

// const capLastTestCases = [];
// capLastTestCases.push(['hello', 'hellO']);
// capLastTestCases.push(['goodbye', 'goodbyE']);
// capLastTestCases.push(['howdy', 'howdY']);
// const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
// const capLastAttempt1 = str => str.toUpperCase();
// const capLastAttempt2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase();

function makeHistory(count) {
  const historyCount = count
  const historyActions = [];
  function callback(action) {
    if(historyActions.length > historyCount) {
      historyActions.shift();
    }
    if(action === 'undo') {
      // undo the last array
      if(!historyActions.length) {
        return 'nothing to undo';
      };
      const itemToUndo = historyActions[historyActions.length - 1];
      historyActions.pop();
      return `${itemToUndo} undone`;
    } else {
      historyActions.push(action);
      return `${action} done`
    }
  }
  return callback;
}

function blackJack(array) {
  let blackJackDealerCount = 0;
  let result = 0;

  function dealer(num1, num2) {
    let playerCalls = 0;
    let playerBust = false;

    function player () {
      if(playerBust) {
        return 'you are done!'
      }

      if(playerCalls === 0) {
        playerCalls +=1;
        result = num1 + num2;
        return result;
      }

      result = result + array[blackJackDealerCount];

      if(result > 21) {
        playerBust = true;
        return 'Bust'
      } else {
        blackJackDealerCount += 1;
        return result;
      }
    }

    return player;
  }
  return dealer;
}
export { createFunction, createSecretHolder, callTimes, russianRoulette, makeFuncTester, makeHistory, blackJack,  createFunctionPrinter, outer, once, rollCall, saveOutput, cycleIterator, defineFirstArg, dateStamp, after, addByX};
