import Phaser from "phaser";

import Game from "./scenes/Game";
import Endgame from "./scenes/Endgame";
import LeaderboardScreen from "./scenes/LeaderboardScreen";
import CharacterMenu from "./scenes/CharacterMenu";
import DifficultyMenu from "./scenes/DifficultyMenu";
import MainMenu from "./scenes/MainMenu";
import Credits from "./scenes/Credits";
import Pause from "./scenes/Pause";
import QuitGame from "./scenes/QuitGame";
import GameUI from "./scenes/GameUI";

import font from "./resources/font/Peepo.woff";
import InitialTutorial from "./scenes/InitialTutorial";

var WebFont = require("webfontloader");

var fontFamilyName = "peepo";

var markup = [
    "@font-face {\n",
    "\tfont-family: '",
    fontFamilyName,
    "';\n",
    "\tfont-style: 'normal';\n",
    "\tfont-weight: 'normal';\n",
    "\tsrc: url('",
    font,
    "') format('woff');\n",
    "}\n",
].join("");

var style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = markup;
document.body.insertBefore(
    style,
    document.body.getElementsByTagName("script")[0]
);

WebFont.load({
    custom: {
        families: [fontFamilyName],
    },
});

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
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);

// Game screens to the scene
game.scene.add("DifficultyMenu", DifficultyMenu);
game.scene.add("CharacterMenu", CharacterMenu);
game.scene.add("Game", Game);
game.scene.add("Pause", Pause);
game.scene.add("GameUI", GameUI);
game.scene.add("QuitGame", QuitGame);

//Menu screens
game.scene.add("LeaderboardScreen", LeaderboardScreen);
game.scene.add("MainMenu", MainMenu);
game.scene.add("Credits", Credits);
game.scene.add("Endgame", Endgame);
game.scene.add("InitialTutorial", InitialTutorial);
game.scene.start("MainMenu");
