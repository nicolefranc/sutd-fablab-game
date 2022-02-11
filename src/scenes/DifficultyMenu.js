import Phaser from "phaser";
import SettingsMenu from "./SettingsMenu";
import difficultyMenuBg from "../resources/Difficulty Menu/difficulty_menu_final_2.png";
import difficultyMenuEasyButtonDark from "../resources/Difficulty Menu/easy_dark.png";
import difficultyMenuNormalButtonDark from "../resources/Difficulty Menu/normal_dark.png";
import difficultyMenuHardButtonDark from "../resources/Difficulty Menu/hard_dark.png";

import difficultyMenuEasyButton from "../resources/Difficulty Menu/easy.png";
import difficultyMenuNormalButton from "../resources/Difficulty Menu/normal.png";
import difficultyMenuHardButton from "../resources/Difficulty Menu/hard.png";

import backButton from "../resources/tutorial/left_button.png";
import Button from "../sprites/button";
import OrderDisplay from "../controllers/orderDisplay";

const JIG_ACR_MAX = 300;
const JIG_WOD_MAX = 300;
const DRL_WOD_MAX = 250;
const STR_WOD_MAX = 400;
const STR_ACR_MAX = 250;
const JIG_MTL_MAX = 200;
const THR_PRT_MAX = 250;
const DRL_MTL_MAX = 125;
const DRL_ACR_MAX = 350;
const SOL_PCB_MAX = 500;

export default class DifficultyMenu extends Phaser.Scene {
  constructor(config) {
    super(config);
  }
  static textDefaultConfig = {
    fontFamily: "peepo",
    fontSize: 18,
    color: "#000000",
  };
  static textTitleConfig = {
    fontFamily: "peepo",
    fontSize: 20,
    color: "#000000",
    align: "center",
  };

  static preloadAssets(scene) {
    scene.load.image("difficultyMenuBg", difficultyMenuBg);
    scene.load.image("difficultyMenuEasyButton", difficultyMenuEasyButton);
    scene.load.image(
      "difficultyMenuEasyButtonDark",
      difficultyMenuEasyButtonDark
    );
    scene.load.image("difficultyMenuNormalButton", difficultyMenuNormalButton);
    scene.load.image(
      "difficultyMenuNormalButtonDark",
      difficultyMenuNormalButtonDark
    );
    scene.load.image("difficultyMenuHardButton", difficultyMenuHardButton);
    scene.load.image(
      "difficultyMenuHardButtonDark",
      difficultyMenuHardButtonDark
    );
    scene.load.image("backButton", backButton);
  }
  init(data) {
    this.components = data.components;
  }

