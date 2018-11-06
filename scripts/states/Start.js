var Pong = {};

Pong.Start = function (game) {
}

var textStylePattern = {
    fill: '#FFF',
    font: 'Segoe UI',
    fontSize: 50,
    boundsAlignH: '',
    boundsAlignV: '',
    fontWeight: '',
    shadowBlur: 5,
    shadowColor: '#000',
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowFill: true
};


Pong.Start.prototype = {
    
    preload: function () {
        this.load.image('background', './img/background.png')
    },
    
    create: function () {
        
        const background = this.add.sprite(0, 0, 'background')
        background.alpha = 0.5;

        const textStyle = textStylePattern
        textStyle.boundsAlignH = 'center';
        textStyle.boundsAlignV = 'middle'
        const gameNameText = this.add.text(0, 0, 'Pong - Gazeus', textStyle);
        gameNameText.addFontWeight('bold', 6);
        const instruction = this.add.text(0, 0, 'Clique na tela para começar', textStyle)
        this.input.onDown.add(this.startGame, this);

        gameNameText.setTextBounds(0, 0, game.world.width, game.world.height - 100);
        instruction.setTextBounds(0, 0, game.world.width, game.world.height + 100);
    },

    startGame: function () {
        this.state.start('Game');
    }

}