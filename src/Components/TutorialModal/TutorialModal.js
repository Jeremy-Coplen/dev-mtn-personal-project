import React, { Component } from "react"

class TutorialModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            steps: [
                "Welcome to Get On Track! This tutorial will show you how to use the different parts of the site. Click the next and previous buttons to navigate through the tutorial",
                "The Nav Bar will always be at the top of the screen. The Dashboard button will bring you to your dashboard. The Boards button will bring you to your boards page. The Teams button will bring you to your teams page. The Change Background button will allow you change the background image of the site just enter in an image url. The Tutorial button will open this tutorial whenever you need it. The Logout button will log you out and bring you to the login screen",
                "The Dashboard has two buttons a Boards button and a Teams button. The boards button will take you to your Boards Page. The Teams button will take you to your Teams page. The Dashboard has a section where the board you last looked at will display which you can click on and it will take you to that board",
                "The Boards page will list all of the boards you have created. You can click on any of your boards to go to that board. The Recycle button on each board will recycle that board. The Recycling Bin button will pull up a recycling bin modal. The recycling bin will have all the boards you have recycled. Each recycled Board will have a Restore button and a Delete Button. The Restore button will restore the board you clicked the Restore button on will add it back to your list of boards on the Boards page. The Delete button will permanently delete that board. The Add Board button will pop up a modal to which you can enter the board information if nothing it entered default values will be used. The X button will close the modal without adding the new board. The Confirm button will add a board with the information you provided or the default values and take you to that board.",
                "The Teams page will list all of your boards you have created that have a type of Team. You can click on to go to that board.",
                "The Board page will list all of the information for the board you created or clicked on. the Add Card button will add another card with the name you type in to your current board. The Add Task button on each card will add a task with the name you typed in to the card you clicked Add Task on. The Recycle button will recycle the card or task you clicked Recycle on. The Recycling Bin button will bring up recycling bin modal where it will have the cards you have recycled and the tasks that you have recycled where the card is not recycled for that board. Each recycled card and task will have a Restore and Delete Button. The Restore button will Restore the card or task and add back to the board you are on. The Delete button will permanently delete that card or task"
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