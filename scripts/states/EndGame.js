Pong.EndGame = function (game) {
}
var endGameText = ''

Pong.EndGame.prototype = {
    preload: function () {
        this.load.image('background', './img/background');
    },
    create: function () {
        const background = this.add.sprite(0, 0, 'background');
        background.alpha = 0.5;
        const endGameTextStyle = textStylePattern;
        endGameTextStyle.boundsAlignH = 'center';
        endGameTextStyle.boundsAlignV = 'middle';
        endGameTextStyle.align = 'center';
        endGameTextStyle.fontWeight = 'bold';

        const endGame = this.add.text(0, 0, endGameText, endGameTextStyle);
        endGame.setTextBounds(0, 0, game.world.width, game.world.height);

        const instructionTextStyle = textStylePattern;
        instructionTextStyle.fontSize = 30;
        instructionTextStyle.boundsAlignH = 'center';
        instructionTextStyle.boundsAlignV = 'middle';
        instructionTextStyle.fontWeight = 'normal';

        const instruction = this.add.text(0, 0, 'Clique para reiniciar o jogo', instructionTextStyle);
        instruction.setTextBounds(0, 0, this.world.width, this.world.height + 500);

        this.input.onDown.add(this.startGame, this);
    },

    startGame: function () {
        this.state.start('Game')
    },

}
