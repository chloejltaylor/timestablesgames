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
    // difficultyfactor = 1
    activeBadstars = 0
    arrowLeft
    arrowRight
    timestable
    playerGravity = 200
    playerBounceVelocity = 300
    numberOfLevels = 6
    gameInProgress = true
    level = 0
    levelStar
    particles


    constructor() 
    {
    super('bouncer')
    }

    init(data)
    {
        this.starsCollected = 0
        // this.difficultyfactor = 1
        // this.timestable = data.timestable
        this.timestable = 2
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

        for(let i=0; i<5; i++){
            const x = Phaser.Math.Between(cX-200*scalefactor, cX+200*scalefactor)
            const y = cY-300*scalefactor-(300*scalefactor * i)
            const platform = this.platforms.create(x, y, 'spritesheet-games', 'platform-level0.png') 
            
            platform.body.checkCollision.down = false
            platform.body.checkCollision.left = false
            platform.body.checkCollision.right = false

            platform.scale = 1


            const platformsList = this.platforms.getChildren()


            // Make bottom platform central 
                if(i==4){
                    platformsList[4].x = cX
                }
            // make next one up to the side
                if(i==3){
                    let rand01 = Phaser.Math.Between(0, 1)
                    let startingpositionplatform2array = [cX-300*scalefactor,cX+300*scalefactor]
                    platformsList[3].x = startingpositionplatform2array[rand01]
                }
            
                const body = platform.body
                body.updateFromGameObject()

        }

        //create trampoline
        this.trampoline =  this.physics.add.staticSprite(cX, cY+2000*scalefactor, 'trampoline').setScale(scalefactor)

        // Create player
        this.player = this.physics.add.sprite(cX, cY, 'spritesheet-core','player.png').setScale(scalefactor).setGravityY(this.playerGravity).setDepth(2)
        this.physics.add.collider(this.platforms, this.player, this.handleBounce, undefined, this)
        this.physics.add.collider(this.trampoline, this.player, this.handleTrampoline, undefined, this)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setDeadzone(this.scale.width * 1.5)

        //arrow keys
        this.arrowLeft = this.add.image(cX-400, cY, 'spritesheet-core','arrow-left-pink.png').setDepth(2).setScale(scalefactor).setScrollFactor(0).setInteractive()
        this.arrowRight = this.add.image(cX+400, cY, 'spritesheet-core','arrow-right-pink.png').setDepth(2).setScale(scalefactor).setScrollFactor(0).setInteractive()
        this.arrowLeft.on('pointerdown', pointer => {if(this.gameInProgress){this.player.setVelocityX(-200)}})
        this.arrowLeft.on('pointerup', pointer => {if(this.gameInProgress){this.player.setVelocityX(0)}})
        this.arrowRight.on('pointerdown', pointer => {if(this.gameInProgress){this.player.setVelocityX(200)}})
        this.arrowRight.on('pointerup', pointer => {if(this.gameInProgress){this.player.setVelocityX(0)}})

        //level indicator star
        const levelStar1 = this.add.image(cX+320, cY+280*scalefactor, 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar2 = this.add.image(cX+380, cY+280*scalefactor, 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)

        const levelStar3 = this.add.image(cX+440, cY+280*scalefactor, 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar4 = this.add.image(cX+320, cY+360*scalefactor, 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar5 = this.add.image(cX+380, cY+360*scalefactor, 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
        const levelStar6 = this.add.image(cX+440, cY+360*scalefactor, 'spritesheet-games', 'starSetEmpty.png').setScale(scalefactor).setScrollFactor(0)
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



    //particles

    // this.particles = this.add.particles('spritesheet-particles')


    // const emitter = this.particles.createEmitter({
    //     frame: ['yellow.png', 'white.png', 'green.png'],
    //     lifespan:500,
    //     speed: 100,
    //     scale: { start: .8, end: 0 },
    //     blendMode: 'ADD',
    //     gravityY: 150,
    // });

    // this.particles.x = this.player.x
    // this.particles.y = this.player.y
    // this.particles.setScrollFactor(0)



    }

    update()
    {

        // this.particles.x = this.player.x
        // this.particles.y = this.player.y

        // update the platform bodies so they can be bounced on when moving
        this.platforms.children.iterate(platform => {
            this.platformBody = platform.body
            this.platformBody.updateFromGameObject()
        })

        


        // platform reuse code 

        this.platforms.children.iterate(platform => {
            const scrollY = this.cameras.main.scrollY
            if (platform.y >= scrollY + 1200*this.scalefactor) {
                // platform.setTexture('spritesheet-games', 'platform-level'+this.level+'.png')
                platform.y = scrollY - 300*this.scalefactor
                platform.x = Phaser.Math.Between(this.cX-200*this.scalefactor, this.cX+200*this.scalefactor)
                platform.body.updateFromGameObject()
                // platform.scale = this.difficultyfactor


                //add stars to collect
                this.addCollectableAbove(platform)



            //moving platforms
            
            if(this.level==3){
                console.log('level3')
                this.movePlatforms(platform)
            }

            //drop rocks in rock level

            if(this.level==0){
                console.log('level4')
                this.addRocks()
            }
               
             }
        })


        // switch back to player texture when falling
        const vy = this.player.body.velocity.y
        if (vy > 0)
        {
        
        this.player.setTexture('spritesheet-core', 'player.png')
        }

        // update position of trampoline 

        const bottomPlatform = this.findBottommostPlatform()
        if (this.player.y > bottomPlatform.y + 1000){
            this.trampoline.y = bottomPlatform.y + 1200
            const trampolinebody = this.trampoline.body
            trampolinebody.updateFromGameObject()
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
                const y = sprite.y - 100*this.scalefactor
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
        const xPos = Phaser.Math.Between(-400, 400);
        const rock = this.rocks.get(this.cX + xPos*this.scalefactor, this.player.y-1000*this.scalefactor, 'spritesheet-games', 'rock.png').setGravityY(50)
        rock.setActive(true)
        rock.setVisible(true)
        this.add.existing(rock)
        rock.body.setSize(rock.width, rock.height)
        this.physics.world.enable(rock)
        return rock
    }

    movePlatforms(platform)
    {
        console.log(platform)
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


    handleBounce()
    {
        if(this.player.body.touching.down){
            this.player.setVelocityX(0)
            this.player.setVelocityY(-this.playerBounceVelocity)
            if (this.player.frame.name == 'player.png' || this.player.frame.name == 'player-hurt-middle.png'){
                this.player.setTexture('spritesheet-core', 'player-jump.png')
                this.sound.play('pop')

                
            }
        }

    }

    handleTrampoline()
    {
        if(this.player.body.touching.down){
            this.player.setVelocityY(-700)
                this.level = 0
                for(let i=0; i<this.numberOfLevels; i++ ){
                    this.levelStar[i].setTexture('spritesheet-games', 'starSetEmpty.png')
                }
                this.platforms.children.iterate(platform => {
                    platform.setTexture('spritesheet-games', 'platform-level0.png')
                })
                
                this.player.setTexture('spritesheet-core', 'player-zoom.png')
                this.sound.play('ting')
        }
    }



    handleCollect(player, collectable)
        {
            this.collectables.killAndHide(collectable)
            this.physics.world.disableBody(collectable.body)
            this.collectablesCollected ++
            this.collectablesCollectedText.text = this.collectablesCollected*this.timestable
            
            if(this.collectablesCollected==5){
                const allCollectables = this.collectables.getChildren()
                for(let i=0; i<allCollectables.length; i++){
                    this.collectables.killAndHide(allCollectables[i])
                    this.physics.world.disableBody(allCollectables[i].body)
                }


                
                this.gameInProgress = false
                this.collectablesCollected = 0
                this.sound.play('fanfare')
                this.player.setGravity(0)
                this.player.setVelocityY(0)
                this.player.setVelocityX(0)
                this.completeSetAnimation()
                // if(this.difficultyfactor>0.5){
                //     this.difficultyfactor = this.difficultyfactor*0.9
                // }
                this.level++

                this.platforms.children.iterate(platform => {
                    platform.setTexture('spritesheet-games', 'platform-level'+this.level+'.png')
                })
            }


        }

    completeSetAnimation(){
        this.player.setTexture('spritesheet-core', 'player-celebrate.png')
        this.levelStar[this.level].setTexture('spritesheet-games', 'starSet'+(this.level+1)+'.png')
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
        this.time.delayedCall(
            1500, 
            ()=>{
            this.player.setGravityY(this.playerGravity)
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


    findBottommostPlatform()
    {
        const platforms = this.platforms.getChildren()
        let bottomPlatform = platforms[0]

        for(let i=0; i<platforms.length; ++i){
            const platform = platforms[i]
            if(platform.y < bottomPlatform) {
                continue
            } 
            
            bottomPlatform = platform
        }

        return bottomPlatform
    }

}


