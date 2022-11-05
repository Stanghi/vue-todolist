const { createApp } = Vue;

createApp({

data() {

    return{
        errorString: '',
        newMsgString: '',
        tasks: [
            {
                text: 'Stendere i panni',
                done: false
            },
            {
                text: 'Studiare Vue.js',
                done: false
            },
            {
                text: 'Chiamare Veterinario',
                done: true
            }
        ]
    }

}, // end data

methods: {

    removeTask(index){
        this.errorString = '';

        if (this.tasks[index].done) this.tasks.splice(index,1);
        else this.errorString = 'Attenzione! Non si può eliminare il task se non è stato ancora fatto.'
    },
    
    createTask(){
        this.errorString = '';

        for (i in this.tasks){
            if (this.newMsgString === this.tasks[i].text){
                this.errorString = 'Attenzione! il task è già presente nella tua lista.';
                this.newMsgString = '';
                return;
            }
        }

        if (this.newMsgString.length < 5){
            this.errorString = 'Attenzione! Il task deve avere almeno 5 caratteri.';
        }
        else {
            const newTask = {
                text: this.newMsgString,
                done: false
            }
            this.tasks.unshift(newTask);
            this.newMsgString = '';
        }
    },

    clearAll(){
        this.tasks = [];
    },

    clearAllDone(){
        for (i in this.tasks){
            if(this.tasks[i].done) this.tasks.splice();
        }
    },

    moveTask(index, booleanValor){
        if (!booleanValor){
            if (index === this.tasks.length - 1) return;
            [this.tasks[index], this.tasks[index+1]] = [this.tasks[index+1], this.tasks[index]];
        }
        else {
            if (index === 0) return;
            [this.tasks[index], this.tasks[index-1]] = [this.tasks[index-1], this.tasks[index]];
        }
    }

} // end methods

}).mount('#app')