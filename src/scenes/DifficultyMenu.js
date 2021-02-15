import Phaser from 'phaser'

import difficultyMenuBg from "../resources/Difficulty Menu/background_1.png";
import easyButton from "../resources/Difficulty Menu/easy.png";
import normalButton from "../resources/Difficulty Menu/normal.png";
import hardButton from "../resources/Difficulty Menu/hard.png";

export default class DifficultyMenu extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('difficultyMenuBg',difficultyMenuBg);
        this.load.image('easyButton',easyButton);
        this.load.image('normalButton',normalButton);
        this.load.image('hardButton',hardButton);
    }

    create() {
        this.images = {};
        this.images["bg"] = {"image": this.add.image(800/2,500/2,'difficultyMenuBg')};
        this.images["easyButton"] = {"image": this.add.image(251/1368*800,426/769*500,'easyButton')};
        this.images["normalButton"] = {"image": this.add.image(684/1368*800,427/769*500,'normalButton')};
        this.images["hardButton"] = {"image": this.add.image(1117/1368*800,427/769*500,'hardButton')};
        for (var i in this.images){
            if (i!="bg"){
                this.images[i]["image"].setInteractive();
                this.images[i]["active"] = false;
                const j = this.images[i]["image"];
                const k = i;
                this.images[i]["image"].on('pointerdown',()=>{
                    //console.log("pointerdown");
                    this.images[i]["active"] = true;
                    j.scale = 500 / 769 * 1.05;
                });
                this.images[i]["image"].on('pointerup',()=>{
                    //console.log("pointerup");
                    if (this.images[i]["active"]) {
                        console.log("Load level " + k);
                        this.game.scene.pause('DifficultyMenu');
                        this.game.scene.start('Game');
                        this.game.scene.bringToTop('Game');
                        console.log("Test");
                    }
                    this.images[i]["active"] = false;
                    j.scale = 500 / 769 * 1.1;
                });
                this.images[i]["image"].on('pointerover',() => {
                    //console.log("pointerover");
                    j.setTint("0xffffff");
                    j.scale = 500 / 769 * 1.1;
                });
                this.images[i]["image"].on('pointerout',() => {
                    //console.log("pointerout");
                    j.setTint("0xfafafa");
                    this.images[i]["active"] = false;
                    j.scale = 500 / 769;
                });
            }
            this.images[i]["image"].scale = 500 / 769;
        }
    }


}