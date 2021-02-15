import Phaser from 'phaser'
import Resources from '../resources/resources';

export default class OrderDisplay {

    constructor(gridX,gridY,scene){
        this.displayArray = null;
        this.x = gridX*Resources.tileLength + 10;
        this.y = gridY*Resources.tileLength + 10;
        this.scene = scene;
    }

    initialize(requiredItems) {
        this.displayArray = [];
        for (var i in requiredItems) {
            if (!(requiredItems[i] in Resources.items)) throw "OrderDisplay class: invalid order material defined";
            const tempItem = {};
            tempItem["orderContainer"] = this.scene.add.rectangle(i*94 + 62 + this.x,72+this.y,76,100,"0xffffff");
            tempItem["orderContainer"].strokeColor = "0x000000";
            tempItem["orderContainer"].isStroked = true;
            tempItem["orderContainer"].lineWidth = 2;
            this.displayArray.push(tempItem);
            this.replaceItem(i,requiredItems[i]);
        }
    }

    replaceItem(i,item) {
        this.displayArray[i]["item"] = this.scene.add.sprite(i*94 + 62 + this.x,72+this.y,item);
        this.displayArray[i]["item"].scale = 0.08;
    }

    removeOrder(index) {
        if (this.displayArray === null) throw "OrderDisplay class: initialization not done yet";
        this.displayArray[index]["item"].destroy();
        this.displayArray[index]["item"] = null;
        this.displayArray[index]["orderContainer"].visible = false;
    }

    updateOrder(index,requiredItem) {
        if (this.displayArray === null) throw "OrderDisplay class: initialization not done yet";
        if (!(requiredItem in Resources.items)) throw "OrderDisplay class: invalid order material defined";
        this.replaceItem(index,requiredItem);
        this.displayArray[index]["orderContainer"].visible = true;
    }
}