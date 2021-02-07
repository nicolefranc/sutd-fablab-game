import Phaser from "phaser";

import LeaderboardUtils from "../leaderboard/leaderboardUtils"

export default class Game extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    create() {
        this.text = this.add.text(400,250,"Loading...");
        this.text.setOrigin(0.5,0.5);
        LeaderboardUtils.getScores(10,(scores)=>{
            this.text.setText("Leaderboard:\n\n");
            for (var i in scores) {
                this.text.text += scores[i][0] + ": " + scores[i][1] + "\n";
            }
            
        }, (err) => {
            alert("Omae wa mou shindeiru");
        });
    }

    update() {
        
    }
}