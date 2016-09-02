var GladiatorGame = GladiatorGame || {};

GladiatorGame.EndMenu = function() {};

GladiatorGame.EndMenu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#4080C0';
        this.stateString = 'GAME OVER';
        this.stateText = this.game.add.text(400, 200, this.stateString, {
            font: '86px arial',
            fill: '#fff'
        });
        this.add.button((500), (400), 'retry', this.retryGame);
    },
    retryGame: function() {
        this.game.state.start('Game');
    }
};
