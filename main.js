"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(field = [[]]) {
		this.field = field;

		// Replace with your own code //
		// Set the home position at (0, 0) before the game starts
		this.positionRow = 0;
		this.positionCol = 0;
		this.field[this.positionRow][this.positionCol] = pathCharacter;

		// check lenght of row and column
		this.rowMax = this.field.length -1;
		this.colMax = this.field[0].length -1;
	}

	// Print field //
	print() {
		clear();

		// Replace with your own code //
		console.log(this.field); // Please REMOVE this line before you start your code!

		if(this.warning)console.log(this.warningMessage);
		if(this.warningOutside)console.log(`⚠️Don't move:${this.warningMessageOutside}!`);
	}

	// Your Code //
	moveRight(){
		this.positionCol++;
	}
	moveLeft () {
		this.positionCol--;
	}
	moveUp(){
		this.positionRow--;
	}
	moveDown(){
		this.positionRow++;
	}
	checkGameOver(){
		if (this.positionCol > this.colMax || this.positionCol < 0 || this.positionRow > this.rowMax || this.positionRow < 0){
			console.log("🚫 You went out of bounds! Game over.");
			this.gameOver = true;
		}else if (this.field[this.positionRow][this.positionCol] === hole){
			console.log("💀 You fell into a hole! Game over.");
			this.gameOver = true;
		}else if (this.field[this.positionRow][this.positionCol] === hat){
			console.log("🎉 You found the hat! You win!");
			this.gameOver = true;
		}else{
			this.field[this.positionRow][this.positionCol] = pathCharacter;
		}
	}
	checkWarningOutside(){
		this.warningMessageOutside = ''
		switch (this.positionCol){
			case this.colMax:
				this.warningOutsideCol = true;
				this.warningMessageOutside += ' Right';
				break;
			case 0:
				this.warningOutsideCol = true;
				this.warningMessageOutside += " Left";
				break;
			default:
				this.warningOutsideCol = false;
		}
		switch (this.positionRow){
			case this.rowMax:
				this.warningOutsideRow = true;
				this.warningMessageOutside += " Down";
				break;
			case 0:
				this.warningOutsideRow = true;
				this.warningMessageOutside += " Up";
				break;
			default:
				this.warningOutsideRow = false;
		}
		this.warningOutsideRow || this.warningOutsideCol ? this.warningOutside = true : this.warningOutside = false;
	}
	runGame(gameOver){
		this.print();
		this.gameOver = gameOver;
		this.warning = false;
		this.warningOutside = false;
		const way = prompt("Which way?(r, l, u, d):");
		switch (way) {
			case "r":
				this.moveRight();
				this.checkGameOver();
				break;
			case "l":
				this.moveLeft();
				this.checkGameOver();
				break;
			case "d":
				this.moveDown();
				this.checkGameOver();
				break;
			case "u":
				this.moveUp();
				this.checkGameOver();
				break;
			default:
				this.warning = true;
				this.warningMessage = "Invalid input! Please enter only u, d, l, or r.";
		}
		this.checkWarningOutside()
		return this.gameOver;

	}
}
const randomField = () => {
	const rows = Math.floor(Math.random() * (7))+ 4;
	const cols = Math.floor(Math.random() * 4)+ 3;
	const field = [];
	const fieldSymbols = [hole, fieldCharacter, hat, pathCharacter];
	let countSymbols = {};
	let addHat = true;

	fieldSymbols.map(key => {countSymbols[key]=0})

	// for (let i=0; i < rows; i++){
	// 	const arr = []
	// 	for (let j=0; j < cols; j++){
	// 		let random = Math.floor(Math.random() * 3);
	// 		if(i===0 && j===0){
	// 			random =
	// 		}
			

	// 	}
	// }
	for (let i = 0;	 i < rows; i++) {
		const arr = []
		for (let j = 0;j < cols; j++) {
			let random = Math.floor(Math.random() * 3);

			if (i === 0 && j === 0) {
				arr.push(pathCharacter);
			}else if (random === 2 && addHat && ((i < rows/2 && j > cols/2) || i > rows/2)){
				arr.push(fieldSymbols[random]);
				addHat = false;
			}else if (i === rows && j === cols && addHat){
				arr.push(hat);
			}else if(random !== 2 && countSymbols[hat] < Math.floor(rows * cols * 10 / 100)){
				arr.push(fieldSymbols[random]);
				countSymbols[fieldSymbols[random]]++
			}else{
				arr.push(fieldSymbols[1]);
			}
		}
		field.push(arr);
	}
	return field;
}
// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
let gameOver = false;

// const newGame = new Field([
// 	["░", "░", "O"],
// 	["░", "O", "░"],
// 	["░", "^", "░"],
// ]);

// Game field random
const newGame = new Field(randomField())

while (!gameOver) {
gameOver = newGame.runGame();
}
