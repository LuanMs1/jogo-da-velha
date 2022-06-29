let player = 'X';
let places;
let gameMatrix=[
    ['','',''],
    ['','',''],
    ['','','']
]
let winnerPlayer;
let winner = false;

function addEvents(){
    places = document.querySelectorAll('.elemento');    
    const placesArr = Array.from(places);
    placesArr.forEach(function (element){
        element.addEventListener('mouseover',mouseover);
        element.addEventListener('mouseout',mouseout);
        element.addEventListener('click',function (){
            if (winner){
                console.log('game has ended');
                return;
            }
            if (element.dataset.mark == 'X' || element.dataset.mark == 'O'){
                return;
            }
            markPlay(element);
            changePlayer();
            updateMatrix();
            winnerPlayer  = checkWinner();
            if (winnerPlayer){
                document.querySelector('.winner').innerText = `${winnerPlayer} venceu`;
            }
        });
    })
    document.querySelector('.reset').addEventListener('click',resetGame);
}

function resetGame(){
    const placesArr = Array.from(places);
    player = '';
    placesArr.forEach(function (element){
        element.dataset.marked = '';
        markPlay(element);
    })
    updateMatrix(); 
    player = 'X';
    winner = false;
    document.querySelector('.winner').innerText = '';
    highlight('reset', 0)


}

function markPlay(element){
    element.dataset.marked = true;
    element.dataset.mark = player;
    element.innerHTML = player;

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
        line= parseInt(i / 3);
        column = i % 3;
        gameMatrix[line][column] = places[i].dataset.mark;
    }
}

function checkWinner(){
    for (let i = 0; i < 3; i++){
        if (
            (gameMatrix[i][0] == gameMatrix[i][1] && gameMatrix[i][0] == gameMatrix[i][2]) && 
            (gameMatrix[i][0] == 'X' || gameMatrix[i][0] == 'O')
            ){
            winner = true;
            highlight('line',i)
            return gameMatrix[i][0];
        }         
        if ((gameMatrix[0][i] == gameMatrix[1][i] && gameMatrix[1][i] == gameMatrix[2][i]) &&
            (gameMatrix[0][i] == 'X' || gameMatrix[0][i] == 'O')
            ){
            winner = true;
            highlight('column',i);
            return gameMatrix[0][i];
        }
    }
    for (let i = 0; i < 2; i++){
        if (
            (gameMatrix[0][i*2] == gameMatrix[1][1] && gameMatrix[1][1] == gameMatrix[2][2 + (-1 * i)*2]) &&
            (gameMatrix[0][i*2] == 'X' || gameMatrix[0][i*2])            
            ){
            winner = true;
            highlight('diagonal',i);
            return gameMatrix[1][1];
        }
    }
    return;
}

function highlight(direction, i){
    if (direction == 'reset'){
        for (let j = 0; j < 9; j++){
            places[j].style.backgroundColor = 'white';
        }
    }else if (direction == 'line'){
        for (let j = 0; j < 3; j++){
            places[i * 3 + j].style.backgroundColor = 'green';
        }
    }else if(direction == 'column'){
        console.log('here')
        for (let j = 0; j < 3; j++){
            places[i + j * 3].style.backgroundColor = 'green';
        }
    }else if(direction == 'diagonal'){
        if (i == 0){
            for (let j = 0; j < 3; j++){
                places[(j) * 4].style.backgroundColor = 'green';
            }

        }
        if (i == 1){
            for (let j = 0; j < 3; j++){
                places[(j+1) * 2].style.backgroundColor = 'green';
            }
        }
    }
}

function mouseover(e){
    if (e.target.dataset.marked != 'true'){
        e.target.style.backgroundColor = 'rgb(230, 230, 230)';
        e.target.innerHTML = `<p>${player}</p>`;
        e.target.children[0].style.opacity = .7;
    }
}

function mouseout(e){
    if (e.target.dataset.marked != 'true'){
        e.target.innerHTML = '';
        e.target.style.backgroundColor = 'white';
    }
}