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
		this.rowMax = this.field.length -1;
		this.colMax = this.field[0].length -1;
	}

	// Print field //
	print() {
		clear();

		// Replace with your own code //
		console.log(this.field); // Please REMOVE this line before you start your code!
		const way = prompt("Which way?(r, l, u, d):");
		switch (way) {
			case "r":
				this.moveRight();
				break;
			case "l":
				this.moveLeft();
				break;
			case "d":
				this.moveDown();
				break;
			case "u":
				this.moveUp();
				break;
			default:
				console.log("Invalid input! Please enter only u, d, l, or r.");
		}
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
			console.log("Attempts to move outside");
			GameOver = true;
		}else if (this.field[this.positionRow][this.positionCol] === hole){
			console.log("Game Over");
			GameOver = true;
		}else if (this.field[this.positionRow][this.positionCol] === hat){
			console.log("You Winner!");
			GameOver = true;
		}else{
			updateField();
		}
	}
	updateField(){
		
	}
}

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const newGame = new Field([
	["░", "░", "O"],
	["░", "O", "░"],
	["░", "^", "░"],
]);
newGame.print();

