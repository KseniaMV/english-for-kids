import GamePage from './GamePage';
import CategoryCard from './CategoryCard';
import WordCard from './WordCard';
import Play from './Play';
import LocalStorage from './LocalStorage';

export default class Game{
    constructor(root){
        this.playMode = false;
        this.isMenuOpen = false;
        this.root = root;            //root for game / game page
        this.toggleConteiner = null;
        this.toggleInput = null;
        this.gameConteiner = null;    //root for categories and words 
        this.categories = []; 
        this.currentCategory = "main"; 
        //menu
        this.buttonConteiner = null;
        this.menuButton = null;
        this.menu = null;
        this.menuList = null; 
        //words
        this.isWordsLoad = false; 
        this.sounds = [];
        this.statisticData = null;
    }

    startGame(){
        const gamePage = new GamePage();
        const statTemplate = new LocalStorage();
        const header = gamePage.createHeader();
        //create menu button
        const buttonConteiner = gamePage.createButtonConteiner();
            this.buttonConteiner = buttonConteiner;
            this.root.append(buttonConteiner);
        const menuButton = gamePage.createMenuButton();  
            this.menuButton = menuButton;
            buttonConteiner.append(menuButton);
            buttonConteiner.addEventListener("click", ()=>{
                if(this.isMenuOpen === false){
                    this.openMenu();
                }else{
                    this.closeMenu();
                }
            })
        //create menu
        const menu = gamePage.createMenu();
            this.menu = menu;
            this.root.append(menu);
            const menuList = gamePage.createMenuList();
            this.menuList = menuList;
            this.menu.append(menuList);
            const mainPageLink = document.querySelector(".main");
                mainPageLink.addEventListener("click", ()=>{
                    this.setCurrentCategory("main")
                    this.createCategoryCards();
                    this.changeColorLink(); 
                    this.closeMenu();
                    statTemplate.clearStatisticTemplate();
                    if(this.playMode === true){
                        this.clearPlayArea();
                    }
                });
            //create link to statistics page in menu
            const statistic = document.createElement("li");
            statistic.innerText = "statistics";
            statistic.classList.add("links", "statistics");
            statistic.setAttribute("data-category" , "statistics");
            statistic.addEventListener("click", ()=>{
                this.closeMenu();
                this.clearGameConteiner();
                this.clearPlayArea();
                this.setCurrentCategory("statistics");
                this.changeColorLink();
                const template = statTemplate.createStatisticTemplate();
                    this.root.append(template);
                    statTemplate.createwordConteiner();
            });
            menuList.append(statistic);
        //create toggle for change game mode
        const toggleConteiner = gamePage.createToggleConteiner();
            this.toggleConteiner = toggleConteiner;
        const toggleInput = gamePage.createToggleInput();
            this.toggleInput = toggleInput;
            toggleConteiner.append(toggleInput);
            header.append(toggleConteiner);
        //create game conteiner for cards 
        const gameConteiner = gamePage.createGameConteiner();
            this.gameConteiner = gameConteiner;
            header.append(toggleConteiner);
            this.root.prepend(header);
            header.after(gameConteiner);

        this.changeMode();
        this.createCategoryCards();
        this.closeMenuByClickOnBody();
        window.onpopstate = () => {
            this.createCategoryCards();
            statTemplate.clearStatisticTemplate();
        }
            this.setDataToLocalStorage(statTemplate); 
    }

    createCategoryCards(){
        this.isWordsLoad = false;
        this.clearGameConteiner();
        const gamePage = new GamePage();
        const categories = new CategoryCard();
        const statTemplate = new LocalStorage();
        let categoriesArray = [];
        const categoryData = this.getInfo("categories");
        const mode = this.playMode === true ? "play" : "train";
        categoryData.then((data)=>{
            for(let key in data){
                const categoryCard = categories.createCategoryCards(mode, key, data[key].title, data[key].image);
                    this.gameConteiner.append(categoryCard);
                    categoriesArray.push(categoryCard);
                    this.categories = categoriesArray;
                    if(!this.menuList.classList.contains("fulled")){
                        const li =  gamePage.createMenuItem(key, data[key].title, data[key].image);
                        this.menuList.append(li);
                        li.addEventListener("click", ()=>{
                            this.setCurrentCategory(li.dataset.category)
                            this.changeColorLink();
                            this.openWords();
                            this.closeMenu();
                            statTemplate.clearStatisticTemplate();
                        })
                    }
            }
            this.menuList.classList.add("fulled");
        }).then(()=>this.getTargetCategory());
    }

    //by click on category button get category name and call function which open current category's words
    getTargetCategory(){
        this.categories.forEach(card =>{
            card.addEventListener("click", (e)=>{
                const targetCategory = e.target.dataset.category;
                this.setCurrentCategory(targetCategory);
                this.openWords();
                this.changeColorLink();
            });
        })
    }

