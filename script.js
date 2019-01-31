let oneHumanGame = false;
let twoHumanGame = false;

let whosTurn = 1;
let player1Squares = [];
let player2Squares = [];
const winningCombos = [     //Have computer loop through this so it can block the human player :p
    ["A1","B1","C1"],
    ["A1","A2","A3"],
    ["A1","B2","C3"],
    ["B1","B2","B3"],
    ["C1","C2","C3"],
    ["A2","B2","C2"],
    ["A3","B3","C3"],
    ["A3","B2","C1"],
];
let player1Victories = 0;
let player2Victories = 0;

let singlePlayerContinue = true;
let checkDraw = 0;

const squares = document.getElementsByClassName('square');

function resetGame(){
    for (let i = 0;i<squares.length; i++){
        if(squares[i].innerHTML == "X" || squares[i].innerHTML == "O"){
            squares[i].innerHTML = "-";
        }
        if(squares[i].classList.contains('winning-square')){
            squares[i].classList.remove('winning-square');
        }
        squares[i].disabled = false;
    }
    player1Squares = [];
    player2Squares = [];
    whosTurn = 1;

    if(oneHumanGame == true){
        document.querySelector('#message').innerHTML = "It's Your Turn!";
        singlePlayerContinue = true;
        onePlayerGame();
    }
    if(twoHumanGame == true){
        document.querySelector('#message').innerHTML = "It's Player One's Turn!";
        checkDraw = 0;
        twoPlayerGame();
    }
}

function noDisplay(element){
    element.style.display = "none";
}

function clearOverlay(event){
    let overlay = document.querySelector('#overlay');
    let options = document.querySelector('#option-container');

    noDisplay(options);
    overlay.classList.add('fade-out');

    window.setTimeout(function(){
        noDisplay(overlay)
    },1000);
}

function onePlayerGame(event){
    oneHumanGame = true;
    document.querySelector('#message').innerHTML = "It's Your Turn!";
    for (let i = 0;i<squares.length; i++){
        squares[i].addEventListener('click',function(event){
            console.dir(this);
            if(this.innerHTML === '-'){
                if(whosTurn === 1){
                    this.innerHTML = "X";
                    player1Squares.push(this.id);
                    checkWin(player1Squares,1);
                    if(singlePlayerContinue == true){
                        whosTurn = 2;
                        computerTurn();}
                }
            }
        });
    }

    function randomIndex(min, max){
        return (Math.floor(Math.random() * (max-min)) + min)-1;}
    
    function computerTurn(){
        let possibleRows = ['A','B','C'];
        let possibleCols = ['1','2','3'];
        document.querySelector("#message").innerHTML = "Computer's Turn!";

        window.setTimeout(function(){ //Force compChoice to eventually equal squares[i].id
            let spaceAdded = 0;
            while(spaceAdded === 0){
                let compChoice = possibleRows[randomIndex(1,4)] + possibleCols[randomIndex(1,4)]; console.log(compChoice);
                console.log(player1Squares); console.log(player2Squares);
                let compSquare = document.getElementById(compChoice);
                if(compSquare.innerHTML === "-"){
                    console.log(player1Squares.includes(compChoice));
                    console.log(player2Squares.includes(compChoice));
                    if(!player1Squares.includes(compChoice) && !player2Squares.includes(compChoice)){
                        compSquare.innerHTML = "O";
                        player2Squares.push(compChoice);
                        spaceAdded = 1;
                    }
                }
            }
            spaceAdded = 0;
            checkWin(player2Squares,2);
            if(singlePlayerContinue == true){
                document.querySelector('#message').innerHTML = "It's Your Turn!";}
        },1500);

        whosTurn = 1;
    }

    function checkWin(playerSquares, whoMarked){
        //OUTER LOOP
        for(let i = 0;i<winningCombos.length;i++){
            let squareCount = 0;
            //INNER LOOP
            for(let j = 0;j<winningCombos[i].length;j++){
                const winningSquare = winningCombos[i][j]
                if(playerSquares.includes(winningSquare)){
                    squareCount++;
                }
            }
    
            if(squareCount == 3){
                console.log("Player " + whoMarked + " Won!");
                console.log(winningCombos[i]);
                singlePlayerContinue = false;
                endGame(winningCombos[i], whoMarked);
            }
        }
    }

    function endGame(winningCombo, whoWon){
        if(whoWon == 1){
            player1Victories += 1;
            console.log(player1Victories);
            document.querySelector('#message').innerHTML = "Victory!";
        }
        else if((player1Squares.length + player2Squares.length) >= 9){
            singlePlayerContinue = false;
            document.querySelector('#message').innerHTML = "DRAW";
        }
        else{
            player2Victories += 1;
            console.log(player2Victories);
            document.querySelector('#message').innerHTML = "Defeat...";
        }
        for (let i = 0; i < winningCombo.length; i++){
            const winningSquare = winningCombo[i];
            const squareElem = document.getElementById(winningSquare);
            squareElem.className += ' winning-square';
            for (let j = 0; j < squares.length; j++){
                squares[j].disabled = true;
            }
        }
    }
}

function twoPlayerGame(event){
    twoHumanGame = true;
    document.querySelector('#message').innerHTML = "It's Player One's Turn!";
    for (let i = 0;i<squares.length; i++){
        //Each individual square is squares[i]
        //We can add an event listener to each one
        squares[i].addEventListener('click',function(event){ //Anonymous function
            console.dir(this);
            if(this.innerHTML === "-"){
                if(whosTurn === 1){     //Player 1
                    this.innerHTML = "X";
                    player1Squares.push(this.id);
                    whosTurn = 2;
                    document.getElementById('message').innerHTML = "It's Player Two's Turn!";
                    checkWin(player1Squares,1);
                }
                else{                   //Player 2
                    this.innerHTML = "O";
                    player2Squares.push(this.id);
                    whosTurn = 1;
                    document.getElementById('message').innerHTML = "It's Player One's Turn!";
                    checkWin(player2Squares,2);}
            }

            console.log(checkDraw);
            if((player1Squares.length + player2Squares.length) == 9 && checkDraw == 0){
                document.getElementById('message').innerHTML = "DRAW";
            }
        });       
    }
    
    function checkWin(playerSquares, whoMarked){
        //OUTER LOOP
        for(let i = 0;i<winningCombos.length;i++){
            let squareCount = 0;
            //INNER LOOP
            for(let j = 0;j<winningCombos[i].length;j++){
                const winningSquare = winningCombos[i][j]
                if(playerSquares.includes(winningSquare)){
                    squareCount++;
                }
            }
    
            if(squareCount == 3){
                console.log("Player " + whoMarked + " Won!");
                console.log(winningCombos[i]);
                endGame(winningCombos[i], whoMarked);
            }
        }
    }
    
    function endGame(winningCombo, whoWon){
        document.querySelector('#message').innerHTML = `Player ${whoWon} Wins!`;
        if(whoWon == 1){
            player1Victories += 1;
            console.log(player1Victories);
            checkDraw += 1;}
        else if(whoWon == 2){
            player2Victories += 1;
            console.log(player2Victories);
            checkDraw += 1;}

        for (let i = 0; i < winningCombo.length; i++){
            const winningSquare = winningCombo[i];
            const squareElem = document.getElementById(winningSquare);
            squareElem.className += ' winning-square';
            for (let j = 0; j < squares.length; j++){
                squares[j].disabled = true;
            }
        }
    }
}