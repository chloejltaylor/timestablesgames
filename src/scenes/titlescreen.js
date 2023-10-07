import Shared from './shared.js'

export default class Title extends Shared

{

constructor()
{
super('title')
}

gameheight= 900
background
title
waitTime = 800


create()
{
  this.scene.run('ui')
  this.scene.run('shared')
  this.testFunction()
  
this.getScale()
let cX = this.cX
let cY = this.cY
let scalefactor = this.scalefactor


  this.background = this.add.image(cX, cY,  'background-title').setScale(scalefactor).setAlpha(0.1)
  this.title = this.add.image(cX, cY-150*scalefactor,  'spritesheet-core', 'title-main.png').setScale(0)
  this.playbutton = this.add.image(cX, cY+150*scalefactor,  'spritesheet-buttons','button-playbig-idle.png').setScale(0)
  this.titleAnimation()

  this.playbutton.setInteractive().on('pointerdown', pointer =>
  {
    this.playbutton.setTexture('spritesheet-buttons', 'button-playbig-active.png' )
    this.buttonPress(this.playbutton)
    this.time.delayedCall(
      this.waitTime,
      () => {
        this.scene.start('choosenumber')
      },
      [],
      this)
    
  })

}



  // getScale() {
  //   let h = this.game.canvas.height
  //   let w = this.game.canvas.width
  //   this.cX = w / 2
  //   this.cY = h / 2
  //   this.scale = this.game.canvas.height / this.gameheight
    
  //   }

  titleAnimation() {

    this.tweens.chain({
      targets: [this.title, this.playbutton],
      tweens: [
          {
              scale: this.scalefactor,
              // ease: 'Sine.easeInOut',
              ease: 'Bounce.easeOut',
              duration: 1500
          },
      ]
  })

  this.tweens.chain({
    targets: [this.background],
    tweens: [
        {
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500
        },
    ]
})

  }

}