  create() {
    this.data = {};
    this.data.completed = false;

    this.btnPrsSound = this.sound.add("btnPrsSound");
    this.images = {};
    var scaleY = 500 / 768;
    var scaleX = 800 / 1368;
    this.images["bg"] = {
      image: this.add.image(800 / 2, 500 / 2, "difficultyMenuBg"),
    };
    this.images["backButton"] = new Button(
      this,
      (80 / 1090) * 800,
      (225 / 768) * 500,
      "backButton",
      0.5,
      () => {
        this.btnPrsSound.play({
          volume: SettingsMenu.sfxVolume / 18,
        });
        this.game.scene.pause("DifficultyMenu");
        this.game.scene.start("MainMenu");
        this.game.scene.bringToTop("MainMenu");
      }
    );
    this.images["bg"]["image"].setScale(scaleX, scaleY);
    this.data.easyCompleted = false;
    this.data.normalCompleted = false;
    this.data.hardCompleted = false;
    //EASY Components
    if (this.components !== null) {
      if (this.easyFulfilled()) {
        this.data.easyCompleted = true;
        this.renderEasyTexture();
      } else {
        this.renderEasyBlack();
      }
      if (this.normalFulfilled()) {
        this.data.normalCompleted = true;
        this.renderNormalTexture();
      } else {
        this.renderNormalBlack();
      }
      if (this.hardFulfilled()) {
        this.data.hardCompleted = true;
        this.renderHardTexture();
      } else {
        this.renderHardBlack();
      }

      this.texts = {};
      this.texts.easy = {};
      this.texts.general = {};
      this.texts.general.instructions = this.add.text(
        (350 / 1368) * 800,
        (150 / 769) * 500,
        "Collaboration is key at SUTD!\nHelp us fabricate the components needed\nto unlock the secret illustrations!",
        DifficultyMenu.textTitleConfig
      );
      this.images["easy"] = {};
      this.images["easy"]["jigsawAcrylic"] = this.add.image(
        (75 / 1368) * 800,
        (600 / 769) * 500,
        "jigsawAcrylic"
      );
      this.images.easy.jigsawAcrylic.setScale(0.075);
      this.texts["easy"]["jigsawAcrylic"] = this.add.text(
        (125 / 1368) * 800,
        (580 / 769) * 500,
        this.components.jigsawAcrylic + "/" + JIG_ACR_MAX,
        DifficultyMenu.textDefaultConfig
      );
      this.images["easy"]["jigsawWood"] = this.add.image(
        (75 / 1368) * 800,
        (660 / 769) * 500,
        "jigsawWood"
      );
      this.images.easy.jigsawWood.setScale(0.075);
      this.texts["easy"]["jigsawWood"] = this.add.text(
        (125 / 1368) * 800,
        (640 / 769) * 500,
        this.components.jigsawWood + "/" + JIG_WOD_MAX,
        DifficultyMenu.textDefaultConfig
      );
      this.images["easy"]["drilledWood"] = this.add.image(
        (282 / 1368) * 800,
        (600 / 769) * 500,
        "drilledWood"
      );
      this.images.easy.drilledWood.setScale(0.075);
      this.texts["easy"]["drilledWood"] = this.add.text(
        (332 / 1368) * 800,
        (580 / 769) * 500,
        this.components.drilledWood + "/" + DRL_WOD_MAX,
        DifficultyMenu.textDefaultConfig
      );

      //NORMAL component
      this.images.normal = {};
      this.texts["normal"] = {};
      this.images["normal"]["woodStrips"] = this.add.image(
        (515 / 1368) * 800,
        (600 / 769) * 500,
        "woodStrips"
      );
      this.images.normal.woodStrips.setScale(0.075);
      this.texts["normal"]["woodStrips"] = this.add.text(
        (565 / 1368) * 800,
        (580 / 769) * 500,
        this.components.woodStrips + "/" + STR_WOD_MAX,
        DifficultyMenu.textDefaultConfig
      );

      this.images["normal"]["drilledAcrylic"] = this.add.image(
        (515 / 1368) * 800,
        (660 / 769) * 500,
        "drilledAcrylic"
      );
      this.images.normal.drilledAcrylic.setScale(0.075);
      this.texts["normal"]["drilledAcrylic"] = this.add.text(
        (565 / 1368) * 800,
        (640 / 769) * 500,
        this.components.drilledAcrylic + "/" + DRL_ACR_MAX,
        DifficultyMenu.textDefaultConfig
      );

      this.images["normal"]["jigsawMetal"] = this.add.image(
        (722 / 1368) * 800,
        (600 / 769) * 500,
        "jigsawMetal"
      );
      this.images.normal.jigsawMetal.setScale(0.075);
      this.texts["normal"]["jigsawMetal"] = this.add.text(
        (772 / 1368) * 800,
        (580 / 769) * 500,
        this.components.jigsawMetal + "/" + JIG_MTL_MAX,
        DifficultyMenu.textDefaultConfig
      );

      this.images["normal"]["threeDPrint"] = this.add.image(
        (722 / 1368) * 800,
        (660 / 769) * 500,
        "threeDPrint"
      );
      this.images.normal.threeDPrint.setScale(0.075);
      this.texts["normal"]["threeDPrint"] = this.add.text(
        (772 / 1368) * 800,
        (640 / 769) * 500,
        this.components.threeDPrint + "/" + THR_PRT_MAX,
        DifficultyMenu.textDefaultConfig
      );

      //HARD Components
      this.images.hard = {};
      this.texts["hard"] = {};
      this.images["hard"]["acrylicStrips"] = this.add.image(
        (950 / 1368) * 800,
        (600 / 769) * 500,
        "acrylicStrips"
      );
      this.images.hard.acrylicStrips.setScale(0.075);
      this.texts["hard"]["acrylicStrips"] = this.add.text(
        (1000 / 1368) * 800,
        (580 / 769) * 500,
        this.components.acrylicStrips + "/" + STR_ACR_MAX,
        DifficultyMenu.textDefaultConfig
      );

      this.images["hard"]["woodStrips"] = this.add.image(
        (950 / 1368) * 800,
        (660 / 769) * 500,
        "woodStrips"
      );
      this.images.hard.woodStrips.setScale(0.075);
      this.texts["hard"]["woodStrips"] = this.add.text(
        (1000 / 1368) * 800,
        (640 / 769) * 500,
        this.components.woodStrips + "/" + STR_WOD_MAX,
        DifficultyMenu.textDefaultConfig
      );
      this.images["hard"]["drilledMetal"] = this.add.image(
        (950 / 1368) * 800,
        (720 / 769) * 500,
        "drilledMetal"
      );
      this.images.hard.drilledMetal.setScale(0.075);
      this.texts["hard"]["drilledMetal"] = this.add.text(
        (1000 / 1368) * 800,
        (700 / 769) * 500,
        this.components.drilledMetal + "/" + DRL_MTL_MAX,
        DifficultyMenu.textDefaultConfig
      );

      this.images["hard"]["drilledAcrylic"] = this.add.image(
        (1157 / 1368) * 800,
        (600 / 769) * 500,
        "drilledAcrylic"
      );
      this.images.hard.drilledAcrylic.setScale(0.075);
      this.texts["hard"]["drilledAcrylic"] = this.add.text(
        (1207 / 1368) * 800,
        (580 / 769) * 500,
        this.components.drilledAcrylic + "/" + DRL_ACR_MAX,
        DifficultyMenu.textDefaultConfig
      );

      this.images["hard"]["solderedPcb"] = this.add.image(
        (1157 / 1368) * 800,
        (660 / 769) * 500,
        "solderedPcb"
      );
      this.images.hard.solderedPcb.setScale(0.075);
      this.texts["hard"]["solderedPcb"] = this.add.text(
        (1207 / 1368) * 800,
        (640 / 769) * 500,
        this.components.solderedPcb + "/" + SOL_PCB_MAX,
        DifficultyMenu.textDefaultConfig
      );
      this.images["hard"]["threeDPrint"] = this.add.image(
        (1157 / 1368) * 800,
        (720 / 769) * 500,
        "threeDPrint"
      );
      this.images.hard.threeDPrint.setScale(0.075);
      this.texts["hard"]["threeDPrint"] = this.add.text(
        (1207 / 1368) * 800,
        (700 / 769) * 500,
        this.components.threeDPrint + "/" + THR_PRT_MAX,
        DifficultyMenu.textDefaultConfig
      );
    } else {
      this.renderEasyBlack();
      this.renderNormalBlack();
      this.renderHardBlack();
      this.texts = {};
      this.texts.easy = {};
      this.texts.general = {};
      this.texts.general.instructions = this.add.text(
        (350 / 1368) * 800,
        (150 / 769) * 500,
        "Collaboration is key at SUTD!\nHelp us fabricate the components needed\nto unlock the secret illustrations!",
        DifficultyMenu.textTitleConfig
      );
    }
  }
  easyFulfilled() {
    if (
      this.components.jigsawAcrylic >= JIG_ACR_MAX &&
      this.components.jigsawWood >= JIG_WOD_MAX &&
      this.components.drilledWood >= DRL_WOD_MAX
    ) {
      return true;
    }
    return false;
  }
  normalFulfilled() {
    if (
      this.components.acrylicStrips >= STR_ACR_MAX &&
      this.components.drilledWood >= DRL_WOD_MAX &&
      this.components.jigsawMetal >= JIG_MTL_MAX &&
      this.components.threeDPrint >= THR_PRT_MAX
    ) {
      return true;
    }
    return false;
  }

