import React, { Component } from "react"

class TaskModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.task.task_name,
            details: this.props.task.task_details,
            editingName: false,
            editingDetails: false
        }
        this.updateEditing = this.updateEditing.bind(this)
        this.updateInput = this.updateInput.bind(this)
    }

    updateEditing(e) {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: true
        })
    }

    updateInput(e, editName) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress(e, edit) {
        console.log(e.key, edit)
        if(e.key === "Enter" && this.state[e.target.name].length > 0) {
            this.setState({
                [edit]: false
            })
        }
    }

    render() {
        console.log("edit name", this.state.editingName, "edit details", this.state.editingDetails)
        const showHideClassName = this.props.show ? "task_display" : "task_display_none"
        return (
            <div className={showHideClassName}>
                <div>
                    {
                        this.state.editingName
                            ?
                            <input type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.updateInput}
                                onKeyPress={(e) => this.handleKeyPress(e, "editingName")} />
                            :
                            <button
                                name="editingName"
                                onClick={this.updateEditing}>
                                {this.state.name}</button>
                    }
                    {
                        this.state.editingDetails
                            ?
                            <input type="text"
                                name="details"
                                value={this.state.details}
                                onChange={this.updateInput}
                                onKeyPress={(e) => this.handleKeyPress(e, "editingDetails")} />
                            :
                            <button
                                name="editingDetails"
                                onClick={this.updateEditing}>
                                {this.state.details}</button>
                    }
                    <button onClick={() => this.props.closeTask()}>Close</button>
                </div>
            </div>
        )
    }
}

export default TaskModal