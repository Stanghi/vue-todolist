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
                done: false
            }
        ]
    }

}, // end data

methods: {

    removeTask(index){
        this.errorString = '';

        if (this.tasks[index].done){
            this.tasks.splice(index,1);
        }
        else {
            this.errorString = 'Attenzione! Non si può eliminare il task se non è stato ancora fatto.';
        }
    },

    createTask(){
        this.errorString = '';

        for (i in this.tasks){
            if (this.newMsgString === this.tasks[i].text){
                this.errorString = 'Attenzione! il task è già presente nella tua to-do list.';
                this.newMsgString = '';
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
    }

} // end methods

}).mount('#app')