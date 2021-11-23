"use strict"

// define gameboard in array inside object
const gameBoard = (() => {
    const _board = ['','','',
                    '','','',
                    '','',''];
    //get space
    const getSpace = (location) => {
        if (location >= 0 && location < _board.length) {
            return _board[location];
        }
    };

    //set space
    const setSpace = (token, location) => {
        if (location >= 0 && location < _board.length) {
            _board[location] = token;
        }
    };

    //reset board
    const reset = () => {
        _board = ['','','',
                  '','','',
                  '','',''];
    }

    return {
        getSpace, 
        setSpace, 
        reset,
    };
})();


// define player objects
const Player = (token) => {
    this.token = token;

    //get token
    getToken = () => {
        return token;
    };

    return {getToken};
}

// define gameflow object

// define display function