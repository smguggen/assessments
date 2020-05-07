import * as React from 'react';

export default class extends React.Component<Types.Results> {

    state: any = {
        score: this.props.score.toString() + '%'
    }

    style: any = {
        listStyleType:'none',
        padding:0,
        marginTop:0
    }

    render() {
        return (
            <>
                <h2 className="question-text">SUMMARY</h2>
                <ul className="survey-results">
                    <li>Correct: <strong>{this.props.correct}</strong></li>
                    <li>Wrong: <strong>{this.props.incorrect}</strong></li>
                    <li>Questions Answered: <strong>{this.props.answered}</strong></li>
                    <li>Final Score: <strong>{this.state.score}</strong></li>
                </ul>
            </>
        );
    }
}
