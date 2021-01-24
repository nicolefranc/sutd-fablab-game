export default class ScoreController {
    constructor(x,y,scene){
        this.initializeDisplay(x,y,scene);
        this.score = 0;
    }

    addScore(increment) {
        this.score += increment;
        this.updateDisplay();
    }

    initializeDisplay(x,y,scene){
        this.textVisual = scene.add.text(x,y,'0');
    }

    updateDisplay(){
        this.textVisual.text = "" + this.score;
    }

    // Do we need this?
    deleteDisplay(){
        
    }
}