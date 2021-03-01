import './styles/main.scss';
import Paralax from './ts/Paralax';
import StartPage from './ts/StartPage';
import Game from './ts/Game';

// add elements to DOM
const root = document.querySelector('#root');
window.history.pushState(null, null, "/english-for-kids");
//create and add to root main page with load button
let startPage = new StartPage(root);
    startPage.createMainPage();

//paralax
const button = document.querySelector(".main-button");
let paralax = new Paralax(button);
root.addEventListener("mousemove", (e)=>{
    paralax.parallax(e);
});

button.addEventListener("click", ()=>{
    startPage.deleteStartPage();
    const game = new Game(root);
        game.startGame();
});
