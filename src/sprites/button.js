import Phaser from "phaser";
export default class Button {
    constructor(scene, x, y, texture, scale, clickCallback, secondaryTexture, toggle, toggleTexture) {
        this.primaryTexture = texture;
        this.image = scene.add.image(x, y, texture);
        this.superScale = scale;
        this.image.scale = scale;
        this.active = false;
        this.image.setInteractive({ useHandCursor: true });
        this.callback = clickCallback;
        this.secondaryTexture =
            secondaryTexture === undefined ? null : secondaryTexture;
        this.toggle =
            toggle === true ? toggle : false;
        this.toggleTexture =
            (this.toggle === true && toggleTexture !== undefined) ? toggleTexture : null;
        this.image.on("pointerdown", () => {
            if (!this.enabled) return;
            this.active = true;
            if (this.secondaryTexture === null) this.setScaleAlt(1.05);
            else this.image.setTexture(this.secondaryTexture);
        });
        this.enabled = true;
        this.image.on("pointerup", () => {
            if (!this.enabled) return;
            if (this.active) {
                this.callback();
            }
            if (this.toggle) {
                this.active = false;
                this.disableToggle();
                return;
            }
            if (this.secondaryTexture === null) this.setScaleAlt(1.1);
            else this.image.setTexture(this.primaryTexture);
            this.active = false;
        });
        this.image.on("pointerover", () => {
            if (!this.enabled) return;
            if (this.secondaryTexture === null) {
                this.image.setTint("0xffffff");
                this.setScaleAlt(1.1);
            }
        });
        this.image.on("pointerout", () => {
            if (!this.enabled) return;
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
        this.enabled = value;
        if (value) this.image.setInteractive();
        else this.image.disableInteractive();
    }

    enableToggle(value) {
        this.enable(true);
        if (this.toggleTexture !== null) this.image.setTexture(this.primaryTexture);
        this.setScaleAlt(1);
    }

    disableToggle(value) {
        this.enable(false);
        if (this.toggleTexture !== null) this.image.setTexture(this.toggleTexture);
        this.setScaleAlt(1);
    }

    setVisible(value) {
        this.image.visible = value;
    }
}
