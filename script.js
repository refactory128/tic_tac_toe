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
        const _board = ['','','',
                    '','','',
                    '','',''];
    };

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
    const getToken = () => {
        return token;
    };

    return {getToken};
}

// define gameflow object
const gameFlow = (() => {
    //define player 1
    const _player1 = Player("X");

    //define player 2
    const _player2 = Player("O");

    let _currentPlayer = _player1;
    let _winner = ""; 
    let _gameComplete = false;

    const _winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]]


    //play 1 game
    const startGame = () => {
        console.log("playGame");
        _winner = ""; 
        _gameComplete = false;
        gameBoard.reset();
        displayController.renderBoard();
        displayController.setMessage(`Player ${getCurrentPlayerToken()}'s Turn`);

    };

    const playTurn = (location) => {
        //put the current players token on the board at the given location
        gameBoard.setSpace(getCurrentPlayerToken(),location);
        displayController.renderBoard();

        //check for winner
        _winner = checkForWinner(); 
        console.log(_winner);
        if (_winner){
            displayController.setMessage(`Player ${_winner} wins!`);

        } else if (catsGame()){
            displayController.setMessage(`Cats Game`);

        } else { // swap players for next turn
            if (_currentPlayer === _player1){
                _currentPlayer = _player2
            } else {
                _currentPlayer = _player1
            }
        }

    };

    //get current player
    const getCurrentPlayerToken = () => {
        return _currentPlayer.getToken();
    };
    
    
    const checkForWinner = () => {
        let token = getCurrentPlayerToken();
        for(const combo of _winningCombos){
            if (gameBoard.getSpace(combo[0]) === token&&
                gameBoard.getSpace(combo[1]) === token &&
                gameBoard.getSpace(combo[2]) === token){
                _gameComplete = true;
                return token;  // return winnertoken if there is a winner
            }
        }
        return "";
    };

    const catsGame = () => {
        for(let i = 0; i < 9; i++){
            if(gameBoard.getSpace(i) === "") return false;            
        }
        _gameComplete=true;
        return true;

    };

    
    //game complete
    const gameComplete = () =>{
        return _gameComplete;
    };

    return{startGame, playTurn, gameComplete};
})();

// define display function
const displayController = (() => {
    //initialize event listeners
    
    const _messageDisplay = document.querySelector(".messageDisplay");
    const _spaces = document.querySelectorAll(".space");

    _spaces.forEach((space) => 
        space.addEventListener("click", (e)=>{
            if(gameFlow.gameComplete() || e.target.textContent !== "") return;
            gameFlow.playTurn(parseInt(e.target.dataset.index));
        })
    );

    //render board
    const renderBoard = () => {
        for(let i = 0; i < _spaces.length; i++){
            _spaces[i].textContent = gameBoard.getSpace(i);            
        }
    };

    //set message
    const setMessage = (message) => {
        _messageDisplay.textContent = message;
    };

    return {
        renderBoard,
        setMessage,
    };

})();

gameFlow.startGame();