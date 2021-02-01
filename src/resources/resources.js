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
                "tileIds": [7],
                "multiplyOffset": [1,0.5],
                "physicsBodyProportions": [0.9,0.8],
                "texture": "blankHorizontalTiles",
                "materialTable": {
                    "acrylic": {
                        "output": "jigsawAcrylic"
                    },
                    "wood":{
                        "output": "jigsawWood"
                    }
                }
            },
            "threeDPrinter": {
                "tileIds": [19],
                "multiplyOffset": [0.5,0.5],
                "physicsBodyProportions": [0.8,0.8],
                "texture": "blankTile",
                "materialTable": {
                    "filament": {
                        "output": "threeDPrint"
                    }
                }
            }
        }
    }

    static get waitingToolIds() {
        var returnIds = [];
        for (var i in Resources.waitingTools) returnIds.push(...Resources.waitingTools[i]["tileIds"]);
        return returnIds;
    }

    static isWaitingTool(id) {
        return Resources.waitingToolIds.indexOf(id) !== -1;
    }

    static get assemblyTable() {
        return {
            "tileIds": [10]
        }
    }

    static isAssemblyTable(id) {
        return Resources.assemblyTable["tileIds"].indexOf(id) !== -1;
    }

    static get items() {
        return {
            "acrylic": {
                "product": false
            },
            "metalSheet": {
                "product": false
            },
            "filament": {
                "product": false
            },
            "pcb": {
                "product": false
            },
            "wood": {
                "product": false
            },
            "jigsawAcrylic": {
                "product": true
            },
            "jigsawMetal": {
                "product": true
            },
            "jigsawWood": {
                "product": true
            },
            "threeDPrint": {
                "product": true
            },
            "printedPcb": {
                "product": true
            },
            "cutAcrylic": {
                "product": true
            },
            "cutWood": {
                "product": true
            },
            "cutMetal": {
                "product": true
            },
            "acrylicStrips": {
                "product": true
            },
            "woodStrips": {
                "product": true
            },
            "metalStrips": {
                "product": true
            }
        }
    }

    static get productItems() {
        var returnArray = [];
        for (var i in Resources.items) {
            if (Resources.items[i].product) returnArray.push(i);
        }
        return returnArray;
    }

}