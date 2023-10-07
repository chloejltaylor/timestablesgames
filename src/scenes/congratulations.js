import Phaser from '../lib/phaser.js'
export default class Congratulations extends Phaser.Scene

{
constructor()
{
super('congratulations')
}

init(data){
    this.finalscore = data.finalscore
}

create()
{
    const width = this.scale.width
    const height = this.scale.height


    this.add.text(width * 0.5, height * 0.5, "Well done!", {fontSize: 48}).setOrigin(0.5)

    // this.add.text(width * 0.5, height * 0.5, "You're so "+goodSynonyms[Phaser.Math.Between(0, 3)], {fontSize: 48}).setOrigin(0.5)


    const playagain = this.add.image(width * 0.5, height * 0.7, 'mg4-spritesheet-pw', 'playagain.png').setInteractive()

    playagain.once('pointerdown', () => {


        this.scene.stop()

        this.scene.start('level1', {
            level: 0,
        })
    
    })

}

}





