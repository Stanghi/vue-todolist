const { createApp } = Vue;

createApp({

data() {

    return{
        errorString: '',
        newMsgString: '',
        changeText: '',
        newLabelString: '',
        showLabelInput: false,
        showChangeTask: false,
        counter: 0,
        tasks: [
            {
                text: 'Stendere i panni',
                done: false,
                label: '',
                secondary: false
            },
            {
                text: 'Studiare Vue.js',
                done: false,
                label: '',
                secondary: false
            },
            {
                text: 'Chiamare Veterinario',
                done: false,
                label: '',
                secondary: false
            }
        ]
    }

}, // end data

methods: {

    toggleTaskDone(i){
        /*!this.tasks[i].done ? this.counter++ : this.counter--;*/

        if (this.tasks[i].secondary) {
            this.tasks[i].done = !this.tasks[i].done;
            if (this.tasks[i].done) {
                let allDone = false;
                let j = 0;
                while (this.tasks[i+j]?.secondary) {
                    if (this.tasks[i+j].done) {
                        allDone = true;
                        j++;
                    }
                    else{
                        allDone = false;
                        break;
                    }
                }
                if (allDone) {
                    let j = 1;
                    while (this.tasks[i-j].secondary) {
                        if (this.tasks[i-j].done) {
                            allDone = true;
                            j++;
                        }
                        else{
                            allDone = false;
                            break;
                        }
                    }
                    if (allDone) {
                        this.tasks[i-j].done = true;
                    }
                }
            }
            else{
                let j = 1;
                while (this.tasks[i-j].secondary) {
                    j++;
                }
                this.tasks[i-j].done = false;
            }
        }
        else {
            this.tasks[i].done = !this.tasks[i].done;

            if (this.tasks[i].done) {
                let j = 1;
                while (this.tasks[i+j]?.secondary) {
                    this.tasks[i+j].done = true;
                    j++;
                    //this.counter++;
                }
            }
            else {
                let j = 1;
                while (this.tasks[i+j]?.secondary) {
                    this.tasks[i+j].done = false;
                    j++;
                    //this.counter--;
                }
            }
        }

    },

    removeTask(index){
        this.errorString = '';

        if (this.tasks[index].done) {
            this.tasks.splice(index,1);
            //this.counter--;
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
                done: false,
                label: ''
            }
            this.tasks.unshift(newTask);
            this.newMsgString = '';
        }
    },

    changeTask(i){
        if (this.tasks[i].text !== ''){
            if (this.changeText.length > 5){
                this.tasks[i].text = this.changeText;
                this.changeText = '';
            }
            else {
                this.errorString = 'Attention! The task must have at least 5 characters.';
                this.changeText = '';
            }
        }
    },

    createLabel(i){
        this.errorString = '';

        if (this.tasks[i].label === this.newLabelString) {
            this.errorString = 'Attention! this task already has this label.';
        }

        if (this.newLabelString.length > 10) {
            this.errorString = 'Attention! the task must have a maximum of 10 characters.';
            this.newLabelString = '';
            return;
        }

        if (this.tasks[i].label === '' && this.newLabelString.length < 10) {
            this.tasks[i].label = this.newLabelString;
            this.newLabelString = '';
        }
        else {
            if (this.tasks[i].label) this.tasks[i].label = this.newLabelString;
        }
        this.newLabelString = '';
    },

    removeLabel(i){
        this.tasks[i].label = '';
    },

    clearAll(){
        this.tasks = [];
    },

    clearAllDone(){
        this.tasks = this.tasks.filter((item) => !item.done);
        //this.counter = 0;
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

    setSecondaryTask(i){
        if (!this.tasks[i].secondary) this.tasks[i].secondary = true;
        else this.tasks[i].secondary = false;
    }

} // end methods

}).mount('#app')