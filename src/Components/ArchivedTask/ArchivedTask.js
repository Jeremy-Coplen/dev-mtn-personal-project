import React, { Component } from "react"

class ArchivedTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            archivedTask: this.props.archivedTask
        }
    }

    render() {
        console.log(this.props)
        const { archivedTask } = this.state
        return (
            <div>
                <h2>{archivedTask.task_name}</h2>
                <button onClick={() => this.props.restoreTask(archivedTask.task_id)}>Restore</button>
                <button>Delete</button>
            </div>
        )
    }
}

export default ArchivedTask