const app = {
    init(selectors){
        this.dinos = []
        this.herbs = [];
        this.carns= [];
        this.omnis = [];
        this.max = 0;
        this.herb = document.querySelector(selectors.herbSelector);
        this.carn = document.querySelector(selectors.carnSelector);
        this.omni = document.querySelector(selectors.omniSelector);
        this.search = document.querySelector(selectors.searchSelector);

        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit", this.addDino.bind(this))

        app.herb.innerHTML = "";
        app.carn.innerHTML = "";
        app.omni.innerHTML = "";
        app.search.innerHTML = "";

        if(localStorage.getItem("herbs") !== null){
            this.herbs = JSON.parse(localStorage.getItem("herbs"));
            if(this.herbs.length > 0)
                document.getElementById("HerbH3").className = "visible";
        }
        if(localStorage.getItem("carns") !== null){
            this.carns = JSON.parse(localStorage.getItem("carns"));
            if(this.carns.length > 0)
                document.getElementById("CarnH3").className = "visible";
        }
        if(localStorage.getItem("omnis") !== null){
            this.omnis = JSON.parse(localStorage.getItem("omnis"));
            if(this.omnis.length > 0)
                document.getElementById("OmniH3").className = "visible";
        }

        app.loopHerb();
        app.loopCarn();
        app.loopOmni();

    },

    addDino(ev){
        ev.preventDefault();

        const dino = {
            id: ++this.max,
            name: ev.target.dinoName.value,
            fact: ev.target.dinoFact.value,
            star: false,
            first: false,
            last: false

        }

        if(dino.fact === "Herbivore"){
            if(this.herbs.length >= 0){
                document.getElementById("HerbH3").className = "visible";
            }
            this.herbs.unshift(dino);
            localStorage.setItem("herbs", JSON.stringify(this.herbs));
        }
        else if(dino.fact === "Carnivore"){
            if(this.carns.length >= 0){
                document.getElementById("CarnH3").className = "visible";
            }
            this.carns.unshift(dino);
            localStorage.setItem("carns", JSON.stringify(this.carns));
        }
        else{
            if(this.omnis.length >= 0){
                document.getElementById("OmniH3").className = "visible";
            }
            this.omnis.unshift(dino);
            localStorage.setItem("omnis", JSON.stringify(this.omnis));
        }

        app.herb.innerHTML = "";
        app.carn.innerHTML = "";
        app.omni.innerHTML = "";

        app.loopHerb();
        app.loopCarn();
        app.loopOmni();

        ev.target.reset();
    },

    renderListItem(dino){
        const idLabel = dino.name+"-label";
        const upLabel = dino.name+"-up";
        const downLabel = dino.name+"-down";
        const starLabel = dino.name+"-star";
        let span = `<span class="input-group-label" id="${idLabel}" contenteditable="true">${dino.name}</span>`;
        let upButton = `<input type="button" id="${upLabel}" class="button" onClick=app.up(this.parentNode.id) value="⬆">`
        let downButton = `<input type="button" id="${downLabel}" class="button" onClick=app.down(this.parentNode.id) value="⬇">`
        let starButton = `<input type="button" id="${starLabel}" class="warning button" onClick=app.star(this.parentNode.id) value="★">`
        let dinoFact = `<span class="dino-fact">${dino.fact}</span>`
        
        if(dino.star){
            span = `<span class="input-group-label star" id="${idLabel}" contenteditable="true">${dino.name}</span>`
            starButton = `<input type="button" id="${starLabel}" class="warning button select" onClick=app.star(this.parentNode.id) value="★">`
        }
        if(dino.last){
            downButton = `<input type="button" id="${downLabel}" class="disabled button" onClick=app.down(this.parentNode.id) value="⬇">`
        }
        if(dino.first){
            upButton = `<input type="button" id="${upLabel}" class="disabled button" onClick=app.up(this.parentNode.id) value="⬆">`
        }

        const html = `
                ${span}
                <div class="input-group-button" id="${dino.name}">
                    ${dinoFact}
                    ${upButton}
                    ${downButton}
                    ${starButton}
                    <input type="button" id="delete" class="alert button" onClick=app.delete(this.parentNode.id) value="✗">
                </div>
        `

        const item = document.createElement('li');
        item.innerHTML = html;
        return item;
    },
    renderSearchItem(dino){
        const idLabel = dino.name+"-searchlabel";
        let span = `<span class="input-group-label" id="${idLabel}">${dino.name}</span>`;
        let dinoFact = `<span class="dino-fact">${dino.fact}</span>`

        const html = `
                <div class="input-group">
                ${span}
                ${dinoFact}
                </div>
        `

        const item = document.createElement('li');
        item.innerHTML = html;
        return item;
    },

    up(id){
        const upLabel = id+"-up";
        const button = document.getElementById(upLabel);
        for(var i = 0; i < this.herbs.length; i++){
            if(this.herbs[i].name === id && i !== 0){
                this.herbs.move(this.herbs[i], -1);

                let idTemp = this.herbs[i].id;
                this.herbs[i].id = this.herbs[i-1].id;
                this.herbs[i-1].id = idTemp;

                localStorage.setItem("herbs", JSON.stringify(this.herbs));
            }
        }
        for(var i = 0; i < this.carns.length; i++){
            if(this.carns[i].name === id && i !== 0){
                this.carns.move(this.carns[i], -1);

                let idTemp = this.carns[i].id;
                this.carns[i].id = this.carns[i-1].id;
                this.carns[i-1].id = idTemp;

                localStorage.setItem("carns", JSON.stringify(this.carns));
            }
        }
        for(var i = 0; i < this.omnis.length; i++){
            if(this.omnis[i].name === id && i !== 0){
                this.omnis.move(this.omnis[i], -1);

                let idTemp = this.omnis[i].id;
                this.omnis[i].id = this.omnis[i-1].id;
                this.omnis[i-1].id = idTemp;

                localStorage.setItem("omnis", JSON.stringify(this.omnis));
            }
        }
                app.herb.innerHTML = "";
                app.carn.innerHTML = "";
                app.omni.innerHTML = "";

                app.loopHerb();
                app.loopCarn();
                app.loopOmni();
    },

    down(id){
        const downLabel = id+"-down";
        const button = document.getElementById(downLabel);
        for(var i = 0; i < this.herbs.length; i++){
            if(this.herbs[i].name === id && i !== this.herbs.length-1){
                this.herbs.move(this.herbs[i], 1);

                let idTemp = this.herbs[i].id;
                this.herbs[i].id = this.herbs[i+1].id;
                this.herbs[i+1].id = idTemp;

                localStorage.setItem("herbs", JSON.stringify(this.herbs));
                break;
            }
        }
        for(var i = 0; i < this.carns.length; i++){
            if(this.carns[i].name === id && i !== this.carns.length -1){
                this.carns.move(this.carns[i], 1);

                let idTemp = this.carns[i].id;
                this.carns[i].id = this.carns[i+1].id;
                this.carns[i+1].id = idTemp;

                localStorage.setItem("carns", JSON.stringify(this.carns));
                break;
            }
        }
        for(var i = 0; i < this.omnis.length; i++){
            if(this.omnis[i].name === id && i !== this.omnis.length-1){
                this.omnis.move(this.omnis[i], 1);

                let idTemp = this.omnis[i].id;
                this.omnis[i].id = this.omnis[i+1].id;
                this.omnis[i+1].id = idTemp;

                localStorage.setItem("omnis", JSON.stringify(this.omnis));
                break;
            }
        }
                app.herb.innerHTML = "";
                app.carn.innerHTML = "";
                app.omni.innerHTML = "";

                app.loopHerb();
                app.loopCarn();
                app.loopOmni();
    },
    star(id){
        const idC = id;
        const idLabel = id+"-label";
        const starLabel = id+"-star";
        const label = document.getElementById(idLabel);
        const button = document.getElementById(starLabel);

        for(var i = 0; i < this.herbs.length; i++){
            if(this.herbs[i].name === id){
                if(this.herbs[i].star){
                    this.herbs[i].star = false;
                    label.style.backgroundColor = "LightGray";
                    button.className = "warning button warning"
                    localStorage.setItem("herbs", JSON.stringify(this.herbs));
                }
                else{
                    this.herbs[i].star = true;
                    label.style.backgroundColor = "Gold";
                    button.className += " select";

                    localStorage.setItem("herbs", JSON.stringify(this.herbs));
                }
            }
        }
        for(var i = 0; i < this.carns.length; i++){
            if(this.carns[i].name === id){
                if(this.carns[i].star){
                    this.carns[i].star = false;
                    label.style.backgroundColor = "LightGray";
                    button.className = "warning button warning"
                    localStorage.setItem("carns", JSON.stringify(this.carns));
                }
                else{
                    this.carns[i].star = true;
                    label.style.backgroundColor = "Gold";
                    button.className += " select";

                    localStorage.setItem("carns", JSON.stringify(this.carns));
                }
            }
        }
        for(var i = 0; i < this.omnis.length; i++){
            if(this.omnis[i].name === id){
                if(this.omnis[i].star){
                    this.omnis[i].star = false;
                    label.style.backgroundColor = "LightGray";
                    button.className = "warning button warning"
                    localStorage.setItem("omnis", JSON.stringify(this.omnis));
                }
                else{
                    this.omnis[i].star = true;
                    label.style.backgroundColor = "Gold";
                    button.className += " select";

                    localStorage.setItem("omnis", JSON.stringify(this.omnis));
                }
            }
        }
    },
    delete(id){
        for(var i = 0; i < this.herbs.length; i++){
            if(this.herbs[i].name === id){
                this.herbs.splice(i, 1);
                localStorage.setItem("herbs", JSON.stringify(this.herbs))
                if(this.herbs.length === 0){
                    document.getElementById("HerbH3").className = "hidden";
                }
            }
        }
        for(var i = 0; i < this.carns.length; i++){
            if(this.carns[i].name === id){
                this.carns.splice(i, 1);
                localStorage.setItem("carns", JSON.stringify(this.carns))
                if(this.carns.length === 0){
                    document.getElementById("CarnH3").className = "hidden";
                }
            }
        }
        for(var i = 0; i < this.omnis.length; i++){
            if(this.omnis[i].name === id){
                this.omnis.splice(i, 1);
                localStorage.setItem("omnis", JSON.stringify(this.omnis))
                if(this.omnis.length === 0){
                    document.getElementById("OmniH3").className = "hidden";
                }
            }
        }
        app.herb.innerHTML = "";
        app.carn.innerHTML = "";
        app.omni.innerHTML = "";

        app.loopHerb();
        app.loopCarn();
        app.loopOmni();
    },
    edit(){
        //console.clear(); 
        for(var i = 0; i < this.herbs.length; i++){
            const name = this.herbs[i].name;
            const label = name+"-label";
            const div = document.getElementById(name);
            const labelObj = document.getElementById(label);
            const text = labelObj.textContent;

            this.herbs[i].name = text;
            div.id = text;
        }
        localStorage.setItem("herbs", JSON.stringify(this.herbs));

        for(var i = 0; i < this.carns.length; i++){
            const name = this.carns[i].name;
            const label = name+"-label";
            const div = document.getElementById(name);
            const labelObj = document.getElementById(label);
            const text = labelObj.textContent;

            this.carns[i].name = text;
            div.id = text;
        }
        localStorage.setItem("carns", JSON.stringify(this.carns));

        for(var i = 0; i < this.omnis.length; i++){
            const name = this.omnis[i].name;
            const label = name+"-label";
            const div = document.getElementById(name);
            const labelObj = document.getElementById(label);
            const text = labelObj.textContent;

            this.omnis[i].name = text;
            div.id = text;
        }
        localStorage.setItem("omnis", JSON.stringify(this.omnis));
    },
    loopHerb(){
        for(var j = 0; j < this.herbs.length; j++){
            if(j === 0){
                this.herbs[j].first = true;
            }
            else{
                this.herbs[j].first = false;
            }
            if(j === this.herbs.length-1){
                this.herbs[j].last = true;
            }
            else{
                this.herbs[j].last = false;
            }

            localStorage.setItem("herbs", JSON.stringify(this.herbs));
            const listItem = this.renderListItem(this.herbs[j]);
            this.herb.appendChild(listItem);     
        }
    },
    loopCarn(){
        for(var j = 0; j < this.carns.length; j++){
                    
            if(j === 0){
                this.carns[j].first = true;
            }
            else{
                this.carns[j].first = false;
            }
            if(j === this.carns.length-1){
                this.carns[j].last = true;
            }
            else{
                this.carns[j].last = false;
            }

            localStorage.setItem("carns", JSON.stringify(this.carns));
            const listItem = this.renderListItem(this.carns[j]);
            this.carn.appendChild(listItem);
        }
    },
    loopOmni(){
        for(var j = 0; j < this.omnis.length; j++){
                    
            if(j === 0){
                this.omnis[j].first = true;
            }
            else{
                this.omnis[j].first = false;
            }
            if(j === this.omnis.length-1){
                this.omnis[j].last = true;
            }
            else{
                this.omnis[j].last = false;
            }

            localStorage.setItem("omnis", JSON.stringify(this.omnis));
            const listItem = this.renderListItem(this.omnis[j]);
            this.omni.appendChild(listItem);
        }
    },
    searchLists(){
        const textObj = document.getElementById("searchText");
        const text = textObj.value;
        document.getElementById("SearchH3").textContent = `Search Results for "${text}"    `
        document.getElementById("SearchH3").className = "visible";
        console.log("Search: " + text);
        if(text !== ""){
            document.getElementById("searchButton").className = "button";
            app.search.innerHTML = "";
            for(var i = 0; i < this.herbs.length; i++){
                if(this.herbs[i].name.includes(text)){
                    const listItem = this.renderSearchItem(this.herbs[i]);
                    this.search.appendChild(listItem);
                }
            }
            for(var i = 0; i < this.carns.length; i++){
                if(this.carns[i].name.includes(text)){
                    const listItem = this.renderSearchItem(this.carns[i]);
                    this.search.appendChild(listItem);
                }
            }
            for(var i = 0; i < this.omnis.length; i++){
                if(this.omnis[i].name.includes(text)){
                    const listItem = this.renderSearchItem(this.omnis[i]);
                    this.search.appendChild(listItem);
                }
            }
            const length = document.getElementById("search-list").getElementsByTagName("li").length;
            if(length === 0){
                app.search.innerHTML = "<center><span>No results found</span></center>"
            }
        }
        else{
            app.search.innerHTML = "<center><span>No results found</span></center>"
        }

    },
    deleteSearch(){
        document.getElementById("searchButton").className = "button hidden";
        document.getElementById("SearchH3").className = "hidden";
        app.search.innerHTML = ""
        document.getElementById("searchText").value= "";
    }

}
app.init({
        formSelector: "#dino-form",
        herbSelector: "#herb-list",
        carnSelector: "#carn-list",
        omniSelector: "#omni-list",
        searchSelector: "#search-list"
    });

Array.prototype.move = function (element, offset){
  const index = this.indexOf(element)
  const newIndex = index + offset
  
  if (newIndex > -1 && newIndex < this.length){
    // Remove the element from the array
    const removedElement = this.splice(index, 1)[0]
  
    // At "newIndex", remove 0 elements, insert the removed element
    this.splice(newIndex, 0, removedElement)
  }
}