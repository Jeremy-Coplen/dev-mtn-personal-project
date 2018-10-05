import React, { Component } from "react"

import TaskModal from "./TaskModal"

class Task extends Component {
    constructor(props) {
        super(props)

        this.state = {
            task: this.props.task,
            taskName: this.props.task.task_name,
            show: false
        }
        this.closeTask = this.closeTask.bind(this)
        this.updateTaskName = this.updateTaskName.bind(this)
    }

    openTask() {
        this.setState({
            show: true
        })
    }

    closeTask() {
        this.setState({
            show: false
        })
    }

    updateTaskName(val) {
        this.setState({
            taskName: val
        })
    }

    render() {
        return (
            <div className="task">
                <div className="task_content">
                    <h1 onClick={() => this.openTask()}>{this.state.taskName}</h1>
                    <button className="actual_button" onClick={() => this.props.recycleTask(this.state.task.task_id)}>Recycle</button>
                    <TaskModal task={this.props.task} closeTask={this.closeTask} show={this.state.show} updateTaskName={this.updateTaskName} />
                </div>
            </div>
        )
    }
}

export default Task