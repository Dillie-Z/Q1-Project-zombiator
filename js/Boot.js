var GladiatorGame = GladiatorGame || {};

GladiatorGame.Boot = function() {};

GladiatorGame.Boot.prototype = {
    preload: function() {
        // asset used in the loading screen.
        this.load.image('preloadbar', './assets/images/preloader-bar.png');
    },
    create: function() {
        // loading screen background color is being Set
        this.game.stage.backgroundColor = '#fff';

        // scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // centering game horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};
