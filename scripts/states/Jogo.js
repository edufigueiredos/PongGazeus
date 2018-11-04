
Pong.Jogo = function (game) {
}

let barraJogador;
let barraBot;
let bola;

let velocidadeDaBola;
let jogoIniciado;

let pontuacaoJogador;
let pontuacaoBot;

let mensagemLancaBola;

Pong.Jogo.prototype = {
    preload: function () {
        this.load.image('barra', './img/barra.png');
        this.load.image('bola', './img/bola.png');
    },

    create: function () {
        velocidadeDaBola = 350;
        jogoIniciado = false;

        placarJogador = 0;
        placarBot = 0;

        barraJogador = this.criarBarra(0, this.world.centerY);
        barraBot = this.criarBarra(this.world.width, this.world.centerY);
        bola = this.criarBola();

        pontuacaoJogador = this.criaPlacar(-400);
        pontuacaoBot = this.criaPlacar(400);

        this.input.onDown.add(this.iniciaJogo, this);
        this.mostrarMensagemLancaBola();
    },

    update: function () {
        this.physics.arcade.collide(barraJogador, bola);
        this.physics.arcade.collide(barraBot, bola);

        this.posicionarBarra();
        this.posicionarBot();

        pontuacaoJogador.text = placarJogador;
        pontuacaoBot.text = placarBot;
        this.marcarPonto();

        this.verificarVencedor();
    },

    criarBarra: function (posicaoX, posicaoY) {
        const barra = this.add.sprite(posicaoX, posicaoY, 'barra');
        this.physics.arcade.enable(barra);
        barra.anchor.setTo(0.5, 0.5);
        barra.scale.setTo(0.6, 0.6);
        barra.body.immovable = true;
        barra.body.collideWorldBounds = true;

        return barra;
    },

    criarBola: function () {
        const bola = this.add.sprite(this.world.centerX, this.world.centerY, 'bola');
        this.physics.arcade.enable(bola);
        bola.anchor.setTo(0.5, 0.5);
        bola.body.bounce.setTo(1.1, 1.1);
        bola.body.collideWorldBounds = true;
        bola.body.maxVelocity.y = 1000;
        bola.body.maxVelocity.x = 1000;

        return bola;
    },

    criaPlacar: function (posicaoX) {
        const estiloPlacar = { fill: '#FFF', font: 'Segoe UI', fontSize: 100, boundsAlignH: "center", boundsAlignV: "center" };
        const placar = this.add.text(0, 0, 0, estiloPlacar);
        placar.setTextBounds(posicaoX, 50, this.world.width - posicaoX, this.world.height);

        return placar;
    },

    criaMensagemIniciaJogo: function (texto) {
        const estiloTexto = { fill: '#FFF', font: 'Segoe UI', fontSize: 50, boundsAlignH: "center", boundsAlignV: "bottom" };
        mensagemLancaBola = this.add.text(0, 0, texto, estiloTexto);
        mensagemLancaBola.setTextBounds(0, 0, this.world.width, this.world.height - 10);
    },

    posicionarBarra: function () {
        barraJogador.y = this.input.y
        if (barraJogador.y < barraJogador.height * 0.5) {
            barraJogador.y = barraJogador.height * 0.5;
        } else if (barraJogador.y > (this.world.height - barraJogador.height * 0.5)) {
            barraJogador.y = this.world.height - barraJogador.height * 0.5;
        }
    },

    posicionarBot: function () {
        barraBot.body.velocity.setTo(bola.body.velocity.y)
        barraBot.body.velocity.x = 0;
        barraBot.body.maxVelocity.y = 600;
    },

    iniciaJogo: function () {
        jogoIniciado = !jogoIniciado;
        this.mostrarMensagemLancaBola(jogoIniciado);
        this.lancarBola(jogoIniciado);
        placarJogador = 0;
        placarBot = 0;
    },

    marcarPonto: function () {
        if (bola.body.blocked.right) {
            placarJogador += 1;
        } else if (bola.body.blocked.left) {
            placarBot += 1;
        }
    },

    lancarBola: function () {
        if (!jogoIniciado) {
            bola.x = this.world.centerX;
            bola.y = this.world.centerY;
            bola.body.velocity.setTo(0, 0);
        } else {
            if (Math.random() <= 0.4) {
                bola.body.velocity.x = -velocidadeDaBola;
            } else {
                bola.body.velocity.x = velocidadeDaBola;
            }

            if (Math.random() <= 0.4) {
                bola.body.velocity.y = -velocidadeDaBola;
            } else {
                bola.body.velocity.y = velocidadeDaBola;
            }
        }
    },

    mostrarMensagemLancaBola: function () {
        if (!jogoIniciado) {
            this.criaMensagemIniciaJogo('Para lançar a bola clique na tela')
        } else {
            mensagemLancaBola.destroy();
        }
    },

    verificarVencedor: function () {
        if (placarJogador == 3) {
            textoFimDeJogo = `Parabéns, você venceu\nO placar foi ${placarJogador} a ${placarBot}`
            this.state.start('FimDeJogo');
        } else if (placarBot == 3) {
            textoFimDeJogo = `Vish, você perdeu\nO placar foi ${placarJogador} a ${placarBot}`
            this.state.start('FimDeJogo');
        }
    }

}