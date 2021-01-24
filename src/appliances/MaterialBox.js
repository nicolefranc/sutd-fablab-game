import Appliance from './Appliance'
import MaterialBoxes from '../items/MaterialBoxes'

/**
 * Abstract material box to output materials
 */
export default class MaterialBox extends Appliance {

    static get textClearTimeout() {
        return 2000;
    }

    constructor(x,y,scene,materialType){
        alert(materialType);
        if (!(materialType in MaterialBoxes.materialBoxesList)) throw "MaterialBox class: Constructor: invalid materialType specified";
        var materialBoxSprite = MaterialBoxes.spriteNamespace + MaterialBoxes.materialBoxesList[materialType]["imgId"];
        super(x,y,scene,materialBoxSprite);
        this.materialType = materialType;
        this.timeoutObj = null;
    }

    interact(item){
        if (item === null) {
            this.updatePhaserLogic(true);
            return this.materialType;
        }
        if (item === this.materialType) {
            this.updatePhaserLogic(false);
            return null;
        }
        else return item;
    }

    initializePhaserLogic(scene,initialSprite){
        if (scene.materialBoxes === undefined){
            scene.materialBoxes = scene.physics.add.staticGroup();
        }

        this.hitbox = scene.add.rectangle(this.x,this.y+137,549,439,"0xffffff","0");
        this.hitbox.setOrigin(0,0);
        scene.physics.add.existing(this.hitbox,1);
        scene.materialBoxesadd(this.hitbox);

        this.sprite = scene.add.sprite(this.x,this.y,initialSprite);
        this.sprite.setOrigin(0,0);

        this.clickbox = scene.add.rectangle(this.x,this.y,549,137,"0xffffff",1);
        this.clickbox.setOrigin(0,0);

        this.clickbox.setInteractive();
        this.clickbox.on('pointerup', () => {
            this.interact(scene.item);
        })

        this.text = scene.add.text(this.x+274,this.y-50,"");
    }

    updatePhaserLogic(...args){
        if (this.timeoutObj !==null) clearTimeout(this.timeoutObj);
        if (args[0]) this.text.setText("Withdrawn!");
        else this.text.setText("Deposited!");
        setTimeout(() => {this.text.setText("")}, MaterialBoxes.textClearTimeout);
    }

}