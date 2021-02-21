import Phaser from "phaser";
import Button from "../sprites/button"

import background from "../resources/Main Menu/background.png";

import leaderboard from "../resources/Main Menu/leaderboard.png";
import leaderboardPrs from "../resources/Main Menu/leaderboard_prs.png"
import options from "../resources/Main Menu/options.png";
import optionsPrs from "../resources/Main Menu/options_prs.png";
import start from "../resources/Main Menu/start.png";
import startPrs from "../resources/Main Menu/start_prs.png";

import SettingsMenu from "./SettingsMenu";
import LeaderboardScreen from "./LeaderboardScreen";

export default class MainMenu extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('mainMenuBackground',background);
        this.load.image('leaderboardBtn',leaderboard);
        this.load.image('leaderboardBtnPrs',leaderboardPrs);
        this.load.image('optionsBtn',options);
        this.load.image('optionsBtnPrs',optionsPrs);
        this.load.image('startBtn',start);
        this.load.image('startBtnPrs',startPrs);
        SettingsMenu.preloadAssets(this);
        LeaderboardScreen.preloadAssets(this);
    }

    create() {
        var scale = 500/768;
        this.background = this.add.image(400,250,'mainMenuBackground');
        this.background.setScale(scale);
        this.buttons = {};
        this.buttons["options"] = new Button(this,305/1090*800,570/768*500,'optionsBtn',scale,()=>{
            this.settingsMenu.show();
        },'optionsBtnPrs');
        this.buttons["start"] = new Button(this,544/1090*800,426/768*500,'startBtn',scale,()=>{
            this.game.scene.pause('MainMenu');
            this.game.scene.start('DifficultyMenu');
            this.game.scene.bringToTop('DifficultyMenu');
        },'startBtnPrs');
        this.buttons["leaderboard"] = new Button(this,789/1090*800,568/768*500,'leaderboardBtn',scale,()=>{
            this.game.scene.pause('MainMenu');
            this.game.scene.start('LeaderboardScreen');
            this.game.scene.bringToTop('LeaderboardScreen');
        },'leaderboardBtnPrs');
        this.settingsMenu = new SettingsMenu(this,()=>{
            for (var i in this.buttons) this.buttons[i].enable(false);
        },()=>{
            for (var i in this.buttons) this.buttons[i].enable(true);
            //console.log("Music volume=" + SettingsMenu.musicVolume);
            //console.log("SFX volume=" + SettingsMenu.sfxVolume);
        });
    }
}