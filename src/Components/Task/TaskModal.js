import React, { Component } from "react"

class TaskModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }

    render() {
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
                    <button onClick={() => this.hideTask()}>Close</button>
                </div>
            </div>
        )
    }
}