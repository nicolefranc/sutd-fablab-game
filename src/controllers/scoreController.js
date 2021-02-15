import Phaser from "phaser";
import LeaderboardUtils from "../leaderboard/leaderboardUtils";
import Resources from "../resources/resources";

//TODO add a method an DS to store the array of components that are submitted
const GAME_DURATION = 120000; //2 minutes in ms

export default class ScoreController extends Phaser.GameObjects.Text {
    constructor(scene, gridX, gridY, productItems, orderCount, scoreIncrement) {
        super(
            scene,
            gridX * Resources.tileLength,
            gridY * Resources.tileLength,
            ""
        );
        this.setColor("0x000000");
        this.time = GAME_DURATION;
        this.acceptItems = true;
        this.componentCollection = [];
        this.score = 0;
        this.orderDisplay = null;
        this.assemblyTables = [];

        for (var i in productItems)
            if (Resources.productItems.indexOf(productItems[i]) === -1)
                throw "ScoreController class: invalid productItems member";

        this.requiredItems = [];
        this.productItems = productItems;
        this.scoreIncrement = scoreIncrement;

        for (var i = 0; i < orderCount; i++) {
            this.requiredItems.push(
                this.productItems[this.randomInt(this.productItems.length)]
            );
        }

        this.started = false;
        this.item = null;
    }
    start() {
        if (this.orderDisplay === null)
            throw "ScoreController class: orderDisplay not yet attached";
        if (this.assemblyTables.length === 0)
            throw "ScoreController class: no assemblyTable attached yet";
        this.started = true;
    }
    setItem(item) {
        this.item = item;
    }
    addAssemblyTable(assemblyTable) {
        this.assemblyTables.push(assemblyTable);
        assemblyTable.setRequiredItems(this.requiredItems);
    }

    attachOrderDisplay(orderDisplay) {
        this.orderDisplay = orderDisplay;
        this.orderDisplay.initialize(this.requiredItems);
    }

    preUpdate(time, dt) {
        if (this.acceptItems) {
            if (this.started) this.time -= dt;
            if (this.time <= 0) {
                this.acceptItems = false;
            }
        }
        this.updateDisplay();
    }

    updateDisplay() {
        var outText = "";
        if (this.acceptItems) {
            outText +=
                "Time left: " +
                this.padDisplay(Math.floor(this.time / 60000)) +
                ":" +
                this.padDisplay(Math.floor((this.time % 60000) / 1000)) +
                "\n";
        } else outText += "Time's up!\n";
        outText += "Score: " + this.score + "\n\n";
        outText += "Current item:\n\t" + this.item + "\n\n";
        outText += "Required items:\n";
        for (var i = 0; i < this.requiredItems.length; i++) {
            outText += "(" + (i + 1) + ") " + this.requiredItems[i] + "\n";
        }
        this.setText(outText);
    }

    padDisplay(text) {
        return ("00" + text).slice(-2);
    }

    randomInt(limit) {
        return Math.floor(Math.random() * limit);
    }

    getRequiredItems() {
        return this.requiredItems;
    }

    submit(index) {
        if (!this.started || !this.acceptItems) return;
        this.score += this.scoreIncrement;

        //TODO: Refactor to only push only when there is no such component
        this.componentCollection.push({
            name: this.requiredItems[index],
            quantity: 1,
        });
        this.requiredItems[index] = null;
        for (var i in this.assemblyTables)
            this.assemblyTables[i].setRequiredItems(this.requiredItems);
        this.orderDisplay.removeOrder(index);
        const j = index;
        setTimeout(() => {
            this.requiredItems[index] = this.productItems[
                this.randomInt(this.productItems.length)
            ];
            for (var i in this.assemblyTables)
                this.assemblyTables[i].setRequiredItems(this.requiredItems);
            this.orderDisplay.updateOrder(index, this.requiredItems[j]);
        }, ScoreController.timeout);
        this.updateDisplay();
    }
}

Phaser.GameObjects.GameObjectFactory.register(
    "scoreController",
    function (gridX, gridY, productItems, orderCount, scoreIncrement) {
        var text = new ScoreController(
            this.scene,
            gridX,
            gridY,
            productItems,
            orderCount,
            scoreIncrement
        );

        this.displayList.add(text);
        this.updateList.add(text);

        return text;
    }
);
