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
        this.dinos.unshift(dino);
        app.list.innerHTML = "";

        for(var j = 0; j < this.dinos.length; j++){
            const listItem = this.renderListItem(this.dinos[j]);
            this.list.appendChild(listItem);
        }
        console.log(this.dinos[0].name);
    },

    renderListItem(dino){
        let min = 1000;
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].id < min){
                min = this.dinos[i].id;
            }
        }

        const idLabel = dino.name+"-label";
        const upLabel = dino.name+"-up";
        const downLabel = dino.name+"-down";
        let span = `<span class="input-group-label" id="${idLabel}">${dino.name}</span>`;
        let upButton = `<input type="button" id="${upLabel}" class="button" onClick=app.up(this.parentNode.id) value="↑">`
        let downButton = `<input type="button" id="${downLabel}" class="button" onClick=app.down(this.parentNode.id) value="↓">`
        
        if(dino.star){
            span = `<span class="input-group-label star" id="${idLabel}">${dino.name}</span>`
        }
        if(dino.id === min){
            downButton = `<input type="button" id="${downLabel}" class="disabled button" onClick=app.down(this.parentNode.id) value="↓">`
        }
        if(dino.id === this.max){
            upButton = `<input type="button" id="${upLabel}" class="disabled button" onClick=app.up(this.parentNode.id) value="↑">`
        }

        const html = `
                ${span}
                <div class="input-group-button" id="${dino.name}">
                    ${upButton}
                    ${downButton}
                    <input type="button" id="star" class="success button" onClick=app.star(this.parentNode.id) value="★">
                    <input type="button" id="delete" class="alert button" onClick=app.delete(this.parentNode.id) value="✗">
                </div>
        `

        const item = document.createElement('li');
        item.innerHTML = html;
        return item;
    },

    up(id){
        const upLabel = id+"-up";
        const button = document.getElementById(upLabel);
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                //this.dinos.move(i, i-1);
            }
        }
    },

    down(id){
        const downLabel = id+"-down";
        const button = document.getElementById(downLabel);
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                //this.dinos.move(i, i+1);
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
                this.dinos.splice(i, 1);
                app.list.innerHTML = "";

                for(var j = 0; j < this.dinos.length; j++){
                    const listItem = this.renderListItem(this.dinos[j]);
                    this.list.appendChild(listItem);
                }
            }
        }
    },

}
app.init({
        formSelector: "#dino-form",
        listSelector: "#dino-list",
    });

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};