import Phaser from "phaser";
import Button from "../sprites/button";

import endGameMusic from "../resources/audio/Ending.webm";
import leaderboardBtn from "../resources/endgame/leaderboardbutton.png";
import leaderboardBtnPrs from "../resources/endgame/leaderboardbuttonpressed.png";
import mainOverlay from "../resources/endgame/Popup.png";
import replayBtn from "../resources/endgame/replaybutton.png";
import replayBtnPrs from "../resources/endgame/replaybuttonpressed.png";
import endgameSubmitBtn from "../resources/endgame/submit_btn.png";
import endgameSubmitBtnPrs from "../resources/endgame/submit_btn_prs.png";
import endgameRobot1Dark from "../resources/endgame/easy_robot_dark.png";
import endgameRobot2Dark from "../resources/endgame/normal_robot_dark.png";
import endgameRobot3Dark from "../resources/endgame/hard_robot_dark.png";
import endgameRobot1 from "../resources/endgame/easy_robot.png";
import endgameRobot2 from "../resources/endgame/normal_robot.png";
import endgameRobot3 from "../resources/endgame/hard_robot.png";

import Resources from "../resources/resources";
import SettingsMenu from "../scenes/SettingsMenu";
import MainMenu from "./MainMenu";

import LeaderboardUtils from "../leaderboard/leaderboardUtils";

export default class EndgameOverlay extends Phaser.Scene {
  static textDefaultConfig = {
    fontFamily: "peepo",
    fontSize: 18,
    color: "#000000",
  };
  static textLargeConfig = {
    fontFamily: "peepo",
    fontSize: 25,
    color: "#000000",
  };

  static emailAddressKey = "emailAddress";
  static nameKey = "name";

  init(data) {
    this.data = data;
  }

  static preloadAssets(scene) {
    scene.load.audio("endGameMusic", endGameMusic);
    scene.load.image("mainOverlay", mainOverlay);
    scene.load.image("leaderboardBtn", leaderboardBtn);
    scene.load.image("leaderboardBtnPrs", leaderboardBtnPrs);
    scene.load.image("replayBtn", replayBtn);
    scene.load.image("replayBtnPrs", replayBtnPrs);
    scene.load.image("endgameSubmitBtn", endgameSubmitBtn);
    scene.load.image("endgameSubmitBtnPrs", endgameSubmitBtnPrs);
    scene.load.image("endgameRobot1", endgameRobot1);
    scene.load.image("endgameRobot2", endgameRobot2);
    scene.load.image("endgameRobot3", endgameRobot3);
    scene.load.image("endgameRobot1Dark", endgameRobot1Dark);
    scene.load.image("endgameRobot2Dark", endgameRobot2Dark);
    scene.load.image("endgameRobot3Dark", endgameRobot3Dark);
  }

  //TODO: implement a resume button
  create() {
    this.endGameMusic = this.sound.add("endGameMusic");
    this.endGameMusic.play({
      volume: SettingsMenu.musicVolume / 15,
      loop: true,
    });
    let printText = this.add.text(500, 400, "hello", {
      color: "0x000000",
      fontSize: 60,
    });

    this.veil = this.add.graphics({ x: 0, y: 0 });
    this.veil.fillStyle("0x000000", 0.6);
    this.veil.fillRect(0, 0, Resources.screenWidth, Resources.screenHeight);
    this.veil.setScrollFactor(0);
    this.username;
    this.mainOverlay = this.add.image(400, 250, "mainOverlay");
    this.mainOverlay.setScale(0.7);
    this.mainOverlay.setScrollFactor(0);
    if (this.data.completed === true) {
      this.robotImage = this.add
        .image(
          400,
          250 - 82.5 * 0.7,
          this.data["difficulty"] === "easy"
            ? "endgameRobot1"
            : this.data["difficulty"] === "normal"
            ? "endgameRobot2"
            : "endgameRobot3"
        )
        .setScale(0.7);
    } else {
      this.robotImage = this.add
        .image(
          395,
          250 - 82.5 * 0.7,
          this.data["difficulty"] === "easy"
            ? "endgameRobot1Dark"
            : this.data["difficulty"] === "normal"
            ? "endgameRobot2Dark"
            : "endgameRobot3Dark"
        )
        .setScale(0.7);
    }
    this.nextBtn = new Button(
      this,
      550,
      410,
      "leaderboardBtn",
      0.5,
      () => {
        // console.log("leaderboard button pressed");
        this.sound.stopAll();
        MainMenu.dontPlay = false;
        this.scene.start("LeaderboardScreen");
        this.scene.bringToTop("LeaderboardScreen");
        this.scene.stop("Game");
        this.scene.stop("GameUI");
        this.scene.stop("Endgame");
      },
      "leaderboardBtnPrs"
    );
    this.replayBtn = new Button(
      this,
      215,
      410,
      "replayBtn",
      0.7,
      () => {
        // console.log("replay button pressed");
        this.scale.startFullscreen();
        this.sound.stopAll();
        // this.scene.stop("Game");
        // this.scene.stop("Endgame");
        this.scene.stop("GameUI");
        this.scene.start("Game", this.data);
      },
      "replayBtnPrs"
    );
    this.nextBtn.enable(false);
    this.nextBtn.setVisible(false);
    this.replayBtn.enable(false);
    this.replayBtn.setVisible(false);

    this.createSubmissionFields();
  }

