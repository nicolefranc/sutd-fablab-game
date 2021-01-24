import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {}

    create() {
        this.add.text(400, 250, 'Game')
        // this.add.image(0, 0, 'fablab_tiles')
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('fablab', 'tiles')
        const floor = map.createLayer('Floor', tileset)
        const walls = map.createLayer('Walls', tileset)

        // this.renderCollisionWalls(walls)
    }

    renderCollisionWalls(collider) {
        collider.setCollisionByProperty({ collides: true })

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        collider.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })
    }
}