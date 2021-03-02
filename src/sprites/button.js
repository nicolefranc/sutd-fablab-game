import Phaser from "phaser";
export default class Button {
    constructor(scene, x, y, texture, scale, clickCallback, secondaryTexture) {
        this.primaryTexture = texture;
        this.image = scene.add.image(x, y, texture);
        this.superScale = scale;
        this.image.scale = scale;
        this.active = false;
        this.image.setInteractive({ useHandCursor: true });
        this.callback = clickCallback;
        this.secondaryTexture =
            secondaryTexture === undefined ? null : secondaryTexture;
        this.image.on("pointerdown", () => {
            this.active = true;
            if (this.secondaryTexture === null) this.setScaleAlt(1.05);
            else this.image.setTexture(this.secondaryTexture);
        });
        this.image.on("pointerup", () => {
            if (this.active) {
                this.callback();
            }
            this.active = false;
            if (this.secondaryTexture === null) this.setScaleAlt(1.1);
            else this.image.setTexture(this.primaryTexture);
        });
        this.image.on("pointerover", () => {
            if (this.secondaryTexture === null) {
                this.image.setTint("0xffffff");
                this.setScaleAlt(1.1);
            }
        });
        this.image.on("pointerout", () => {
            this.active = true;
            if (this.secondaryTexture === null) {
                this.image.setTint("0xfafafa");
                this.setScaleAlt(1);
            } else this.image.setTexture(this.primaryTexture);
        });
    }

    setScaleAlt(scale) {
        this.image.scale = scale * this.superScale;
    }

    enable(value) {
        if (value) this.image.setInteractive();
        else this.image.disableInteractive();
    }

    setVisible(value) {
        this.image.visible = value;
    }
}
