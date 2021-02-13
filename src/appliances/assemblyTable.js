import Appliance from './appliance'
import Resources from '../resources/resources'

export default class AssemblyTable extends Appliance {

    constructor(scene,gridX,gridY) {
        super(scene,(gridX + 0.5)*Resources.tileLength,(gridY + 1)*Resources.tileLength,'blankVerticalTiles',0);
        this.scoreController = null;
        this.requiredItems = null;
    }

    attachScoreController(scoreController) {
        this.scoreController = scoreController;
        scoreController.addAssemblyTable(this);
    }

    setRequiredItems(requiredItems) {
        this.requiredItems = requiredItems;
    }

    interact(item) {
        if (this.scoreController === null) throw "AssemblyTable class: scoreController not attached";
        if (item === null) return null;
        const index = this.requiredItems.indexOf(item);
        if (index !== -1) {
            this.scoreController.submit(index);
        }
        return null;
    }

}

Phaser.GameObjects.GameObjectFactory.register("assemblyTable", function (gridX,gridY) {
    var sprite = new AssemblyTable(this.scene,gridX,gridY);
    
    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite,Phaser.Physics.Arcade.STATIC_BODY);

    sprite.body.setSize(sprite.width * 0.8,
     sprite.height * 0.9);
    return sprite;
});