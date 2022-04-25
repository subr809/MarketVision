import React from "react";
import { Button } from "semantic-ui-react";

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            colorBlindDisplay: false,
        }
    }

    ToggleButton() {
        this.setState((currentState) => ({
            colorBlindDisplay: currentState.colorBlindDisplay,
        }));
    }

    render() {
        return(
            <div>
                <Button onClick={() => this.ToggleButton()}>
                    Color
                </Button>
                {!this.state.colorBlindDisplay}
            </div>
        )
    }
}

export default ToggleButton;