import TutorialMenu from "./TutorialMenu";

export default class InitialTutorial extends Phaser.Scene {
    
    static firstGame = true;

    create() {
        this.tutorialMenu = new TutorialMenu(this,()=>{},()=>{
            InitialTutorial.firstGame = false;
            this.scene.resume("Game");
            this.scene.bringToTop("InitialTutorial");
            this.scene.stop("InitialTutorial");
        },true);
        this.tutorialMenu.show();
    }
}