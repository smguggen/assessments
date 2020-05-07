import * as React from 'react';
import Questions from '../lib/questions';
import InputGroup from './InputGroup';
import Results from './Results';
import 'whatwg-fetch';

export default class extends React.Component {
    private defaultQuizLength = 10;
    constructor(props:any) {
        super(props);
        this.updateQuizLength = this.updateQuizLength.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    questions: Questions | null = null;

    state: Types.QuestionState = {
        index: '',
        type: '',
        correct_answer: '',
        displayText:'',
        options:[],
        counter: 0,
        correct:0,
        incorrect:0,
        answered:0,
        score: 0,
        quizLength:this.defaultQuizLength,
        isFinished:false,
        value:null
    }

    componentDidMount() {
        let $this = this;
        fetch('http://localhost:4000/api/questions').then((response) => {
          return response.json();
        }).then((result) => {
            let res = result && result.results ? result.results : [];
            $this.questions = new Questions(res);
            $this.getQuestion();
        
        });
    }

    setValue(event:any) {
      this.setState({
        value:event.target.value
      });
      if (event && event.keyCode && event.keyCode === 13) {
          let el = document.getElementById('submit');
          if (el) {  
            el.click();
          }
      } 
    }

    getQuestion = () => {
        let els = document.getElementsByName(this.state.index);
        if (els && els.length) {
            for (let i = 0; i < els.length;i++) {
                let el = els[i];
                if (el instanceof HTMLInputElement) {
                    if (el.type === 'text') {
                        el.value = '';
                    } else if (el.type === 'radio') {
                        el.checked = false;
                    }
                }
            }
        }
        if (this.questions && this.questions.questions.length) {
            let quizLength = this.getQuizLength(this.state.quizLength);
            if (this.state.counter >= quizLength) {
                this.endQuiz();
            } else {
                let question = this.questions.getRandomQuestion();
                if (question) {
                    this.setState((oldState: Types.QuestionState, props) => {
                        return {
                            index: question.index,
                            type: question.type,
                            correct_answer: question.correct_answer,
                            displayText:question.displayText,
                            options:question.options,
                            counter: oldState.counter + 1,
                            value: null
                        }
                    });
                }
            }
        }
    }

    startQuiz() {
        this.setState({
            isFinished:false,
            counter:0,
            correct:0,
            incorrect:0,
            answered:0,
            score:0
        }, this.getQuestion);
    }

    endQuiz() {
        this.setState({
            isFinished:true
        })
    }

    handleButtonClick(e: any) {
      if (e.target.id !== 'submit') {
          return;
      }
      if (this.state.isFinished) {
          this.startQuiz();
      } else {
        let value = this.state.value;
        if (!value) {
            alert('Please Answer Question Before Proceeding');
        } else {
            let isCorrect = value.toString().toLowerCase() === this.state.correct_answer.toString().toLowerCase();
            this.setState((oldState:Types.QuestionState, props) => {
                let correct = isCorrect ? oldState.correct + 1 : oldState.correct;
                let incorrect = !isCorrect ? oldState.incorrect + 1 : oldState.incorrect;
                let answered = oldState.answered + 1;
                let score = Math.round((correct/answered)*100);
                return {
                    correct:correct,
                    incorrect:incorrect,
                    answered:answered,
                    score: score
                }
            });
            this.getQuestion();
        }
      }
    }

    getBody() {
        if (this.state.isFinished) {
            return (<Results
                correct={this.state.correct}
                incorrect={this.state.incorrect}
                answered={this.state.answered}
                score={this.state.score} />)
        } else {
            return (<InputGroup
                name={this.state.index}
                type={this.state.type}
                questionText={this.state.displayText}
                options={this.state.options}
                onChange={this.setValue}
            />)
        }
    }

    updateQuizLength(e:any) {
        let len = e.target.value;
        let max = this.questions && this.questions.questions ? this.questions.questions.length : 50;
        if (len > max) {
            len = max;
        }
        this.setState({
            quizLength:len
        })
    }

    getQuizLength(len:any) {
        let newLen = len > 0 ? len : this.defaultQuizLength;
        if (newLen !== len) {
            this.setState({
                quizLength: newLen
            });
        }
        return newLen;
    }

    preventSubmit(e:any) {
        e.preventDefault();
    }

    render() {
        return (
            <form className="question-container" onSubmit={this.preventSubmit}>
                <div className="question-header">
                    <span>Question {this.state.counter}</span>
                    <div>
                        <span>Quiz Length: </span>
                        <input style={{width:'32px', marginLeft:'5px', padding:'2px', fontSize:'16px'}} type="number" name="quizLength" value={this.state.quizLength} onChange={this.updateQuizLength}/>
                    </div>
                </div>
                {this.getBody()}
                <button
                    id="submit"
                    type="button"
                    onClick={this.handleButtonClick}
                    className="submit-button">
                    {this.state.isFinished ? 'Restart Quiz' : 'Next'}
                </button>
            </form>
        );
    }
}
