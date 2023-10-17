import Shared from '../shared.js'



export default class Bouncer extends Shared
{
    platforms
    player
    cursors
    stars
    deathstar
    starsbad
    collectablesCollected = 0
    collectablesCollectedText
    arrowLeft
    arrowRight
    timestable
    playerGravity = 260
    playerBounceVelocity = 500
    numberOfLevels = 6
    gameInProgress = true
    gameEnded = false
    level = 0
    levelStar
    particlesWhite
    particlesZoom
    platformGap = 300
    highestTimesTable = 5
    levelStarXArray
    levelStarYArray
    numBounces=0
    waitTime =800

    constructor() 
    {
    super('bouncer')
    }

    init(data)
    {
        this.starsCollected = 0
       this.timestable = data.timestable
        // this.timestable = 3
    }

    create()
    {
        this.getScale()
        let cX = this.cX
        let cY = this.cY
        let scalefactor = this.scalefactor

        this.scene.run('ui')
        
        this.add.image(cX, cY, 'background-dark').setScale(scalefactor).setScrollFactor(0)
        this.add.image(cX, cY+400*scalefactor, 'background-dark').setScale(scalefactor).setScrollFactor(0)

        const fullscreenButton = this.add.image(cX+500, 16, 'spritesheet-buttons', 'fullscreen.png', 0).setOrigin(1, 0).setInteractive().setScrollFactor(0)

        fullscreenButton.on('pointerup', function ()
        {

            if (this.scale.isFullscreen)
            {

                this.scale.stopFullscreen()
            }
            else
            {
                this.scale.startFullscreen()
            }

        }, this);

        // Platform creation 
        this.platforms = this.physics.add.staticGroup()

        for(let i=0; i<this.highestTimesTable; i++){
            const x = Phaser.Math.Between(cX-200*scalefactor, cX+200*scalefactor)
            const y = cY+this.platformGap*scalefactor-(this.platformGap*scalefactor * i)
            const platform = this.platforms.create(x, y, 'spritesheet-games', 'platform-level0.png') 
            
            platform.body.checkCollision.down = false
            platform.body.checkCollision.left = false
            platform.body.checkCollision.right = false

            // Make bottom platform central so player lands on it
            const platformsList = this.platforms.getChildren()
            platformsList[0].x = cX
        
            const body = platform.body
            body.updateFromGameObject()

        }

        //create trampoline
        this.trampoline =  this.physics.add.staticSprite(cX, cY+2000*scalefactor, 'trampoline').setScale(scalefactor)

        // Create player
        // this.player = this.physics.add.sprite(cX, cY, 'spritesheet-core','player.png').setScale(scalefactor).setGravityY(0).setDepth(2)

        this.player = this.physics.add.sprite(cX, cY, 'spritesheet-core','player.png').setScale(scalefactor).setGravityY(this.playerGravity*this.scalefactor).setDepth(2)
        this.physics.add.collider(this.platforms, this.player, this.handleBounce, undefined, this)
        this.physics.add.collider(this.trampoline, this.player, this.handleTrampoline, undefined, this)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setDeadzone(this.scale.width * 1.5)
        

        //arrow keys
        this.arrowLeft = this.add.image(cX-400, cY, 'spritesheet-core','arrow-left.png').setDepth(2).setScale(scalefactor).setScrollFactor(0).setInteractive()
        this.arrowRight = this.add.image(cX+400, cY, 'spritesheet-core','arrow-right.png').setDepth(2).setScale(scalefactor).setScrollFactor(0).setInteractive()
        this.arrowLeft.on('pointerdown', pointer => {if(this.gameInProgress){this.player.setVelocityX(-200)}})
        this.arrowLeft.on('pointerup', pointer => {if(this.gameInProgress){this.player.setVelocityX(0)}})
        this.arrowRight.on('pointerdown', pointer => {if(this.gameInProgress){this.player.setVelocityX(200)}})
        this.arrowRight.on('pointerup', pointer => {if(this.gameInProgress){this.player.setVelocityX(0)}})

        //level indicator star
        this.levelStarXArray = [cX+320, cX+380, cX+440, cX+320, cX+380, cX+440]
        this.levelStarYArray = [cY+280*scalefactor, cY+280*scalefactor, cY+280*scalefactor, cY+360*scalefactor, cY+360*scalefactor, cY+360*scalefactor]
        const levelStar1 = this.add.image(this.levelStarXArray[0], this.levelStarYArray[0], 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar2 = this.add.image(this.levelStarXArray[1], this.levelStarYArray[1], 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar3 = this.add.image(this.levelStarXArray[2], this.levelStarYArray[2], 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar4 = this.add.image(this.levelStarXArray[3], this.levelStarYArray[3], 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar5 = this.add.image(this.levelStarXArray[4], this.levelStarYArray[4], 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar6 = this.add.image(this.levelStarXArray[5], this.levelStarYArray[5], 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        this.levelStar = [levelStar1, levelStar2, levelStar3, levelStar4, levelStar5, levelStar6]


        //Collector Stars

        this.collectables = this.physics.add.group()

        this.physics.add.collider(this.platforms, this.collectables)

        this.physics.add.overlap(this.collectables, this.player, this.handleCollect, undefined, this)

        const style = { color: '#fff', fontSize: 100, fontFamily: 'Itim' }
        this.collectablesCollectedText = this.add.text(cX-370,cY+200*scalefactor,'', style).setScrollFactor(0).setOrigin(0.5, 0)

        //Rocks

        this.rocks = this.physics.add.group()
        this.physics.add.collider(this.rocks, this.player, this.handleRockCollide, undefined, this)
 
        
    }

    update()
    {

        // update the platform bodies so they can be bounced on when moving
        this.platforms.children.iterate(platform => {
            this.platformBody = platform.body
            this.platformBody.updateFromGameObject()
        })

        


        // platform reuse code 

        this.platforms.children.iterate(platform => {
            const scrollY = this.cameras.main.scrollY
            if (platform.y >= scrollY + this.platformGap*(this.highestTimesTable-1)*this.scalefactor) {
                platform.y = scrollY - (this.platformGap-1)*this.scalefactor
                platform.x = Phaser.Math.Between(this.cX-200*this.scalefactor, this.cX+200*this.scalefactor)
                platform.body.updateFromGameObject()

                //add stars to collect
                if(this.level!=0){
                    this.addCollectableAbove(platform)
                }
                
                this.platforms.children.iterate(platform => {
                    platform.setTexture('spritesheet-games', 'platform-level'+this.level+'.png')
                })

                // start level 1
                if (this.numBounces == 3){
                    this.level =1
                    this.platforms.children.iterate(platform => {
                        this.time.delayedCall(500, ()=>platform.setTexture('spritesheet-games', 'platform-level1.png'), [], this)
                        this.tweens.chain({
                            targets: [platform],
                
                            tweens: [
                                {
                                    scale: 0,
                                    alpha: 0,
                                    ease: 'Sine.easeInOut',
                                    duration: 500,
                                    yoyo:true,
                                },
                            ]
                        })
                    })
                }

        
           //move platforms in platforms level
            
            if(this.level==4){
                this.movePlatforms(platform)
            }

            //drop rocks in rock level

            if(this.level==5){
                this.addRocks()
            }

            if(this.level==6){
                this.addRocks()
                this.addRocks()
                this.addRocks()
            }

            // end game 
            if(this.level==7){
                this.gameEnded = true
                this.gameEndAnimation()
            }
                

              
             }
        })

        // switch back to player texture when falling
        const vy = this.player.body.velocity.y
        if (vy > 0)
        {
        
        this.player.setTexture('spritesheet-core', 'player.png')
        }

        // update position of trampoline and remove stars when the player falls

        const bottomPlatform = this.findBottommostPlatform()

        if (this.player.y > bottomPlatform.y + 700){
            this.trampoline.y = bottomPlatform.y + 900
            const trampolinebody = this.trampoline.body
            trampolinebody.updateFromGameObject()
        }

        if (this.player.y > bottomPlatform.y + 500){
            const allCollectables = this.collectables.getChildren()
            for(let i=0; i<allCollectables.length; i++){
                this.collectables.killAndHide(allCollectables[i])
                this.physics.world.disableBody(allCollectables[i].body)
            }
        }


        // set limits of player movement left and right 

        if (this.player.x < this.cX - 400*this.scalefactor){
            this.player.setVelocityX(50)
            this.player.setAccelerationX(0.1)
        }

        if (this.player.x > this.cX + 400*this.scalefactor){
            this.player.setVelocityX(-50)
            this.player.setAccelerationX(-0.1)
        }


        
        
    }



    addCollectableAbove(sprite)
            {
        
                const randNo = Phaser.Math.Between(this.cX-150*this.scalefactor, this.cX+150*this.scalefactor)
                const y = sprite.y - 150*this.scalefactor
                const x = randNo
                const collectable = this.collectables.get(x, y, 'spritesheet-games', 'star'+this.timestable+'.png')
                collectable.setActive(true)
                collectable.setVisible(true)
                this.add.existing(collectable)

                collectable.body.setSize(collectable.width, collectable.height)
                this.physics.world.enable(collectable)

                return collectable
            }

    addRocks()
    {
        const xPos = Phaser.Math.Between(-400, 400)
        const rock = this.rocks.get(this.cX + xPos*this.scalefactor, this.player.y-Phaser.Math.Between(1000, 3500)*this.scalefactor, 'spritesheet-games', 'rock.png').setGravityY(50)
        rock.setActive(true)
        rock.setVisible(true)
        this.add.existing(rock)
        rock.body.setSize(rock.width, rock.height)
        this.physics.world.enable(rock)
        this.tweens.chain({
            targets: [rock],

            tweens: [
                {
                    
                    angle: 360,
                    duration: 1000,
                    repeat: -1                },
            ]
        })
        return rock
    }

    movePlatforms(platform)
    {
        this.tweens.chain({
            targets: [platform],

            tweens: [
                {
                    
                    x: platform.x -100*this.scalefactor,
                    ease: 'Sine.easeInOut',
                    duration: 1300,
                    yoyo:true,
                    repeat: -1                },
            ]
        })
    }

    stopPlatforms(platform)
    {
        this.tweens.chain({
            targets: [platform],

            tweens: [
                {
                    
                    x: platform.x,
                    ease: 'Sine.easeInOut',
                    duration: 1300,
                    yoyo:true,
                    repeat: -1                },
            ]
        })    }


    handleBounce()
    {
        if(this.player.body.touching.down){
            this.numBounces++
            this.player.setVelocityX(0)
            this.player.setVelocityY(-this.playerBounceVelocity*this.scalefactor)
            if (this.player.frame.name == 'player.png' || this.player.frame.name == 'player-hurt-middle.png'){
                this.player.setTexture('spritesheet-core', 'player-jump.png')
                this.sound.play('pop')
           }
        }

    }

    handleTrampoline()
    {
        if(this.player.body.touching.down){
            this.player.setVelocityY(-1000*this.scalefactor)
                this.level = 1
                this.collectablesCollectedText.text = '0'

                for(let i=0; i<this.numberOfLevels; i++ ){
                    this.levelStar[i].setTexture('spritesheet-games', 'starSetEmpty.png')
                }
                this.platforms.children.iterate(platform => {
                    platform.setTexture('spritesheet-games', 'platform-level1.png')
                    this.stopPlatforms(platform)
                })
                
                this.player.setTexture('spritesheet-core', 'player-zoom.png')
                this.sound.play('ting')

        }
    }



    handleCollect(player, collectable)
        {
            this.sound.play('ping')
            this.collectables.killAndHide(collectable)
            this.physics.world.disableBody(collectable.body)
            this.collectablesCollected ++
            this.collectablesCollectedText.text = this.collectablesCollected*this.timestable
            
            if(this.collectablesCollected==this.highestTimesTable){


                //remove stars
                const allCollectables = this.collectables.getChildren()
                for(let i=0; i<allCollectables.length; i++){
                    this.collectables.killAndHide(allCollectables[i])
                    this.physics.world.disableBody(allCollectables[i].body)
                }

                //effects

                this.completeSetAnimation()
                this.sound.play('fanfare')

                //logic
                this.gameInProgress = false
                this.collectablesCollected = 0
                this.player.setGravity(0)
                this.player.setVelocityY(0)
                this.player.setVelocityX(0)
                this.level++
                console.log("level: "+this.level)
                if(this.level<7){
                    this.platforms.children.iterate(platform => {
                        this.time.delayedCall(500, ()=>platform.setTexture('spritesheet-games', 'platform-level'+this.level+'.png'), [], this)
                    })
                }

            }


        }

    completeSetAnimation(){
        this.player.setTexture('spritesheet-core', 'player-celebrate.png')
        this.levelStar[this.level-1].setTexture('spritesheet-games', 'starSet'+(this.level)+'.png')
        this.particleBurst(this.levelStarXArray[this.level-1], this.levelStarYArray[this.level-1], ['white.png'], 500, 0, 50,70)
        this.particleBurst(this.cX-370, this.cY+260*this.scalefactor, ['yellow.png', 'pink.png', 'yellow-orange.png','green.png', 'blue-light.png', 'green-blue.png'], 1000, 150, 20, 110)
        // this.particleBurst(x,y,colour, lifespan, gravityY, noParticles, speed)

        this.tweens.chain({
            targets: [this.levelStar[this.level-1]],
            tweens: [
                {
                    angle: 360,
                    ease: 'Sine.easeInOut',
                    duration: 1500,
                },
            ]
        })
        this.tweens.chain({
            targets: [this.player],
            tweens: [
                {
                    y: this.player.y-200*this.scalefactor,
                    ease: 'Sine.easeInOut',
                    duration: 1300               
                },
            ]
        })
        this.tweens.chain({
            targets: [this.player],
            tweens: [
                {
                    scale: 1.1,
                    ease: 'Sine.easeInOut',
                    duration: 650,
                    yoyo: true            
                },
            ]
        })
        this.platforms.children.iterate(platform => {
            this.tweens.chain({
                targets: [platform],
    
                tweens: [
                    {
                        scale: 0,
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 500,
                        yoyo:true,
                    },
                ]
            })
        })
        
        this.time.delayedCall(
            1500, 
            ()=>{
                this.player.setGravityY(this.playerGravity*this.scalefactor)
                this.collectablesCollectedText.text = '0'
                this.gameInProgress = true
            },
            [],
            this)
    }

    handleRockCollide(player, rock){
        this.player.setVelocityY(-100)
        this.sound.play('boing')
        const randNo = Phaser.Math.Between(0, 1)
        const textures = ['player-hurt-left.png', 'player-hurt-right.png']
        const velocities = [-200, 200]
        this.player.setTexture('spritesheet-core', textures[randNo])
        this.player.setVelocityX(velocities[randNo])
        rock.setVelocityY(-100)
        rock.setVelocityX(-velocities[randNo])
    }

    gameEndAnimation(){
        console.log("game end")
        this.level=0
        this.cameras.main.stopFollow(this.player)
        this.player.setGravityY(0)
        this.player.setVelocityY(0)
        this.player.setAlpha(0)
        this.arrowLeft.setAlpha(0)
        this.arrowRight.setAlpha(0)
        const allCollectables = this.collectables.getChildren()
        for(let i=0; i<allCollectables.length; i++){
            this.collectables.killAndHide(allCollectables[i])
            this.physics.world.disableBody(allCollectables[i].body)
        }
        const allPlatforms = this.platforms.getChildren()
        for(let i=0; i<allPlatforms.length; i++){
            this.platforms.killAndHide(allPlatforms[i])
            this.physics.world.disableBody(allPlatforms[i].body)
        }
        let alien = this.add.image(this.player.x, this.cY, 'spritesheet-core', 'player.png').setScale(this.scalefactor).setScrollFactor(0).setDepth(3)
        let spaceship = this.add.image(this.cX, this.cY-700*this.scalefactor, 'spritesheet-games', 'spaceship2.png').setScale(2*this.scalefactor).setScrollFactor(0).setDepth(3)
        this.tweens.chain({
            targets: [spaceship],
            tweens: [
                {
                    y: this.cY-300*this.scalefactor,
                    duration: 1000,
                },
                {
                    y: this.cY-700*this.scalefactor,
                    duration: 1000,
                    delay: 4000
                },
            ]
        })
        this.time.delayedCall(1000,shinebeam, [], this)
        function shinebeam(){
            spaceship.setTexture('spritesheet-games', 'spaceship.png')
            alien.setTexture('spritesheet-core', 'player-beamed.png')
        }

        this.time.delayedCall(2000, beamupalien, [], this)
        function beamupalien(){

            this.tweens.chain({
                targets: [alien],
                tweens: [
                    {
                        x: this.cX,
                        y: this.cY-200*this.scalefactor,
                        duration: 3000,
                    },
                    {
                        alpha: 0,
                        duration: 200,                       
                    }
                ]
            })
        }

        this.time.delayedCall(5000, continueButtonAppear, [], this)
        function continueButtonAppear(){
           console.log("button appear")
           let playbutton = this.add.image(this.cX, this.cY+150*this.scalefactor,  'spritesheet-buttons','button-playbig-idle.png').setScale(this.scalefactor).setScrollFactor(0)
           playbutton.setInteractive().on('pointerdown', pointer =>
            { 
                this.buttonPress(playbutton)
                this.time.delayedCall(
                  this.waitTime,
                  () => {
                    this.scene.start('title')
                  },
                  [],
                  this)
                })
            }

    }


    findBottommostPlatform()
    {
        const platforms = this.platforms.getChildren()
        let bottomPlatform = platforms[0]
        for(let i=0; i<platforms.length; i++){
            if(platforms[i].y>bottomPlatform.y){
                bottomPlatform = platforms[i]
            }
        }

        return bottomPlatform
    }

    particleBurst(x, y, colour, lifespan, gravityY, noParticles, speed ){
        
    //particles

        const particles = this.add.particles('spritesheet-particles')
        const emitter = particles.createEmitter({
            frame: colour,
            lifespan: lifespan,
            speed: speed,
            scale: { start: .8, end: 0 },
            blendMode: 'ADD',
            gravityY: gravityY,
        }).setScrollFactor(0)

        emitter.explode(noParticles);

        particles.x = x
        particles.y = y

        this.time.delayedCall(2000, function() {
            particles.destroy();
        })
    }

}


