const { electron } = window;

class GameAnimator {
    constructor(gameCanvas, lvlLabel, snake1LabelScore, snake2LabelScore) {
        this._lvlLabel = lvlLabel;
        this._snake1LabelScore = snake1LabelScore;
        this._snake2LabelScore = snake2LabelScore;
        this._gameCanvas = gameCanvas;
    }

    displaySnakeScore1(score, target) {
        this._displayScore(score, target, this._snake1LabelScore);
    }

    displaySnakeScore2(score, target) {
        this._displayScore(score, target, this._snake2LabelScore);
    }

    displayLvl(lvl){
        this._lvlLabel.innerHTML = 'Level ' + lvl;
    }

    _displayScore(score, target, scoreLabel) {
        let newLabelText = score + '/' + target;
        scoreLabel.innerHTML = newLabelText;
    }

    showGift() {
        electron.sendToMain('loadFile', './resources/gift.pdf');
    }
}

export { GameAnimator };

// Pour generer html depuis js, tres instructif
// https://dev.to/dcodeyt/3-easy-ways-to-generate-html-with-javascript-3b1j

// Tada animation
// https://mdbootstrap.com/docs/standard/content-styles/animations/
// Use data-mdb-animation-start="manually" to initialize the component without animating, adding hover, 
// clicking or scrolling events and use the animationStart method when you want to start the animation.

