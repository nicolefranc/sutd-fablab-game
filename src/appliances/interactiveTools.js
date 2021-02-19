import Appliance from "./appliance";
import Resources from "../resources/resources";
import WaitingTool from "./waitingTools";

const MAX_PROGRESS = 10000;

export default class InteractiveTool extends Appliance {
    constructor(scene, gridX, gridY, toolType) {
        var x =
            (Resources.interactiveTools[toolType].multiplyOffset[0] + gridX) *
            Resources.tileLength;
        var y =
            (Resources.interactiveTools[toolType].multiplyOffset[1] + gridY) *
            Resources.tileLength;
        var texture = Resources.interactiveTools[toolType].texture;
        super(scene, x, y, texture, 0);
        this.state = 0;
        this.materialTable = Resources.interactiveTools[toolType].materialTable;
        this.currentProgress = 0.0;
        this.expectedOutput = null;
        this.childText = scene.add.text(x, y - Resources.tileLength, "Idle", {
            color: "0x000000",
        });
        this.childText.setOrigin(0.5, 0.5);
    }
    //update function
    preUpdate(time, dt) {
        if (this.state === 2) {
            //state 2; show Done, item can be collected
            this.childText.setText(`Done!`);
        }
    }
    //interact
    interact(item) {
        switch (this.state) {
            //state 0: idle, accept material
            case 0:
                if (item in this.materialTable) {
                    this.state = 1;
                    this.expectedOutput = this.materialTable[item]["output"];
                    this.childText.setText("Processing");
                    return null;
                }
                return item;

            //state 1: processing
            case 1:
                if (item === null) {
                    //When progress bar is filled, change to state 2
                    if (this.currentProgress === MAX_PROGRESS) {
                        this.currentProgress = 0;
                        this.state = 2;
                    } else {
                        //increase progress whenever Player interacts with it empty-handed
                        if (this.currentProgress < MAX_PROGRESS) {
                            this.childText.setText(
                                `Processing: \n\t\t\t${Math.floor(
                                    (100 * this.currentProgress) / MAX_PROGRESS
                                )}%`
                            );
                        }
                        this.currentProgress += 0.1 * MAX_PROGRESS;
                    }
                    return null;
                } else return item;
            //state 2: done
            case 2:
                let output = this.expectedOutput;
                if (item !== null && !(item in this.materialTable)) return item;
                else {
                    this.expectedOutput = null;
                    //if player is empty-handed, machine turns back to idle
                    if (item === null) {
                        this.state = 0;
                        this.childText.setText("Idle");

                        //if player is holding onto a process-able material, machine turns to state 1
                    } else {
                        this.childText.setText("Processing");
                        this.state = 1;
                    }
                    return output;
                }
        }
    }
}
Phaser.GameObjects.GameObjectFactory.register("drill", function (gridX, gridY) {
    var sprite = new InteractiveTool(this.scene, gridX, gridY, "drill");

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
        sprite,
        Phaser.Physics.Arcade.STATIC_BODY
    );

    sprite.body.setSize(
        sprite.width *
            Resources.interactiveTools.drill.physicsBodyProportions[0],
        sprite.height *
            Resources.interactiveTools.drill.physicsBodyProportions[1]
    );
});
Phaser.GameObjects.GameObjectFactory.register("saw", function (gridX, gridY) {
    var sprite = new InteractiveTool(this.scene, gridX, gridY, "saw");

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
        sprite,
        Phaser.Physics.Arcade.STATIC_BODY
    );

    sprite.body.setSize(
        sprite.width *
            Resources.interactiveTools.drill.physicsBodyProportions[0],
        sprite.height *
            Resources.interactiveTools.drill.physicsBodyProportions[1]
    );
});
Phaser.GameObjects.GameObjectFactory.register(
    "solderStation",
    function (gridX, gridY) {
        var sprite = new InteractiveTool(
            this.scene,
            gridX,
            gridY,
            "solderStation"
        );

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.STATIC_BODY
        );

        sprite.body.setSize(
            sprite.width *
                Resources.interactiveTools.drill.physicsBodyProportions[0],
            sprite.height *
                Resources.interactiveTools.drill.physicsBodyProportions[1]
        );
    }
);
