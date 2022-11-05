const { createApp } = Vue;

createApp({

data() {

    return{
        errorString: '',
        newMsgString: '',
        upHere: false,
        counter: 0,
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

    toggleTaskDone(i){
        this.tasks[i].done = !this.tasks[i].done;
        if (this.tasks[i].done){
            this.counter++;
        }
        else{
            this.counter--
        }
    },

    removeTask(index){
        this.errorString = '';

        if (this.tasks[index].done) {
            this.tasks.splice(index,1);
            this.counter--;
        }
        else this.errorString = 'Attention! You cannot delete the task if it has not already been done.'
    },
    
    createTask(){
        this.errorString = '';

        for (i in this.tasks){
            if (this.newMsgString === this.tasks[i].text){
                this.errorString = 'Attention! the task is already in your list.';
                this.newMsgString = '';
                return;
            }
        }

        if (this.newMsgString.length < 5){
            this.errorString = 'Attention! The task must have at least 5 characters.';
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
        this.tasks = this.tasks.filter((item) => !item.done);
        this.counter = 0;
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
    },

} // end methods

}).mount('#app')