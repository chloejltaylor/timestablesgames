import Phaser from './lib/phaser.js'
import Title from './scenes/titlescreen.js'

import Preload from './scenes/preload.js'
import Shared from './scenes/shared.js'
import UI from './scenes/ui.js'
import Pause from './scenes/pausescreen.js'
import ChooseNumber from './scenes/choosenumber.js'
import ChooseGame from './scenes/choosegame.js'
import congratulations from './scenes/congratulations.js'
import gameTitle from './scenes/games/game-title.js'

import Bouncer from './scenes/games/bouncer.js'
import Runner from './scenes/games/runner.js'

const DEFAULT_WIDTH = 1050;
const DEFAULT_HEIGHT = 450;
const MAX_WIDTH = DEFAULT_WIDTH * 1.5;
const MAX_HEIGHT = DEFAULT_HEIGHT * 1.5;
let SCALE_MODE = 'FIT'; // FIT OR SMOOTH

window.addEventListener('load', () => {
  const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 900,
    backgroundColor: '#ffffff',
    scene: [Preload, Shared, ChooseNumber, ChooseGame, Title,
            gameTitle, Bouncer, Runner,
            congratulations,  UI, Pause],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0,
        },
        debug: false,
      },
    },
    scale: {
      // mode: Phaser.Scale.FIT,
      mode: Phaser.Scale.NONE,
      width: 1050,
      height: 450,
    },
  };
  const game = new Phaser.Game(config);

  // Resize the canvas accordingly
  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;
    let maxWidth = MAX_WIDTH;
    let maxHeight = MAX_HEIGHT;
    let scaleMode = SCALE_MODE;

    // The scale of the window in comparison to game
    let scale = Math.min(w / width, h / height);
    // Calculate new width for game
    let newWidth = Math.min(w / scale, maxWidth);
    let newHeight = Math.min(h / scale, maxHeight);

    let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
    let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
    let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;

    // smooth scaling
    let smooth = 1;
    if (scaleMode === 'SMOOTH') {
      const maxSmoothScale = 1.15;
      const normalize = (value, min, max) => {
        return (value - min) / (max - min);
      };
      if (width / height < w / h) {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale;
      } else {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale;
      }
    }

    // resize the game
    // This will emit a resize event which a scene's this.scale will receive
    game.scale.resize(newWidth * smooth, newHeight * smooth);

    // scale the width and height of the css
    game.canvas.style.width = newWidth * scale + 'px';
    game.canvas.style.height = newHeight * scale + 'px';

    // center the game with css margin
    game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
    game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;
  };

  window.addEventListener('resize', (event) => {
    resize();
  });

  resize();
});