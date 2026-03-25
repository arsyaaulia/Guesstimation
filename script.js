class GuessingGame {
    constructor() {
        this.maxNumber = 10;
        this.currentScore = 100;
        this.numberToGuess = 0;
        this.attempts = 0;
        this.currentLevel = 1;
        this.isActive = true;
        
        this.initElements();
        this.attachEvents();
        this.updateActiveLevelButton();
        this.startNewGame();
        
    }
    
    initElements() {
        this.levelBtns = document.querySelectorAll('.level-btn');
        this.guessInput = document.getElementById('guessInput');
        this.guessBtn = document.getElementById('guessBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.attemptCountSpan = document.getElementById('attemptCount');
        this.scoreValueSpan = document.getElementById('scoreValue');
        this.rangeHint = document.getElementById('rangeHint');
        this.feedback = document.getElementById('feedback');
    }
    
    attachEvents() {
        this.levelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectLevel(parseInt(btn.dataset.level)));
        });
        
        this.guessBtn.addEventListener('click', () => this.makeGuess());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        
        // // Number pad events
        // this.numBtns.forEach(btn => {
        //     btn.addEventListener('click', () => this.appendNumber(btn.dataset.num));
        // });
        
        // if (this.clearBtn) {
        //     this.clearBtn.addEventListener('click', () => this.clearInput());
        // }
        
        // if (this.deleteBtn) {
        //     this.deleteBtn.addEventListener('click', () => this.deleteLastDigit());
        // }
        
        // this.guessInput.addEventListener('keypress', (e) => {
        //     if (e.key === 'Enter' && this.isActive) {
        //         this.makeGuess();
        //     }
        // });
    }
    
    // appendNumber(num) {
    //     if (!this.isActive) return;
        
    //     let currentValue = this.guessInput.value;
    //     // Prevent leading zero
    //     if (currentValue === '0') {
    //         currentValue = '';
    //     }
    //     const newValue = currentValue + num;
        
    //     // Check if number exceeds max range
    //     const numValue = parseInt(newValue);
    //     if (numValue <= this.maxNumber) {
    //         this.guessInput.value = newValue;
    //     }
    // }
    
    // clearInput() {
    //     if (!this.isActive) return;
    //     this.guessInput.value = '';
    // }
    
    // deleteLastDigit() {
    //     if (!this.isActive) return;
    //     this.guessInput.value = this.guessInput.value.slice(0, -1);
    // }
    
    selectLevel(level) {
        if (!this.isActive) {
            this.isActive = true;
            this.guessInput.disabled = false;
            this.guessBtn.disabled = false;
            // this.numBtns.forEach(btn => btn.disabled = false);
        }
        
        this.currentLevel = level;
        
        switch(level) {
            case 1:
                this.maxNumber = 10;
                this.currentScore = 100;
                break;
            case 2:
                this.maxNumber = 50;
                this.currentScore = 200;
                break;
            case 3:
                this.maxNumber = 100;
                this.currentScore = 300;
                break;
            case 4:
                this.maxNumber = 1000;
                this.currentScore = 500;
                break;
        }
        
        this.updateActiveLevelButton();
        this.startNewGame();
    }
    
    updateActiveLevelButton() {
        this.levelBtns.forEach(btn => {
            const btnLevel = parseInt(btn.dataset.level);
            if (btnLevel === this.currentLevel) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    startNewGame() {
        this.numberToGuess = Math.floor(Math.random() * this.maxNumber) + 1;
        this.attempts = 0;
        this.isActive = true;
        
        this.updateUI();
        this.showFeedback('', '');
        
        this.guessInput.disabled = false;
        this.guessBtn.disabled = false;
        this.numBtns.forEach(btn => btn.disabled = false);
        this.guessInput.value = '';
        this.guessInput.focus();
    }
    
    updateUI() {
        this.rangeHint.textContent = `range 1–${this.maxNumber}`;
        this.attemptCountSpan.textContent = this.attempts;
        this.scoreValueSpan.textContent = Math.max(this.currentScore, 0);
    }
    
    makeGuess() {
        if (!this.isActive) return;
        
        const userGuess = parseInt(this.guessInput.value);
        
        if (isNaN(userGuess) || userGuess < 1 || userGuess > this.maxNumber) {
            this.showFeedback(`guess a number between 1 and ${this.maxNumber}`, '');
            this.guessInput.value = '';
            return;
        }
        
        this.attempts++;
        this.updateUI();
        
        if (userGuess < this.numberToGuess) {
            this.currentScore -= 10;
            this.updateUI();
            this.showFeedback('too low', 'low');
            
            if (this.currentScore <= 0) {
                this.endGame(false);
            }
        } 
        else if (userGuess > this.numberToGuess) {
            this.currentScore -= 10;
            this.updateUI();
            this.showFeedback('too high', 'high');
            
            if (this.currentScore <= 0) {
                this.endGame(false);
            }
        } 
        else {
            this.showFeedback('correct!', 'correct');
            this.endGame(true);
            return;
        }
        
        this.guessInput.value = '';
        this.guessInput.focus();
    }
    
    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = 'feedback-text';
        
        if (message) {
            setTimeout(() => {
                this.feedback.classList.add('show');
            }, 10);
            
            if (type) {
                this.feedback.classList.add(type);
            }
        } else {
            this.feedback.classList.remove('show');
        }
    }
    
    endGame(isWin) {
        this.isActive = false;
        this.guessInput.disabled = true;
        this.guessBtn.disabled = true;
        this.numBtns.forEach(btn => btn.disabled = true);
        
        if (isWin) {
            const finalScore = Math.max(this.currentScore, 0);
            this.showFeedback(`guessed in ${this.attempts} attempts · score ${finalScore}`, 'correct');
            
            // subtle success animation
            this.gameCard = document.querySelector('.game-card');
            if (this.gameCard) {
                this.gameCard.classList.add('success-glow');
                setTimeout(() => {
                    this.gameCard.classList.remove('success-glow');
                }, 400);
            }
        } else {
            this.showFeedback(`game over · the number was ${this.numberToGuess}`, '');
        }
    }
    
    resetGame() {
        this.isActive = true;
        this.startNewGame();
    }
}

// initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GuessingGame();
});