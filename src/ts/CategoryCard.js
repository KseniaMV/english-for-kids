export default class CategoryCard{
    createCategoryCards(mode, data,title,imageUrl){
        let categoryCard = document.createElement("div");
            categoryCard.classList.add("category__card");
            if(mode === "play"){
                categoryCard.classList.add("play-mode");
            }else{
                categoryCard.classList.remove("play-mode");
            }
            categoryCard.setAttribute("data-category", data);
            categoryCard.style.backgroundImage = `url(./assets/images/backgrounds/${imageUrl}`; 
        let cardTitle = document.createElement("h3");
            cardTitle.classList.add("category__title");
            cardTitle.setAttribute("data-category", data);
            cardTitle.textContent = title;
            this.title = title;
            categoryCard.append(cardTitle);
            return categoryCard; 
        }
}