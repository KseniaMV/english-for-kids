export default class Mainpage{
    constructor(root){
        this.root = root;
        this.title = null;
        this.button = null;
        this.image = null;
        this.footer = null;
    }
     
    createMainTitle(){
        const titleConteiner = document.createElement("div");
            titleConteiner.classList.add("title-conteiner");
        const mainTitle = document.createElement('h1')
            mainTitle.classList.add("main-title");
            mainTitle.textContent = 'English for kids';
        titleConteiner.append(mainTitle);
        this.title = titleConteiner;
        return titleConteiner;
    }

    createButton(){
        const button = document.createElement("button");
        button.classList.add("main-button");
        button.textContent = "Start";
        this.button = button;
        return button;
    }

    createMainImage(){
        const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("main-imageWrapper");
            this.image = imageWrapper;
        return imageWrapper;
    }


    createMainPage(){
        let title = this.createMainTitle();
        let button = this.createButton();
        let image = this.createMainImage();
        let footer = this.createFooter();
        this.root.append(title);
        this.root.append(button);
        this.root.append(image);
        this.root.append(footer);
    }

    createFooter(){
        const footer = document.createElement("footer");
            footer.classList.add("footer");
        const footerInfo = document.createElement("p");
            footerInfo.classList.add("footer__info");
        const linkToSchool = document.createElement("a");
            linkToSchool.setAttribute("href", "https://rs.school/js/");
            linkToSchool.innerText = "RS School ";
        const linkToGithub = document.createElement("a");
            linkToGithub.setAttribute("href", "https://github.com/KseniaMV");
            linkToGithub.innerText = " KseniaMV, 2020 ";
            footerInfo.textContent = "Created by";
            footerInfo.append(linkToGithub);
            footerInfo.append(linkToSchool);
            footer.append(footerInfo); 
            this.footer = footer;
        return footer;
    }

    deleteStartPage(){
        this.title.remove();
        this.button.remove();
        this.image.remove();
        this.footer.remove();
    }
}

