import Shared from '../shared.js'

export default class Runner extends Shared

{

constructor()
{
super('runner')
}

gameheight= 900
background
title
waitTime = 800


create()
{

    this.scene.run('ui')
    this.scene.run('shared')
  
    this.getScale()
    let cX = this.cX
    let cY = this.cY
    let scale = this.scale

    let gameTitle = 'runner'

    this.background = this.add.image(cX, cY,  'background-title').setScale(scale).setAlpha(0.1)
    this.title = this.add.image(cX, cY-150*scale,  'spritesheet-core', 'gameicon-runner.png').setScale(scale)

}

}