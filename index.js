var board = [
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
console.log(board);
sudokuSolver(board);

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
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] == 0){
                for(let value = 1; value <=9; value++){
                    if(isValid(board, i, j, value)){
                        board[i][j] = value;
                        if(sudokuSolver(board)){
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