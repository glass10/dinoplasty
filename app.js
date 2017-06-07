const app = {
    init(selectors){
        this.dinos = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector);
        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit", this.addDino.bind(this));
    },

    addDino(ev){
        ev.preventDefault();
        const dino = {
            id: ++this.max,
            name: ev.target.dinoName.value,
            star: false
        }
        const listItem = this.renderListItem(dino);
        this.list.appendChild(listItem);
        this.dinos.unshift(dino);
        console.log(this.dinos[0].name);
    },

    renderListItem(dino){
        const idLabel = dino.name+"-label";
        const html = `
                <span class="input-group-label" id="${idLabel}">${dino.name}</span>
                <div class="input-group-button" id="${dino.name}">
                    <input type="button" id="up" class="button" onClick=app.up(this.parentNode.id) value="↑">
                    <input type="button" id="down" class="button" onClick=app.down(this.parentNode.id) value="↓">
                    <input type="button" id="star" class="success button" onClick=app.star(this.parentNode.id) value="★">
                    <input type="button" id="delete" class="alert button" onClick=app.delete(this.parentNode.id) value="✗">
                </div>
        `
        const item = document.createElement('li');
        item.innerHTML = html;
        return item;
    },

    up(id){
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                // this.dinos[i].star = true;

            }
        }
    },

    down(id){
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                // this.dinos[i].star = true;

            }
        }
    },
    star(id){
        const idLabel = id+"-label";
        const label = document.getElementById(idLabel);
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                if(this.dinos[i].star){
                    this.dinos[i].star = false;
                    label.style.backgroundColor = "LightGray";
                }
                else{
                    this.dinos[i].star = true;
                    label.style.backgroundColor = "Gold";
                }
            }
        }
    },
    delete(id){
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                // this.dinos[i].star = true;

            }
        }
    },

}
app.init({
        formSelector: "#dino-form",
        listSelector: "#dino-list",
    });