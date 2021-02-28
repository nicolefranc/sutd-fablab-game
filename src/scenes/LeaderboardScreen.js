import Phaser from "phaser";
import LeaderboardUtils from "../leaderboard/leaderboardUtils"

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


export default class LeaderboardScreen extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    static preloadAssets(scene) {
        scene.load.image('leaderboardScreenBackground',leaderboardScreenBackground);
        scene.load.image('leaderboardScreenBoyHead',leaderboardScreenBoyHead);
        scene.load.image('leaderboardScreenGirlHead',leaderboardScreenGirlHead);
        scene.load.image('leaderboardScreenBoyFigure',leaderboardScreenBoyFigure);
        scene.load.image('leaderboardScreenGirlFigure',leaderboardScreenGirlFigure);
        scene.load.image('leaderboardScreenPodium',leaderboardScreenPodium);
        
        scene.load.image('leaderboardScreenPos4',leaderboardScreenPos4);
        scene.load.image('leaderboardScreenPos5',leaderboardScreenPos5);
        scene.load.image('leaderboardScreenPos6',leaderboardScreenPos6);
        scene.load.image('leaderboardScreenPos7',leaderboardScreenPos7);
        scene.load.image('leaderboardScreenPos8',leaderboardScreenPos8);
        scene.load.image('leaderboardScreenPos9',leaderboardScreenPos9);
        scene.load.image('leaderboardScreenPos10',leaderboardScreenPos10);
    }

    create() {

        const score = [
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
        this.bg = this.add.image(400,250,'leaderboardScreenBackground');
        this.bg.scale = 500/769;
        this.text = this.add.text(400,250,"Loading...",{"fontFamily": "peepo","fontSize": 20, "color": "0x000000"});
        this.text.setOrigin(0.5,0.5);
        this.units = [];
        LeaderboardUtils.getScores(10,(scores)=>{
            this.text.text = "";
            this.loadScores(score);
        }, (err) => {
            //console.log("test");
            this.text.text = "Error retrieving score ... please try again later";
            //this.loadScores(score);
        });
    }

    loadScores(scores) {
        this.add.image(439/1318*800,(577+22)/768*500,'leaderboardScreenPodium').setScale(500/768);
        /*
        this.add.image(695/1318*800,(404+22+5)/768*500,'leaderboardScreenBoyFigure').setScale(500/768);
        this.add.text(637/1318*800,566/768*500,'BBB',{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000"});
        this.add.image(178/1318*800,(465+22+5)/768*500,'leaderboardScreenBoyFigure').setScale(500/768);
        this.add.text(120/1318*800,625/768*500,'CCC',{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000"});
        for (var i=0;i<7;i++) {
            const j = i+4;
            this.add.image(1060/1318*800,(208+(81*i))/768*500,'leaderboardScreenPos'+j).setScale(500/768);
            this.add.image(1222/1318*800,(207+(81*i))/768*500,'leaderboardScreenBoyHead').setScale(500/768);
            this.add.text(931/1318*800,(207+(81*i))/768*500,'YEE',{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000","align":"left"}).setOrigin(0,0.5);
            this.add.text(1167/1318*800,(207+(81*i))/768*500,'9999',{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000","align":"right"}).setOrigin(1,0.5);
        }*/

        for (var i=0;i<scores.length;i++) {
            if (i<3) {
                const imgParam = [[442,302],[695,404],[178,465]];
                const textParam = [[384,477],[637,566],[120,625]];
                this.add.image(imgParam[i][0]/1318*800,(imgParam[i][1]+22+(scores[i]["gender"]==="m"?5:0))/768*500,scores[i]["gender"]==="m"?'leaderboardScreenBoyFigure':'leaderboardScreenGirlFigure').setScale(500/768);
                this.add.text(textParam[i][0]/1318*800,textParam[i][1]/768*500,scores[i]["name"],{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000"});
            }
            else {
                const j=i+1;
                this.add.image(1060/1318*800,(208+(81*(i-3)))/768*500,'leaderboardScreenPos'+j).setScale(500/768);
                this.add.image(1222/1318*800,(207+(81*(i-3)))/768*500,scores[i]["gender"]==="m"?'leaderboardScreenBoyHead':'leaderboardScreenGirlHead').setScale(500/768);
                this.add.text(931/1318*800,(207+(81*(i-3)))/768*500,scores[i]["name"],{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000","align":"left"}).setOrigin(0,0.5);
                this.add.text(1167/1318*800,(207+(81*(i-3)))/768*500,scores[i]["score"],{"fontFamily": "peepo", "fontSize": 32*500/758, "color":"0x000000","align":"right"}).setOrigin(1,0.5);
            }
        }
    }
}

export class LeaderboardScreenScoreUnit {

    constructor(scene,x,y,name,score,pos) {
        this.scene = scene;
        this.rectangle = this.scene.add.rectangle(x,y,600,30,"0xffffff");
        this.text = this.scene.add.text(x,y,pos + "\t" + name + "\t\t\t" + score,{"fontFamily": "peepo"});
    }
}