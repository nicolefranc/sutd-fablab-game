import Phaser, { Tilemaps } from "phaser";

import background from "../resources/Main Menu/background.png";
import mainMenuBGM from "../resources/audio/Main Menu.ogg";
import mainMenuBGMFallback from "../resources/audio/Main Menu.m4a";
//buttons
import Button from "../sprites/button";
import leaderboard from "../resources/Main Menu/leaderboard.png";
import leaderboardPrs from "../resources/Main Menu/leaderboard_prs.png";
import options from "../resources/Main Menu/options.png";
import optionsPrs from "../resources/Main Menu/options_prs.png";
import start from "../resources/Main Menu/start.png";
import startPrs from "../resources/Main Menu/start_prs.png";
import credits from "../resources/Main Menu/credits.png";
import creditsPrs from "../resources/Main Menu/credits_prs.png";
import btnPrsSound from "../resources/audio/Button Click.ogg";
import btnPrsSoundFallback from "../resources/audio/Button Click.m4a";
import Resources from "../resources/resources";
import SettingsMenu from "./SettingsMenu";
import LeaderboardScreen from "./LeaderboardScreen";
import Credits from "./Credits";
import DifficultyMenu from "./DifficultyMenu";
import EndgameOverlay from "./Endgame";
import GameUI from "./GameUI";
import Pause from "./Pause";
import QuitGame from "./QuitGame";
import Game from "./Game";
import CharacterMenu from "./CharacterMenu";
import TutorialMenu from "./TutorialMenu";
import LeaderboardUtils from "../leaderboard/leaderboardUtils";

export default class MainMenu extends Phaser.Scene {
  static firstLoad = true;
  static dontPlay = false;
  constructor(config) {
    super(config);
  }

  preload() {
    this.loadingText = this.add
      .text(400, 250, "Loading...", {
        fontFamily: "arial",
        fontSize: 30,
      })
      .setOrigin(0.5, 0.5);
    if (!MainMenu.firstLoad) return;
    this.load.image("mainMenuBackground", background);
    this.load.image("leaderboardBtn", leaderboard);
    this.load.image("leaderboardBtnPrs", leaderboardPrs);
    this.load.image("optionsBtn", options);
    this.load.image("optionsBtnPrs", optionsPrs);
    this.load.image("startBtn", start);
    this.load.image("startBtnPrs", startPrs);
    this.load.image("creditsBtn", credits);
    this.load.image("creditsBtnPrs", creditsPrs);
    if (this.sys.game.device.audio.ogg) {
      this.load.audio("btnPrsSound", btnPrsSound);
      this.load.audio("mainMenuBGM", mainMenuBGM);
    } else {
      //fallback using m4a
      this.load.audio("btnPrsSound", btnPrsSoundFallback);
      this.load.audio("mainMenuBGM", mainMenuBGMFallback);
    }
    Resources.preloadMaterialImages(this);
    Credits.preloadAssets(this);
    DifficultyMenu.preloadAssets(this);
    CharacterMenu.preloadAssets(this);
    EndgameOverlay.preloadAssets(this);
    Game.preloadAssets(this);
    GameUI.preloadAssets(this);
    LeaderboardScreen.preloadAssets(this);
    Pause.preloadAssets(this);
    QuitGame.preloadAssets(this);
    SettingsMenu.preloadAssets(this);
    TutorialMenu.preloadAssets(this);
    MainMenu.firstLoad = false;
  }

  create() {
    this.components = {};
    let jsonComponent;
    // let jsonComponent = require("../../output.json");
    // for (let i = 0; i < jsonComponent.length; i++) {
    //     this.components[jsonComponent[i].name] = jsonComponent[i].quantity;
    // }
    LeaderboardUtils.getMaterials(
      (response) => {
        jsonComponent = response;
        for (let i = 0; i < jsonComponent.length; i++) {
          this.components[jsonComponent[i].name] = jsonComponent[i].quantity;
        }
      },
      (err) => {
        this.components = null;
      }
    );
    this.bgm = this.sound.add("mainMenuBGM");
    if (!MainMenu.dontPlay) {
      this.bgm.play({
        volume: SettingsMenu.musicVolume / 18,
        loop: true,
      });
      MainMenu.dontPlay = true;
    }
    this.btnPrsSound = this.sound.add("btnPrsSound");

    var scale = 500 / 768;
    var scaleX = 800 / 1368;
    this.background = this.add.image(400, 250, "mainMenuBackground");
    this.background.setScale(scaleX, scale);
    this.buttons = {};
    this.buttons["options"] = new Button(
      this,
      (200 / 1090) * 800,
      (650 / 768) * 500,
      "optionsBtn",
      scale,
      () => {
        this.btnPrsSound.play({
          volume: SettingsMenu.sfxVolume / 18,
        });
        this.settingsMenu.show();
      },
      "optionsBtnPrs"
    );
    this.buttons["start"] = new Button(
      this,
      (544 / 1090) * 800,
      (426 / 768) * 500,
      "startBtn",
      scale,
      () => {
        // this.sound.play("btnPrsSound", {
        //     volume: SettingsMenu.sfxVolume / 18,
        // });
        this.btnPrsSound.play({
          volume: SettingsMenu.sfxVolume / 18,
        });

        this.scale.startFullscreen();

        this.game.scene.start("DifficultyMenu", {
          components: this.components,
        });
        this.game.scene.bringToTop("DifficultyMenu");
        this.game.scene.pause("MainMenu");
      },
      "startBtnPrs"
    );
    this.buttons["leaderboard"] = new Button(
      this,
      (888 / 1090) * 800,
      (650 / 768) * 500,
      "leaderboardBtn",
      scale,
      () => {
        // this.sound.play("btnPrsSound", {
        //     volume: SettingsMenu.sfxVolume / 18,
        // });
        this.btnPrsSound.play({
          volume: SettingsMenu.sfxVolume / 18,
        });

        this.game.scene.pause("MainMenu");
        this.game.scene.start("LeaderboardScreen");
        this.game.scene.bringToTop("LeaderboardScreen");
      },
      "leaderboardBtnPrs"
    );
    this.buttons["credits"] = new Button(
      this,
      (544 / 1090) * 800,
      (650 / 768) * 500,
      "creditsBtn",
      scale,
      () => {
        // this.sound.play("btnPrsSound", {
        //     volume: SettingsMenu.sfxVolume / 18,
        // });
        this.btnPrsSound.play({
          volume: SettingsMenu.sfxVolume / 18,
        });

        this.game.scene.start("Credits");
        this.game.scene.bringToTop("Credits");
        this.game.scene.pause("MainMenu");
      },
      "creditsBtnPrs"
    );
    this.tutorialMenu = new TutorialMenu(
      this,
      () => {},
      () => {
        for (var i in this.buttons) {
          this.buttons[i].enable(true);
        }
      }
    );
    this.settingsMenu = new SettingsMenu(
      this,
      () => {
        for (var i in this.buttons) this.buttons[i].enable(false);
      },
      () => {
        for (var i in this.buttons) this.buttons[i].enable(true);
      },
      this.tutorialMenu
    );
    this.loadingText.visible = false;
  }
  update() {
    this.bgm.volume = SettingsMenu.musicVolume / 18;
  }
}
