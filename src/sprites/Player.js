import Phaser from "phaser";
import Appliance from "../appliances/appliance.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, gender, scoreController) {
    super(scene, x, y, texture, frame);
    if (gender === "M") {
      this.gender = "Boi";
    } else {
      this.gender = "Gurl";
    }
    this.heldItem = null;
    this.dirnx = 0;
    this.dirny = 0;
    this.scoreController = scoreController;
    this.anims.play(this.gender + "-down", true);
  }

  setItem(item) {
    this.scoreController.setItem(item);
    this.heldItem = item;
  }

  /** @param{Phaser.Types.Input.Keyboard.CursorKeys} cursors  */
  update(cursors) {
    // If the the pick button on mobile is clicked
    if (cursors === "mPickItem") {
      let sightLength = 50;
      let lookList = this.scene.physics.overlapCirc(
        this.x + this.dirnx * sightLength,
        this.y + this.dirny * sightLength,
        1,
        false,
        true
      );
      let lookingAt = lookList.find(
        (body) => body.gameObject instanceof Appliance
      );
      if (lookingAt !== undefined) {
        lookingAt.gameObject.onLook();

        let item = lookingAt.gameObject.interact(this.heldItem);
        this.setItem(item);
      }
    } else {
      let down = cursors.down.isDown;
      let up = cursors.up.isDown;
      let left = cursors.left.isDown;
      let right = cursors.right.isDown;

      let vx = (right ? 1 : 0) - (left ? 1 : 0);
      let vy = (down ? 1 : 0) - (up ? 1 : 0);
      if (vx != 0 || vy != 0) {
        // if player not moving, should still face same direction.
        this.dirnx = vx;
        this.dirny = vy;
      }
      if (vx != 0) {
        this.anims.play(this.gender + "-right", true);
        this.flipX = vx == -1;
      } else if (vy != 0) {
        this.anims.play(
          vy == 1 ? this.gender + "-down" : this.gender + "-up",
          true
        );
        this.flipX = false;
      } else {
        this.anims.stop();
      }
      let speed = 150;

      // set animation here

      this.setVelocity(vx * speed, vy * speed);

      let sightLength = 50;
      let lookList = this.scene.physics.overlapCirc(
        this.x + this.dirnx * sightLength,
        this.y + this.dirny * sightLength,
        1,
        false,
        true
      );
      let lookingAt = lookList.find(
        (body) => body.gameObject instanceof Appliance
      );
      if (lookingAt !== undefined) {
        lookingAt.gameObject.onLook();

        if (cursors.space && Phaser.Input.Keyboard.JustDown(cursors.space)) {
          let item = lookingAt.gameObject.interact(this.heldItem);
          this.setItem(item);
        }
        if (cursors.shift && Phaser.Input.Keyboard.JustDown(cursors.shift)) {
          try {
            let item = lookingAt.gameObject.interactB(this.heldItem);
            this.setItem(item);
          } catch (err) {}
        }
      }
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "player",
  function (x, y, texture, frame, gender, scoreController) {
    var sprite = new Player(
      this.scene,
      x,
      y,
      texture,
      frame,
      gender,
      scoreController
    );

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    // sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8);
    sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.4);
    sprite.body.setOffset(50, 200);

    return sprite;
  }
);
