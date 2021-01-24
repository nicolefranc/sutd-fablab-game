import Appliance from './Appliance'

export default class Bin extends Appliance {
    
    constructor(x,y,scene,initialSprite){
        super(x,y,scene,initialSprite);
    }

    interact(item){
        this.updatePhaserLogic();
        return null;
    }

    initializePhaserLogic(scene){
        this.visual = scene.add.rectangle(this.x,this.y,LevelUtil.tileSize,LevelUtil.tileSize,0x000000);
    }
    
    updatePhaserLogic(scene){}

}