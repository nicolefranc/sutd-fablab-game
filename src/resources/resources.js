import fablabTilesJson from "./tiles/fablab_complete.json";
import acrylic from "./Materials/Acrylic Board.png";
import metalSheet from "./Materials/Metal Board.png";
import filament from "./Materials/Filament.png";
import pcb from "./Materials/PCB.png";
import wood from "./Materials/Wood Board.png";
import jigsawAcrylic from "./Materials/Acrylic Cut.png";
import jigsawMetal from "./Materials/Metal Cut.png";
import jigsawWood from "./Materials/Wood Cut.png";
import threeDPrint from "./Materials/Filament Print.png";
import printedPcb from "./Materials/PCB Solder.png";
import cutAcrylic from "./Materials/Acrylic Drill.png";
import cutWood from "./Materials/Wood Drill.png";
import cutMetal from "./Materials/Metal Drill.png";
import acrylicStrips from "./Materials/Acrylic Strips.png";
import woodStrips from "./Materials/Wood Strips.png";

export default class Resources {
    static get tileLength() {
        return fablabTilesJson["tileheight"];
    }

    static get materialBoxes() {
        return {
            acrylic: {
                tileIds: [2, 42],
            },
            metalSheet: {
                tileIds: [1, 41],
            },
            filament: {
                tileIds: [4],
            },
            pcb: {
                tileIds: [5],
            },
            wood: {
                tileIds: [3, 43],
            },
        };
    }

    static get materialBoxesIds() {
        var returnIds = [];
        for (var i in Resources.materialBoxes)
            returnIds.push(...Resources.materialBoxes[i]["tileIds"]);
        return returnIds;
    }

    static isMaterialBox(id) {
        return Resources.materialBoxesIds.indexOf(id) !== -1;
    }

    static get waitingTools() {
        return {
            laserCutter: {
                tileIds: [7],
                multiplyOffset: [1, 0.5],
                physicsBodyProportions: [0.9, 0.8],
                texture: "blankHorizontalTiles",
                materialTable: {
                    acrylic: {
                        output: "jigsawAcrylic",
                    },
                    wood: {
                        output: "jigsawWood",
                    },
                    metalSheet: {
                        output: "jigsawMetal",
                    },
                },
            },
            threeDPrinter: {
                tileIds: [21],
                multiplyOffset: [0.5, 0.5],
                physicsBodyProportions: [0.8, 0.8],
                texture: "blankTile",
                materialTable: {
                    filament: {
                        output: "threeDPrint",
                    },
                },
            },
        };
    }
    static get interactiveTools() {
        return {
            drill: {
                tileIds: [52],
                multiplyOffset: [0.5, 0.5],
                physicsBodyProportions: [0.8, 0.8],
                texture: "blankTile",
                materialTable: {
                    jigsawAcrylic: {
                        output: "donutAcrylic",
                    },
                    jigsawMetal: {
                        output: "donutMetal",
                    },
                    jigsawWood: {
                        output: "donutWood",
                    },
                },
            },
            saw: {
                tileIds: [53],
                multiplyOffset: [0.5, 0.5],
                physicsBodyProportions: [0.8, 0.8],
                texture: "blankTile",
                materialTable: {
                    jigsawAcrylic: {
                        output: "acrylicStrips",
                    },
                    jigsawMetal: {
                        output: "metalStrips",
                    },
                    jigsawWood: {
                        output: "woodStrips",
                    },
                },
            },
            solderStation: {
                tileIds: [54],
                multiplyOffset: [0.5, 0.5],
                physicsBodyProportions: [0.8, 0.8],
                texture: "blankTile",
                materialTable: {
                    pcb: {
                        output: "printedPcb",
                    },
                },
            },
        };
    }
    static get interactiveToolIds() {
        let returnIds = [];
        for (let i in Resources.interactiveTools) {
            returnIds.push(...Resources.interactiveTools[i].tileIds);
        }
        return returnIds;
    }
    static isInteractiveTool(id) {
        return Resources.interactiveToolIds.indexOf(id) !== -1;
    }

    static get waitingToolIds() {
        var returnIds = [];
        for (var i in Resources.waitingTools)
            returnIds.push(...Resources.waitingTools[i]["tileIds"]);
        return returnIds;
    }

    static isWaitingTool(id) {
        return Resources.waitingToolIds.indexOf(id) !== -1;
    }

    static get assemblyTable() {
        return {
            tileIds: [10],
        };
    }

    static isAssemblyTable(id) {
        return Resources.assemblyTable["tileIds"].indexOf(id) !== -1;
    }

    static get items() {
        return {
            acrylic: {
                product: false,
                image: acrylic,
            },
            metalSheet: {
                product: false,
                image: metalSheet,
            },
            filament: {
                product: false,
                image: filament,
            },
            pcb: {
                product: false,
                image: pcb,
            },
            wood: {
                product: false,
                image: wood,
            },
            jigsawAcrylic: {
                product: true,
                image: jigsawAcrylic,
            },
            jigsawMetal: {
                product: true,
                image: jigsawMetal,
            },
            jigsawWood: {
                product: true,
                image: jigsawWood,
            },
            threeDPrint: {
                product: true,
                image: threeDPrint,
            },
            printedPcb: {
                product: true,
                image: printedPcb,
            },
            cutAcrylic: {
                product: true,
                image: cutAcrylic,
            },
            cutWood: {
                product: true,
                image: cutWood,
            },
            cutMetal: {
                product: true,
                image: cutMetal,
            },
            acrylicStrips: {
                product: true,
                image: acrylicStrips,
            },
            woodStrips: {
                product: true,
                image: woodStrips,
            },
        };
    }

    static get productItems() {
        var returnArray = [];
        for (var i in Resources.items) {
            if (Resources.items[i].product) returnArray.push(i);
        }
        return returnArray;
    }

    static preloadMaterialImages(scene) {
        for (var i in Resources.items) {
            scene.load.image(i, Resources.items[i]["image"]);
        }
    }
}
