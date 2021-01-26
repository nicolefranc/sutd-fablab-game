import Appliance from './appliance'
import Resources from '../resources/resources'
import Phaser from 'phaser'

export default class MaterialBox extends Appliance {
    constructor(scene,gridX,gridY,materialType){
        if (!(materialType in Resources.materialBoxes)) throw "MaterialBox class: Invalid materialType specified.";
        super(scene,(0.5 + gridX) * Resources.tileLength,(0.5 + gridY) * Resources.tileLength,'blankTile',0);
        this.materialType = materialType;
    }

    preUpdate(time,delta) {}

    interact(item) {
        if (item === materialType) return null;
        if (item === null) return this.materialType;
        return item;
    }
}

Phaser.GameObjects.GameObjectFactory.register('materialBox', function (gridX, gridY, materialType) {
    var sprite = new MaterialBox(this.scene,gridX,gridY,materialType);
    
    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite,Phaser.Physics.Arcade.STATIC_BODY);

    sprite.body.setSize(sprite.width * 0.8, sprite.height * 0.8);
});
