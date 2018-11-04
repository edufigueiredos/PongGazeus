var Pong = {};

Pong.Inicio = function (game) {
}

Pong.Inicio.prototype = {
    create: function () {

        const estiloTexto = { fill: '#FFF', font: 'Segoe UI', fontSize: 50, boundsAlignH: "center", boundsAlignV: "middle" }
        const nomeJogo = this.add.text(0, 0, 'Pong - Gazeus', estiloTexto);
        nomeJogo.addFontWeight('bold', 6);
        const instrucao = this.add.text(0, 0, 'Clique na tela para começar', estiloTexto)
        this.input.onDown.add(this.iniciaJogo, this);

        nomeJogo.setTextBounds(0, 0, game.world.width, game.world.height - 100);
        instrucao.setTextBounds(0, 0, game.world.width, game.world.height + 100);
    },

    iniciaJogo: function () {
        this.state.start('Jogo');
    }

}