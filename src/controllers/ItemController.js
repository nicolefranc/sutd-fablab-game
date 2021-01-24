export default class ItemController {
    
    constructor(x,y,scene,initialSprite,itemList,queueLength){
        this.initializePhaserLogic(x,y,scene,initialSprite,queueLength);
        this.itemList = itemList;
        this.requiredItems = []
        for (var i=0;i<queueLength;i++){
            this.requiredItems.push(itemList[this.randomInt(itemList.length)]);
        }
        this.updatePhaserLogic(null);
    }

    initializePhaserLogic(x,y,scene,initialSprite,queueLength){
        this.visual = scene.add.text(x,y,"");
    }

    updatePhaserLogic(index){
        this.visual.text = "" + this.requiredItems;
    }

    clearCurrentRequiredItem(index){
        this.requiredItems[index] = this.itemList[this.randomInt(this.itemList.length)];
        this.updatePhaserLogic(index);
    }

    getRequiredItems(){
        return this.requiredItems;
    }

    randomInt(maxInt){
        var randInt = Math.floor(Math.random() * Math.floor(maxInt));
        alert(randInt);
        return randInt;
    }

}