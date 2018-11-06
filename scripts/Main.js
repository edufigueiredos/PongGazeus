var game = new Phaser.Game(800,600, Phaser.AUTO, 'game-container');
    game.state.add('Start', Pong.Start);
    game.state.add('Game', Pong.Game);
    game.state.add('EndGame', Pong.EndGame);
    game.state.start('Start');