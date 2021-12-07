import Vector2f from "../../../../templates/util/Vector2f.js";
import GridObject from "../../../../templates/gameAssets/impl/GridObject.js";

export default class GameBoard extends GridObject {
    text;
    
    constructor(x, y) {
        super(
            new Vector2f(x, y),
            new Vector2f(100, 100),
            new Vector2f(0, 0)
        )
    }

    update(dt) {
        let whosTurn = !this.game.playerTurn ? "" : this.game.playerTurn.symbol;
        document.getElementById("text").innerHTML = !this.text ? whosTurn : this.text;

        ["x", "o"].forEach(symbol => {
            if(this.hasWon(symbol)) {
                this.clear();
            }
        })
    }

    render() {
        super.render();

        let ctx = this.canvas.getContext("2d");
        let w = this.canvas.width/this.cells[0].length;
        let h = this.canvas.height/this.cells.length;

        for(let x = 0; x < this.size.x; x++) {
            for(let y = 0; y < this.size.y; y++) {
                ctx.beginPath();

                ctx.lineWidth = 12;

                let xPos = x * w + w/2;
                let yPos = y * h + h/2;
                
                if(this.cells[y][x] == "x") {
                    ctx.moveTo(xPos - w/3, yPos - h/3);
                    ctx.lineTo(xPos + w/3, yPos + h/3);
                    ctx.moveTo(xPos + w/3, yPos - h/3);
                    ctx.lineTo(xPos - w/3, yPos + h/3);
                } else if(this.cells[y][x] == "o") {
                    console.log()
                    ctx.arc(x * w + w/2, y * h + h/2, Math.sqrt( Math.pow(w, 2) + Math.pow(h, 2)) / 4, 0, Math.PI*2);
                } 

                ctx.stroke();
            }
        }
    }

    hasWon(symbol) {
        let tests = [this.inRow(symbol, 3), this.inColumn(symbol, 3), this.inDiagonal(symbol, 3)];

        tests.forEach(test => {
            if(test.is) {
                this.text = `${symbol} has Won!`;
                this.markWin(test.start, test.end);
                this.clear(2000);
            }
        })

        if(this.isFull()) {
            this.text = `Draw!`;
            this.clear(1500);
        }
    }

    clear(timeout) {
        if(!timeout) {
            this.text = "";
        
            super.clear();
        } else {
            setTimeout(() => {
                this.text = "";
            
                super.clear();
            }, timeout);
        }
    }

    markWin(start, end) {
        console.log("win")
        let ctx = this.canvas.getContext("2d");
        ctx.lineWidth = 50;

        let w = this.canvas.width/this.cells[0].length;
        let h = this.canvas.height/this.cells.length;

        ctx.moveTo(start.x * w + w/2, start.y * h + h/2);
        ctx.lineTo(end.x + w/2, end.y + h/2);

        ctx.stroke();
    }
}