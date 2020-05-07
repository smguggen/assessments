import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

class DateDisplay extends Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            month: '',
            year: '',
            time: ''
        }
    }
      
    objectify(str) {
        try {
            return JSON.parse(str);
        } catch(e) {
            return {};
        } 
    }
  
    getDateBreakdown(res) {
        if (typeof res === 'string') {
            res = this.objectify(res);
        }
        let fullDate = (res.date + ' ' + res.time).replace(/[AaPp][Mm]/, '').trim();
        let d = new Date(fullDate);
        return {
            day: d.getDate(),
            month: (d.getMonth() + 1),
            year: d.getFullYear(),
            time: d.getTime()
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        let prevInfo = this.getDateBreakdown(prevProps.apiresponse);
        let curInfo = this.getDateBreakdown(this.props.apiresponse);
        if ((curInfo.time !== prevInfo.time)) {
            this.setState((state, props) => {
                return this.getDateBreakdown(props.apiresponse);
            });
        }
    }
    
    render() { 
        return (
            <Paper className="container">
                <List>
                    <ListItem key="day">
                <ListItemText>Day: { this.state.day }</ListItemText>
                </ListItem>
                <ListItem key="month">
        <ListItemText>Month: { this.state.month }</ListItemText>
                </ListItem>
                <ListItem key="year">
        <ListItemText>Year: { this.state.year }</ListItemText>
                </ListItem>
                </List>
            </Paper>
        );
    }
}

DateDisplay.propTypes = {
  apiResponse: PropTypes.string
}

export default DateDisplay;