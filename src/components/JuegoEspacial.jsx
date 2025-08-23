import React, { useEffect } from 'react';
import Phaser from 'phaser';

const JuegoEspacial = () => {
  useEffect(() => {
    class EspacioScene extends Phaser.Scene {
      constructor() {
        super('EspacioScene');
        this.score = 0;
      }

      preload() {
        // Imágenes
        this.load.image('espacio', '/assets/deep-space.jpg');
        this.load.image('monedas', '/assets/moneda.png');
        this.load.image('meteorito', '/assets/asteroid.jpg');

        // Sonidos (asegúrate de tener estos archivos en public/sounds/)
        this.load.audio('coin', '/sounds/coin.wav');
        this.load.audio('hit', '/sounds/hit.wav');
        this.load.audio('timeup', '/sounds/timeup.wav');
      }

      create() {
        // Fondo
        this.add
          .image(400, 300, 'espacio')
          .setOrigin(0.5, 0.5)
          .setDisplaySize(800, 600);

        // Agrupar sonidos
        this.sndCoin = this.sound.add('coin');
        this.sndHit = this.sound.add('hit');
        this.sndTimeUp = this.sound.add('timeup');

        // MONEDAS
        this.monedas = this.physics.add.group({
          key: 'monedas',
          repeat: 11,
          setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.monedas.children.iterate((m) => {
          m.setBounce(1);
          m.setVelocity(
            Phaser.Math.Between(-200, 200),
            Phaser.Math.Between(-200, 200)
          );
          m.setCollideWorldBounds(true);
          m.setInteractive();
          m.setScale(0.09);
        });

        // METEORITOS
        this.meteorito = this.physics.add.group({
          key: 'meteorito',
          repeat: 11,
          setXY: { x: 12, y: 100, stepX: 150 },
        });

        this.meteorito.children.iterate((obj) => {
          obj.setBounce(1);
          obj.setVelocity(
            Phaser.Math.Between(-200, 200),
            Phaser.Math.Between(-200, 200)
          );
          obj.setCollideWorldBounds(true);
          obj.setInteractive();
          obj.setScale(0.01);
        });

        // Colisiones no usan sonido
        this.physics.add.collider(this.monedas, this.meteorito);

        // Puntaje
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
          fontSize: '32px',
          fill: '#fff',
        });

        // Clic en objetos
        this.input.on('gameobjectdown', (pointer, gameObject) => {
          if (gameObject.texture.key === 'monedas') {
            gameObject.destroy();
            this.score += 10;
            this.sndCoin.play();           // sonido moneda
          } else if (gameObject.texture.key === 'meteorito') {
            gameObject.destroy();
            this.score -= 5;
            this.sndHit.play();            // sonido golpe meteorito
          }
          this.scoreText.setText(`Score: ${this.score}`);
        });

        // Fin del juego en 30 segundos
        this.time.addEvent({
          delay: 30000,
          callback: this.endGame,
          callbackScope: this,
        });
      }

      endGame() {
        this.physics.pause();
        this.sndTimeUp.play();             // sonido fin de juego
        this.add.text(200, 300, '¡Tiempo agotado!', {
          fontSize: '40px',
          fill: '#ff0000',
        });
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#2d2d2d',
      parent: 'espacio-container',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: EspacioScene,
    };

    const game = new Phaser.Game(config);
    return () => game.destroy(true);
  }, []);

  return <div id="espacio-container" />;
};

export default JuegoEspacial;
