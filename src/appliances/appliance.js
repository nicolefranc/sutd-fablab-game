import Phaser from 'phaser'

export default class Appliance extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
    }

    preUpdate(time,delta){
        throw "Appliance abstract class: preUpdate() function not available."
    }

    interact(item){
        throw "Appliance abstract class: interact() function not available."
    }
}