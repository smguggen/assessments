import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class DateButton extends Component {
    render() {
        return (
            <div className="button-container">
                <Button
                variant="extendedFab"
                onClick={this.props.onClickButton}
                color="primary">
                Display Date
                </Button>
            </div>
        );
    }
}



DateButton.propTypes = {
    onClickButton: PropTypes.func
}

export default DateButton;