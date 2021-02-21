import Phaser from "phaser";

import Game from "./scenes/Game";
import LeaderboardScreen from "./scenes/LeaderboardScreen";
import DifficultyMenu from "./scenes/DifficultyMenu";
import MainMenu from "./scenes/MainMenu";
import Credits from "./scenes/Credits";

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

// Add screens to the scene
game.scene.add("DifficultyMenu", DifficultyMenu);
game.scene.add("Game", Game);

game.scene.add("LeaderboardScreen", LeaderboardScreen);
game.scene.add("MainMenu", MainMenu);
game.scene.add("Credits", Credits);

game.scene.start("MainMenu");
