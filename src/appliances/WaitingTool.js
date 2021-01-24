import Appliance from './Appliance'
import LevelUtil from '../util/LevelUtil'
import Items from '../items/Materials'

export default class WaitingTool extends Appliance {

    constructor(x,y,scene,initialSprite,inputMaterialType,outputMaterialType,processCounterLimit,processTickLength,
        faultCounterLimit,faultTickLength,faultChance) {
        super(x,y,scene,initialSprite);
        if (!(inputMaterialType in Items.itemList)) throw "MaterialBox class: Constructor: invalid inputMaterialType specified";
        if (!(outputMaterialType in Items.itemList)) throw "MaterialBox class: Constructor: invalid outputMaterialType specified";
        this.inputMaterialType = inputMaterialType;
        this.outputMaterialType = outputMaterialType;
        this.state = WaitingTool.states[0];
        this.processCounter = 0;
        this.processCounterLimit = processCounterLimit;
        this.processTickLength = processTickLength;
        this.faultResolvedFlag = false;
        this.faultCounter = 0;
        this.faultCounterLimit = faultCounterLimit;
        this.faultTickLength = faultTickLength;
        this.faultChance = faultChance;
        this.faultTimeout = null;
    }

    static get states(){
        return ["standby","processing","stuck","broken","completed"];
    }

    static get stateDisplay(){
        return ["Ready", "P: ", "S: ", "Broken", "Complete"];
    }

    interact(item) {
        switch (this.state) {
            
            case WaitingTool.states[1]:
                return item;

            case WaitingTool.states[2]:
                clearTimeout(this.faultTimeout);
                this.state = WaitingTool.states[1];
                this.faultResolvedFlag = true;
                this.updatePhaserLogic(this.processCounter);
                setTimeout(() => {this.processTick()}, this.processTickLength);
                return item;

            case WaitingTool.states[3]:
                this.state = WaitingTool.states[0];
                this.processCounter = 0;
                this.faultResolvedFlag = false;
                this.faultCounter = 0;
                this.updatePhaserLogic();
                return item;
            
            case WaitingTool.states[4]:
                if ((item === null) || (item === this.inputMaterialType)) {
                    this.processCounter = 0;
                    this.faultResolvedFlag = false;
                    this.faultCounter = 0;
                    if (item === null) {
                        this.state = WaitingTool.states[0];
                        this.updatePhaserLogic();
                        return this.outputMaterialType;
                    }
                }
                else {return item;}

            case WaitingTool.states[0]:
                if (item !== this.inputMaterialType) return item;
                setTimeout(() => {this.processTick()}, this.processTickLength);
                if (this.state === WaitingTool.states[4]) {
                    this.state = WaitingTool.states[1];
                    this.updatePhaserLogic(0);
                    return this.outputMaterialType;
                }
                this.state = WaitingTool.states[1];
                this.updatePhaserLogic(0);
                return null;
        }
    }

    initializePhaserLogic(scene,initialSprite){
        this.stateVisual = scene.add.text(this.x+(LevelUtil.tileSize/2),this.y-20,"Ready");
        this.stateVisual.setOrigin(0,0);
        this.visual = scene.add.rectangle(this.x,this.y,LevelUtil.tileSize,LevelUtil.tileSize,0xff0000);
    }

    updatePhaserLogic(...args){
        var index = WaitingTool.states.indexOf(this.state);
        var indicatorString = WaitingTool.stateDisplay[index];
        if ([1,2].indexOf(index) !== -1) indicatorString += args[0];
        this.stateVisual.text = indicatorString;
        return;
    }

    processTick(){
        this.processCounter++;
        if (this.processCounter < this.processCounterLimit) {
            if ((!this.faultResolvedFlag) && (Math.random() <= this.faultChance)){
                this.processCounter--;
                this.state = WaitingTool.states[2];
                this.updatePhaserLogic(this.faultCounter);
                this.faultTimeout = setTimeout(() => {this.faultTick()}, this.faultTickLength);
                return;
            }
            else {
                this.updatePhaserLogic(this.processCounter);
                setTimeout(() => {this.processTick()}, this.processTickLength);
                return;
            }
        }
        this.state = WaitingTool.states[4];
        this.updatePhaserLogic();
        return;
    }

    faultTick(){
        this.faultCounter++;
        if (this.faultCounter < this.faultCounterLimit) {
            this.updatePhaserLogic(this.faultCounter);
            this.faultTimeout = setTimeout(() => {this.faultTick()}, this.faultTickLength);
            return;
        }
        this.state = WaitingTool.states[3];
        this.updatePhaserLogic();
        return;
    }

}