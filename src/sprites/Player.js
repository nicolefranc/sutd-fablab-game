import Appliance from "../appliances/appliance.js"

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame,scoreController){
        super(scene,x,y,texture,frame);
        this.heldItem = null;
        this.dirnx = 0;
        this.dirny = 0;
        this.scoreController = scoreController;
        //this.anims.play("gurl-down");
    }

    setItem(item){
        //console.log("New item: "+item);
        this.scoreController.setItem(item);
        this.heldItem = item;
    }

    /** @param{Phaser.Types.Input.Keyboard.CursorKeys} cursors  */
    update(cursors){
        // figure out how to do virtual joystick type stuff
        let down = cursors.down.isDown;
        let up = cursors.up.isDown;
        let left = cursors.left.isDown;
        let right = cursors.right.isDown;

        let vx = (right?1:0)-(left?1:0);
        let vy = (down?1:0)-(up?1:0);
        if (vx != 0 || vy != 0) {
            // if player not moving, should still face same direction.
            this.dirnx = vx;
            this.dirny = vy;
        }
        let speed = 100;
        let sightLength = 50;

        // set animation here

        this.setVelocity(vx*speed, vy*speed);

        let lookList = this.scene.physics.overlapCirc(this.x+this.dirnx*sightLength, this.y+this.dirny*sightLength, 1,
            false, true);
        let lookingAt = lookList.find(body => body.gameObject instanceof Appliance);
        if(lookingAt !== undefined){

            lookingAt.gameObject.onLook();

            if(Phaser.Input.Keyboard.JustDown(cursors.space)){
                let item = lookingAt.gameObject.interact(this.heldItem);
                this.setItem(item);
            }
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('player', function (x, y, texture, frame, scoreController) {
	var sprite = new Player(this.scene, x, y, texture, frame, scoreController)

	this.displayList.add(sprite)
	this.updateList.add(sprite)

	this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

	sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8)

	return sprite
})