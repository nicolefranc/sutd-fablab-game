import Phaser from 'phaser'
import Resources from "../resources/resources.js"

export default class Appliance extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
    }

    preUpdate(time,delta){
        //this.tint = 0xffffff;
    }

    onLook(){
        this.tint = "0xaaaaaa";
        //this.setBlendMode(Phaser.BlendModes.MULTIPLY);
    }

    interact(item){
        throw "Appliance abstract class: interact() function not available."
    }

    // progress bar helper functions

    createProgressBar(){
        this.pbX = this.x;
        this.pbY = this.y - 0.75*Resources.tileLength;
        this.pbOutlineWidth = Resources.tileLength;
        this.pbOutlineHeight = this.pbOutlineWidth/5;
        this.pbOutline = this.scene.add.rectangle(this.pbX, this.pbY,
            this.pbOutlineWidth, this.pbOutlineHeight, 0xaaaaaa);
        this.pbWidth = 0.9 * this.pbOutlineWidth;
        this.pbHeight = this.pbOutlineHeight/2;
        this.pbLeft = this.pbX - this.pbWidth/2
        this.progressBar = this.scene.add.rectangle(this.pbLeft, this.pbY,
            this.pbWidth, this.pbHeight, 0x00ff00);
        this.progressBar.setOrigin(0,0.5);
        this.updateProgressBar(0);
    }

    updateProgressBar(progress) {
        if(progress > 1) progress = 1;
        this.progressBar.width = this.pbWidth*progress;
        if (progress == 1){
            this.progressBar.fillColor = 0x00ff00;
        }else{
            let c = Math.floor(progress*0xff)*0x100 + 0xff0000
            this.progressBar.fillColor = c;
        }
        this.progressBar.setVisible(progress > 0);
        this.pbOutline.setVisible(progress > 0)
    }
}