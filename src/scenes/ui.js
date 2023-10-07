import Phaser from '../lib/phaser.js'

export default class UI extends Phaser.Scene

{

constructor()
{
super('ui')
}

gameheight= 900
pause
waitTime = 200



create()
{
  

this.getScale()
let cX = this.cX
let cY = this.cY
let scale = this.scale

// this.sound.play('boing')


  this.pause = this.add.image(cX-470, cY-370*scale,  'spritesheet-buttons', 'button-pause-idle.png').setScale(scale)


  this.pause.setInteractive().on('pointerdown', pointer =>
  {
    this.pause.setTexture('spritesheet-buttons', 'button-pause-active.png' )
    this.time.delayedCall(
      this.waitTime,
      () => {
        console.log("PAUSE")
        this.scene.run('pause')
      },
      [],
      this)
    
  })

}

  getScale() {
    let h = this.game.canvas.height
    let w = this.game.canvas.width
    this.cX = w / 2
    this.cY = h / 2
    this.scale = this.game.canvas.height / this.gameheight
    
    }





}