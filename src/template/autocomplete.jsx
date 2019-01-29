import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";


class Autocomplete extends Component {

    static propTypes = {
        suggestions: PropTypes.instanceOf(Object)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",
            
            airports: {}
        };
    }


    // Event fired when the input value is changed
    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = Object.keys(suggestions).filter(key => key
							.toLowerCase()
              .indexOf(userInput.toLowerCase()) > -1);

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            airports: suggestions,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });

    };

  verifyValues = (liValue, suggestions) => {
    var resp = ''
    suggestions.forEach((suggestion) => {
      if(liValue.includes(suggestion)){
        resp = suggestion 
      }
    })

    return resp;
  }

    // Event fired when the user clicks on a suggestion
    onClick = e => {
      const liValue = e.currentTarget.innerText 
      this.props.handleClick(this.verifyValues(liValue, this.state.filteredSuggestions));

      this.setState({
          activeSuggestion: 0,
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: e.currentTarget.innerText,
        });
       
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput,
                airports
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;


                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {`${airports[suggestion][0]} - ${airports[suggestion][1]} (${airports[suggestion][2]})`}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }

        return (
            <Fragment>
                <input
                    className={this.props.error ? 'airportInputError' : ''}
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete