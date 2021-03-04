import Appliance from "./appliance";
import SettingsMenu from "../scenes/SettingsMenu";
import Resources from "../resources/resources";

export default class Bin extends Appliance {
    constructor(scene, gridX, gridY) {
        var x =
            (Resources.bin.multiplyOffset[0] + gridX) * Resources.tileLength;
        var y =
            (Resources.bin.multiplyOffset[1] + gridY) * Resources.tileLength;
        var texture = Resources.bin.texture;
        super(scene, x, y, texture, 0);
    }
    interact(item) {
        this.scene.throwSFX = this.scene.sound.add("throwSFX");
        this.scene.throwSFX.play({
            volume: SettingsMenu.sfxVolume / 8,
        });
        return null;
    }
}

Phaser.GameObjects.GameObjectFactory.register("bin", function (gridX, gridY) {
    var sprite = new Bin(this.scene, gridX, gridY);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
        sprite,
        Phaser.Physics.Arcade.STATIC_BODY
    );

    sprite.body.setSize(sprite.width * 0.8, sprite.height * 0.9);
    return sprite;
});
