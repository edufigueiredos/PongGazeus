var game = new Phaser.Game(800,600, Phaser.AUTO);
    game.state.add('Inicio', Pong.Inicio);
    game.state.add('Jogo', Pong.Jogo);
    game.state.add('FimDeJogo', Pong.FimDeJogo);
    game.state.start('Inicio');