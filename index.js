var board = [];
var cells = document.getElementsByClassName('cell'); //defines an array to hold the cell values
var counter = 0;

function getBoard(){
    Board(); //Creates a new board
    for(let i = 0; i< 9; i++){
        for(let j = 0; j< 9; j++){
            index = i * 9 + j; //Sets the postition the board is at in the array
            cell = cells[index]; //finds the cell at the position board is at in array of cells
            board[i][j] = cell.value; //takes the cell value and puts it in a 2D array for board position
            validValue(cell.value); //makes sure that the value is valid
            console.log(counter);
        }
    }


}
function validValue(value){
    if(value != ''){
        counter++;
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

function updateBoard(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            index = i*9+j; //Sets the postition the board is at in the array
            cell = cells[index]; //finds the cell at the position board is at in array of cells
            cell.value = board[i][j]; //takes the value at the board position and returns it to the cell
        }
    }
}
function resetBoard(){
    location.reload(); //Bad way to handle it, reflreshed the page to reload.
}


function solve(){
    var start = 0;
    var end = 0;
    if(counter < 17){
        alert("Not a valid input. No Unique Solution");
        resetBoard();
        return;
    }
    getBoard(); //Sets up the board with user defined values
    start = performance.now(); //the start timer for runtime
    sudokuSolver(board); //runs solver function
    var end = performance.now(); //the end timer for runtime
    if(sudokuSolver(board)){
        document.getElementById('timer').innerHTML = "Time taken to solve with Backtracking: " + (end - start) + " ms"; //updates the timer div in index.html to display backtracking time
        updateBoard(); //updates board with all correct values found from the solver
    }
    else{
        alert("There is no solution!"); //if no valid solution, alerts the user of it.
    }

}

function isValid(board, row, col, value){
    for(let i = 0; i < 9; i++){
        var m = 3 * Math.floor(row / 3) + Math.floor(i/3);
        var n = 3 * Math.floor(col/3) + i % 3;
        if(board[row][i] === value || board[i][col] === value || board[m][n] === value){
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