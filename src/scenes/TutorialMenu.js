import Button from "../sprites/button";
import SettingsMenu from "./SettingsMenu";
import tutorialMenuFirstPage from "../resources/tutorial/how_to.png";
import tutorialMenuSecondPage from "../resources/tutorial/equipments.png";
import tutorialMenuLeftButton from "../resources/tutorial/left_button.png";
import tutorialMenuRightButton from "../resources/tutorial/right_button.png";

export default class TutorialMenu {
    constructor(scene, showCallback, hideCallback, isInitialTutorial) {
        this.scene = scene;
        this.simpleImages = [];
        this.buttons = [];
        this.text = null;

        this.showCallback = showCallback;
        this.hideCallback = hideCallback;

        this.position = 0;

        this.simpleImages.push(
            this.scene.add
                .image(400, 250, "tutorialMenuFirstPage")
                .setScale(1100 / 2560)
        );
        this.simpleImages.push(
            this.scene.add
                .image(400, 250, "tutorialMenuSecondPage")
                .setScale(1100 / 2560)
        );

        this.buttons.push(
            new Button(
                this.scene,
                (((348 / 2547) * 2276 + 142) / 2560) * 800,
                (((1301 / 2547) * 2276 + 88) / 1600) * 500 + 25,
                "tutorialMenuLeftButton",
                ((800 / 2560) * 2276) / 2547,
                () => {
                    this.scene.btnPrsSound.play({
                        volume: SettingsMenu.sfxVolume / 18,
                    });
                    if (this.position == 0) {
                        this.hide();
                        return;
                    }
                    this.position = 0;
                    this.text.x =
                        (((348 / 2547) * 2276 + 142) / 2560) * 800 + 100;
                    this.simpleImages[1].visible = false;
                    this.simpleImages[0].visible = true;
                },
                null
            )
        );
        this.buttons.push(
            new Button(
                this.scene,
                (((2199 / 2547) * 2276 + 142) / 2560) * 800,
                (((1301 / 2547) * 2276 + 88) / 1600) * 500 + 25,
                "tutorialMenuRightButton",
                ((800 / 2560) * 2276) / 2547,
                () => {
                    this.scene.btnPrsSound.play({
                        volume: SettingsMenu.sfxVolume / 18,
                    });
                    if (this.position == 1) {
                        this.hide();
                        return;
                    }
                    this.position = 1;
                    this.text.x =
                        (((2199 / 2547) * 2276 + 142) / 2560) * 800 - 100;
                    this.simpleImages[0].visible = false;
                    this.simpleImages[1].visible = true;
                },
                null
            )
        );

        this.text = this.scene.add
            .text(
                (((348 / 2547) * 2276 + 142) / 2560) * 800 + 50,
                (((1301 / 2547) * 2276 + 88) / 1600) * 500 + 25,
                isInitialTutorial === true ? "Start game" : "Back to menu",
                { fontFamily: "peepo", fontSize: 20, color: "0x000000" }
            )
            .setOrigin(0.5, 0.5);

        for (var i in [0, 1]) {
            this.simpleImages[i].visible = false;
            this.buttons[i].enable(false);
            this.buttons[i].setVisible(false);
        }
        this.text.visible = false;
    }

    show() {
        this.showCallback();
        this.showCore();
    }

    showCore() {
        this.simpleImages[0].visible = true;
        for (var i in [0, 1]) {
            this.buttons[i].enable(true);
            this.buttons[i].setVisible(true);
        }
        this.text.visible = true;
        this.text.x = (((348 / 2547) * 2276 + 142) / 2560) * 800 + 100;
        this.position = 0;
    }

    hide() {
        this.hideCallback();
        this.simpleImages[this.position].visible = false;
        for (var i in [0, 1]) {
            this.buttons[i].enable(false);
            this.buttons[i].setVisible(false);
        }
        this.text.visible = false;
    }

    static preloadAssets(scene) {
        scene.load.image("tutorialMenuFirstPage", tutorialMenuFirstPage);
        scene.load.image("tutorialMenuSecondPage", tutorialMenuSecondPage);
        scene.load.image("tutorialMenuLeftButton", tutorialMenuLeftButton);
        scene.load.image("tutorialMenuRightButton", tutorialMenuRightButton);
    }
}
