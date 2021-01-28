import Phaser from 'phaser'
import Resources from '../resources/resources'

export default class ScoreController extends Phaser.GameObjects.Text {
    constructor(scene,gridX,gridY,productItems,orderCount,scoreIncrement) {
        super(scene,gridX*Resources.tileLength,gridY*Resources.tileLength,"");
        this.setColor("0x000000");
        this.time = 120 * 1000;
        this.acceptItems = true;
        this.score = 0;
        for (var i in productItems) if (Resources.productItems.indexOf(productItems[i]) === -1) throw "ScoreController class: invalid productItems member";
        this.requiredItems = [];
        this.productItems = productItems;
        this.scoreIncrement = scoreIncrement;
        for (var i=0;i<orderCount;i++) {
            this.requiredItems.push(this.productItems[this.randomInt(this.productItems.length)]);
        }
        this.started = false;
        this.item = null;
    }

    start() {
        this.started = true;
    }

    setItem(item) {
        this.item = item;
        this.updateDisplay();
    }

    preUpdate(time,dt) {
        if (this.acceptItems) {
            if (this.started) this.time -= dt;
            if (this.time <= 0) {
                this.acceptItems = false;
            }
            this.updateDisplay();
        }
    }

    updateDisplay() {
        var outText = "";
        if (this.acceptItems) {
            outText += "Time left: "  + this.padDisplay(Math.floor(this.time / 60000)) + ":" + this.padDisplay(Math.floor((this.time % 60000)/1000)) + "\n";
        }
        else outText += "Time's up!\n"
        outText += "Score: " + this.score + '\n\n';
        outText += "Current item:\n\t" + this.item + '\n\n';
        outText += "Required items:\n";
        for (var i=0;i<this.requiredItems.length;i++) {
            outText += "(" + (i+1) + ") " + this.requiredItems[i] + '\n';
        }
        this.setText(outText);
    }

    padDisplay(text) {
        return ("00"+text).slice(-2);
    }

    randomInt(limit) {
        return Math.floor(Math.random()*limit);
    }

    getRequiredItems() {
        return this.requiredItems;
    }

    submit(index) {
        if ((!this.started) || (!this.acceptItems)) return; 
        this.score += this.scoreIncrement;
        this.requiredItems[index] = this.productItems[this.randomInt(this.productItems.length)];
        this.updateDisplay();
    }
}

Phaser.GameObjects.GameObjectFactory.register("scoreController", function (gridX,gridY,productItems,orderCount,scoreIncrement) {
    var text = new ScoreController(this.scene,gridX,gridY,productItems,orderCount,scoreIncrement);
    
    this.displayList.add(text);
    this.updateList.add(text);

    return text;
});