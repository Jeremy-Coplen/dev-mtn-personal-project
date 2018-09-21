import React, { Component } from "react"
import axios from "axios"

import Task from "../Task/Task"

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardName: this.props.card.card_name,
            tasks: [],
            editingCard: false
        }
        this.updateEditing = this.updateEditing.bind(this)
        this.updateInput = this.updateInput.bind(this)
    }

    async componentDidMount() {
        let taskRes = await axios.get(`/api/tasks/${this.props.card.card_id}`)
        this.setState({
            tasks: taskRes.data
        })
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
            axios.put(`/api/card-name/${this.props.card.card_id}`, {name: value})
        }
    }

    render() {
        if(this.state.tasks) {
            var task = this.state.tasks.map((task, i) => {
                return (
                    <Task key={i} task={task}/>
                )
            })
        }
        return (
            <div>
                {
                    this.state.editingCard
                    ?
                        <input type="text"
                        name="cardName"
                        value={this.state.cardName}
                        onChange={this.updateInput}
                        onKeyPress={(e) => this.handleKeyPress(e, "editingCard", this.state.cardName)}/>
                    :
                        <button
                        name="editingCard"
                        onClick={this.updateEditing}>{this.state.cardName}</button>

                }
                {task}
                <button>Add Task</button>
            </div>
        )
    }
}

export default Card