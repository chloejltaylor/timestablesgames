import Phaser from '../lib/phaser.js'

export default class Shared extends Phaser.Scene

{

constructor(sceneName)
{
    super(sceneName)
}

gameheight= 900
waitTime = 200
gameList = [
    'bouncer',
    'catcher',
    'finder',
    'floater',
    'flyer',
    'runner',
    'spinner'
]



create()
{
}

testFunction(){
    console.log("TEST FUNCTION WORKING")
}

getScale() {
    let h = this.game.canvas.height
    let w = this.game.canvas.width
    this.cX = w / 2
    this.cY = h / 2
    this.scalefactor = this.game.canvas.height / this.gameheight
    
    }

buttonPress(button) {
    this.sound.play('click')
    this.tweens.chain({
        targets: [button],
        tweens: [
            {
                scale: 1.1*this.scalefactor,
                ease: 'Sine.easeInOut',
                duration: 200,
                yoyo:true
            },
        ]
    })
}

enterAnimation(target, length) {

    
    for(let i=0; i<length; i++){
        // this.time.delayedCall(i*100, this.sound.play('pop'), [], this)
        this.tweens.chain({
            targets: [target[i]],
            tweens: [
                {
                    scale: this.scalefactor,
                    ease: 'Expo.easeInOut',
                    duration: 1500,
                    delay: i*100
                },
            ]
        })
    }

  }



}