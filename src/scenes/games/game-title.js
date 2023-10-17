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

    console.log("GAME TITLE! "+ this.numberchosen)

    this.scene.run('ui')
    this.scene.run('shared')
  
    this.getScale()
    let cX = this.cX
    let cY = this.cY
    let scalefactor = this.scalefactor

    this.background = this.add.image(cX, cY,  'background-title').setScale(scalefactor)

    // this.background = this.add.image(cX, cY,  'background-title').setScale(scale).setAlpha(1)
    this.title = this.add.image(cX-200, cY-150*scalefactor,  'spritesheet-core', 'gameicon-'+this.gameTitle+'.png').setScale(scalefactor)
    this.number = this.add.image(cX+200, cY-150*scalefactor,  'spritesheet-core', 'intronum-'+this.numberchosen+'.png').setScale(scalefactor)

    this.playbutton = this.add.image(cX, cY+150*scalefactor,  'spritesheet-buttons','button-playbig-idle.png').setScale(scalefactor)
    this.enterAnimation()

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