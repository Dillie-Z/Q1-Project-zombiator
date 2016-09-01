  // creation of the game's 'namespace'
    var GladiatorGame = GladiatorGame || {};

    GladiatorGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');

    GladiatorGame.game.state.add('Boot', GladiatorGame.Boot);
    GladiatorGame.game.state.add('Preload', GladiatorGame.Preload);
    GladiatorGame.game.state.add('MainMenu',GladiatorGame.MainMenu);
    GladiatorGame.game.state.add('Game', GladiatorGame.Game);
    GladiatorGame.game.state.add('EndMenu',GladiatorGame.EndMenu);

    GladiatorGame.game.state.start('Boot');
