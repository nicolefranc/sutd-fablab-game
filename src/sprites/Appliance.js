import Phaser from "phaser"

export default class Appliance extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
    }

    preUpdate(t, dt){
        this.tint = 0xffffff;
    }

    interact(item){
        return item;
    }
}

export class ItemBin extends Appliance{
    constructor(scene, x, y, texture, item, frame){
        super(scene,x,y,texture,frame);
        this.item=item;
    }

    interact(item){
        if (item === this.item){
            // player returns item to bin
            return null;
        }else if (item === null){
            // player picks up item
            return this.item;
        } else {
            // maybe play a failure sound effect
            return item;
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('itemBin', function (x, y, texture, item, frame) {
	var sprite = new ItemBin(this.scene, x, y, texture, item, frame)

	this.displayList.add(sprite)
	this.updateList.add(sprite)

	this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.STATIC_BODY)

	sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8)

	return sprite
})

export class TimedAppliance extends Appliance{

    // table is a dict in this format:
    // {[from item id]: {result:[to item id], time: [float]}}
    constructor(scene, x, y, texture, table, frame){
        super(scene,x,y,texture,frame);
        this.table=table;
        this.heldItem = null;
        this.cooldown = 0;
    }
    
    preUpdate(t, dt){
        super.preUpdate(t, dt);
        if (this.cooldown > 0) {
            this.cooldown-= dt;
            this.tint = 0xff8800;
        }
    }

    interact(item){
        if (this.cooldown > 0){
            //appliance not done processing
            return item;
        }else if (item === null && this.heldItem !== null) {
            //processing done, return new item
            let t = this.heldItem;
            this.heldItem = null;
            return t;
        }else if (this.heldItem === null && item in this.table) {
            this.heldItem = this.table[item].result;
            this.cooldown = this.table[item].time;
            return null;
        } else {
            return item;
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('timedAppliance', function (x, y, texture, table, frame) {
	var sprite = new TimedAppliance(this.scene, x, y, texture, table, frame)

	this.displayList.add(sprite)
	this.updateList.add(sprite)

	this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.STATIC_BODY)

	sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8)

	return sprite
})