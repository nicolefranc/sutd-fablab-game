import Phaser from "phaser";
import LeaderboardUtils from "../leaderboard/leaderboardUtils";

import leaderboardScreenBackground from "../resources/Leaderboard Screen/leaderboardmenu_final.png";
import leaderboardScreenBoyHead from "../resources/Leaderboard Screen/boy_head.png";
import leaderboardScreenGirlHead from "../resources/Leaderboard Screen/girl_head.png";
import leaderboardScreenBoyFigure from "../resources/Leaderboard Screen/character_boy_2.png";
import leaderboardScreenGirlFigure from "../resources/Leaderboard Screen/character_girl.png";
import leaderboardScreenPodium from "../resources/Leaderboard Screen/podium.png";

import leaderboardScreenPos4 from "../resources/Leaderboard Screen/4.png";
import leaderboardScreenPos5 from "../resources/Leaderboard Screen/5.png";
import leaderboardScreenPos6 from "../resources/Leaderboard Screen/6.png";
import leaderboardScreenPos7 from "../resources/Leaderboard Screen/7.png";
import leaderboardScreenPos8 from "../resources/Leaderboard Screen/8.png";
import leaderboardScreenPos9 from "../resources/Leaderboard Screen/9.png";
import leaderboardScreenPos10 from "../resources/Leaderboard Screen/10.png";

import leaderboardScreenEasyTab from "../resources/Leaderboard Screen/easy_tab.png";
import leaderboardScreenEasyTabPrs from "../resources/Leaderboard Screen/easy_tab_prs.png";
import leaderboardScreenNormalTab from "../resources/Leaderboard Screen/normal_tab.png";
import leaderboardScreenNormalTabPrs from "../resources/Leaderboard Screen/normal_tab_prs.png";
import leaderboardScreenHardTab from "../resources/Leaderboard Screen/hard_tab.png";
import leaderboardScreenHardTabPrs from "../resources/Leaderboard Screen/hard_tab_prs.png";
import leaderboardScreenBackBtn from "../resources/Leaderboard Screen/back_button.png";
import Button from "../sprites/button";

export default class LeaderboardScreen extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    static preloadAssets(scene) {
        scene.load.image(
            "leaderboardScreenBackground",
            leaderboardScreenBackground
        );
        scene.load.image("leaderboardScreenBoyHead", leaderboardScreenBoyHead);
        scene.load.image(
            "leaderboardScreenGirlHead",
            leaderboardScreenGirlHead
        );
        scene.load.image(
            "leaderboardScreenBoyFigure",
            leaderboardScreenBoyFigure
        );
        scene.load.image(
            "leaderboardScreenGirlFigure",
            leaderboardScreenGirlFigure
        );
        scene.load.image("leaderboardScreenPodium", leaderboardScreenPodium);

        scene.load.image("leaderboardScreenPos4", leaderboardScreenPos4);
        scene.load.image("leaderboardScreenPos5", leaderboardScreenPos5);
        scene.load.image("leaderboardScreenPos6", leaderboardScreenPos6);
        scene.load.image("leaderboardScreenPos7", leaderboardScreenPos7);
        scene.load.image("leaderboardScreenPos8", leaderboardScreenPos8);
        scene.load.image("leaderboardScreenPos9", leaderboardScreenPos9);
        scene.load.image("leaderboardScreenPos10", leaderboardScreenPos10);

