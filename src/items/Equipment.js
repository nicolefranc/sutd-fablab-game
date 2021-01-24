
export default class Equipment {
    static get equipmentList() {
        return {
            "3dPrinter": {
                "imgId": "3D Printer"
            },
            "laserCutter": {
                "imgId": "Laser Cutter"
            }
        }
    }

    static get spriteNamespace(){
        return "equipment"
    }

    static get spritePath(){
        return "../arts/Equipment/PNG"
    }
}