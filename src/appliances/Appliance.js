/**
 * Abstract class for appliances
 * This includes material boxes, tables and both waiting and interactive tools
 */
export default class Appliance {

    /**
     * Constructor for appliance - please do not use
     * @param {number} x x-coordinate of appliance
     * @param {number} y y-coordinate of appliance
     * @param {Phaser.Scene} scene scene in which to deploy appliance 
     */
    constructor(x,y,scene,initialSprite){
        this.initializePos(x,y);
        this.initializePhaserLogic(scene,initialSprite);
    }

    /**
     * Initialize position of the appliance's top-left corner
     * This also initializes visuals
     * @param {number} x x-coordinate of appliance
     * @param {number} y y-coordinate of appliance
     */
    initializePos(x,y){
        this.x = x;
        this.y = y;
    }

    /**
     * Draw visual representation of appliance. Must be called using initializePos
     * Since this is an abstract function, invoking it here will throw an error instead
     */
    initializePhaserLogic(scene,initialSprite){
        throw "Appliance abstract class: abstract method initializeVisuals() not avaiilable";
    }

    /**
     * Update visual representation of appliance - to be called within interact function
     * For example, begin a throwing animation
     * This is an abstract function
     * @param  {...any} args parameters required for visual updates
     */
    updatePhaserLogic(...args){
        throw "Appliance abstract class: abstract method updatePhaserLogic() not available";
    }

    terminatePhaserLogic(...args){
        throw "Appliance abstract class: abstract method terminatePhaserLogic() not available";
    }
    
    /**
     * Abstract function: interact with appliance
     * @param item: item that player is holding
     * Normally returns an item object, but in this case it will throw an error instead
     */
    interact(item){
        throw "Appliance abstract class: abstract method interact() not avaiilable";
    }
    
    /**
     * Replace item in storage of appliance
     * @param {object} item item to place in storage 
     */
    replaceStorage(item){
        this.storage = item;
    }

}