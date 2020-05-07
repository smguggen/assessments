import * as React from 'react';

export default class extends React.Component<Types.InputProps> {

    getOptions() {
      if (this.props.type === 'text') {
        return (
            <div>
                <input type='text'
                    name={this.props.name}
                    placeholder={this.props.placeholder || 'Answer Here'}
                    className="text-input" 
                    onKeyUp={this.props.onChange}/>
            </div>
          );
      } else {
        return this.props.options.map((option:any, index:number) => 
            (<div key={index}>
                <input type="radio" 
                  name={this.props.name} 
                  className="radio-input" 
                  value={option}
                  onClick={this.props.onChange}
                />
                <label className="radio-label">{option}</label>
            </div>)
        );
      }
    }

    render() {
        return (
            <div>
              <h2 className="question-text">{this.props.questionText}</h2>
              <div className="input-group">
                <div className="input-container">
                    {this.getOptions()}
                </div>
              </div>
            </div>
        );
    }
}
