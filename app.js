const app = {
    init(formSelector){
        this.max = 0;
        document
            .querySelector(formSelector)
            .addEventListener("submit", this.addDino.bind(this));
    },

    addDino(ev){
        ev.preventDefault();
        const dino = {
            id: ++this.max,
            name: ev.target.dinoName.value,
        }
        console.log(dino.name, dino.id);
    }
}
app.init("#dino-form");