  createSubmissionFields() {
    this.submissionTexts = {};
    this.submissionTexts["name"] = this.add
      .text(175, 300, "Name (3 letters)", EndgameOverlay.textDefaultConfig)
      .setOrigin(0, 0.5);
    this.submissionTexts["nameField"] = this.add
      .text(
        175,
        325,
        localStorage.getItem(EndgameOverlay.nameKey) === null
          ? ""
          : localStorage.getItem(EndgameOverlay.nameKey),
        {
          fontFamily: "peepo",
          fontSize: 18,
          color: "#ffffff",
          backgroundColor: "#333333",
          align: "left",
          fixedWidth: 50,
          fixedHeight: 26,
          padding: { x: 3, y: 2 },
        }
      )
      .setOrigin(0, 0.5)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          var config = {
            onTextChanged: function (textObject, text) {
              textObject.text = text.substring(0, 3);
            },
            selectAll: true,
          };
          this.plugins
            .get("rextexteditplugin")
            .edit(this.submissionTexts["nameField"], config);
        },
        this
      );
    this.submissionTexts["email"] = this.add
      .text(375, 300, "Email", EndgameOverlay.textDefaultConfig)
      .setOrigin(0, 0.5);
    this.submissionTexts["emailField"] = this.add
      .text(
        375,
        325,
        localStorage.getItem(EndgameOverlay.emailAddressKey) === null
          ? ""
          : localStorage.getItem(EndgameOverlay.emailAddressKey),
        {
          fontFamily: "peepo",
          fontSize: 18,
          color: "#ffffff",
          backgroundColor: "#333333",
          align: "left",
          fixedWidth: 250,
          fixedHeight: 26,
          padding: { x: 3, y: 2 },
        }
      )
      .setOrigin(0, 0.5)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          var config = {
            onTextChanged: function (textObject, text) {
              textObject.text = text;
            },
            selectAll: true,
          };
          this.plugins
            .get("rextexteditplugin")
            .edit(this.submissionTexts["emailField"], config);
        },
        this
      );

    this.submitBtn = new Button(
      this,
      400,
      410,
      "endgameSubmitBtn",
      (0.7 * 83) / 155,
      () => {
        this.submit();
      },
      "endgameSubmitBtn",
      true,
      "endgameSubmitBtnPrs"
    );
    this.submissionTexts["invalid"] = this.add
      .text(400, 365, "Invalid name/email", EndgameOverlay.textDefaultConfig)
      .setOrigin(0.5, 0.5);
    this.submissionTexts["invalid"].visible = false;
    this.indicatorText = this.add
      .text(400, 312.5, "Loading...", EndgameOverlay.textDefaultConfig)
      .setOrigin(0.5, 0.5);
    this.indicatorText.visible = false;
  }

  submit() {
    if (
      this.submissionTexts["nameField"].text === "" ||
      this.submissionTexts["emailField"].text === ""
    ) {
      this.submissionTexts["invalid"].visible = true;
      setTimeout(() => {
        this.submitBtn.enableToggle();
      }, 1000);
      return;
    }

    const nameRegexPat = "^[a-zA-Z]{3}$";
    const emailRegexPat =
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    if (
      !this.submissionTexts["nameField"].text.match(nameRegexPat) ||
      !this.submissionTexts["emailField"].text.match(emailRegexPat)
    ) {
      this.submissionTexts["invalid"].visible = true;
      setTimeout(() => {
        this.submitBtn.enableToggle();
      }, 1000);
      return;
    }

    for (var i in this.submissionTexts) {
      this.submissionTexts[i].enable = false;
      this.submissionTexts[i].visible = false;
    }

    this.indicatorText.visible = true;

    localStorage.setItem(
      EndgameOverlay.nameKey,
      this.submissionTexts["nameField"].text
    );

    localStorage.setItem(
      EndgameOverlay.emailAddressKey,
      this.submissionTexts["emailField"].text
    );

    LeaderboardUtils.submitScore(
      this.submissionTexts["nameField"].text,
      this.data["gender"],
      this.submissionTexts["emailField"].text,
      this.data["difficulty"],
      this.data["score"],
      0,
      this.data["materials"],
      (result) => {
        this.indicatorText.visible = false;
        this.submitBtn.setVisible(false);
        this.nextBtn.setVisible(true);
        this.nextBtn.enable(true);
        this.replayBtn.setVisible(true);
        this.replayBtn.enable(true);
        this.displayResult({
          rank: result["rank"],
          name: result["name"],
          score: result["score"],
          email: this.submissionTexts["emailField"].text,
        });
      },
      (err) => {
        this.indicatorText.text = "Error submitting scores to server";
        this.indicatorText.x = 400;
        this.indicatorText.y = 365;
        this.submitBtn.setVisible(false);
        this.nextBtn.setVisible(true);
        this.nextBtn.enable(true);
        this.replayBtn.setVisible(true);
        this.replayBtn.enable(true);
        this.displayResult({
          rank: "??",
          name: this.submissionTexts["name"],
          score: this.data["score"],
          email: this.submissionTexts["emailField"].text,
        });
      }
    );
  }

  displayResult(result) {
    const baseHeight = 300;
    const downHeight = baseHeight + 35;
    const boxColor = "0xe4e9ef";

    this.results = {};
    this.labels = {};
    this.borders = {};

    this.borders["overall"] = this.add.rectangle(
      400,
      baseHeight,
      505,
      55,
      "0xcdd0d9"
    );

    this.borders["rank"] = this.add.rectangle(
      200,
      baseHeight,
      95,
      50,
      boxColor
    );
    this.results["rank"] = this.add
      .text(
        200,
        baseHeight,
        "#" + result["rank"],
        EndgameOverlay.textLargeConfig
      )
      .setOrigin(0.5, 0.5);
    this.labels["rank"] = this.add
      .text(200, downHeight, "rank", EndgameOverlay.textDefaultConfig)
      .setOrigin(0.5, 0.5);

    this.borders["name"] = this.add.rectangle(
      300,
      baseHeight,
      95,
      50,
      boxColor
    );
    this.results["name"] = this.add
      .text(300, baseHeight, result["name"], EndgameOverlay.textLargeConfig)
      .setOrigin(0.5, 0.5);
    this.labels["name"] = this.add
      .text(300, downHeight, "name", EndgameOverlay.textDefaultConfig)
      .setOrigin(0.5, 0.5);

    this.borders["score"] = this.add.rectangle(
      400,
      baseHeight,
      95,
      50,
      boxColor
    );
    this.results["score"] = this.add
      .text(
        400,
        baseHeight,
        "" + result["score"],
        EndgameOverlay.textLargeConfig
      )
      .setOrigin(0.5, 0.5);
    this.labels["score"] = this.add
      .text(400, downHeight, "score", EndgameOverlay.textDefaultConfig)
      .setOrigin(0.5, 0.5);

    this.borders["email"] = this.add.rectangle(
      550,
      baseHeight,
      195,
      50,
      boxColor
    );
    this.results["email"] = this.add
      .text(
        550,
        baseHeight,
        result["email"].length > 12
          ? result["email"].substring(0, 10) + "..."
          : result["email"],
        EndgameOverlay.textLargeConfig
      )
      .setOrigin(0.5, 0.5);
    this.labels["email"] = this.add
      .text(550, downHeight, "email", EndgameOverlay.textDefaultConfig)
      .setOrigin(0.5, 0.5);
  }
}
