import Phaser from "phaser";
import Resources from "../resources/resources";

export default class OrderDisplay {
    constructor(gridX, gridY, scene) {
        this.displayArray = null;
        this.x = gridX * Resources.tileLength + 10;
        this.y = gridY * Resources.tileLength + 10;
        this.scene = scene;
    }

    // Called in scoreController.js in attachOrderDisplay()
    initialize(requiredItems) {
        this.displayArray = [];
        for (var i in requiredItems) {
            if (!(requiredItems[i] in Resources.items))
                throw "OrderDisplay class: invalid order material defined";
            const tempItem = {};
            this.displayArray.push(tempItem);
            this.replaceItem(i, requiredItems[i]);
        }

        // console.log(this.displayArray);
    }

    replaceItem(i, item) {
        // Item is a string representing the resource name
        const imageKey = item + "_task"; // Key of the image to be retrieved
        this.displayArray[i]["item"] = this.scene.add.sprite(
            i * 94 + 62 + this.x,
            72 + this.y,
            imageKey
        );
        this.displayArray[i]["item"].scale = 0.08;
    }

    removeOrder(index) {
        if (this.displayArray === null)
            throw "OrderDisplay class: initialization not done yet";
        this.displayArray[index]["item"].destroy();
        this.displayArray[index]["item"] = null;
    }

    updateOrder(index, requiredItem) {
        if (this.displayArray === null)
            throw "OrderDisplay class: initialization not done yet";
        if (!(requiredItem in Resources.items))
            throw "OrderDisplay class: invalid order material defined";
        this.replaceItem(index, requiredItem);
    }
}
