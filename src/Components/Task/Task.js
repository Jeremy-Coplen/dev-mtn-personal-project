import React, { Component } from "react"

class Task extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }
    render() {
        const { show, task_id, task_name, task_details } = this.props
        const showHideClassName = show ? "task_disply" : "task_display_none"
        return (
            <h1>{task_name}</h1>
                )
            }
        }
        
export default Task