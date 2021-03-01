export default class LocalStorage{
    constructor(){
        this.statConteiner = null;
        this.data = null;
        this.clearData = null;
    }

    getData(){
        this.data =  JSON.parse(localStorage.getItem('kseniamv-english'));
    }

    setData(data){
        this.clearData = data;
            localStorage.setItem('kseniamv-english', JSON.stringify(data));
    }

    setCountClick(word, type){
        this.getData();
        for (const key in this.data) {
            for(let value of Object.values(this.data[key])){
                if(value === word){
                    switch (type) {
                        case "rigth":
                            this.data[key].rigth ++;
                            break;
                        case "wrong":
                            this.data[key].wrong ++;
                            break;
                        default:
                            this.data[key].clickCount ++;
                            break;
                    }
                    this.setData(this.data);
                }
            }
        }
    }

    createStatisticTemplate(){
        this.clearStatisticTemplate();
        this.getData();
        const statConteiner = document.createElement("div");
            statConteiner.classList.add("statistic-conteiner");
            this.statConteiner = statConteiner;
        const statTitle = document.createElement("h2");
            statTitle.classList.add("stat-title");
            statTitle.innerText = "learning statistics";
            statConteiner.append(statTitle);
        this.createStatFilters(statConteiner);
        this.createCategories(statConteiner);
        this.createResetButton(statConteiner)
        window.history.pushState(null, null, "/statistics");
        return statConteiner;
    }

    createStatFilters(root){
        const statFilters = document.createElement("div");
            statFilters.classList.add("filter-conteiner");
            root.append(statFilters);
        const word = document.createElement("div");
            word.classList.add("filter");
            word.innerText = "word";
            statFilters.append(word);
        const translate = document.createElement("div");
            translate.classList.add("filter");
            translate.innerText = "translate";
            word.after(translate);
        const clicks = document.createElement("div");
            clicks.classList.add("filter");
            clicks.innerText = "clicks";
            translate.after(clicks);
        const rigth = document.createElement("div");
            rigth.classList.add("filter");
            rigth.innerText = "rigth";
            clicks.after(rigth);
        const wrong = document.createElement("div");
            wrong.classList.add("filter");
            wrong.innerText = "wrong";
            rigth.after(wrong);
        root.append(statFilters);
    }

    createCategories(root){
        const categories = new Set();
        const statData = this.data;
            for (const key in statData) {
                categories.add(statData[key].category);
                }
            categories.forEach(category =>{
                const statCategory = document.createElement("h3");
                statCategory.classList.add("stat-category");
                if(category === "activities"){
                    statCategory.innerText = "sport and hobby"; 
                }else{
                    statCategory.innerText = category;
                }
                    statCategory.setAttribute("data-category", category);
                    root.append(statCategory);
            });
    };
    

    createWordStatistic(data, key){
            const wordStatistic = document.createElement("div");
                wordStatistic.classList.add("stat-word");
            const word = document.createElement("p");
                word.innerText = data[key].word;
                wordStatistic.append(word);
            const translate = document.createElement("p");
                translate.innerText = data[key].ru;
                word.after(translate);
            const clickCount = document.createElement("p");
                clickCount.innerText = data[key].clickCount;
                translate.after(clickCount);
            const rigth = document.createElement("p");
                rigth.innerText = data[key].rigth;
                clickCount.after(rigth);  
            const wrong = document.createElement("p");
                wrong.innerText = data[key].wrong;
                rigth.after(wrong);     
        return wordStatistic;
    }

    createwordConteiner(){
        const categories = document.querySelectorAll(".stat-category");
        for (const key in this.data) {
            const word = this.createWordStatistic(this.data, key);
                categories.forEach(category =>{
                    if(category.dataset.category === this.data[key].category){
                        category.after(word);
                    }
                });
        }
    }

    createResetButton(root){
        const resetButton = document.createElement("button");
            resetButton.classList.add("reset-button");
            resetButton.innerText = "clear statistics";
            root.append(resetButton);
            resetButton.addEventListener("click", ()=>{
                localStorage.clear();
                this.setData(this.clearData);
                const newTemplate = this.createStatisticTemplate();
                    document.querySelector("#root").append(newTemplate);
                    this.createwordConteiner();
            })
    }

    clearStatisticTemplate(){
        if(document.querySelector(".statistic-conteiner")){
            document.querySelector(".statistic-conteiner").remove();
        };
    }
}


