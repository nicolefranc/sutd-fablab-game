import settingsMenuBackground from "../resources/Settings Menu/background rescaled.png";
import settingsMenuBar from "../resources/Settings Menu/bar.png";
import settingsMenuBarFiller from "../resources/Settings Menu/bar_filler.png";
import settingsMenuMinusBtn from "../resources/Settings Menu/minus_btn.png";
import settingsMenuMinusBtnPrs from "../resources/Settings Menu/minus_prs.png";
import settingsMenuPlusBtn from "../resources/Settings Menu/plus_btn.png";
import settingsMenuPlusBtnPrs from "../resources/Settings Menu/plus_prs.png";
import settingsMenuBackBtn from "../resources/Settings Menu/back.png";
import settingsMenuGuideBtn from "../resources/Settings Menu/GuideBtn.png";
import Button from "../sprites/button";
import TutorialMenu from "./TutorialMenu";

export default class SettingsMenu {
    static musicVolume = 9;
    static sfxVolume = 9;

    constructor(scene, showCallback, hideCallback, tutorialMenu) {
        this.scene = scene;
        this.simpleImages = {};
        this.buttons = {};
        this.musicBarArray = [];
        this.sfxBarArray = [];
        this.tutorialMenu = tutorialMenu;

        this.showCallback = showCallback;
        this.hideCallback = hideCallback;

        this.simpleImages["background"] = this.scene.add.image(
            450,
            250,
            "settingsMenuBackground"
        );
        this.simpleImages["background"].scale = 1 / 3.2;
        this.simpleImages["musicBar"] = this.scene.add.image(
            1857 / 3.2,
            671 / 3.2,
            "settingsMenuBar"
        );
        this.simpleImages["musicBar"].scale = 1 / 3.2;
        this.simpleImages["sfxBar"] = this.scene.add.image(
            1857 / 3.2,
            957 / 3.2,
            "settingsMenuBar"
        );
        this.simpleImages["sfxBar"].scale = 1 / 3.2;
        this.buttons["musicBarMinus"] = new Button(
            this.scene,
            1444 / 3.2,
            669 / 3.2,
            "settingsMenuMinusBtn",
            1 / 3.2,
            () => {
                if (SettingsMenu.musicVolume <= 0) return;
                SettingsMenu.musicVolume -= 1;
                this.updateMusicBar();
            },
            "settingsMenuMinusBtnPrs"
        );
        this.buttons["musicBarPlus"] = new Button(
            this.scene,
            2269 / 3.2,
            669 / 3.2,
            "settingsMenuPlusBtn",
            1 / 3.2,
            () => {
                if (SettingsMenu.musicVolume >= 18) return;
                SettingsMenu.musicVolume += 1;
                this.updateMusicBar();
            },
            "settingsMenuPlusBtnPrs"
        );
        this.buttons["sfxBarMinus"] = new Button(
            this.scene,
            1444 / 3.2,
            955 / 3.2,
            "settingsMenuMinusBtn",
            1 / 3.2,
            () => {
                if (SettingsMenu.sfxVolume <= 0) return;
                SettingsMenu.sfxVolume -= 1;
                this.updateSfxBar();
            },
            "settingsMenuMinusBtnPrs"
        );
        this.buttons["sfxBarPlus"] = new Button(
            this.scene,
            2269 / 3.2,
            955 / 3.2,
            "settingsMenuPlusBtn",
            1 / 3.2,
            () => {
                if (SettingsMenu.sfxVolume >= 18) return;
                SettingsMenu.sfxVolume += 1;
                this.updateSfxBar();
            },
            "settingsMenuPlusBtnPrs"
        );
        this.buttons["back"] = new Button(
            this.scene,
            1857 / 3.2 + 60,
            400,
            "settingsMenuBackBtn",
            1 / 3.2,
            () => {
                this.hide();
            },
            null
        );
        this.buttons["guide"] = new Button(
            this.scene,
            184 / 3.2,
            307 / 3.2,
            "settingsMenuGuideBtn",
            1 / 3.2,
            () => {
                this.switchToTutorial();
            },
            "settingsMenuGuideBtn"
        );

        for (var i = 0; i < 18; i++) {
            this.musicBarArray.push(
                this.scene.add.image(
                    (1534 + (636 / 17) * i) / 3.2,
                    669 / 3.2,
                    "settingsMenuBarFiller"
                )
            );
            this.musicBarArray[i].scale = 1 / 3.2;
            this.sfxBarArray.push(
                this.scene.add.image(
                    (1534 + (636 / 17) * i) / 3.2,
                    955 / 3.2,
                    "settingsMenuBarFiller"
                )
            );
            this.sfxBarArray[i].scale = 1 / 3.2;
        }

        this.text = this.scene.add
            .text(1857 / 3.2 - 40, 400, "Back to menu", {
                fontFamily: "peepo",
                fontSize: 20,
                color: "0x000000",
            })
            .setOrigin(0.5, 0.5);

        for (var i in this.simpleImages) {
            this.simpleImages[i].visible = false;
        }
        for (var i in this.buttons) {
            this.buttons[i].enable(false);
            this.buttons[i].setVisible(false);
        }
        for (var i = 0; i < 18; i++) {
            this.musicBarArray[i].visible = false;
            this.sfxBarArray[i].visible = false;
        }
        this.text.visible = false;
    }

    static preloadAssets(scene) {
        scene.load.image("settingsMenuBackground", settingsMenuBackground);
        scene.load.image("settingsMenuBar", settingsMenuBar);
        scene.load.image("settingsMenuBarFiller", settingsMenuBarFiller);
        scene.load.image("settingsMenuMinusBtn", settingsMenuMinusBtn);
        scene.load.image("settingsMenuMinusBtnPrs", settingsMenuMinusBtnPrs);
        scene.load.image("settingsMenuPlusBtn", settingsMenuPlusBtn);
        scene.load.image("settingsMenuPlusBtnPrs", settingsMenuPlusBtnPrs);
        scene.load.image("settingsMenuBackBtn", settingsMenuBackBtn);
        scene.load.image("settingsMenuGuideBtn", settingsMenuGuideBtn);
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
        for (var i = 0; i < 18; i++) {
            this.musicBarArray[i].visible = i < SettingsMenu.musicVolume;
            this.sfxBarArray[i].visible = i < SettingsMenu.sfxVolume;
        }
        this.text.visible = true;
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
        for (var i = 0; i < 18; i++) {
            this.musicBarArray[i].visible = false;
            this.sfxBarArray[i].visible = false;
        }
        this.text.visible = false;
    }

    switchToTutorial() {
        for (var i in this.simpleImages) {
            this.simpleImages[i].visible = false;
        }
        for (var i in this.buttons) {
            this.buttons[i].enable(false);
            this.buttons[i].setVisible(false);
        }
        for (var i = 0; i < 18; i++) {
            this.musicBarArray[i].visible = false;
            this.sfxBarArray[i].visible = false;
        }
        this.text.visible = false;
        this.tutorialMenu.showCore();
    }

    updateMusicBar() {
        for (var i = 0; i < 18; i++) {
            this.musicBarArray[i].visible = i < SettingsMenu.musicVolume;
        }
    }

    updateSfxBar() {
        for (var i = 0; i < 18; i++) {
            this.sfxBarArray[i].visible = i < SettingsMenu.sfxVolume;
        }
    }
}
