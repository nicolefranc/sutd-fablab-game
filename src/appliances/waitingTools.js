import Appliance from "./appliance";
import Resources from "../resources/resources";

export default class WaitingTool extends Appliance{

    constructor(scene,gridX,gridY,toolType) {
        if (!(toolType in Resources.waitingTools)) throw "WaitingTool class: Invalid toolType specified.";
        var x = ((Resources.waitingTools[toolType]["multiplyOffset"][0] + gridX) * Resources.tileLength);
        var y = ((Resources.waitingTools[toolType]["multiplyOffset"][1] + gridY) * Resources.tileLength);
        var texture = Resources.waitingTools[toolType]["texture"];

        super(scene,x,y,texture,0);

        this.materialTable = Resources.waitingTools[toolType]["materialTable"];

        this.state = 0;
        this.processPeriod = 10000;
        this.processProgress = 0;
        this.faultCleared = false;
        this.faultTimeout = null;
        this.faultPeriod = 10000;
        this.breakdownChance = 0.1;
        this.expectedOutput = null;
    }

    preUpdate(time,dt) {
        if (this.state === 0){
            this.tint = 0xffffff;
        }
        if (this.state === 1){
            this.processProgress += dt;
            if (this.processProgress >= this.processPeriod) {
                this.tint = WaitingTool.stateTint[4];
                this.state = 4;
                return;
            }
            if ((!this.faultCleared) && (Math.random()<=this.breakdownChance)) {
                this.tint = WaitingTool.stateTint[2];
                this.state = 2;
                this.faultTimeout = setTimeout(() => {
                    this.breakdown();
                }, this.faultPeriod);
            }
        }
    }

    breakdown() {
        this.state = 3;
        this.tint = WaitingTool.stateTint[3];
    }

    interact(item) {
        switch(this.state) {
            case 0:
                if (item in this.materialTable) {
                    this.tint = WaitingTool.stateTint[1];
                    this.state = 1;
                    this.expectedOutput = this.materialTable[item]["output"];
                    return null;
                }
                return item;
            case 1:
                return item;
            case 2:
                this.tint = WaitingTool.stateTint[1];
                this.state = 1;
                this.faultCleared = true;
                return item;
            case 3:
                this.faultCleared = false;
                this.faultTimeout = null;
                this.processProgress = 0;
                this.expectedOutput = null;
                this.tint = WaitingTool.stateTint[0];
                this.state = 0;
                return item;
            case 4:
                if ((item !== null) && (item in this.materialTable)) return item;
                this.faultCleared = false;
                this.faultTimeout = null;
                this.processProgress = 0;
                var output = this.expectedOutput;
                this.expectedOutput = null;
                if (item === null) {
                    this.tint = WaitingTool.stateTint[0];
                    this.state = 0;
                }
                else {
                    this.tint = WaitingTool.stateTint[1];
                    this.state = 1;
                    this.expectedOutput = this.materialTable[item]["output"];
                }
                return output;
        }
    }

    onLook(){
        if (this.state === 0){
            this.tint = 0xaaaaaa;
        }
    }

    static get stateTint() {
        return [0xffffff,0x0000ff,0xffff00,0xff0000,0x00ff00]
    }

    
}

Phaser.GameObjects.GameObjectFactory.register("laserCutter", function (gridX, gridY) {
    var sprite = new WaitingTool(this.scene,gridX,gridY,"laserCutter");
    
    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite,Phaser.Physics.Arcade.STATIC_BODY);

    sprite.body.setSize(sprite.width * Resources.waitingTools["laserCutter"]["physicsBodyProportions"][0],
     sprite.height * Resources.waitingTools["laserCutter"]["physicsBodyProportions"][1]);
});

Phaser.GameObjects.GameObjectFactory.register("threeDPrinter", function (gridX, gridY) {
    var sprite = new WaitingTool(this.scene,gridX,gridY,"threeDPrinter");
    
    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite,Phaser.Physics.Arcade.STATIC_BODY);

    sprite.body.setSize(sprite.width * Resources.waitingTools["threeDPrinter"]["physicsBodyProportions"][0],
     sprite.height * Resources.waitingTools["threeDPrinter"]["physicsBodyProportions"][1]);
});