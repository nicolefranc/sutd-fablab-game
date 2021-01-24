export default class Materials {
    static get materialList() {
        return {
            "Acrylic": {
                "imgId": "Acrylic Board"
            },
            "Pcb": {
                "imgId": "PCB"
            },
            "Wood": {
                "imgId": "Wood Board"
            },
            "Filament": {
                "imgId": "Filament"
            },
            "MetalSheet": {
                "imgId": "Metal Board"
            },
            "JigsawAcrylic": {
                "imgId": "Acrylic Cut"
            },
            "JigsawWood": {
                "imgId": "Wood Cut"
            },
            "JigsawMetal": {
                "imgId": "Metal Cut"
            },
            /*"AcrylicStrips": {
                "imgId": "mAcrylicStrips"
            },
            "WoodStrips": {
                "imgId": "mWoodStrips"
            },
            "MetalStrips": {
                "imgId": "mMetalStrips"
            },*/
            "DonutAcrylic": {
                "imgId": "Acrylic Drill"
            },
            "DonutWood": {
                "imgId": "Wood Drill"
            },
            "DonutMetal": {
                "imgId": "Metal Drill"
            },
            "3dPrint": {
                "imgId": "Filament Print"
            }
        };
        
    }
    
    static get spriteNamespace(){
        return "material"
    }

    static get spritePath(){
        return "../arts/Materials/PNG/"
    }
}