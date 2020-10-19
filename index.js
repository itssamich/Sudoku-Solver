var board = [];
var cells = document.getElementsByClassName('cell');

function getBoard(){
    Board();
    for(let i = 0; i< 9; i++){
        for(let j = 0; j< 9; j++){
            index = i * 9 + j;
            cell = cells[index];
            board[i][j] = cell.value;
        }
    }

}

function Board(){
    board = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];
}

function solve(){
    getBoard();
    var start = performance.now();
    sudokuSolver(board);
    var end = performance.now();
    if(sudokuSolver(board)){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                index = i*9+j;
                cell = cells[index];
                cell.value = board[i][j];
            }
        }
    }
    console.log("Time taken to solve with Backtracking: " + (end - start) + " ms");
}

function isValid(board, row, col, value){
    for(let i = 0; i < 9; i++){
        var m = 3 * Math.floor(row / 3) + Math.floor(i/3);
        var n = 3 * Math.floor(col/3) + i % 3;
        if(board[row][i] == value || board[i][col] == value || board[m][n] == value){
            return false;
        }
    }
    return true;
}

function sudokuSolver(board){
    for(let i = 0; i < 9; i++){ //Iterates for rows
        for(let j = 0; j < 9; j++){ //Iterates for columns
            if(board[i][j] == 0){ //check if the value at position is 0; Helps catch user defined inputs
                for(let value = 1; value <=9; value++){ //iterates through the possible values for the position
                    if(isValid(board, i, j, value)){ //checks if the value is valid for the board and it's position
                        board[i][j] = value; //sets the value to the position
                        if(sudokuSolver(board)){ //recursively runs the method again
                            return true; 
                        }
                        else{
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}