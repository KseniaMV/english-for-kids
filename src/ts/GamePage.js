export default class GamePage{
    createHeader(){
        const header = document.createElement("header");
            header.classList.add("game__header");
        return header;
    }
    
    createButtonConteiner(){
        const buttonConteiner = document.createElement("div");
            buttonConteiner.classList.add("button-conteiner");
        return buttonConteiner;
    }

    createMenuButton(){
        const button = document.createElement("button");
            button.classList.add("menu__button");
        return button;
    }

    createMenu(){
        const menu = document.createElement("nav");
            menu.classList.add("menu");
        return menu;
    }

    createMenuList(){
        const list = document.createElement("ul");
            list.classList.add("menu__list");
        const mainPageLink = document.createElement("li");
            mainPageLink.innerText = "Main page";
            mainPageLink.classList.add("links", "main");
            mainPageLink.id = "tagget-category";
            mainPageLink.setAttribute("data-category" , "main");
        list.append(mainPageLink);
        return list;
    }
    
    createMenuItem(data, name, imageUrl){
        let li = document.createElement("li");
            li.textContent = name;
            li.classList.add("links", "category-links");
            li.setAttribute("data-category", data);
            li.style.backgroundImage = `url(./assets/images/backgrounds/${imageUrl}`;
        return li;
    }

    createToggleConteiner(){
        let toggleConteiner = document.createElement("div");
            toggleConteiner.classList.add("toggle__conteiner");
        return toggleConteiner;
    }

    createToggleInput(){
        let toggleInput = document.createElement("input");
            toggleInput.classList.add("toggle__input");
            toggleInput.setAttribute("readonly", "readonly");
            toggleInput.setAttribute("placeholder" , "train");
            return toggleInput;
    }

    createGameConteiner(){
        const gameConteiner = document.createElement("section");
            gameConteiner.classList.add("game__conteiner");
        return gameConteiner;
    }

}