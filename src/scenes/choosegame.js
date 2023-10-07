import Shared from './shared.js'

export default class ChooseGame extends Shared

{

constructor()
{
super('choosegame')
}

gameheight = 900
waitTime = 200
games = []
numberchosen

init(data) {
    this.numberchosen = data.numberchosen
}


create()
{

    console.log("number chosen: " + this.numberchosen)
  
this.getScale()
let cX = this.cX
let cY = this.cY
let scalefactor = this.scalefactor

this.background = this.add.image(cX, cY,  'background-yellow').setScale(scalefactor)

this.title = this.add.image(cX, cY-300*scalefactor, 'spritesheet-core', 'chooseagame-title.png').setScale(scalefactor)
this.numberSelectedDisplay = this.add.image(cX+650*scalefactor, cY-300*scalefactor, 'spritesheet-core', 'intronum-'+this.numberchosen+'.png').setScale(scalefactor*2)



  this.games[0] = this.add.image(cX-300, cY-200*scalefactor,  'spritesheet-core','gameicon-'+this.gameList[0]+'.png').setScale(0)
  this.games[1] = this.add.image(cX, cY-50*scalefactor,  'spritesheet-core','gameicon-'+this.gameList[1]+'.png').setScale(0)
  this.games[2]= this.add.image(cX+300*scalefactor, cY-200*scalefactor,  'spritesheet-core','gameicon-'+this.gameList[2]+'.png').setScale(0)
  this.games[3] = this.add.image(cX-450*scalefactor, cY+100*scalefactor,  'spritesheet-core','gameicon-'+this.gameList[3]+'.png').setScale(0)
  this.games[4] = this.add.image(cX+450*scalefactor, cY+100*scalefactor,  'spritesheet-core','gameicon-'+this.gameList[4]+'.png').setScale(0)
  this.games[5] = this.add.image(cX-250*scalefactor, cY+300*scalefactor,  'spritesheet-core','gameicon-'+this.gameList[5]+'.png').setScale(0)
  this.games[6] = this.add.image(cX+250*scalefactor, cY+300*scalefactor,  'spritesheet-core','gameicon-'+this.gameList[6]+'.png').setScale(0)


  this.enterAnimation(this.games,this.games.length)

  for(let i=0; i<this.games.length; i++){

    this.games[i].setInteractive().on('pointerdown', pointer =>
    {
      this.time.delayedCall(
        this.waitTime,
        () => {
          console.log("you have chosen game "+this.gameList[i])
          this.buttonPress(this.games[i])  
          this.scene.start('game-title', {
            gameTitle: this.gameList[i],
            numberchosen: this.numberchosen
          })      
        },
        [],
        this)
        
    }
    )
  }

}





}