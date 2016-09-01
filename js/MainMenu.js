var GladiatorGame = GladiatorGame || {};

GladiatorGame.MainMenu = function(){};

GladiatorGame.MainMenu.prototype = {
  create: function(){
    this.game.stage.backgroundColor = '#4080C0';
    this.gameTitle = 'Zombiator';
    this.controlTitle = 'Controls:';
    this.controlText1 = 'Up arrow to move foward';
    this.controlText2 = 'Left arrow to rotate left';
    this.controlText3 = 'Right arrow to rotate right';
    this.controlText4 = 'Spacebar to fire';
    this.controlText5 = 'Dont Let Them Touch You!!!!';
    this.game.add.text((this.game.world.centerX-120),50,this.gameTitle,{font:'50px arial',fill:'#fff'});
    this.add.button((this.game.world.centerX-150),(this.game.world.centerY-200),'start',this.startGame);
    this.game.add.text((this.game.world.centerX-100),(this.game.world.centerY+10),this.controlTitle,{font:'45px arial',fill:'#fff'});
    this.game.add.text((this.game.world.centerX-180),(this.game.world.centerY+70),this.controlText1,{font:'35px arial',fill:'#fff'});
    this.game.add.text((this.game.world.centerX-180),(this.game.world.centerY+110),this.controlText2,{font:'35px arial',fill:'#fff'});
    this.game.add.text((this.game.world.centerX-180),(this.game.world.centerY+150),this.controlText3,{font:'35px arial',fill:'#fff'});
    this.game.add.text((this.game.world.centerX-180),(this.game.world.centerY+190),this.controlText4,{font:'35px arial',fill:'#fff'});
    this.game.add.text((this.game.world.centerX-180),(this.game.world.centerY+230),this.controlText5,{font:'35px arial',fill:'#fff'});


  },
  startGame: function(){
    this.game.state.start('Game');
  }

};
