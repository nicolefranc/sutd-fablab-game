import settingsMenuBackground from '../resources/Settings Menu/background rescaled.png';
import settingsMenuBar from '../resources/Settings Menu/bar.png';
import settingsMenuBarFiller from '../resources/Settings Menu/bar_filler.png';
import settingsMenuMinusBtn from '../resources/Settings Menu/minus_btn.png';
import settingsMenuMinusBtnPrs from '../resources/Settings Menu/minus_prs.png';
import settingsMenuPlusBtn from '../resources/Settings Menu/plus_btn.png';
import settingsMenuPlusBtnPrs from '../resources/Settings Menu/plus_prs.png';
import Button from '../sprites/button';


export default class SettingsMenu {

    static musicVolume = 9;
    static sfxVolume = 9;

    constructor(scene,showCallback,hideCallback) {
        this.scene = scene;
        this.simpleImages = {};
        this.buttons = {};
        this.musicBarArray = [];
        this.sfxBarArray = [];
        this.tempHideButton = null;

        this.showCallback = showCallback;
        this.hideCallback = hideCallback;

        this.simpleImages["background"] = this.scene.add.image(400,250,'settingsMenuBackground');
        this.simpleImages["background"].scale = 1/3.2;
        this.simpleImages["musicBar"] = this.scene.add.image(1855/3.2,671/3.2,'settingsMenuBar');
        this.simpleImages["musicBar"].scale = 1/3.2;
        this.simpleImages["sfxBar"] = this.scene.add.image(1855/3.2,957/3.2,'settingsMenuBar');
        this.simpleImages["sfxBar"].scale = 1/3.2;
        this.buttons["musicBarMinus"] = new Button(this.scene,1444/3.2,669/3.2,'settingsMenuMinusBtn',1/3.2,()=>{
            if (SettingsMenu.musicVolume <= 0) return;
            SettingsMenu.musicVolume -= 1;
            this.updateMusicBar();
        },'settingsMenuMinusBtnPrs');
        this.buttons["musicBarPlus"] = new Button(this.scene,2269/3.2,669/3.2,'settingsMenuPlusBtn',1/3.2,()=>{
            if (SettingsMenu.musicVolume >= 18) return;
            SettingsMenu.musicVolume += 1;
            this.updateMusicBar();
        },'settingsMenuPlusBtnPrs');
        this.buttons["sfxBarMinus"] = new Button(this.scene,1444/3.2,955/3.2,'settingsMenuMinusBtn',1/3.2,()=>{
            if (SettingsMenu.sfxVolume <= 0) return;
            SettingsMenu.sfxVolume -= 1;
            this.updateSfxBar();
        },'settingsMenuMinusBtnPrs');
        this.buttons["sfxBarPlus"] = new Button(this.scene,2269/3.2,955/3.2,'settingsMenuPlusBtn',1/3.2,()=>{
            if (SettingsMenu.sfxVolume >= 18) return;
            SettingsMenu.sfxVolume += 1;
            this.updateSfxBar();
        },'settingsMenuPlusBtnPrs');
        for (var i=0;i<18;i++) {
            this.musicBarArray.push(this.scene.add.image((1532+(666/17*i))/3.2,
                669/3.2,
                'settingsMenuBarFiller'));
            this.musicBarArray[i].scale = 1/3.2;
            this.sfxBarArray.push(this.scene.add.image((1532+(666/17*i))/3.2,
                955/3.2,
                'settingsMenuBarFiller'));
                this.sfxBarArray[i].scale = 1/3.2;
        }
        this.tempHideButton = new Button(this.scene,1855/3.2,400,'settingsMenuPlusBtn',1/3.2,()=>{
            this.hide();
        },'settingsMenuPlusBtnPrs');

        for (var i in this.simpleImages) {
            this.simpleImages[i].visible = false;
        }
        for (var i in this.buttons) {
            this.buttons[i].enable(false);
            this.buttons[i].setVisible(false);
        }
        for (var i=0;i<18;i++) {
            this.musicBarArray[i].visible = false;
            this.sfxBarArray[i].visible = false;
        }
        this.tempHideButton.enable(false);
        this.tempHideButton.setVisible(false);
    }

    static preloadAssets(scene) {
        scene.load.image('settingsMenuBackground',settingsMenuBackground);
        scene.load.image('settingsMenuBar',settingsMenuBar);
        scene.load.image('settingsMenuBarFiller',settingsMenuBarFiller);
        scene.load.image('settingsMenuMinusBtn',settingsMenuMinusBtn);
        scene.load.image('settingsMenuMinusBtnPrs',settingsMenuMinusBtnPrs);
        scene.load.image('settingsMenuPlusBtn',settingsMenuPlusBtn);
        scene.load.image('settingsMenuPlusBtnPrs',settingsMenuPlusBtnPrs);
    }

    show() {
        this.showCallback();
        for (var i in this.simpleImages) {
            this.simpleImages[i].visible = true;
        }
        for (var i in this.buttons) {
            this.buttons[i].enable(true);
            this.buttons[i].setVisible(true);
        }
        for (var i=0;i<18;i++) {
            this.musicBarArray[i].visible = i < SettingsMenu.musicVolume;
            this.sfxBarArray[i].visible = i < SettingsMenu.sfxVolume;
        }
        this.tempHideButton.enable(true);
        this.tempHideButton.setVisible(true);
    }

    hide() {
        this.hideCallback();
        for (var i in this.simpleImages) {
            this.simpleImages[i].visible = false;
        }
        for (var i in this.buttons) {
            this.buttons[i].enable(false);
            this.buttons[i].setVisible(false);
        }
        for (var i=0;i<18;i++) {
            this.musicBarArray[i].visible = false;
            this.sfxBarArray[i].visible = false;
        }
        this.tempHideButton.enable(false);
        this.tempHideButton.setVisible(false);
    }

    updateMusicBar() {
        for (var i=0;i<18;i++) {
            this.musicBarArray[i].visible = i < SettingsMenu.musicVolume;
        }
    }

    updateSfxBar() {
        for (var i=0;i<18;i++) {
            this.sfxBarArray[i].visible = i < SettingsMenu.sfxVolume;
        }
    }

}