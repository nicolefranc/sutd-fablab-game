import Appliance from "./appliance";
import Resources from "../resources/resources";
import SettingsMenu from "../scenes/SettingsMenu";

export default class WaitingTool extends Appliance {
    constructor(scene, gridX, gridY, toolType) {
        if (!(toolType in Resources.waitingTools))
            throw "WaitingTool class: Invalid toolType specified.";
        var x =
            (Resources.waitingTools[toolType]["multiplyOffset"][0] + gridX) *
            Resources.tileLength;
        var y =
            (Resources.waitingTools[toolType]["multiplyOffset"][1] + gridY) *
            Resources.tileLength;
        var texture = Resources.waitingTools[toolType]["texture"];

        super(scene, x, y, texture, 0);

        this.materialTable = Resources.waitingTools[toolType]["materialTable"];

        this.state = 0;
        this.toolType = toolType;
        this.processPeriod = 10000;
        this.processProgress = 0;
        this.faultCleared = false;
        this.faultPeriod = 10000;
        this.faultProgress = 0;
        this.breakdownChance = 0.001;
        this.expectedOutput = null;
        this.childText = scene.add.text(x, y - Resources.tileLength, "Idle", {
            color: "0x000000",
        });
        this.childText.setOrigin(0.5, 0.5);
        this.createProgressBar();
    }

    preUpdate(time, dt) {
        /*if (this.state === 0){
            this.tint = 0xffffff;
        }*/
        this.updateProgressBar(this.processProgress / this.processPeriod);
        if (this.state === 1) {
            this.processProgress += dt;
            if (this.processProgress >= this.processPeriod) {
                //this.tint = WaitingTool.stateTint[4];
                this.state = 4;
                this.childText.setText("Done!");
                return;
            }
            if (!this.faultCleared && Math.random() <= this.breakdownChance) {
                //this.tint = WaitingTool.stateTint[2];
                this.state = 2;
                this.childText.setText("Faulty");
                return;
            }
            var display = "Processing";
            for (
                var i = 0;
                i < Math.floor((this.processProgress / this.processPeriod) * 5);
                i++
            )
                display += ".";
            this.childText.setText(display);
            return;
        }
        if (this.state === 2) {
            this.faultProgress += dt;
            if (this.faultProgress >= this.faultPeriod) {
                //this.tint = WaitingTool.stateTint[3];
                this.state = 3;
                this.childText.setText("Broken!");
                return;
            }
            var display = "Faulty";
            for (
                var i = 0;
                i < Math.floor((this.faultProgress / this.faultPeriod) * 5);
                i++
            )
                display += ".";
            this.childText.setText(display);
        }
    }

    interact(item) {
        switch (this.state) {
            case 0:
                if (item in this.materialTable) {
                    //this.tint = WaitingTool.stateTint[1];
                    this.state = 1;
                    switch (this.toolType) {
                        case "laserCutter":
                            this.scene.laserSFX = this.scene.sound.add(
                                "laserCutterSFX"
                            );
                            this.scene.sound.play("laserCutterSFX", {
                                volume: SettingsMenu.sfxVolume,
                            });
                            break;
                        case "threeDPrinter":
                            this.scene.printerSFX = this.scene.sound.add(
                                "threeDPrinterSFX"
                            );
                            this.scene.sound.play("threeDPrinterSFX", {
                                volume: SettingsMenu.sfxVolume,
                            });
                            break;
                    }
                    this.expectedOutput = this.materialTable[item]["output"];
                    this.childText.setText("Processing");
                    return null;
                }
                return item;
            case 1:
                return item;
            case 2:
                //this.tint = WaitingTool.stateTint[1];
                this.state = 1;
                this.faultCleared = true;
                this.childText.setText("Processing");
                return item;
            case 3:
                this.faultCleared = false;
                this.faultTimeout = null;
                this.processProgress = 0;
                this.faultProgress = 0;
                this.expectedOutput = null;
                //this.tint = WaitingTool.stateTint[0];
                this.state = 0;
                this.childText.setText("Idle");
                return item;
            case 4:
                if (item !== null && !(item in this.materialTable)) return item;
                this.scene.sound.play("completedSFX", {
                    volume: SettingsMenu.sfxVolume,
                });
                this.faultCleared = false;
                this.faultTimeout = null;
                this.processProgress = 0;
                this.faultProgress = 0;
                var output = this.expectedOutput;
                this.expectedOutput = null;
                if (item === null) {
                    //this.tint = WaitingTool.stateTint[0];
                    this.state = 0;
                    this.childText.setText("Idle");
                } else {
                    //this.tint = WaitingTool.stateTint[1];
                    this.state = 1;
                    this.expectedOutput = this.materialTable[item]["output"];
                    this.childText.setText("Processing...");
                }
                return output;
        }
    }

    onLook() {
        /*if (this.state === 0){
            this.tint = 0xaaaaaa;
        }*/
    }

    static get stateTint() {
        return [0xffffff, 0x0000ff, 0xffff00, 0xff0000, 0x00ff00];
    }
}

Phaser.GameObjects.GameObjectFactory.register(
    "laserCutter",
    function (gridX, gridY) {
        var sprite = new WaitingTool(this.scene, gridX, gridY, "laserCutter");

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.STATIC_BODY
        );

        sprite.body.setSize(
            sprite.width *
                Resources.waitingTools["laserCutter"][
                    "physicsBodyProportions"
                ][0],
            sprite.height *
                Resources.waitingTools["laserCutter"][
                    "physicsBodyProportions"
                ][1]
        );
    }
);

Phaser.GameObjects.GameObjectFactory.register(
    "threeDPrinter",
    function (gridX, gridY) {
        var sprite = new WaitingTool(this.scene, gridX, gridY, "threeDPrinter");

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.STATIC_BODY
        );

        sprite.body.setSize(
            sprite.width *
                Resources.waitingTools["threeDPrinter"][
                    "physicsBodyProportions"
                ][0],
            sprite.height *
                Resources.waitingTools["threeDPrinter"][
                    "physicsBodyProportions"
                ][1]
        );
    }
);
