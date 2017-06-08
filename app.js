const app = {
    init(selectors){
        this.dinos = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector);
        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit", this.addDino.bind(this))

        app.list.innerHTML = "";

        for(var j = 0; j < localStorage.length; j++){
            //localStorage.g
            this.dinos[j] = JSON.parse(localStorage.getItem(localStorage.key(j)));
            //const listItem = this.renderListItem(this.dinos[j]);
            //this.list.appendChild(listItem);
        }
        for(var j = 0; j < this.dinos.length; j++){
                    const temp = JSON.parse(localStorage.getItem(this.dinos[j].name));
                    if(j === 0){
                        this.dinos[j].first = true;
                            temp.first = true;
                    }
                    else{
                        this.dinos[j].first = false;
                            temp.first = false;
                    }
                    if(j === this.dinos.length-1){
                        this.dinos[j].last = true;
                            temp.last = true;
                    }
                    else{
                        this.dinos[j].last = false;
                            temp.last = false;
                    }
                    localStorage.setItem(this.dinos[j].name, JSON.stringify(temp));
                    const listItem = this.renderListItem(this.dinos[j]);
                    this.list.appendChild(listItem);
                }
        console.log(this.dinos[0].name);
    },

    addDino(ev){
        ev.preventDefault();

        const dino = {
            id: ++this.max,
            name: ev.target.dinoName.value,
            star: false,
            first: false,
            last: false

        }
        this.dinos.unshift(dino);
        localStorage.setItem(dino.name, JSON.stringify(dino));

        app.list.innerHTML = "";

        for(var j = 0; j < this.dinos.length; j++){
            this.dinos[j].id = j;
            const temp = JSON.parse(localStorage.getItem(dino.name));
            temp.id = j;

            if(j === 0){
                this.dinos[j].first = true;
                    temp.first = true;
            }
            else{
                this.dinos[j].first = false;
                    temp.first = false;
            }
            if(j === this.dinos.length-1){
                this.dinos[j].last = true;
                    temp.last = true;
            }
            else{
                this.dinos[j].last = false;
                    temp.last = false;
            }

            localStorage.setItem(dino.name, JSON.stringify(temp));
            const listItem = this.renderListItem(this.dinos[j]);
            this.list.appendChild(listItem);
        }
        console.log(this.dinos[0].name);
        ev.target.reset();
    },

    renderListItem(dino){
        let min = 1000;
        let newMax = 0;
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].id < min){
                min = this.dinos[i].id;
            }
            if(this.dinos[i].id > newMax){
                newMax = this.dinos[i].id;
            }
        }

        const idLabel = dino.name+"-label";
        const upLabel = dino.name+"-up";
        const downLabel = dino.name+"-down";
        const starLabel = dino.name+"-star";
        let span = `<span class="input-group-label" id="${idLabel}">${dino.name}</span>`;
        let upButton = `<input type="button" id="${upLabel}" class="button" onClick=app.up(this.parentNode.id) value="↑">`
        let downButton = `<input type="button" id="${downLabel}" class="button" onClick=app.down(this.parentNode.id) value="↓">`
        
        if(dino.star){
            span = `<span class="input-group-label star" id="${idLabel}">${dino.name}</span>`
        }
        if(dino.last){
            downButton = `<input type="button" id="${downLabel}" class="disabled button" onClick=app.down(this.parentNode.id) value="↓">`
        }
        if(dino.first){
            upButton = `<input type="button" id="${upLabel}" class="disabled button" onClick=app.up(this.parentNode.id) value="↑">`
        }

        const html = `
                ${span}
                <div class="input-group-button" id="${dino.name}">
                    ${upButton}
                    ${downButton}
                    <input type="button" id="${starLabel}" class="warning button" onClick=app.star(this.parentNode.id) value="★">
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
            if(this.dinos[i].name === id && i !== 0){
                // if(this.dinos[i].first){
                //     this.dinos[i].first = false;
                // }
                this.dinos.move(this.dinos[i], -1);

                let idTemp = this.dinos[i].id;
                this.dinos[i].id = this.dinos[i-1].id;
                this.dinos[i-1].id = idTemp;

                app.list.innerHTML = "";

                for(var j = 0; j < this.dinos.length; j++){
                    const temp = JSON.parse(localStorage.getItem(this.dinos[j].name));
                    if(j === 0){
                        this.dinos[j].first = true;
                            temp.first = true;
                    }
                    else{
                        this.dinos[j].first = false;
                            temp.first = false;
                    }
                    if(j === this.dinos.length-1){
                        this.dinos[j].last = true;
                            temp.last = true;
                    }
                    else{
                        this.dinos[j].last = false;
                            temp.last = false;
                    }
                    localStorage.setItem(this.dinos[j].name, JSON.stringify(temp));
                    const listItem = this.renderListItem(this.dinos[j]);
                    this.list.appendChild(listItem);
                }
            }
        }
    },

    down(id){
        const downLabel = id+"-down";
        const button = document.getElementById(downLabel);
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id && i !== this.dinos.length-1){
                this.dinos.move(this.dinos[i], 1);
                
                let idTemp = this.dinos[i].id;
                this.dinos[i].id = this.dinos[i+1].id;
                this.dinos[i+1].id = idTemp;

                app.list.innerHTML = "";

                for(var j = 0; j < this.dinos.length; j++){
                    const temp = JSON.parse(localStorage.getItem(this.dinos[j].name));
                    if(j === 0){
                        this.dinos[j].first = true;
                            temp.first = true;
                    }
                    else{
                        this.dinos[j].first = false;
                            temp.first = false;
                    }
                    if(j === this.dinos.length-1){
                        this.dinos[j].last = true;
                            temp.last = true;
                    }
                    else{
                        this.dinos[j].last = false;
                            temp.last = false;
                    }
                    localStorage.setItem(this.dinos[j].name, JSON.stringify(temp));
                    const listItem = this.renderListItem(this.dinos[j]);
                    this.list.appendChild(listItem);
                }
                break;
            }
        }
    },
    star(id){
        const idLabel = id+"-label";
        const starLabel = id+"-star";
        const label = document.getElementById(idLabel);
        const button = document.getElementById(starLabel);
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                if(this.dinos[i].star){
                    this.dinos[i].star = false;
                    label.style.backgroundColor = "LightGray";

                    const temp = JSON.parse(localStorage.getItem(id));
                    temp.star = false;
                    localStorage.setItem(id, JSON.stringify(temp));
                }
                else{
                    this.dinos[i].star = true;
                    label.style.backgroundColor = "Gold";
                    button.className += " select";

                    const temp = JSON.parse(localStorage.getItem(id));
                    temp.star = true;
                    localStorage.setItem(id, JSON.stringify(temp));
                }
            }
        }
    },
    delete(id){
        for(var i = 0; i < this.dinos.length; i++){
            if(this.dinos[i].name === id){
                this.dinos.splice(i, 1);
                localStorage.removeItem(id);
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