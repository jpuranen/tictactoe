var readlineSync = require("readline-sync");

class Table {
  

    constructor(width, height, wr) {
        this.width = width;
        this.height = height;
        this.wr = wr;
        this.table = new Array(height);
        for (var i = 0; i < this.table.length; i++) {
            this.table[i] = new Array(width);
            for (let apu = 0; apu < width; apu++) {
                this.table[i][apu] = ".";
            }
        }  
    }

    printTable() {
        let rowNumber = 0;
        let rowNumberPadding =" ";
        let topRow = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
        let topColumn = "    ";
        for (let column = 0; column < this.width; column++) {
            topColumn = topColumn + "" + topRow.charAt(column);
        }
        console.log(topColumn);

        for(let row of this.table) {
            ++rowNumber;
            if (rowNumber < 10) {
                rowNumberPadding = " " + rowNumber;
            } else {
                rowNumberPadding = "" + rowNumber;
            }
            let fieldColumn = rowNumberPadding + ": ";
            for(let item of row) {
                fieldColumn = fieldColumn + "" + item;
            }
            console.log(fieldColumn);
        }
    }

    setTable(solu,z) {

        let isSucceeded = false;
        let aToz = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
        let x = aToz.indexOf(solu.charAt(0));
        let y = Number(solu.charAt(1) + solu.charAt(2)) - 1;
        this.lastX = x;
        this.lastY = y;

        if(this.isInsideBoundaries(x,y)) {
            if (this.isFree(x,y)){
                this.table[y][x] = z;
                isSucceeded = true;
            } else {
                console.log("Slot is not empty!")
                isSucceeded = false;
            }
        } else {
            console.log("Slot is outside boundaries!")
            isSucceeded = false;
        } 
        return isSucceeded;
    }

    isValidInput(cell) {
        var rr = /^[A-Z][0-9]{1,2}$/;
        var r =  rr.exec(cell);
        if(r != null) {
            return true;
        } else {
            return false;
        }
    }
    isFree(x,y) {
        let isFree = false;
        if(x>=0 && x<this.width && y>=0 && y<this.height) {
            if (this.table[y][x] == ".") {
                isFree = true;
            }
        }
        return isFree;
    }
    isInsideBoundaries(x,y) {
        if(x>=0&&x<this.width&&y>=0&&y<this.height) {
            return true;
        } else {
            return false;
        }
    }
    isFull(){
        let emptys = 0;
        for (let row of this.table) {
            for (let cell of row) {
                if (cell == ".") {
                    emptys++;
                }
            }
        } 
        if (emptys >=1) {
            return false;
        } else {
            return true;
        }
    }
    isWinningRow() {
        let isWinnerFound = false;
        let lastX = this.lastX;
        let lastY = this.lastY;

        // Checking by rows starts //
        let leftHand = 0;
        let rightHand = 0;
        let i = 1;

        while (lastX-i >= 0 && this.table[this.lastY][lastX-i] == this.table[this.lastY][this.lastX]) {
            leftHand++;
            i++;
        }
        i=1;

        while (lastX+i < this.width && this.table[this.lastY][lastX+i] == this.table[this.lastY][this.lastX]) {
            rightHand++;
            i++;
        }
        if(leftHand+rightHand+1 == this.wr) {
            isWinnerFound = true;
        }
        // Checking by rows ends //

        // Checking by columns starts //
        leftHand = 0;
        rightHand = 0;
        i = 1;
        while (lastY-i >= 0 && this.table[lastY-i][this.lastX] == this.table[this.lastY][this.lastX]) {
            leftHand++;
            i++;
        }
        i=1;
        while (lastY+i < this.height && this.table[lastY+i][this.lastX] == this.table[this.lastY][this.lastX]) {
            rightHand++; 
            i++;
        }
        if(leftHand+rightHand+1 == this.wr) {
            isWinnerFound = true;
        }
        // Checking by columns ends //

        // Checking by cross rows1 starts //
        leftHand = 0;
        rightHand = 0;
        i = 1;
        while (lastY-i >= 0 && lastX-i>=0 && this.table[lastY-i][lastX-i] == this.table[this.lastY][this.lastX]) {
            leftHand++;
            i++;
        }
        i=1;
        while (lastY+i < this.height && lastX+i < this.width && this.table[lastY+i][lastX+i] == this.table[this.lastY][this.lastX]) {
            rightHand++; 
            i++;
        }
        if(leftHand+rightHand+1 == this.wr) {
            isWinnerFound = true;
        }

        // Checking by cross rows1 ends //

        // Checking lastYy cross rows2 starts //

        leftHand = 0;
        rightHand = 0;
        i = 1;
        while (lastY-i >= 0 && lastX+i < this.width && this.table[lastY-i][lastX+i] == this.table[this.lastY][this.lastX]) {
            leftHand++;
            i++;
        }
        i=1;
        while (lastY+i < this.height && lastX-i >= 0 && this.table[lastY+i][lastX-i] == this.table[this.lastY][this.lastX]) {
            rightHand++; 
            i++;
        }
        if(leftHand+rightHand+1 == this.wr) {
            isWinnerFound = true;
        }

        // Checking by cross rows2 ends//

        return isWinnerFound;
    }
}
function verifyArgs(arg1, arg2, arg3, arg4) {

    var rr = /^[3-9]|[1][0-9]|[2][0-5]$/;
    var arg1Test =  rr.exec(arg1);
    var arg2Test =  rr.exec(arg2);
    var arg3Test =  rr.exec(arg3);

    if(arg4 > 5) { 
        throw new Error("Too many command line arguments");
    }
    
    if(arg4 < 5) { 
        throw new Error("Too few command line arguments");
    }

    if(arg1Test != null && arg2Test != null && arg3Test != null) {
        if(Number(arg3) > Number(arg1) || Number(arg3) > Number(arg2)) {
            throw new Error("Number of game pieces can not exceed the height or width of the game board!");
        } 
    } else {
        throw new Error("Command line arguments are not valid!");
    }
}
verifyArgs(process.argv[2], process.argv[3],process.argv[4],process.argv.length);

var tb = new Table(Number(process.argv[2]),Number(process.argv[3]),Number(process.argv[4]));
tb.printTable();

var vuorolaskuri = 0;
var xoString = "XO";
do {
    var vuorossa = xoString.charAt(vuorolaskuri % 2);
    var solu = readlineSync.question("Player " + vuorossa + " Give the cell: ").toUpperCase();
    if(!tb.isValidInput(solu)) {
        console.log("Please give valid input. " + solu + " is not valid.");
    } else {
        if (tb.setTable(solu, vuorossa)) {
            vuorolaskuri++;
        }
        tb.printTable();
    }
} while (!tb.isFull() && !tb.isWinningRow());
console.log("We have the winner! The winner is player: " + vuorossa);