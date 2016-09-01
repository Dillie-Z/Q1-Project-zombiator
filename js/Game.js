var GladiatorGame = GladiatorGame || {};

//title screen
GladiatorGame.Game = function() {};
console.log('game started');
GladiatorGame.Game.prototype = {
    create: function() {
        // creating
        this.map = this.game.add.tilemap('gladiator-starting-level');
        //adding the tile set to the tilemap
        this.map.addTilesetImage('tiles', 'gameTiles');
        //creating layers
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        // collisions on blockedlayer
        this.map.setCollisionBetween(1, 300, true, 'blockedLayer');

        //resize
        this.backgroundlayer.resizeWorld();

        //bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0);
        this.bullets.setAll('anchor.y', 0.35);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        //enemy group
        this.enemies = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.enemies.enableBody = true;

        // this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.createMultiple(10, 'enemy');
        this.enemies.setAll('anchor.x', 0.5);
        this.enemies.setAll('anchor.y', 0.5);
        this.enemies.setAll('outOfBoundsKill', true);
        this.enemies.setAll('checkWorldBounds', true);
        this.maxEnemies = 10;
        // scoreboard time!!!
        this.score = 0;
        this.scoreString = 'Score: ';
        this.scoreText = this.game.add.text(20,20,this.scoreString + this.score,{font:'34px arial',fill:'#fff'});
        this.scoreText.fixedToCamera = true;
        
        // create playerspawn spot
        var result = this.findObjectsByType('playerStart', this.map, 'objectLayer');

        // the result should be known to us so
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0.5);

        // create camera to follow the player
        this.game.camera.follow(this.player);

        //move the player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    createItems: function() {
        //creating items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        result = this.findObjectsByType('item', this.map, 'objectLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },
    // finding the objects by their type
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            console.log('what is this element:', map.objects[layer]);
            if (element.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    // creating sprites from the objects
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        //copy all the properties to the sprite
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },
    update: function() {
        // player movement starting values
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;
        this.player.body.angularVelocity = 0;

        // player movement
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.angularVelocity = -250;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.angularVelocity = 250;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.game.physics.arcade.velocityFromAngle(this.player.angle, 200, this.player.body.velocity);
        }
        // collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.enemies);
        this.game.physics.arcade.overlap(this.player, null, this);
        this.game.physics.arcade.overlap(this.player,this.enemies,this.enemyHitsPlayer,null,this);
        // bullet stuff
        if (this.fireButton.isDown) {
            // this.fireBullet();
            this.fireButton.onDown.add(this.fireBullet, this);
        }
        // enemies random spawn
        if (this.enemies.countLiving() < this.maxEnemies) {
            this.spawnEnemy();
        }
        for(var i = 0; i < this.enemies.children.length;i++){
          this.Enemy = this.enemies.children[i];
          this.game.physics.arcade.collide(this.player, this.Enemy);
          this.game.physics.arcade.overlap(this.bullet,this.Enemy,this.collisionHandler,null,this);
          this.game.physics.arcade.moveToObject(this.Enemy,this.player, 80);
          // this.Enemy.rotation = this.game.physics.angleToPointer(this.player);
        }


        // enemy tracking?
        // var targetAngle = this.game.math.angleBetween(this.Enemy.x, this.Enemy.y, this.player.x, this.player.y);
        // // // turing the enemy towards player
        // if (this.Enemy.rotation !== targetAngle) {
        //     // calculating the differance in angle. current vs target angle
        //     var delta = targetAngle - this.Enemy.rotation;
        //     // keep it in range of PI
        //     if (delta > (Math.PI)) {
        //         delta -= Math.PI * 2;
        //     }
        //     if (delta < (-Math.PI)) {
        //         delta += Math.PI * 2;
        //     }
        //
        //     if (delta > 0) {
        //         //turn clockwise
        //         this.Enemy.angle += this.enemyTurnRate;
        //     } else {
        //         this.Enemy.angle -= this.enemyTurnRate;
        //     }
            // just sets the angle to the target angle if close enought
            // if(Math.abs(delta) < this.game.math.degToRad(this.enemyTurnRate)){
            //   this.Enemy.rotation = targetAngle;
            // }
            // this.Enemy.body.velocity.x = Math.cos(this.Enemy.rotation) * this.Enemy.SPEED;
            // this.Enemy.body.velocity.y = Math.sin(this.Enemy.rotation) * this.Enemy.SPEED;
            // this.game.physics.arcade.velocityFromAngle(this.Enemy.angle, 200, this.Enemy.body.velocity);
        // }
    },
    spawnEnemy: function() {

      this.Enemy = this.enemies.create(this.game.world.randomX,this.game.world.randomY,'enemy');


        //getting first enemy from the group
        // this.Enemy = this.enemies.getFirstExists(true);
        // this.Enemy = this.game.add.sprite(this.game.rnd.integerInRange( this.game.width),this.game.rnd.integerInRange(this.game.height),'enemy');
        // this.Enemy.reset(this.game.rnd.integerInRange(this.game.width), this.game.rnd.integerInRange(this.game.width));
        // enemy.revive();
        // this.Enemy.x = this.game.rnd.integerInRange(50, this.game.width);
        // this.Enemy.y = this.game.rnd.integerInRange(50, this.game.height);
        // return Enemy;
    },
    fireBullet: function() {
        // to avoid a fast rate of fire
        // if (this.game.time.now > this.nextFire && this.bullets.countLiving()<5) {
        // grabing the first bullet
        this.bullet = this.bullets.getFirstExists(false);
        // console.log(this.bullet);
        if (this.bullet) {
            //fire the bullet!!!
            var bulletOffSet = 20 * Math.sin(this.game.math.degToRad(this.player.angle));
            this.bullet.reset(this.player.x, this.player.y);
            this.bullet.angle = this.player.angle;
            this.game.physics.arcade.velocityFromAngle(this.bullet.angle, 800, this.bullet.body.velocity);
            this.bulletTime = this.game.time.now + 200;
        }
        // }
    },
    resetBullet: function(bullet) {
        this.game.bullet.kill();
    },
    collisionHandler: function(){
      this.bullet.kill();
      this.Enemy.kill();
      this.score += 20;
      this.scoreText.text = this.scoreString + this.score;
    },
    enemyHitsPlayer:function(){
      this.player.kill();
      // this.stateText.visible = true;
      this.game.state.start('EndMenu');
    }
};
