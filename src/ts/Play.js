import LocalStorage from './LocalStorage';
import Game from './Game';
export default class Play{
    constructor(root){
        this.root = root;
        this.test = [];
        this.shuffledData = [];
        this.count = 0;
        this.rigthAnswer = 0;
        this.wrongAnswer = 0;
        this.starsConteiner = null;
        this.isAnswerRigth = false;
        this.currentSound = null;
        this.starsCount = 0;
    }

    createGameTemlate(data){
        const filter = document.createElement("div");
            filter.classList.add("game-filter");
            this.root.append(filter);
        const playButton = document.createElement("button");
            playButton.classList.add("button-play");
            playButton.innerText = "play"
            filter.append(playButton);
            this.filter = filter;
            playButton.addEventListener("click", ()=>{
                this.clearStartArea();
                this.clearRepeatSoundButton();
                filter.remove();
                this.playSound(data);
                this.createStarsArea();
                this.checkAnswer();
                this.createRepeatSoundButton(root);
            });
        }

        playSound(data){
            const shuffledData = this.shuffleData(data);
            this.shuffledData = shuffledData;
            this.rigthAnswer = shuffledData.length; 
            this.count = shuffledData.length;
                this.checkTest();
        }

        playAudio(sound){
            let audio = new Audio(sound);
            audio.play();
        }
    
        shuffleData(data){
            let newData = data;
            for (let i = newData.length - 1; i > 0; i--){
                let randomNumber = Math.floor(Math.random() * (i + 1))    //случайный индек от 0 до i
                let currentnumber = data[i];
                newData[i] = newData[randomNumber];
                newData[randomNumber] = currentnumber;
            }
            return newData;
        }

        checkTest(){
            if(this.isAnswerRigth == true){
                this.test = [];
                this.isAnswerRigth = false;
            }
            if(this.test.length === 0 && this.shuffledData.length != 0){
                const soundObj =  this.shuffledData.pop();
                    this.test.push(soundObj.word);
                    this.currentSound = soundObj.sound;
                    setTimeout(() => {
                        this.playAudio(soundObj.sound);
                    }, 1000);
            }
            if(this.shuffledData.length === 0 && this.test.length === 0){
                this.checkResults();
            }
        }

        checkAnswer(){
            let cards = document.querySelectorAll(".card");
            const answerCount = new LocalStorage();
            cards.forEach(card =>{
                    card.addEventListener("click", (e)=>{
                        if(!e.target.classList.contains("card--not-active")){
                            let targetWord = e.target.dataset.word;
                            if(this.test[0] === targetWord){
                                card.classList.add("card--not-active");
                                card.parentNode.classList.add("conteiner--not-active");
                                this.isAnswerRigth = true;
                                this.rigthAnswer --;
                                const rigth = new Audio('./assets/sounds/rigth-answer.mp3'); 
                                    rigth.play();
                                    this.createStar(true);
                                    answerCount.setCountClick(e.target.dataset.word, "rigth");
                            }
                            if(this.test[0] != targetWord){
                                this.createStar(false);
                                this.wrongAnswer ++;
                                const wrong = new Audio('./assets/sounds/wrong-answer.wav'); 
                                    wrong.play();
                                    answerCount.setCountClick(e.target.dataset.word, "wrong");
                            }
                        }
                        this.checkTest();
                    });
                })
        }

        checkResults(){ 
            if(this.wrongAnswer != 0){
                const tryAgainPage = this.createTryAgainPage();
                this.root.append(tryAgainPage);
                this.createPlayAgainButton(tryAgainPage);
            }else{
                const winPage = this.createWinPage();
                this.root.append(winPage);
                this.createPlayAgainButton(winPage);
            }
        }

        createStarsArea(){
                const starsConteiner = document.createElement("div");
                starsConteiner.classList.add("stars-conteiner");
                this.starsConteiner = starsConteiner;
                this.root.append(starsConteiner);
                
        }

        clearStartArea(){
            if(document.querySelector(".stars-conteiner")){
                document.querySelector(".stars-conteiner").remove();
            }
        }

        createStar(type){
            this.starsCount ++;
            if(this.starsCount > 9){
                this.starsConteiner.innerHTML = "";
                this.starsCount = 0;
            }
            const star = document.createElement("div");
            const classStar = type === true? "star":"emptyStar";
                star.classList.add(classStar);
                this.starsConteiner.append(star);
        }

        createWinPage(){
            const winPage = document.createElement("div");
                winPage.classList.add("win-page");
            const winMessage = "Good job!";
            const message = this.createMessage(winMessage);
                winPage.append(message);
                const sound = new Audio('./assets/sounds/good-result.wav');
                setTimeout(() => {
                    sound.play();
                }, 1000);
                this.root.innerHTML = "";
                return winPage;

        }

        createTryAgainPage(){
            const tryAgainPage = document.createElement("div");
                tryAgainPage.classList.add("tryAgain-page");
            const mistakes = this.wrongAnswer === 1? "mistake":"mistakes";
            const wrongCountMessage = `You have ${this.wrongAnswer} ${mistakes}`;
            const message = this.createMessage(wrongCountMessage);
                tryAgainPage.append(message);
            const sound = new Audio('./assets/sounds/bad-result.wav');
                setTimeout(() => {
                    sound.play();
                }, 1000);
                this.root.innerHTML = "";
                return tryAgainPage;
        }

        createMessage(message){
            const messageConteiner = document.createElement("p");
                messageConteiner.classList.add("final-message");
                messageConteiner.innerText = message;
                return messageConteiner;
        }

        createPlayAgainButton(root){
            const playAgainButton = document.createElement("button");
                playAgainButton.classList.add("playAgain-button");
                playAgainButton.innerText = "Play again";
                playAgainButton.addEventListener("click", ()=>{
                    const root = document.querySelector("#root");
                    root.innerHTML = "";
                    const newGame = new Game(root);
                    newGame.startGame(); 
                });
                root.append(playAgainButton);
        }

        createRepeatSoundButton(root){
            const repeatButton = document.createElement("button");
                repeatButton.classList.add("button-repeat");
                repeatButton.addEventListener("click", ()=>{
                    const repeatSound = new Audio(this.currentSound);
                        repeatSound.play();
                })
                root.append(repeatButton);
        }

        clearRepeatSoundButton(){
            if(document.querySelector(".button-repeat")){
                document.querySelector(".button-repeat").remove();
            }
        }

}