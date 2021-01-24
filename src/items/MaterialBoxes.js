import acrylicBox from "../arts/Boxes (Containing Materials)/PNG/Acrylic Box.png"
import filamentBox from "../arts/Boxes (Containing Materials)/PNG/Filament Box.png"
import metalBox from "../arts/Boxes (Containing Materials)/PNG/Metal Box.png"
import pcbBox from "../arts/Boxes (Containing Materials)/PNG/PCB box.png"
import woodBox from "../arts/Boxes (Containing Materials)/PNG/Wood Box.png"

export default class MaterialBoxes{

    static get materialBoxesList(){
        return {
            "Acrylic": {
                "path": acrylicBox
            },
            "Filament": {
                "path": filamentBox
            },
            "MetalSheet": {
                "path": metalBox
            },
            "Pcb": {
                "path": pcbBox
            },
            "Wood": {
                "path": woodBox
            }
        }
    }

    static get spriteNamespace(){
        return "materialBoxes"
    }

}