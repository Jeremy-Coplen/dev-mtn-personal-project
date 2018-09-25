import React, { Component } from "react"
import axios from "axios"

import Task from "../Task/Task"

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskName: "",
            cardName: this.props.card.card_name,
            tasks: [],
            editingCard: false,
            addingTask: false
        }
        this.updateEditing = this.updateEditing.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.recycleTask = this.recycleTask.bind(this)
    }

    async componentDidMount() {
        let tasksRes = await axios.get(`/api/tasks/${this.props.card.card_id}`)
        this.setState({
            tasks: tasksRes.data
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

    async handleKeyPress(e, edit, value) {
        if(e.key === "Enter" && this.state[e.target.name].length > 0) {
            this.setState({
                [edit]: false
            })
            if(e.target.name === "cardName") {
                axios.put(`/api/card-name`, {name: value, cardId: this.props.card.card_id})
                this.setState({
                    cardName: value
                })
            }
            else if(e.target.name === "taskName") {
               let newTask = await axios.post("/api/task", { name: value, cardId: this.props.card.card_id, boardId: this.props.card.board_id})
               this.setState({
                   tasks: [...this.state.tasks, newTask.data]
               })
            }
        }
    }

    async recycleTask(taskId) {
        try {
            let tasksRes = await axios.put("/api/task-archived", { archived: true, taskId, cardId: this.props.card.card_id, type: false})
            this.setState({
                tasks: tasksRes.data
            })
        }catch(err) {
            console.log(err)
        }
    }

    async restoreTask() {
        let tasksRes = await axios.get(`/api/tasks/${this.props.card.card_id}`)
        this.setState({
            tasks: tasksRes.data
        })
    }

    render() {
        if(this.state.tasks) {
            var task = this.state.tasks.map(task => {
                return (
                    <Task key={task.task_id} task={task} recycleTask={this.recycleTask} />
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
                <button onClick={() => this.props.recycleCard(this.props.card.card_id)}>Recycle</button>
                {task}
                {
                    this.state.addingTask
                    ?
                            <input type="text"
                            placeholder="Enter Task Title"
                            name="taskName"
                            value={this.state.taskName}
                            onChange={this.updateInput}
                            onKeyPress={(e) => this.handleKeyPress(e, "addingTask", this.state.taskName)}/> 
                    :
                        <button
                        name="addingTask"
                        onClick={this.updateEditing}>Add Task</button>
                }
            </div>
        )
    }
}

export default Card