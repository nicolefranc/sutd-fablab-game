import fablabTilesJson from './tiles/fablab.json'

export default class Resources {
    
    static get tileLength() {
        return fablabTilesJson["tileheight"];
    }

    static get materialBoxes() {
        return {
            "acrylic": {
                "tileIds": [2,42]
            },
            "metalSheet": {
                "tileIds": [1,41]
            },
            "filament": {
                "tileIds": [4]
            },
            "pcb": {
                "tileIds": [5]
            },
            "wood": {
                "tileIds": [3,43]
            }
        }
    }

    static get materialBoxesIds() {
        var returnIds = [];
        for (var i in Resources.materialBoxes) returnIds.push(...Resources.materialBoxes[i]["tileIds"]);
        return returnIds;
    }

    static isMaterialBox(id) {
        return Resources.materialBoxesIds.indexOf(id) !== -1;
    }

    static get waitingTools() {
        return {
            "laserCutter": {
                "tileIds": [6]
            }
        }
    }

    static get waitingTools() {
        return {
            "laserCutter": {
                "tileIds": [7],
                "multiplyOffset": [1,0],
                "addOffset": [0,Resources.tileLength/2],
                "physicsBodyProportions": [0.9,0.8],
                "texture": "blankTile",
                "materialTable": {
                    "acrylic": {
                        "output": "jigsawAcrylic"
                    },
                    "wood":{
                        "output": "jigsawWood"
                    }
                }
            },
            "3dPrinter": {
                "tileIds": [19],
                "multiplyOffset": [0,0],
                "addOffset": [Resources.tileLength/2,Resources.tileLength/2],
                "physicsBodyProportions": [0.8,0.8],
                "texture": "blankHorizontalTiles",
                "materialTable": {
                    "filament": {
                        "output": "3dPrint"
                    }
                }
            }
        }
    }

}