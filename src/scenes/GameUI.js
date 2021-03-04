import Phaser, { Tilemaps } from 'phaser'
import Button from "../sprites/button.js";
import mPickBtn from "../resources/mobile/interactivebutton.png";
import mPickBtnPressed from "../resources/mobile/interactivebuttonpressed.png";
import clockbg from "../resources/gameui/clockbg.png";
import holdingBubble from "../resources/gameui/holding bubble.png";
import holdingBubbleBlue from "../resources/gameui/holding bubble blue.png";
import holdingBubbleOutline from "../resources/gameui/holding bubble outline.png";
import clipboard from "../resources/gameui/clipboard.png";
import eventsCenter from "../events/EventsCenter";
import Resources from '../resources/resources.js';

export default class GameUI extends Phaser.Scene {
    constructor(config) {
        super(config)
    }

    static preloadAssets(scene) {
        scene.load.image("mPickBtn", mPickBtn);
        scene.load.image("mPickBtnPressed", mPickBtnPressed);
        scene.load.image("clockbg", clockbg);
        scene.load.image("bubble", holdingBubbleOutline);
        scene.load.image("clipboard", clipboard);
    }

    create() {
        this.isMobile = this.scene.systems.game.device.os.android || this.scene.systems.game.device.os.iOS || this.scene.systems.game.device.os.iPhone || this.scene.systems.game.device.os.windowsPhone;
        this.heldItemText = null;
        this.heldItemImg = null;

        this.prevItemText = null;
        this.prevItemImg = null;
        this.renderClock();
        this.renderPauseButton();
        this.renderCurrentItem();
        this.renderScore();
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

    renderClock() {
        let clockbg = this.add.image(734, 56, 'clockbg');
        clockbg.setName('clockbg');
        clockbg.setScale(0.3);

        let clockLayer = this.scene.scene.add.layer([this.scene.scene.children.getByName('clockbg')]);
        this.timer = this.scene.scene.children.getByName('timer');
        this.scene.scene.add.layer([this.timer]);
        clockLayer.sendToBack(clockLayer.first);
    }

    renderCurrentItem() {
        this.bubblePos = { x: 734, y: 400 };

        if (this.isMobile) this.bubblePos = { x: 700, y: 268 };

        let bubble = this.add.image(this.bubblePos.x, this.bubblePos.y, 'bubble');
        bubble.setName('bubble');
        bubble.setScale(0.3);
        let bubbleLayer = this.scene.scene.add.layer([this.scene.scene.children.getByName('bubble')]);
        bubbleLayer.sendToBack(bubbleLayer.first);
        this.holdingLayer = this.scene.scene.add.layer();
    }

    renderScore() {
        let clipboard = this.add.image(655, 72, 'clipboard');
        clipboard.setName('clipboard');
        clipboard.setScale(0.35);
        // this.score = this.add.text(655, 72, this.timer.score);
        this.score = this.add.text(637, 68, this.padScore(this.timer.score));
        this.score.style.setColor('#000000');
        this.score.setFontSize(20);
    }
    
    update() {
        this.score.setText(this.padScore(this.timer.score));

        // console.log(`Holding: ${this.timer.item}`)
        // console.log(`Previous: ${this.prevItemText}`)

        let currentItem = this.timer.item;
        
        // If an item is being held
        if (currentItem) {
            let currentItemImg;
            
            // If current item not same as previous item, display current item
            if (this.prevItemText !== currentItem) {
                currentItemImg = this.add.image(this.bubblePos.x, this.bubblePos.y - 8, currentItem); // Display the item's image
                currentItemImg.setScale(0.1);
                this.holdingLayer.add(currentItemImg);
                this.prevItemImg = currentItemImg;
                this.prevItemText = currentItem;
            } else if (this.prevItemText === currentItem) {
                // console.log(this.prevItemImg);
                this.prevItemImg.setVisible(true);
                this.holdingLayer.add(this.prevItemImg);
            } else {
                this.prevItemImg.setVisible(false);
                this.holdingLayer.remove(this.prevItemImg);
            }
        } else {
            if (this.prevItemImg) {
                this.prevItemImg.setVisible(false);
                this.holdingLayer.remove(this.prevItemImg);
            }
        }
    }

    padScore(score) {
        var str = score.toString();
        while (str.length < 3)
           str = "0" + str;
        return str;
    }

}