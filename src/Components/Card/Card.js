import React, { Component } from "react"
import axios from "axios"

import Task from "../Task/Task"

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            card: this.props.card,
            tasks: []
        }
    }

    async componentDidMount() {
        let taskRes = await axios.get(`/api/tasks/${this.state.card.card_id}`)
        this.setState({
            tasks: taskRes.data
        })
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
                <h2>{this.state.card.card_name}</h2>
                {task}
                <button>Add Task</button>
            </div>
        )
    }
}

export default Card