export default class TestScene extends Phaser.Scene {
 
    create() {
        this.text = this.add.text(400,250,"ABC",{
            fontFamily: "calibri",
            fontSize: '24px',
            fixedWidth: 84,
            fixedHeight: 24,
            color: "#ffffff",
            backgroundColor: '#333333',
            valign: 'center'
        })
        .setInteractive()
        this.text.on("pointerdown",()=>{
            var config = {
                onTextChanged: function (textObject, text) {
                    textObject.text = text;
                },
                selectAll: true
            }
            this.plugins.get('rextexteditplugin').edit(this.text, config);
        },this);
    }
}