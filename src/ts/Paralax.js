export default class Paralax{
    constructor(element){
        this.element = element;
    }
    getWindowWidth(){
        return window.innerWidth/2;
    }
    getWindowHeigth(){
        return window.innerHeight/2;
    }

    parallax(e){
            let wHeigth = this.getWindowHeigth();
            let wWidth = this.getWindowWidth();
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            let transformY = 5 - (wWidth-mouseX)*0.01;
            let transformX = 5 - (wHeigth - mouseY)*0.01;
            this.element.style.transform = `translate(${transformX}px,${transformY}px)`;
    }
}
