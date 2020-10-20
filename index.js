var board;
var cells = document.getElementsByClassName('cell'); //defines an array to hold the cell values
var counter; //counter to check if minimum hint count is met(17)

function testString(){  

    var place = Math.floor(Math.random() * Math.floor(6)) + 1;
    console.log("Test String Value: " + place);
    switch(place){
        case 1:
            document.getElementById("import").value = "080100007000070960026900130000290304960000082502047000013009840097020000600003070";
            break;
        case 2:
            document.getElementById("import").value = "010020300004005060070000008006900070000100002030048000500006040000800106008000000";
            break;
        case 3:
            document.getElementById("import").value = "010020300002003040050000006004700050000100003070068000300004090000600104006000000";
            break;
        case 4:
            document.getElementById("import").value = "010020300002003040080000006004700030000600008070098000300004090000800104006000000";
            break;
        case 5:
            document.getElementById("import").value = "000012300000400000105006700306000070700080009020000108001500403000001000003890000";
            break;
        case 6:
            document.getElementById("import").value = "000012300000300000104005600305000060600070002080000105001400903000001000003720000";
            break;
        default:
            alert("Near fatal error. Value set to 1");
            document.getElementById("import").value = "080100007000070960026900130000290304960000082502047000013009840097020000600003070";
            break;
            
    }
}
function getBoard(){
    Board(); //Creates a new board
    counter = 0;
    for(let i = 0; i< 9; i++){
        for(let j = 0; j< 9; j++){
            index = i * 9 + j; //Sets the postition the board is at in the array
            cell = cells[index]; //finds the cell at the position board is at in array of cells
            if(cell.value != ''){
                counter++;
            }
            board[i][j] = cell.value; //takes the cell value and puts it in a 2D array for board position
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

function updateBoard(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            index = i*9+j; //Sets the postition the board is at in the array
            cell = cells[index]; //finds the cell at the position board is at in array of cells
            if(board[i][j] == "0"){ //checks if value at position is "0"
                board[i][j] = ''; //converts a "0" value to a empty character value to allow for proper board display and solving
            }
            cell.value = board[i][j]; //takes the value at the board position and returns it to the cell
        }
    }
}
function resetBoard(){
    location.reload(); //Bad way to handle it, reflreshed the page to reload.
}


function solve(){
    var start = 0; //start of runtime timer
    var end = 0; //end of runtime timer

    getBoard(); //Sets up the board with user defined values

    if(counter < 17){ //checks the counter value to see if it is at the minimum
        alert("Not a valid input. No Unique Solution"); //alerts the user
        resetBoard(); //resets the board so no value remains
        return; //ends the program
    }

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
    for(let i = 0; i < 9; i++){ //position
        var m = 3 * Math.floor(row / 3) + Math.floor(i/3); //row checker for the 3x3 box
        var n = 3 * Math.floor(col/3) + i % 3; //column checker for the 3x3 box
        if(board[row][i] == value || board[i][col] == value || board[m][n] == value){ //checks if value is found in row, column, and a 3x3 box respectively
            return false; //returns false if found
        }
    }
    return true; //returns true if not found
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

function importPuzzle(){
    var importedValue = document.getElementById("import").value //saves the imported value in a variable
    for(let i = 0; i < importedValue.length; i++){
        if(importedValue[i] != "0" && importedValue[i] != 0 && importedValue[i] != ''){
            counter++;
        }
    }
    if(importedValue.length != 81 && counter < 17){ //checks that the imported string is 81 characters long to fit perfectly in board
        alert("Please enter a valid puzzle"); //alerts user
    }
    else{
        counter = 0;
        Board(); //generates a new board;
         //sets the counter to 81 to allow for solving
        for(let i = 0; i < 9; i++){ //row
            for(let j = 0; j < 9; j++){ //column
                board[i][j] = importedValue.charAt(i*9+j); //sets the value at the given position in the board
            }
        }
        updateBoard(); //updates and draws the board
    }
}