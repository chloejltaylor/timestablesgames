import Shared from "./shared.js"

export default class Pause extends Shared

{

constructor()
{
super('pause')
}

gameheight= 900
currentScene
background
paused
waitTime = 200
resume
back
home


create()
{

 
this.getScale()
let cX = this.cX
let cY = this.cY
let scalefactor = this.scalefactor

        // add all scene keys here that you want to pause when the pause button is pressed
        const scenes=['title', 'choosegame', 'choosenumber']

        // This finds all active scenes and pauses them 
        for(let i=0; i<scenes.length; i++){

            if(this.game.scene.isActive(scenes[i]))
            {
                this.currentScene = scenes[i]
                this.game.scene.pause(scenes[i])
                console.log(this.currentScene+' paused')
                
            }
                       
        }


  this.background = this.add.image(cX, cY,  'background-title').setScale(scalefactor)
  this.paused = this.add.image(cX, cY-150*scalefactor,  'spritesheet-core', 'paused.png').setScale(scalefactor)
  this.homeButton = this.physics.add.image(cX-100*scalefactor, cY+150*scalefactor,  'spritesheet-buttons','button-home-idle.png').setScale(scalefactor)
  this.resumeButton = this.physics.add.image(cX+100*scalefactor, cY+150*scalefactor,  'spritesheet-buttons','button-play-idle.png').setScale(scalefactor)

  const homeButtonBody = this.homeButton.body
  homeButtonBody.updateFromGameObject()
  const resumeButtonBody = this.resumeButton.body
  resumeButtonBody.updateFromGameObject()


  this.homeButton.setInteractive().on('pointerdown', pointer =>
  {
    this.homeButton.setTexture('spritesheet-buttons', 'button-home-active.png' )
    console.log('home button hit')
    this.time.delayedCall(
      this.waitTime,
      () => {
        for(let i=0; i<scenes.length; i++){

          if(this.game.scene.isActive(scenes[i]))
          {
              this.game.scene.pause(scenes[i])
              
              
          }
                     
      }
        this.scene.start('title')
      },
      [],
      this)
    
  })

  this.resumeButton.setInteractive().on('pointerdown', pointer =>
  {
    console.log('home button hit')
    this.resumeButton.setTexture('spritesheet-buttons', 'button-play-active.png' )
    this.time.delayedCall(
      this.waitTime,
      () => {
        this.game.scene.resume(this.currentScene)
        console.log(this.currentScene+' resumed')

        this.scene.stop()
      },
      [],
      this)
    
  })
}


}