let board =[['','',''],['','',''],['','','']];
const player1 = 'X';
const player2 = 'O';
let currentPlayer;
let winner = "notYet";
const result = document.getElementById('result');
let turns = 0;

const decider = Math.random();
if(decider < 0.5) {
    currentPlayer = player1;
} else {
    currentPlayer = player2;
}

const turn = document.getElementById('turn');
turn.innerHTML = "It is " + currentPlayer + "'s turn.";

const boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(cell => {
    cell.clicked = 'false';
    cell.addEventListener('click', handleClick);
})

function handleClick(e) {
    console.log(e.target.getAttribute('clicked'));
    if (e.target.clicked == 'true') {
        return;
    }
    else {
        ++turns;
        let box = e.target;
        console.log(box.id)
        const idx1 = box.id.charAt(1);
        const idx2 = box.id.charAt(2);
        board[idx1][idx2] = currentPlayer;
        console.log(idx1, idx2);
        console.log("box clicked: " + box.clicked);
        box.clicked = 'true';
        console.log("box clicked: " +  box.clicked);
        box.innerHTML = currentPlayer;
        box.style = "cursor: default";
        if (turns >= 5){
            checkWinner();
        }
        if (winner !== "notYet"){
            return;
        }
        else if(turns === 9){
            result.innerHTML = "It's a draw!";
            turn.style = "visibility: hidden";
            result.style = "visibility: visible";
        }
        else {
            nextTurn();
        }
    }
}

function nextTurn(){
    if(currentPlayer === player1){
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    turn.innerHTML = "It is " + currentPlayer + "'s turn.";
}

function checkWinner(){
    for(let i = 0; i < 3; i++){
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ''){
            colorChange(document.getElementById('b'+i+'0'),document.getElementById('b'+i+'1'),document.getElementById('b'+i+'2'));
            winner = board[i][0];
        }
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ''){
            colorChange(document.getElementById('b0'+i),document.getElementById('b1'+i),document.getElementById('b2'+i));
            winner = board[0][i];
        }
    }
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ''){
        colorChange(document.getElementById('b00'),document.getElementById('b11'),document.getElementById('b22'));
        winner = board[0][0];
    }
    if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ''){
        colorChange(document.getElementById('b02'),document.getElementById('b11'),document.getElementById('b20'));
        winner = board[0][2];
    }

    if(winner !== "notYet"){
        result.style = "visibility: visible";
        turn.style = "visibility: hidden";
        result.innerHTML = winner + " WINS!";
        Array.from(boxes).forEach(cell => {
            cell.clicked = 'true';
        })
    }
}

function colorChange(b1,b2,b3){
    b3.style = "background-color: rgb(212, 237, 173)";
    b1.style = "background-color: rgb(212, 237, 173)";
    b2.style = "background-color: rgb(212, 237, 173)";
    Array.from(boxes).forEach(cell => {
        cell.style.pointerEvents = "none";
    })
}