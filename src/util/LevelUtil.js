export default class LevelUtil {
    
    /**
     * Length of a side of tile in pixels
     * Returns length in pixels
     */
    static get tileSize(){
        return 50;
    }
    
    /**
     * Dimensions of game in terms of tiles
     * Returns array of [vertical tiles, horizontal tiles]
     */
    static get gameTileSize(){
        return [16,10];
    }

    /**
     * Dimensions of game in terms of pixels
     * Returns array of [vertical pixels, horizontal pixels]
     */
    static get gamePixSize(){
        return [LevelUtil.gameTileSize[0]*LevelUtil.tileSize,LevelUtil.gameTileSize[1]*LevelUtil.tileSize];
    }

    static moveCharacter(posArray,characterObj){
        
    }

}