    //create cards with words, add this card to array this.wordsCards
    openWords(){
        this.isWordsLoad = true;
        let sounds = [];
        this.clearGameConteiner();
        if(this.playMode === true){                                 //if game mode = play, pass an array of sounds to the Play class
            const playGame = new Play(this.root);
                playGame.createGameTemlate(sounds);
        }
        const wordCard = new WordCard(this.currentCategory);
        let mode = this.playMode === true ? "play" : "train";
        const wordData = this.getInfo("words");
            wordData.then((data)=>{
                const words = this.getWords(data);
                    for (const key in words) {
                        const sound = `./assets/sounds/${words[key].sound}`;
                        const card = wordCard.createWordCard(mode, key, words[key].ru, words[key].image, sound);
                        let soundObj = {
                            word: key,
                            sound: sound
                        }
                    sounds.push(soundObj);                                   
                    this.gameConteiner.append(card);
                    if(this.playMode === false){
                        wordCard.playSound(card.firstChild, sound);       
                    }
                }
            });

    }

    //get datafrom json files
    getInfo(type){
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();
            request.open("GET", `./assets/data/${type}.json`);
            request.onload = function (){
                if(request.status == 200){
                    let data = JSON.parse(request.response);
                    resolve(data);
                }else{
                    reject("no access to files");
                    throw "no access to files";
                }
            };
            request.send();
        });
    }

    getWords(data){
        for (const key in data) {
            if (data.hasOwnProperty(key)) { 
                if(key === this.currentCategory){
                    return data[key];
                }   
            }
        }
    }

    getCurrentCategory(){
        return this.currentCategory;
    }

    setCurrentCategory(value){
        this.currentCategory = value;
    }

    //by click on toggle change playMode and styles
    changeMode(){
        this.toggleConteiner.addEventListener("click",()=>{
            this.toggle();
            this.checkStatus();
            if(document.querySelector(".stars-conteiner")){
                document.querySelector(".stars-conteiner").remove();
                document.querySelector(".button-repeat").remove();
            }
        });
    }

    toggle(){
        this.playMode = !this.playMode;
    }

    toggleMenuStatus(){
        this.isMenuOpen = !this.isMenuOpen;
    }

    openMenu(){  
        this.buttonConteiner.classList.add("button--open");
        this.menuButton.classList.add("button--hide");
        this.menuList.classList.add("animateMenu");
        this.menu.classList.add("menu--open"); 
        this.isMenuOpen = true;                           
    }

    closeMenu(){
        this.buttonConteiner.classList.remove("button--open");
        this.menuButton.classList.remove("button--hide");
        this.menuList.classList.remove("animateMenu");
        this.menu.classList.remove("menu--open");
        this.isMenuOpen = false;
    }

    changeColorLink(){
        let links = document.querySelectorAll(".links");
        links.forEach(link=>{
            if(link.dataset.category === this.currentCategory){
                link.id = "tagget-category";
            }else{
                link.id = "";
            }
        });
    }

    closeMenuByClickOnBody(){
        this.gameConteiner.addEventListener("click", ()=>{           //document,body??
            this.closeMenu();
        })
    }

    checkStatus(){
        if(this.playMode == true){
            this.toggleInput.setAttribute("placeholder" , "play");
            this.toggleInput.classList.add("checkedPlay");
            this.toggleConteiner.classList.add("toggle-play");
            if(this.isWordsLoad === false){                         //if words aren't opened --> change styles of category cards
                this.categories.forEach(element => {
                    element.classList.add("play-mode");
                }); 
            }
            if(this.isWordsLoad === true){                       //if words are opened --> change words cards to game mode
                this.openWords();
            }
        }
        if(this.playMode == false){
            this.toggleInput.setAttribute("placeholder" , "train");
            this.toggleInput.classList.remove("checkedPlay");
            this.toggleConteiner.classList.remove("toggle-play");
                this.categories.forEach(element => {
                    element.classList.remove("play-mode");
                });
            if(this.isWordsLoad === true){
                this.openWords();
            }
        }
    }
    
    clearGameConteiner(){
        this.categories = []; 
        const categoryCard = document.querySelectorAll(".category__card");
            categoryCard.forEach(element =>{
                element.remove();
            }); 
        const wordsCard = document.querySelectorAll(".card-conteiner");
            wordsCard.forEach(element =>{
                element.remove();
            });
    } 
    
    setDataToLocalStorage(obj){
       let statisticData = [];
        const mainData = this.getInfo("words");
            mainData.then((data) =>{
                for (const key in data) {
                    const wordData = data[key];
                        for (const word in wordData) {
                            statisticData.push({
                                "category": key,
                                "word" : word,
                                "ru" : wordData[word].ru,
                                "rigth": 0,
                                "wrong": 0,
                                "clickCount": 0  
                            })
                        }
                }
            }).then(()=>{
                if(localStorage.getItem("kseniamv-english") === null || localStorage.getItem("kseniamv-english") === "null"){
                    obj.setData(statisticData)  
                }
                obj.clearData = statisticData;
            });
    }



    clearPlayArea(){
        const clearPlayArea = new Play();
        clearPlayArea.clearStartArea();
        clearPlayArea.clearRepeatSoundButton()
    }
}