  hardFulfilled() {
    if (
      this.components.acrylicStrips >= STR_ACR_MAX &&
      this.components.woodStrips >= STR_WOD_MAX &&
      this.components.drilledMetal >= DRL_MTL_MAX &&
      this.components.drilledAcrylic >= DRL_ACR_MAX &&
      this.components.solderedPcb >= SOL_PCB_MAX &&
      this.components.threeDPrint >= THR_PRT_MAX
    ) {
      return true;
    }
    return false;
  }

  renderEasyTexture() {
    this.images["difficultyMenuEasyButton"] = {
      image: new Button(
        this,
        (251 / 1368) * 800,
        (426 / 769) * 500,
        "difficultyMenuEasyButton",
        600 / 769,
        () => {
          this.data.difficulty = "easy";
          if (this.data.easyCompleted === true) {
            this.data.completed = true;
          }
          this.btnPrsSound.play({
            volume: SettingsMenu.sfxVolume / 18,
          });
          this.game.scene.pause("DifficultyMenu");
          this.game.scene.start("CharacterMenu", this.data);
          this.game.scene.bringToTop("CharacterMenu");
        }
      ),
    };
  }
  renderEasyBlack() {
    this.images["difficultyMenuEasyButton"] = {
      image: new Button(
        this,
        (251 / 1368) * 800,
        (426 / 769) * 500,
        "difficultyMenuEasyButtonDark",
        600 / 769,
        () => {
          this.data.difficulty = "easy";
          if (this.data.easyCompleted === true) {
            this.data.completed = true;
          }
          this.btnPrsSound.play({
            volume: SettingsMenu.sfxVolume / 18,
          });
          this.game.scene.pause("DifficultyMenu");
          this.game.scene.start("CharacterMenu", this.data);
          this.game.scene.bringToTop("CharacterMenu");
        }
      ),
    };
  }
  renderNormalTexture() {
    this.images["difficultyMenuNormalButton"] = {
      image: new Button(
        this,
        (684 / 1368) * 800,
        (427 / 769) * 500,
        "difficultyMenuNormalButton",
        600 / 769,
        () => {
          this.data.difficulty = "normal";
          if (this.data.normalCompleted === true) {
            this.data.completed = true;
          }
          this.btnPrsSound.play({
            volume: SettingsMenu.sfxVolume / 18,
          });
          this.game.scene.pause("DifficultyMenu");
          this.game.scene.start("CharacterMenu", this.data);
          this.game.scene.bringToTop("CharacterMenu");
        }
      ),
    };
  }
  renderNormalBlack() {
    this.images["difficultyMenuNormalButton"] = {
      image: new Button(
        this,
        (684 / 1368) * 800,
        (427 / 769) * 500,
        "difficultyMenuNormalButtonDark",
        600 / 769,
        () => {
          this.data.difficulty = "normal";
          if (this.data.normalCompleted === true) {
            this.data.completed = true;
          }
          this.btnPrsSound.play({
            volume: SettingsMenu.sfxVolume / 18,
          });
          this.game.scene.pause("DifficultyMenu");
          this.game.scene.start("CharacterMenu", this.data);
          this.game.scene.bringToTop("CharacterMenu");
        }
      ),
    };
  }
  renderHardTexture() {
    this.images["difficultyMenuHardButton"] = {
      image: new Button(
        this,
        (1117 / 1368) * 800,
        (427 / 769) * 500,
        "difficultyMenuHardButton",
        600 / 769,
        () => {
          this.data.difficulty = "hard";
          if (this.data.hardCompleted === true) {
            this.data.completed = true;
          }
          this.btnPrsSound.play({
            volume: SettingsMenu.sfxVolume / 18,
          });
          this.game.scene.pause("DifficultyMenu");
          this.game.scene.start("CharacterMenu", this.data);
          this.game.scene.bringToTop("CharacterMenu");
        }
      ),
    };
  }
  renderHardBlack() {
    this.images["difficultyMenuHardButton"] = {
      image: new Button(
        this,
        (1117 / 1368) * 800,
        (427 / 769) * 500,
        "difficultyMenuHardButtonDark",
        600 / 769,
        () => {
          this.data.difficulty = "hard";
          if (this.data.hardCompleted === true) {
            this.data.completed = true;
          }
          this.btnPrsSound.play({
            volume: SettingsMenu.sfxVolume / 18,
          });
          this.game.scene.pause("DifficultyMenu");
          this.game.scene.start("CharacterMenu", this.data);
          this.game.scene.bringToTop("CharacterMenu");
        }
      ),
    };
  }
}
