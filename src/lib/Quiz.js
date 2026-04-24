//quiz
class Quiz {
    #questions;

    constructor(questions){
        this.#questions = questions;
    }

    get_questions(){
        return this.#questions;
    }
}

//abstract, parent question class
class Question {
    constructor(text) {
        this.text = text;
    }

    //polymorphism
    get_UI_info() {
        throw new Error("Method 'get_UI_info()' must be implemented.");
    }
}

//child class, inheritance
class MultChoiceQuestion extends Question {
    constructor(text, options, feature) {
        super(text);
        this.feature = feature;
        this.options = options;
    }

    //returns object to be used to create filter UI object for query generation
    //polymorphism
    get_UI_info() {
        return {
            text: this.text,
            options: this.options
        };
    }
}

//child class, inheritance
class BudgetQuestion extends Question {
    constructor(text, minBudget) {
        super(text);
        this.minBudget = minBudget;
    }

    //returns object to be used to create filter UI object for query generation
    //polymorphism
    get_UI_info() {
        return {
            text: this.text,
            minBudget: this.minBudget
        };
    }
}

export { Quiz, Question, MultChoiceQuestion, BudgetQuestion };
