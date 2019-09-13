
let Grid = [];
let DiceSelector = []; 
//let CurrentDice;


let userCar;
let compCar1;
let compCar2;
let compCar3;




window.onload = function(){

    OverlayOn();
    document.onkeydown = OverlayOff;
    
    

};

function OverlayOn() {
    document.getElementById("overlay").style.display = "block";

  }
  
function OverlayOff() {
    document.getElementById("overlay").style.display = "none";
    
    startGame();

}

function startGame(){
    
    createGrid();
    createDice();
    document.onkeydown = key_SelectDice;
}










function createGrid(){
    
    ////CREATEBOARD
    let playZone = document.getElementById("playarea");
    let Arr = [];
    for ( let i = 0 ; i < 4 ; i++ ){
        let col = [];
        let tile;
        for ( let j = 0 ; j < 100 ; j++ ){
            tile = new Tile(i,j, false, false, false, false ,false, false, false);
            //let tile = document.createElement("div");
            //tile.setAttribute('class', 'empty');
           // tile.setAttribute('id', `${i},${j}`);
            //playZone.append(tile);
            col.push(tile);
        }
        Arr.push(col);
    }
        Grid =  Arr;
        updateView();
}

function createDice(){
    let diceSet = [];
    for ( let i = 1 ; i < 9 ; i++ ){
        let die;
        if ( i === 1){
            die = new Dice( i , true , 1);
        }
        else if ( 2 <= i && i <=6 ) {
            die = new Dice( i , false , i * 2 );
        } 
        else if ( i === 7) {
            die = new Dice( i , false , 20 );
        } 
        else if ( i === 8) {
            die = new Dice( i , false , 40 );
        } 
        diceSet.push(die);
    }
    DiceSelector = diceSet;
    updateDiceSelectorView();
}





function key_SelectDice(e){				
    var key_code = e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
            findDice('left');
            break;
        case 39: //right arrow key
            findDice('right');
            break;		
        case 32: // space bar
            rollDice();
            break;
    }
}



function findDice(direction){
   
    

let now = DiceSelector.filter(dice => dice.hover);
//let index = DiceSelector.indexOf(now);
if (now[0]){
    currentDice = now[0];
}
let start = DiceSelector.indexOf(currentDice);
let Did = currentDice.id;

if ((direction === "left" && Did === "d1") ||( direction === "right" && Did === "d8" ) ){
    return;
} else if (direction === "right"){
    currentDice.hover = false;
    DiceSelector[start+1].hover = true;
    
    updateDiceSelectorView()
}else if (direction === "left"){
    currentDice.hover = false;
    DiceSelector[start-1].hover = true;
   
    updateDiceSelectorView()
}


console.log(direction , currentDice.id );



// if ( direction === "right"){
//     currentDice.hover = false;
//     DiceSelector[currentDice.id]
// }


updateDiceSelectorView()

// userTile;
// ArrayGrid.forEach(row => {
//     let user = row.filter(tile => tile.user)
//     if(user[0]) {
//         //console.log('user tile=>', user)
//         userTile = user[0];
        
//     }
// });
    
}



function rollDice(sides){

    var result = Math.floor(Math.random()*sides)+1;
    return result; 
}


///////////// COMPUTER STUFF ///////////////

function getRandomDice(){
    let dieType = rollDice(6);
        if (dieType == 1){ // computer advance 1 space
        }
        else if (dieType == 2){ 
            return rollDice(6); 
        }
        else if (dieType == 3){ 
            return rollDice(10); 
        }
        else if (dieType == 4){ 
            return rollDice(12); 
        }
        else if (dieType == 5){ 
            return rollDice(20); 
        }
        else if (dieType == 6){ 
            return rollDice(40); 
        }
}







function updateView(){
        let playZone = document.getElementById("playarea");
        playZone.innerHTML = null;
        Grid.forEach(col => {
            col.forEach(tile => {
                 var space = document.createElement(tile.element);
                space.setAttribute('id', tile.id );
                space.setAttribute("class", "tile");
                playZone.append(space);
            })
        })
}


function updateDiceSelectorView(){
    let diceZone = document.getElementById("buttonmap");
    diceZone.innerHTML = null;
    DiceSelector.forEach(space => {
        var diceChoice = document.createElement(space.element);
        diceChoice.setAttribute('id', space.id);
        diceChoice.setAttribute("class", "dice");
        diceChoice.innerHTML = space.value;

        if ( space.hover === true){
            diceChoice.classList.add("onDice");
        }

            diceZone.append(diceChoice);
    })
}









///////// CLASSES   ///////////

class Tile {
    constructor(i,j,isUser, isComp1, isComp2, isComp3, isEmpty, isStart, isEnd) {
        this.id = `${i},${j}`;
        this.element ="div";
        this.class = "empty";
        this.i = i;
        this.j = j; 
        this.user = isUser
        this.comp = isComp1
        this.comp = isComp2
        this.comp = isComp3
        this.empty = isEmpty
        this.start = isStart
        this.end = isEnd
    }
    }



class Dice {
    constructor( i , isSelected, number){
        this.id = `d${i}`;
        this.element = "div";
        this.class = "dice";
        this.hover = isSelected
        this.value = number
    }
}



























