import sinon from 'sinon';
import {
  createFunction,
  createSecretHolder,
  callTimes,
  russianRoulette,
  makeFuncTester,
  makeHistory,
  blackJack,
  createFunctionPrinter,
  outer,
  once,
  rollCall,
  saveOutput,
  cycleIterator,
  defineFirstArg,
  dateStamp,
  after,
  addByX
} from './closure';


describe('Closure tests', () => {
  let clock;
  beforeAll(() => {
    clock = sinon.useFakeTimers(new Date('2019-02-21'));
  });
  afterAll(() => {
    clock.restore();
  });
  describe('Challenge 1', () => {
    const function1 = createFunction();
    expect(function1()).toBe('hello');
  })

  describe('Challenge 2', () => {
    /* Create a function createFunctionPrinter that accepts one input and returns a function.
      When that created function is called,
      it should print out the input that was used when the function was created.
     */
    const printSample = createFunctionPrinter('sample');
    expect(printSample()).toBe('sample')
  })

  describe('Challenge 3', () => {
    const willCounter = outer();
    const jasCounter = outer();
    expect(willCounter()).toEqual(1);
    expect(willCounter()).toEqual(2);
    expect(willCounter()).toEqual(3);
    expect(jasCounter()).toEqual(1);
    expect(willCounter()).toEqual(4);
  });

  describe('Challenge 4 - Once', () => {
    /* Write a function once that accepts a callback as input and returns a function.
      When the returned function is called the first time, it should call the callback and return that output.
      If it is called any additional times,
      instead of calling the callback again it will simply return the output value from the first time it was called. */
    const addByTwo = addByX(2);
    const onceFunc = once(addByTwo);
    // console.log(onceFunc(4));  // => should log 6
    // console.log(onceFunc(10));  // => should log 6
    it('expect function to be only be called once', () => {
      expect(onceFunc(4)).toBe(6);
      expect(onceFunc(10)).toBe(6);
    });
  });

  describe('Challenge 5 - after', () => {
    /* Write a function after that takes the number of times the callback needs to be called
      before being executed as the first parameter and the callback as the second parameter.
    */
    const called = function() { return 'hello' };
    const afterCalled = after(3, called);
    // afterCalled(); // => nothing is printed
    // afterCalled(); // => nothing is printed
    // afterCalled(); // => 'hello' is printed
    it('should return null when executime time is below the limit', () => {
      expect(afterCalled()).toBe('');
      expect(afterCalled()).toBe('');
    });
    it('should return the expected out put above when number of expected times has been reached', () => {
      expect(afterCalled()).toBe('hello');
    });
  });

  describe('Challenge 7, rollCaller', () => {
    /* Write a function rollCall that accepts an array of names and returns a function.
    The first time the returned function is invoked, it should log the first name to the console.
    The second time it is invoked, it should log the second name to the console, and so on, until all names have been called.
    Once all names have been called, it should log 'Everyone accounted for'.
     */
    const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth']);
    expect(rollCaller()).toBe('Victoria'); // => should log 'Victoria'
    expect(rollCaller()).toBe('Juan'); // => should log 'Juan'
    expect(rollCaller()).toBe('Ruth'); // => should log 'Ruth'
    expect(rollCaller()).toBe('Everyone accounted for'); // => should log 'Everyone accounted for'
  });

  describe('Challenge 8, saveOutput', () => {
    /* Create a function saveOutput that accepts a function (that will accept one argument), and a string (that will act as a password).
      saveOutput will then return a function that behaves exactly like the passed-in function,
      except for when the password string is passed in as an argument.
      When this happens, the returned function will return an object with all previously passed-in arguments as keys, and the corresponding outputs as values.
     */

    const multiplyBy2 = function(num) { return num * 2; };
    const multBy2AndLog = saveOutput(multiplyBy2, 'boo');
    it('should log 4', () => {
      expect(multBy2AndLog(2)).toBe(4);
    });

    it('should log 18', () => {
      expect(multBy2AndLog(9)).toBe(18);
    })

    it('should log the object of previous numbers above when the keyword is passed in', () => {
      expect(multBy2AndLog('boo')).toStrictEqual({ 2: 4, 9: 18 });
    })
  });

  describe('Challenge 9, cycle iterator', () => {
    /*
      Create a function cycleIterator that accepts an array, and returns a function. The returned function will accept zero arguments.
       When first invoked, the returned function will return the first element of the array.
       When invoked a second time, the returned function will return the second element of the array, and so forth.
       After returning the last element of the array, the next invocation will return the first element of the array again, and continue on with the second after that, and so forth.
    */
    const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
    const getDay = cycleIterator(threeDayWeekend);
    it('should Log Fri', () => {
      expect(getDay()).toBe('Fri')
    })
    it('should Log Sat', () => {
      expect(getDay()).toBe('Sat')
    })
    it('should Log Sun', () => {
      expect(getDay()).toBe('Sun')
    })
    it('should Log Fri after the rest has been done', () => {
      expect(getDay()).toBe('Fri')
    })
  })


  describe('Challenge 10 - define first arg', () => {
    /* Create a function defineFirstArg that accepts a function and an argument.
      Also, the function being passed in will accept at least one argument.
      DefineFirstArg will return a new function that invokes the passed-in function with the passed-in argument as the passed-in function's first argument.
      Additional arguments needed by the passed-in function will need to be passed into the returned function.
     */
    const subtract = function(big, small) { return big - small; };
    const subFrom20 = defineFirstArg(subtract, 20);
    it('should return 15', () => {
      expect(subFrom20(5)).toBe(15)
    });

  });
  /* Mock the date */
  describe('Challenge 11 - DateStamp', () => {
   /* Create a function dateStamp that accepts a function and returns a function.
      The returned function will accept however many arguments the passed-in function accepts,
      and return an object with a date key that contains a timestamp with the time of invocation,
      and an output key that contains the result from invoking the passed-in function.
      HINT: You may need to research how to access information on Date objects.
     */
    const stampedMultBy2 = dateStamp(n => n * 2);
    it('should log todays day and the output of the function', () => {
      expect(stampedMultBy2(4)).toEqual({"date": "2019-02-21", "output": 8});
    })

    it('should log todays day and output of the function', () => {
      expect(stampedMultBy2(6)).toEqual({"date": "2019-02-21", "output": 12});
    });
  });

  describe('Challenge 13 - createSecretHolder', () => {
    /* There's no such thing as private properties on a JavaScript object! But, maybe there are?
      Implement a function createSecretHolder(secret) which accepts any value as secret and returns an object with ONLY two methods.
      getSecret() which returns the secret setSecret() which sets the secret
     */
    const obj = createSecretHolder(5);
    test('createSecretHolder sets and returns a secruit', () => {
      // returns 5
      expect(obj.getSecret()).toBe(5)
    })
    test('will set a secret', () => {
      obj.setSecret(2)
      expect(obj.getSecret()).toBe(2);
    })
  })


  describe('Challenge 15', () => {
    /*
      Write a function, callTimes, that returns a new function.
      The new function should return the number of times it’s been called.
    */

    /* let myNewFunc1 = callTimes();
       let myNewFunc2 = callTimes();
       myNewFunc1(); // => 1
       myNewFunc1(); // => 2
       myNewFunc2(); // => 1
       myNewFunc2(); // => 2
    */
    let myNewFunc1 = callTimes();
    let myNewFunc2 = callTimes();
    test('myNewFunc1 should return 1', () => {
      expect(myNewFunc1()).toBe(1)
    });

    test('myNewFunc1 should return 2', () => {
      expect(myNewFunc1()).toBe(2)
    });

    test('myNewFunc2 should return 1', () => {
      expect(myNewFunc2()).toBe(1)
    });

    test('myNewFunc2 should return 2', () => {
      expect(myNewFunc2()).toBe(2)
    })
  });

  describe('Challenge 16 russianRoulette', () => {
    /* Create a function russianRoulette that accepts a number (let us call it n), and returns a function.
      The returned function will take no arguments, and will return the string 'click' the first n - 1 number of times
      it is invoked. On the very next invocation (the nth invocation),
      the returned function will return the string 'bang'. On every invocation after that,
      the returned function returns the string 'reload to play again'. */
    // const play = russianRoulette(3);
    // console.log(play()); // => should log 'click'
    // console.log(play()); // => should log 'click'
    // console.log(play()); // => should log 'bang'
    // console.log(play()); // => should log 'reload to play again'
    // console.log(play()); // => should log 'reload to play again'
    const play = russianRoulette(3);
    it('should return click the first time', () => {
      expect(play()).toBe('Click')
    })

    it('should return click the second time', () => {
      expect(play()).toBe('Click')
    })

    it('should return BANG the third time', () => {
      expect(play()).toBe('BANG')
    })
    it('should return reload to play again any time after that', () => {
      expect(play()).toBe('reload to play again')
    })
  })

  describe('Challenge 18 makeFuncTester', () => {
    /* Create a function makeFuncTester that accepts an array (of two-element sub-arrays), and
      returns a function (that will accept a callback).
      The returned function should return true if the first elements (of each sub-array)
      being passed into the callback all yield the corresponding second elements (of the same sub-array).
      Otherwise, the returned function should return false. */
    // Incomplete
    const capLastTestCases = [];
    capLastTestCases.push(['hello', 'hellO']);
    capLastTestCases.push(['goodbye', 'goodbyE']);
    capLastTestCases.push(['howdy', 'howdY']);
    const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
    const capLastAttempt1 = str => str.toUpperCase();
    const capLastAttempt2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase();
    it('should return true of the first elements of each sub-array being passed into callback all yeidl corresponding second elements', () => {
      expect(shouldCapitalizeLast(capLastAttempt1)).toBe(true);
    })

    it('should return false if not the above', () => {
      expect(shouldCapitalizeLast(capLastAttempt2)).toBe(true);
    });
  });

  describe('Challenge 19 makeHistory', () => {
    /* Create a function makeHistory that accepts a number (which will serve as a limit), and returns a function (that will accept a string).
     The returned function will save a history of the most recent "limit" number of strings passed into the returned function (one per invocation only).
     Every time a string is passed into the function, the function should return that same string with the word 'done' after it (separated by a space).
     However, if the string 'undo' is passed into the function, then the function should delete the last action saved in the history,
     and return that delted string with the word 'undone' after (separated by a space).
     If 'undo' is passed into the function and the function's history is empty, then the function should return the string 'nothing to undo'.

     */
    const myActions = makeHistory(2);
    it('should return jump done', () => {
      expect(myActions('jump')).toEqual('jump done')
    });

    it('should return jump undone', () => {
      expect(myActions('undo')).toEqual('jump undone')
    });

    it('should return walk done', () => {
      expect(myActions('walk')).toEqual('walk done')
    });

    it('should return code done', () => {
      expect(myActions('code')).toEqual('code done')
    });

    it('should return pose done', () => {
      expect(myActions('pose')).toEqual('pose done')
    });

    it('should return pose undone', () => {
      expect(myActions('undo')).toEqual('pose undone')
    });

    it('should return code undone', () => {
      expect(myActions('undo')).toEqual('code undone')
    });

    it('should return nothing to undo when all all todos have been deleted', () => {
      expect(myActions('undo')).toEqual('nothing to undo')
    });
  });


  describe('Challenge 20 - black jack.', () => {
    // /*** DEALER ***/
    const deal = blackJack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11]);
    const playBlackJack = deal(4, 5);

    describe('Player Function', () => {
      it('The first invovation of playBlackJack will return the two numbers passed aggrevated', () => {
        expect(playBlackJack()).toEqual(9);
      })

      it('the second innvocation will return the above two plus the first number in black jack array', () => {
        expect(playBlackJack()).toEqual(11);
      })

      it('the third invocation will aggreate the result form the second and add the next result in the array to it', () => {
        expect(playBlackJack()).toEqual(17);
      })
      it('And the same with the forth', () => {
        expect(playBlackJack()).toEqual(18);
      })
      it('should return bust when result is 21', () => {
        expect(playBlackJack()).toEqual('Bust');
      })
      it('should return your done!', () => {
        expect(playBlackJack()).toEqual('you are done!');
      })
      it('should return your done!', () => {
        expect(playBlackJack()).toEqual('you are done!');
      })
    });
  });
});

/*
  BONUS: Implement blackjack so the DEALER function can return more
  PLAYER functions that will each continue to take the next number in the array
  after the previous PLAYER function left off
  You will just need to make sure the array has enough numbers for all the PLAYER functions.
 */
