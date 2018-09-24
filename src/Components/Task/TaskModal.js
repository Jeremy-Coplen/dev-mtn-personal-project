import React, { Component } from "react"
import axios from "axios"

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
            [e.target.name]: true
        })
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress(e, edit, value) {
        if(e.key === "Enter" && this.state[e.target.name].length > 0) {
            this.setState({
                [edit]: false
            })
            if(e.target.name === "name") {
                axios.put(`/api/task-name`, {name: value, taskId: this.props.task.task_id})
                this.props.updateTaskName(value)
            }
            else if(e.target.name === "details") {
                axios.put(`/api/task-details`, {details: value, taskId: this.props.task.task_id})
            }
        }
    }

    render() {
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
                                onKeyPress={(e) => this.handleKeyPress(e, "editingName", this.state.name)} />
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
                                onKeyPress={(e) => this.handleKeyPress(e, "editingDetails", this.state.details)} />
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