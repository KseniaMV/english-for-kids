import LocalStorage from "./LocalStorage";

export default class WordCard{
    constructor(category){
        this.category = category;
    }
    
    createWordCard(mode, word, translate,  image, sound){
        let cardConteiner = document.createElement("div");
            cardConteiner.classList.add("card-conteiner");
        let card = document.createElement("div"); 
        const cardMode = mode === "play" ? "card--play-mode" : "card--train-mode";
            card.classList.add("card", cardMode);
            card.setAttribute("data-word", word);
            card.style.backgroundImage = `url(./assets/images/${this.category}/${image}`; 
            cardConteiner.append(card);
        let title = document.createElement("h3");
            title.classList.add("card__title");
            title.textContent = word;
            card.append(title);
        let soundButton = this.createSoundButton();
            card.append(soundButton);
        let cardBack = this.createCardBack(translate,  image);
            cardConteiner.append(cardBack);
        let turnButton = this.createTurnButton();
            card.append(turnButton);
                if(mode === "train"){
                    card.addEventListener("click", (e)=>{
                        const clickCount = new LocalStorage();
                            clickCount.setCountClick(e.target.dataset.word, "clickCount");      //обновляет количество кликов по карточке в режиме тренировки
                    })
                    turnButton.addEventListener("click", (e)=>{
                        e.stopPropagation();
                        this.turnCard(card, cardBack);
                    });
                    cardBack.addEventListener("mouseout",(e)=>{
                        e.stopPropagation();
                        setTimeout(() => {
                            this.turnBackCard(card, cardBack) 
                        }, 1000);
                    });
                }
        return cardConteiner;
    }

    createCardBack(translate, image){
    let cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.style.backgroundImage = `url(./assets/images/${this.category}/${image}`;
    let title = document.createElement("h3");
        title.classList.add("card__title-translate");
        title.textContent = translate;
        cardBack.append(title);
        return cardBack;
    }

    createSoundButton(){
        let button = document.createElement("button");
        button.classList.add("card__button", "button-sound" );
        return button;
    }

    playSound(target, sound){
        target.addEventListener("click", ()=>{
            let pronansiation = new Audio(sound);
            pronansiation.play();
        });
    }

    createTurnButton(){
        let button = document.createElement("button");
        button.classList.add("card__button", "button-turn" );
        return button;
    }

    turnCard(card, back){
        card.style.transform = "rotateY(-180deg)"; //animate rotation to back side
        back.style.transform = "rotateY(0)";
    }

    turnBackCard(card, back){       //animate rotation to front side
        card.style.transform = "rotateY(0)";
        back.style.transform = "rotateY(180deg)";
    }

}