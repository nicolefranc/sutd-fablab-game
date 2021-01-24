import Appliance from './Appliance'
import LevelUtil from '../util/LevelUtil'
import Items from '../items/Materials'

/**
 * Table to store material - for proof of concept (or more like bcs I didn't read -_-)
 */
export default class Table extends Appliance {
    
    /**
     * Constructor to create a table
     * @param {number} x x-coordinate of table
     * @param {number} y y-coordinate of table 
     */
    constructor(x,y,scene,initialSprite) {
        super(x,y,scene,initialSprite);
        initializeStorage();
    }

    /**
     * Initialize this appliance's storage as empty
     */
    initializeStorage(){
        this.storage = null;
    }

    /**
     * Return current item in storage, if any
     */
    getStorage(){
        return this.storage;
    }

    /**
     * Interact with table - in this case player's and table's inventories are swapped
     * @param {object} item item that player is holding 
     */
    interact(item){
        var returnItem = this.getStorage();
        if (returnItem !== item) this.updateVisuals(item);
        this.replaceStorage(item);
        return returnItem;
    }

    // TODO
    initializePhaserLogic(scene,initialSprite){
        this.visual = scene.add.rectangle(this.x,this.y,LevelUtil.tileSize,LevelUtil.tileSize,0x000000);
    }

    // TODO
    updatePhaserLogic(...args){
        if (args[0] === null) this.visual.fillColor = "0x000000";
        else this.visual.fillColor = Items.itemList[args[0]]["color"];
    }


}