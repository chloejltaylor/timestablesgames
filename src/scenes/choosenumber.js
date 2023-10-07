import Shared from './shared.js'

export default class ChooseNumber extends Shared

{

constructor()
{
super('choosenumber')
}

gameheight = 900
waitTime = 800
numbers = []
title



create()
{
  
this.getScale()
let cX = this.cX
let cY = this.cY
let scalefactor = this.scalefactor

this.scale.startFullscreen()


this.scene.run('ui')

  this.background = this.add.image(cX, cY,  'background-yellow').setScale(scalefactor)

  this.title = this.add.image(cX, cY-250*scalefactor, 'spritesheet-core', 'chooseanumber-title.png').setScale(scalefactor)

  this.numbers[0] = this.add.image(cX-300, cY-50*scalefactor,  'spritesheet-core','intronum-1.png')
  .setScale(0)
  this.numbers[1] = this.add.image(cX-150, cY-50*scalefactor,  'spritesheet-core','intronum-2.png')
  .setScale(0)
  this.numbers[2] = this.add.image(cX, cY-50*scalefactor,  'spritesheet-core','intronum-3.png')
  .setScale(0)
  this.numbers[3]= this.add.image(cX+150, cY-50*scalefactor,  'spritesheet-core','intronum-4.png')
  .setScale(0)
  this.numbers[4] = this.add.image(cX+300, cY-50*scalefactor,  'spritesheet-core','intronum-5.png')
  .setScale(0)
  this.numbers[5] = this.add.image(cX-300, cY+200*scalefactor,  'spritesheet-core','intronum-6.png')
  .setScale(0)
  this.numbers[6] = this.add.image(cX-150, cY+200*scalefactor,  'spritesheet-core','intronum-7.png')
  .setScale(0)
  this.numbers[7] = this.add.image(cX, cY+200*scalefactor,  'spritesheet-core','intronum-8.png')
  .setScale(0)
  this.numbers[8] = this.add.image(cX+150, cY+200*scalefactor,  'spritesheet-core','intronum-9.png')
  .setScale(0)
  this.numbers[9] = this.add.image(cX+300, cY+200*scalefactor,  'spritesheet-core','intronum-10.png')
  .setScale(0)

  this.enterAnimation(this.numbers,this.numbers.length)



    for(let i=0; i<this.numbers.length; i++){

      this.numbers[i].setInteractive().on('pointerdown', pointer =>
      {
        this.buttonPress(this.numbers[i])
        this.time.delayedCall(
          this.waitTime,
          () => {
            console.log("you have chosen number "+(i+1))
            this.scene.start('choosegame', {numberchosen:(i+1)})
          },
          [],
          this)
          
      }
      )
    }
}



}