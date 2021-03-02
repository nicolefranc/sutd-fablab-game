import Phaser from 'phaser'
import Button from "../sprites/button.js";
import mPickBtn from "../resources/mobile/interactivebutton.png";
import mPickBtnPressed from "../resources/mobile/interactivebuttonpressed.png";
import eventsCenter from "../events/EventsCenter";

export default class GameUI extends Phaser.Scene {
    constructor(config) {
        super(config)
    }

    static preloadAssets(scene) {
        scene.load.image("mPickBtn", mPickBtn);
        scene.load.image("mPickBtnPressed", mPickBtnPressed);
    }

    create() {
        this.renderPauseButton();
        this.isMobile =
            this.scene.systems.game.device.os.android ||
            this.scene.systems.game.device.os.iOS ||
            this.scene.systems.game.device.os.iPhone ||
            this.scene.systems.game.device.os.windowsPhone;

        if (this.isMobile)
            this.renderPickButton();
    }
    
    renderPickButton() {
        var scale = 300/568;
        var x = 700;
        var y = 400;
        this.buttons = {};
        this.buttons["mPickBtn"] = new Button(this, x, y,'mPickBtn',scale,()=>{
            eventsCenter.emit('mPickItem', 'mPickItem');
        },'mPickBtnPressed')
    }

    renderPauseButton() {
        var scale = 500 / 768;
        const pauseBtn = new Button(
            this,
            (1000 / 1090) * 800,
            (150 / 768) * 500,
            "pauseBtn",
            scale / 2,
            () => {
                this.pauseGame();
            },
            "pauseBtnPrs"
        );
    }

    pauseGame() {
        this.sound.pauseAll();
        this.scene.run("Pause");
        this.scene.pause("Game");
        this.scene.bringToTop("Pause");
    }
}