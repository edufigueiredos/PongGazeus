
Pong.Game = function (game) {
}

let playerPaddle;
let botPaddle;
let ball;

let ballSpeed;
let gameStarted;

let playerScore;
let botScore;

let messageThrowBall;

Pong.Game.prototype = {
    preload: function () {
        this.load.image('background', './img/background.png')
        this.load.image('paddle', './img/paddle.png');
        this.load.image('ball', './img/ball.png');
        this.load.audio('playerSound', ['./sounds/playerSound.wav']);
        this.load.audio('botSound', ['./sounds/botSound.wav']);
    },

    create: function () {
        ballSpeed = 350;
        gameStarted = false;

        playerPoints = 0;
        botPoints = 0;

        const background = this.add.sprite(0, 0, 'background')
        playerPaddle = this.makePaddle(0, this.world.centerY);
        botPaddle = this.makePaddle(this.world.width, this.world.centerY);
        playerScore = this.makeScore(-400);
        botScore = this.makeScore(400);
        ball = this.makeBall();


        this.input.onDown.add(this.startGame, this);
        this.showMessageThrowBall();
    },

    update: function () {
        this.physics.arcade.collide(playerPaddle, ball, () => {
            this.sound.play('playerSound');
        });
        this.physics.arcade.collide(botPaddle, ball, () => {
            this.sound.play('botSound');
        });

        this.playerPositionPaddle();
        this.botPositionPaddle();

        playerScore.text = playerPoints;
        botScore.text = botPoints;
        this.oneMorePoint();

        this.checkWinner();
    },

    makePaddle: function (posicaoX, posicaoY) {
        const paddle = this.add.sprite(posicaoX, posicaoY, 'paddle');
        this.physics.arcade.enable(paddle);
        paddle.anchor.setTo(0.5, 0.5);
        paddle.scale.setTo(0.6, 0.6);
        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;

        return paddle;
    },

    makeBall: function () {
        const ball = this.add.sprite(this.world.centerX, this.world.centerY, 'ball');
        this.physics.arcade.enable(ball);
        ball.anchor.setTo(0.5, 0.5);
        ball.body.bounce.setTo(1.1, 1.1);
        ball.body.collideWorldBounds = true;
        ball.body.maxVelocity.y = 1000;
        ball.body.maxVelocity.x = 1000;

        return ball;
    },

    makeScore: function (posicaoX) {
        const scoreTextStyle = { fill: '#FFF', font: 'Segoe UI', fontSize: 100, boundsAlignH: "center", boundsAlignV: "center" };
        const score = this.add.text(0, 0, 0, scoreTextStyle);
        score.setTextBounds(posicaoX, 50, this.world.width - posicaoX, this.world.height);

        return score;
    },

    makeMessageStartGame: function (texto) {
        const textStyle = textStylePattern;
        textStyle.boundsAlignH = 'center';
        textStyle.boundsAlignV = 'bottom';
        textStyle.fontSize = 50;
        messageThrowBall = this.add.text(0, 0, texto, textStyle);
        messageThrowBall.setTextBounds(0, 0, this.world.width, this.world.height - 10);
    },

    playerPositionPaddle: function () {
        playerPaddle.y = this.input.y
        if (playerPaddle.y < playerPaddle.height * 0.5) {
            playerPaddle.y = playerPaddle.height * 0.5;
        } else if (playerPaddle.y > (this.world.height - playerPaddle.height * 0.5)) {
            playerPaddle.y = this.world.height - playerPaddle.height * 0.5;
        }
    },

    botPositionPaddle: function () {
        botPaddle.body.velocity.setTo(ball.body.velocity.y)
        botPaddle.body.velocity.x = 0;
        botPaddle.body.maxVelocity.y = 600;
    },

    startGame: function () {
        gameStarted = !gameStarted;
        this.showMessageThrowBall(gameStarted);
        this.throwBall(gameStarted);
        playerPoints = 0;
        botPoints = 0;
    },

    oneMorePoint: function () {
        if (ball.body.blocked.right) {
            playerPoints += 1;
        } else if (ball.body.blocked.left) {
            botPoints += 1;
        }
    },

    throwBall: function () {
        if (!gameStarted) {
            ball.x = this.world.centerX;
            ball.y = this.world.centerY;
            ball.body.velocity.setTo(0, 0);
        } else {
            if (Math.random() <= 0.4) {
                ball.body.velocity.x = -ballSpeed;
            } else {
                ball.body.velocity.x = ballSpeed;
            }

            if (Math.random() <= 0.4) {
                ball.body.velocity.y = -ballSpeed;
            } else {
                ball.body.velocity.y = ballSpeed;
            }
        }
    },

    showMessageThrowBall: function () {
        if (!gameStarted) {
            this.makeMessageStartGame('Para lançar a bola clique na tela')
        } else {
            messageThrowBall.destroy();
        }
    },

    checkWinner: function () {
        if (playerPoints == 3) {
            endGameText = `Parabéns, você venceu\nO placar foi ${playerPoints} a ${botPoints}`
            this.state.start('EndGame');
        } else if (botPoints == 3) {
            endGameText = `Vish, você perdeu\nO placar foi ${playerPoints} a ${botPoints}`
            this.state.start('EndGame');
        }
    }

}