
export default class {

    questions: Types.Question[];
    private _available: number[] = Array.from(Array(50).keys());

    constructor(questions: Types.Question[]) {
        this.questions = (questions || []).map((question: Types.Question, index) => {
            question.index = index;
            question.displayText = this.htmlEncode(question.question);
            question.correct_answer = this.htmlEncode(question.correct_answer);
            question.options = question.type === 'boolean' ? ['True', 'False'] :[question.correct_answer].concat(question.incorrect_answers || []).map(text => this.htmlEncode(text));
            if (question.type !== 'boolean') {
              question.options.sort();
            }
            return question;
        });
        this.available = [];
    }

    get available() {
        return this._available;
    }

    set available(nums: number[]) {
        let available = nums.filter(num => !this._available.includes(num));
        this._available = this._available.concat(available);
    }

    getRandomQuestion() {
        if (!this._available.length) {
            this.available = Array.from(Array(50).keys());
        }
        let availableIndex = Math.floor(Math.random()*(this.available.length - 1));
        let index = this.available[availableIndex];
        let question = this.questions[index];
        this.available.splice(availableIndex, 1);
        return question;
    }

    get(index: any) {
        return this.questions[index];
    }

    htmlEncode = (input: string) => {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : (e.childNodes[0].nodeValue || '').toString();
    }
}

