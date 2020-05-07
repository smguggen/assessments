import React, { Component } from 'react';
import API from './services/dateAPI';
import DateButton from './components/DateButton';
import DateDisplay from './components/DateDisplay';

class App extends Component {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state= {
      'apiResponse': ''
    };
  }
  
  handleButtonClick = () => {
    API.getAPIResponse().then((res) => {
        this.setState((prevProps, prevState) => {
            let r = JSON.stringify(res.data);
            if (r !== prevState.apiResponse) {
                return {
                    apiResponse: r
                }
            }
        })
    });
  }

  render() {
    return (
      <div>
        <center><h1>Date API</h1></center>
        <center><DateButton onClickButton={this.handleButtonClick}></DateButton></center>
        <DateDisplay apiresponse={ this.state.apiResponse }></DateDisplay>
      </div>
    );
  }
}

export default App;
