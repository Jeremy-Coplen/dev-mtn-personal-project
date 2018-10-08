import React, { Component } from "react"

class TutorialModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            steps: [
                "Welcome to Get On Track! This tutorial will show you how to use the different parts of the site. Click the next and previous buttons to navigate through the tutorial",
                "The Nav Bar will always be at the top of the screen. The Dashboard button will bring you to your dashboard. The Boards button will bring you to your boards page. The Teams button will bring you to your teams page. The Change Background button will allow you change the background image of the site just enter in an image url. The Tutorial button will open this tutorial whenever you need it. The Logout button will log you out and bring you to the login screen",
                "Enjoy our site"
            ],
            currentStep: 0
        }
    }

    NextStep() {
        this.setState({
            currentStep: this.state.currentStep + 1
        })
    }

    previousStep() {
        this.setState({
            currentStep: this.state.currentStep - 1
        })
    }

    render() {
        console.log(this.state)
        const showHideClassName = this.props.show ? "tutorial_modal_display" : "tutorial_modal_display_none"
        const currentStep = this.state.steps[this.state.currentStep]
        return (
            <div className={showHideClassName}>
                <div className="tutorial_modal_content">
                    <div className="close_button" onClick={() => this.props.updateShow()}>X</div>
                    <div className="tutorial_content">
                        <p>{currentStep}</p>
                        {
                            this.state.currentStep === 0
                            ?
                                <div onClick={() => this.NextStep()}>Next</div>
                            :
                                this.state.currentStep === this.state.steps.length - 1
                                ?
                                    <div onClick={() => this.previousStep()}>Previous</div>
                                :
                                    <div>
                                        <div onClick={() => this.previousStep()}>Previous</div>
                                        <div onClick={() => this.NextStep()}>Next</div>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TutorialModal