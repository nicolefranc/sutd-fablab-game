import Phaser from "phaser";
import LeaderboardUtils from "../leaderboard/leaderboardUtils"

import leaderboardScreenBackground from "../resources/Leaderboard Screen/background_leaderboard.png";

export default class LeaderboardScreen extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    static preloadAssets(scene) {
        scene.load.image('leaderboardScreenBackground',leaderboardScreenBackground);
    }

    create() {
        this.bg = this.add.image(400,250,'leaderboardScreenBackground');
        this.bg.scale = 500/769;
        this.text = this.add.text(400,250,"Loading...",{"fontFamily": "peepo"});
        this.text.setOrigin(0.5,0.5);
        this.units = [];
        LeaderboardUtils.getScores(10,(scores)=>{
            this.text.setText("Leaderboard:\n\n");
            for (var i in scores) {
                this.units.push(new LeaderboardScreenScoreUnit(this,400,150+(35*i),scores[i][0],scores[i][1],i+1));
            }
        }, (err) => {
            console.log("test");
            this.text.text = "Error retrieving score ... please try again later";
        });
    }
}

export class LeaderboardScreenScoreUnit {

    constructor(scene,x,y,name,score,pos) {
        this.scene = scene;
        this.rectangle = this.scene.add.rectangle(x,y,600,30,"0xffffff");
        this.text = this.scene.add.text(x,y,pos + "\t" + name + "\t\t\t" + score,{"fontFamily": "peepo"});
    }
}