        scene.load.image("leaderboardScreenEasyTab", leaderboardScreenEasyTab);
        scene.load.image("leaderboardScreenEasyTabPrs", leaderboardScreenEasyTabPrs);
        scene.load.image("leaderboardScreenNormalTab", leaderboardScreenNormalTab);
        scene.load.image("leaderboardScreenNormalTabPrs", leaderboardScreenNormalTabPrs);
        scene.load.image("leaderboardScreenHardTab", leaderboardScreenHardTab);
        scene.load.image("leaderboardScreenHardTabPrs", leaderboardScreenHardTabPrs);
        scene.load.image("leaderboardScreenBackBtn", leaderboardScreenBackBtn)
    }

    create() {

        const score1 = [
            {
                "name": "ABC",
                "gender": "f",
                "score": 1000,
                "rank": 1
            },
            {
                "name": "DEF",
                "gender": "m",
                "score": 400,
                "rank": 2
            },
            {
                "name": "GHI",
                "gender": "f",
                "score": 399,
                "rank": 3
            },
            {
                "name": "JKL",
                "gender": "m",
                "score": 398,
                "rank": 4
            },
            {
                "name": "MNO",
                "gender": "f",
                "score": 397,
                "rank": 5
            },
            {
                "name": "PQR",
                "gender": "m",
                "score": 396,
                "rank": 6
            },
            {
                "name": "KO",
                "gender": "f",
                "score": 395,
                "rank": 7
            },
            {
                "name": "NO",
                "gender": "m",
                "score": 34,
                "rank": 8
            },
            {
                "name": "DIO",
                "gender": "f",
                "score": 3.1415,
                "rank": 9
            },
            {
                "name": "DA!",
                "gender": "m",
                "score": 2.7182,
                "rank": 10
            }
        ]
        const score2 = [
            {
                "name": "ABD",
                "gender": "f",
                "score": 1000,
                "rank": 1
            },
            {
                "name": "DEF",
                "gender": "m",
                "score": 400,
                "rank": 2
            },
            {
                "name": "GHI",
                "gender": "f",
                "score": 399,
                "rank": 3
            },
            {
                "name": "JKL",
                "gender": "m",
                "score": 398,
                "rank": 4
            },
            {
                "name": "MNO",
                "gender": "f",
                "score": 397,
                "rank": 5
            },
            {
                "name": "PQR",
                "gender": "m",
                "score": 396,
                "rank": 6
            },
            {
                "name": "KO",
                "gender": "f",
                "score": 395,
                "rank": 7
            },
            {
                "name": "NO",
                "gender": "m",
                "score": 34,
                "rank": 8
            },
            {
                "name": "DIO",
                "gender": "f",
                "score": 3.1415,
                "rank": 9
            },
            {
                "name": "DA!",
                "gender": "m",
                "score": 2.7182,
                "rank": 10
            }
        ]
        const score3 = [
            {
                "name": "ABE",
                "gender": "f",
                "score": 1000,
                "rank": 1
            },
            {
                "name": "DEF",
                "gender": "m",
                "score": 400,
                "rank": 2
            },
            {
                "name": "GHI",
                "gender": "f",
                "score": 399,
                "rank": 3
            },
            {
                "name": "JKL",
                "gender": "m",
                "score": 398,
                "rank": 4
            },
            {
                "name": "MNO",
                "gender": "f",
                "score": 397,
                "rank": 5
            },
            {
                "name": "PQR",
                "gender": "m",
                "score": 396,
                "rank": 6
            },
            {
                "name": "KO",
                "gender": "f",
                "score": 395,
                "rank": 7
            },
            {
                "name": "NO",
                "gender": "m",
                "score": 34,
                "rank": 8
            },
            {
                "name": "DIO",
                "gender": "f",
                "score": 3.1415,
                "rank": 9
            },
            {
                "name": "DA!",
                "gender": "m",
                "score": 2.7182,
                "rank": 10
            }
        ]
        this.bg = this.add.image(400,250,'leaderboardScreenBackground').setScale(500/769);
        this.text = this.add.text(400,250,"",{"fontFamily": "peepo","fontSize": 20, "color": "0x000000"});
        this.text.setOrigin(0.5,0.5);
        this.tabs = {};
        this.scores = {
            "easy":null,
            "normal":null,
            "hard":null
        };

        this.backButton = new Button(this,50,125,'leaderboardScreenBackBtn',800/2560*2276/2547,()=>{
            this.scene.stop('LeaderboardScreen');
            this.scene.start('MainMenu');
            this.scene.bringToTop('MainMenu');
        });

        LeaderboardUtils.getScores(10,"easy",(scores)=>{
            this.scores["easy"] = scores;
        }, (err) => {this.scores["easy"] = score1;});
        LeaderboardUtils.getScores(10,"normal",(scores)=>{
            this.scores["normal"] = scores;
        }, (err) => {this.scores["normal"] = score2;});
        LeaderboardUtils.getScores(10,"hard",(scores)=>{
            this.scores["hard"] = scores;
        }, (err) => {this.scores["hard"] = score3;});
        this.timeout = null;

        this.scoreObjects = [];

        this.clearScores();
        if (this.scores["easy"]===null) {
            this.text.text = "Loading...";
            this.timeout = setTimeout(()=>{
                if (this.scores["easy"]===null) {
                    
                    this.text.text = "Error loading scores. Please try again later.";
                }
                else{
                    this.loadScores(this.scores["easy"]);
                    this.text.text = "";
                }
                this.timeout = null;
            },5000);
        }
        else this.loadScores(this.scores["easy"]);

        this.tabs["easy"] = new Button(this,71/2/3.2,152/2/3.2+150,'leaderboardScreenEasyTab',1/3.2,()=>{
            this.tabs["normal"].enableToggle();
            this.tabs["hard"].enableToggle();
            this.clearScores();
            if (this.scores["easy"]===null) {
                this.text.text = "Loading...";
                if (this.timeout !== null) clearTimeout(this.timeout);
                this.timeout = setTimeout(()=>{
                    if (this.scores["easy"]===null) {
                        this.text.text = "Error loading scores. Please try again later.";
                    }
                    else{
                        this.loadScores(this.scores["easy"]);
                        this.text.text = "";
                    }
                    this.timeout = null;
                },5000);
            }
            else this.loadScores(this.scores["easy"]);
        },'leaderboardScreenEasyTab',true,'leaderboardScreenEasyTabPrs');
        this.tabs["normal"] = new Button(this,71/2/3.2,152*1.5/3.2+150,'leaderboardScreenNormalTab',1/3.2,()=>{
            this.tabs["easy"].enableToggle();
            this.tabs["hard"].enableToggle();
            this.clearScores();
            if (this.timeout !== null) clearTimeout(this.timeout);
            if (this.scores["normal"]===null) {
                this.text.text = "Loading...";
                setTimeout(()=>{
                    if (this.scores["normal"]===null) {
                        this.text.text = "Error loading scores. Please try again later.";
                    }
                    else{
                        this.loadScores(this.scores["normal"]);
                        this.text.text = "";
                    }
                    this.timeout = null;
                },5000);
            }
            else this.loadScores(this.scores["normal"]);
        },'leaderboardScreenNormalTab',true,'leaderboardScreenNormalTabPrs');
        this.tabs["hard"] = new Button(this,71/2/3.2,152*2.5/3.2+150,'leaderboardScreenHardTab',1/3.2,()=>{
            this.tabs["easy"].enableToggle();
            this.tabs["normal"].enableToggle();
            this.clearScores();
            if (this.scores["hard"]===null) {
                this.text.text = "Loading...";
                if (this.timeout !== null) clearTimeout(this.timeout);
                setTimeout(()=>{
                    if (this.scores["hard"]===null) {
                        this.text.text = "Error loading scores. Please try again later.";
                    }
                    else{
                        this.loadScores(this.scores["hard"]);
                        this.text.text = "";
                    }
                    this.timeout = null;
                },5000);
            }
            else this.loadScores(this.scores["hard"]);
        },'leaderboardScreenHardTab',true,'leaderboardScreenHardTabPrs');
        this.tabs["easy"].disableToggle();
    }

    clearScores() {
        for (var i in this.scoreObjects) {this.scoreObjects[i].destroy();}
        this.scoreObjects = [];
    }
    loadScores(scores) {
        this.scoreObjects.push(this.add.image(439/1318*800,(577+22)/768*500,'leaderboardScreenPodium').setScale(500/768));
        for (var i=0;i<scores.length;i++) {
            if (i<3) {
                const imgParam = [[442,302],[695,404],[178,465]];
                const textParam = [[384,477],[637,566],[120,625]];
                this.scoreObjects.push(this.add.image(imgParam[i][0]/1318*800,(imgParam[i][1]+22+(scores[i]["gender"]==="m"?5:0))/768*500,scores[i]["gender"]==="m"?'leaderboardScreenBoyFigure':'leaderboardScreenGirlFigure').setScale(500/768));
                this.scoreObjects.push(this.add.text(textParam[i][0]/1318*800,textParam[i][1]/768*500,scores[i]["name"] + ": " + scores[i]["score"],{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000","align":"center"}).setOrigin(0.25,0));
            }
            else {
                const j=i+1;
                this.scoreObjects.push(this.add.image(1060/1318*800,(208+(81*(i-3)))/768*500,'leaderboardScreenPos'+j).setScale(500/768));
                this.scoreObjects.push(this.add.image(1222/1318*800,(207+(81*(i-3)))/768*500,scores[i]["gender"]==="m"?'leaderboardScreenBoyHead':'leaderboardScreenGirlHead').setScale(500/768));
                this.scoreObjects.push(this.add.text(931/1318*800,(207+(81*(i-3)))/768*500,scores[i]["name"],{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000","align":"left"}).setOrigin(0,0.5));
                this.scoreObjects.push(this.add.text(1167/1318*800,(207+(81*(i-3)))/768*500,scores[i]["score"],{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000","align":"right"}).setOrigin(1,0.5));
            }

        }
    }
}
