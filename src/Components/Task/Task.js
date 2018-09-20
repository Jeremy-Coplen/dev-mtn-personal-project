import React, { Component } from "react"

import TaskModal from "./TaskModal"

class Task extends Component {
    constructor(props) {
        super(props)

        this.state = {
            task: this.props.task,
            show: false
        }
        this.closeTask = this.closeTask.bind(this)
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

    render() {
        return (
            <div>
                <h1 onClick={() => this.openTask()}>{this.state.task.task_name}</h1>
                <TaskModal task={this.props.task} closeTask={this.closeTask} show={this.state.show}/>
            </div>
                )
            }
        }
        
export default Task