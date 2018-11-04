Pong.FimDeJogo = function (game) {
}
var textoFimDeJogo = ''

Pong.FimDeJogo.prototype = {
    create: function () {
        const estiloTexto = { fill: '#FFF', font: 'Segoe UI', fontSize: 50, boundsAlignH: "center", boundsAlignV: "middle", align: "center" }
        const estiloInstrucao = { fill: '#FFF', font: 'Segoe UI', fontSize: 30, boundsAlignH: "center", boundsAlignV: "middle" }

        const fimDeJogo = this.add.text(0, 0, textoFimDeJogo, estiloTexto);
        fimDeJogo.setTextBounds(0, 0, game.world.width, game.world.height);

        const instrucao = this.add.text(0, 0, 'Clique para reiniciar o jogo', estiloInstrucao);
        instrucao.setTextBounds(0, 0, this.world.width, this.world.height + 500);

        this.input.onDown.add(this.iniciaJogo, this);
    },

    iniciaJogo: function () {
        this.state.start('Jogo')
    },

}
