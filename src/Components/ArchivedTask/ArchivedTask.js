import React, { Component } from "react"

class ArchivedTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            archivedTask: this.props.archivedTask
        }
    }

    render() {
        const { archivedTask } = this.state
        return (
            <div className="archived_card_tasks">
                <h2>{archivedTask.task_name}</h2>
                <div className="archived_buttons_container">
                    <div className="restore_delete_button" onClick={() => this.props.restoreTask(archivedTask.task_id)}>Restore</div>
                    <div className="restore_delete_button" onClick={() => this.props.deleteTask(archivedTask.task_id)}>Delete</div>
                </div>
            </div>
        )
    }
}

export default ArchivedTask