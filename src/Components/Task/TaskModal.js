import React, { Component } from "react"
import "./TaskModal.css"

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
        this.setState({
            [e.target.name]: !e.target.value
        })
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const showHideClassName = this.props.show ? "task_display" : "task_display_none"
        console.log("Show", this.props.show, "classname", showHideClassName)
        return (
            <div className={showHideClassName}>
                <div>
                    {
                        this.state.editingName
                            ?
                            <h1
                                name="editingName"
                                value={this.state.editingName}
                                onClick={this.updateEditing}>
                                {this.state.name}</h1>
                            :
                            <input type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.updateInput} />
                    }
                    {
                        this.state.editingDetails
                            ?
                            <h1
                                name="editingDetails"
                                value={this.state.editingDetails}
                                onClick={this.updateEditing}>
                                {this.state.details}</h1>
                            :
                            <input type="text"
                                name="details"
                                value={this.state.details}
                                onChange={this.updateInput} />
                    }
                    <button onClick={() => this.props.closeTask()}>Close</button>
                </div>
            </div>
        )
    }
}

export default TaskModal