import Appliance from './Appliance'

export default class AssemblyTable extends Appliance {
    
    constructor(x,y,scene,initialSprite) {
        super(x,y,scene,initialSprite);
        this.requiredItems = null;
    }

    attachScoreController(scoreController){
        this.scoreController = scoreController;
    }

    attachItemController(itemController){
        this.itemController = itemController;
        this.getRequiredItems();
    }

    interact(item) {
        if (this.itemController === undefined) throw "AssemblyTable class: itemController not yet attached";
        if (this.scoreController === undefined) throw "AssemblyTable class: scoreController not yet attached";
        for (var i=0;i<this.requiredItems.length;i++){
            if (item === this.requiredItems[i]) {
                this.scoreController.addScore(500);
                this.iterateRequiredItem(i);
                this.getRequiredItems();
                return;
            }
        }
        return null;
    }

    initializePhaserLogic(scene,initialSprite){
        
    }

    updatePhaserLogic(...args){}

    getRequiredItems(){
        if (this.itemController === undefined) throw "AssemblyTable class: itemController not yet attached";
        this.requiredItems = this.itemController.getRequiredItems();
    }

    iterateRequiredItem(index){
        this.itemController.clearCurrentRequiredItem(index);
    }

}