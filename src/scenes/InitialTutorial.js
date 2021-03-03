import TutorialMenu from "./TutorialMenu";
import eventsCenter from "../events/EventsCenter";

export default class InitialTutorial extends Phaser.Scene {
    static firstGame = true;

    create() {
        this.tutorialMenu = new TutorialMenu(
            this,
            () => {},
            () => {
                eventsCenter.emit("startGame");
                InitialTutorial.firstGame = false;
                this.scene.scene.sound.resumeAll();
                this.scene.resume("Game");
                this.scene.bringToTop("InitialTutorial");
                this.scene.stop("InitialTutorial");
            }
        );
        this.tutorialMenu.show();
    }
}
