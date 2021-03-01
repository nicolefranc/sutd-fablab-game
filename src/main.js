import Phaser from "phaser";

import Game from "./scenes/Game";
import Endgame from "./scenes/Endgame";
import LeaderboardScreen from "./scenes/LeaderboardScreen";
import DifficultyMenu from "./scenes/DifficultyMenu";
import MainMenu from "./scenes/MainMenu";
import Credits from "./scenes/Credits";
import Pause from "./scenes/Pause";

import font from "./resources/font/Peepo.ttf";

document.head.getElementsByTagName("style")[0].innerHTML +=
    "\n@font-face {font-family: 'peepo';src: url('" +
    font +
    "') format('ttf');font-style: normal;font-weight: 400;}";
import GameUI from "./scenes/GameUI";

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 500,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
};

const game = new Phaser.Game(config);

// Game screens to the scene
game.scene.add("DifficultyMenu", DifficultyMenu);
game.scene.add("Game", Game);
game.scene.add("Pause", Pause);
game.scene.add("GameUI", GameUI);

//Menu screens
game.scene.add("LeaderboardScreen", LeaderboardScreen);
game.scene.add("MainMenu", MainMenu);
game.scene.add("Credits", Credits);
game.scene.add("Endgame", Endgame);
game.scene.start("MainMenu");
