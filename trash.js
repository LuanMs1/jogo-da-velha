let player = 'X';
let places;
let gameMatrix=[
    ['','',''],
    ['','',''],
    ['','','']
]
let winner;
function addEvents(){
    places = document.querySelectorAll('.elemento');
    const placesArr = Array.from(places);
    placesArr.forEach(function (element){
        element.addEventListener('click',function (){
            console.log('start of click event');
            console.log('is marked?');
            console.log(element.dataset.marked);
            console.log('has a winner?');
            console.log(winner);
            console.log('there is space left?');
            console.log(checkSpaces());
            if (element.dataset.marked == 'true'){
                console.log('marked');
                return;
            }
            if (winner){
                return;
            }
            if (!checkSpaces()){
                return;
            }
            element.dataset.marked = true;
            element.dataset.play = player;
            element.innerHTML = player;

            changePlayer();
            updateMatrix();
            winner = checkWinner();
            if (winner){
                console.log(winner)
                document.querySelector('.winner').innerHTML = winner;
                return winner;
            }
            if (!checkSpaces()){
                console.log('tie');
            }
            console.log('state of matrix');
            console.table(gameMatrix)
            console.log('')

        });
    })
    document.querySelector('.restart').addEventListener('click',restart);
}

function restart(){
    console.log("here")
    player = 'X';
    winner = false;
    gameMatrix=[
        ['','',''],
        ['','',''],
        ['','','']
    ]
    document.querySelector('.winner').innerHTML = '';
    const placesArr = Array.from(places);
    placesArr.forEach(function(element){
        element.innerHTML = ''
        element.dataset.marked = false;

    })
}
function changePlayer(){

    if (player == 'X'){
        player = 'O';
    }else{
        player = 'X'
    }
    return 1;
}
function updateMatrix(){
    for (let i = 0; i < 9; i++){
        if (places[i].dataset.marked){
            line= parseInt(i / 3);
            column = i % 3;
            gameMatrix[line][column] = places[i].dataset.play;
        }
    }
}
function checkLine(){
    console.log('')
    console.log('checking line')
    
    for (line of gameMatrix){
        let mark = line[0];
        console.log('mark')
        let count = 0;
        if (mark != ''){
            for (element of line){
                if (element != mark && mark != ''){
                    break;
                }
                count++;
            }
            if (count == 3){
                return mark;
            }
        }
        
    }
    console.log('no line completed');
    console.log('');
    return false;

}
function checkColumn(){
    for (let i = 0; i < 3; i++){
        let mark = gameMatrix[0][i];
        let count = 0;
        for (let j = 0; j < 3; j++){
            if (gameMatrix[j][i] != mark){
                break;
            }
            count++;
        }
        if (count == 3){
            return mark;
        }
    }
    return false;
}
function checkDiagonal(){
    if ((gameMatrix[0][0] == gameMatrix[1][1]) && (gameMatrix[1][1] == gameMatrix[2][2])){
        return gameMatrix[0][0];
    }
    if (gameMatrix[0][2] == gameMatrix[1][1] && gameMatrix[1][1] == gameMatrix[2][0]){
        return gameMatrix[0][2];
    }
}
function checkWinner(){
    console.log('checking winner');
    console.log(winner);
    let winnerFound = checkLine();
    console.log('winner Found variable:')
    console.log(winnerFound)
    if (winnerFound){
        console.log('winner found')
        return winnerFound;
    }
    console.log('no winner in line')
    console.log('   ')
    winnerFound = checkColumn();
    if (winnerFound){
        return winnerFound;
    }
    winnerFound = checkDiagonal();
    if (winnerFound){
        return winnerFound;
    }
}
function checkSpaces(){
    for (line of gameMatrix){
        for (element of line){
            if (element == ''){
                return true;
            }
        }
    }
    return false;
}