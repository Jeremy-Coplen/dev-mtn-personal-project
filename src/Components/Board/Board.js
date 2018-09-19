import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

import Task from "../Task/Task"

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardInfo: {},
            cardInfo: {},
            taskInfo: {},
            show: false,
            name: "",
            details: "",
            editingName: false,
            editingDetails: false
        }
        this.updateEditing = this.updateEditing.bind(this)
        this.updateInput = this.updateInput.bind(this)
    }


    async componentDidMount() {
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
        } catch (err) {
            if (err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }

        try {
            let boardRes = await axios.get(`/api/board-cards/${this.props.user.user_id}/${this.props.match.params.boardid}`)
            this.setState({
                boardInfo: boardRes.data[0],
                cardInfo: boardRes.data[1],
                taskInfo: boardRes.data[2]
            })
        } catch (err) {
            console.log(err)
        }
    }

    updateEditing(e) {
        this.setState({
            [e.target.name]: !e.target.value
        })
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showTask() {
        this.setState({
            show: true
        })
    }

    hideTask() {
        this.setState({
            show: false
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {
                    this.state.boardInfo.data
                        ?
                        <div>
                            <img src={this.state.boardInfo.data[0].board_image} alt="" />
                            <h1>{this.state.boardInfo.data[0].board_name}</h1>
                            <h1>{this.state.boardInfo.data[0].board_type}</h1>
                        </div>
                        :
                        null
                }
                {
                    this.state.cardInfo.data
                        ?
                        <div>
                            {
                                this.state.cardInfo.data.map(card => {
                                    return (
                                        <div key={card.card_id}>
                                            <h2>{card.card_name}</h2>
                                            {
                                                this.state.taskInfo.data
                                                    ?
                                                    <div>
                                                        {
                                                            this.state.taskInfo.data.filter(task => task.card_id === card.card_id).map(task => {
                                                                return (
                                                                    <Task key={task.task_id} task_id={task.task_id} task_name={task.task_name} task_details={task.task_details}/>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <button>Add Task</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }
                <button>Add card</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const actionOutputs = {
    getUserData: getUserData
}

const connected = connect(mapStateToProps, actionOutputs)

export default connected(Board)