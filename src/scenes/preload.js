import Phaser from '../lib/phaser.js'

export default class Preload extends Phaser.Scene

{

constructor()
{
super('preload')
}


preload()
{

      this.load.setPath('./src/assets/')


    this.load.atlas(
        'spritesheet-core',
        'spritesheets/spritesheet_core.png',
        'spritesheets/spritesheet_core.json'
      )

      this.load.atlas(
        'spritesheet-buttons',
        'spritesheets/spritesheet_buttons.png',
        'spritesheets/spritesheet_buttons.json'
      )

      this.load.atlas(
        'spritesheet-games',
        'spritesheets/spritesheet_games.png',
        'spritesheets/spritesheet_games.json'
      )

      this.load.atlas(
        'spritesheet-particles',
        'spritesheets/spritesheet_particles.png',
        'spritesheets/spritesheet_particles.json'
      )

    
    
      //image too large for spritesheet
    this.load.image('background-title', 'background/background-title.jpg')
    this.load.image('background-yellow', 'background/background-yellow.jpg')
    this.load.image('background-red', 'background/background-red.jpg')
    this.load.image('background-dark', 'background/background-dark.jpg')
    this.load.image('trampoline', 'games/bouncer/trampoline.png')

    //sounds
    this.load.audio('boing', 'sounds/cartoonboing.mp3')
    this.load.audio('correct', 'sounds/correct.mp3')
    this.load.audio('incorrect', 'sounds/cartoonbubblepop.mp3')
    this.load.audio('click', 'sounds/click.wav')
    this.load.audio('ting', 'sounds/ting.wav')
    this.load.audio('bubbles', 'sounds/bubbles.wav')
    this.load.audio('pop', 'sounds/pop.wav')
    this.load.audio('fanfare', 'sounds/fanfare.wav')
    this.load.audio('fanfare-silly', 'sounds/fanfare-silly.wav')
   
}

create()
{
  
    this.scene.start('bouncer')

}

}