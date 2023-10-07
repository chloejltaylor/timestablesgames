import Shared from '../shared.js'

export default class gameTitle extends Shared

{

constructor()
{
super('game-title')
}

gameheight= 900
background
title
waitTime = 800
gameTitle
numberchosen

init(data) {
    this.gameTitle = data.gameTitle
    this.numberchosen = data.numberchosen
}


create()
{

    console.log("HERE! "+ this.numberchosen)

    this.scene.run('ui')
    this.scene.run('shared')
  
    this.getScale()
    let cX = this.cX
    let cY = this.cY
    let scale = this.scale


    this.background = this.add.image(cX, cY,  'background-title').setScale(scale).setAlpha(0.1)
    this.title = this.add.image(cX-200, cY-150*scale,  'spritesheet-core', 'gameicon-'+this.gameTitle+'.png').setScale(scale)
    this.number = this.add.image(cX+200, cY-150*scale,  'spritesheet-core', 'intronum-'+this.numberchosen+'.png').setScale(scale)

    this.playbutton = this.add.image(cX, cY+150*scale,  'spritesheet-buttons','button-playbig-idle.png').setScale(scale)
    // this.enterAnimation()

  this.playbutton.setInteractive().on('pointerdown', pointer =>
  {
    this.playbutton.setTexture('spritesheet-buttons', 'button-playbig-active.png' )
    this.buttonPress(this.playbutton)
    this.time.delayedCall(
      this.waitTime,
      () => {
        this.scene.start(this.gameTitle, {timestable: this.numberchosen})
      },
      [],
      this)
    
  })
}



}