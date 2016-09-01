var GladiatorGame = GladiatorGame || {};
// loading game assests
GladiatorGame.Preload = function() {};
// console.log('preload started');

GladiatorGame.Preload.prototype = {
    preload: function() {
        // show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        // load game assests
        this.load.tilemap('gladiator-starting-level', './assets/tilemaps/gladiator-starting-level.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', './assets/tilemaps/tiles.png');
        this.load.image('player', './assets/images/player.png');
        this.load.image('bullet','./assets/images/bullet.png');
        this.load.image('enemy', './assets/images/enemy.png');
        this.load.image('start','./assets/images/start-button.png');
        this.load.image('retry','./assets/images/retry.png');
    },
    create: function() {
        this.state.start('MainMenu');
    }
};
console.log('preload finished');
