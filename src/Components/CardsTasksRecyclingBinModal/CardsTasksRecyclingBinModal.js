import React, { Component } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"

import ArchivedCard from "../ArchivedCard/ArchivedCard"
import ArchivedTask from "../ArchivedTask/ArchivedTask"

class CardsTasksRecyclingBinModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            archivedCards: [],
            archivedTasks: []
        }
        this.restoreCard = this.restoreCard.bind(this)
        this.restoreTask = this.restoreTask.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    async componentDidMount() {
        try {
            let cardsRes = await axios.get(`/api/archived-cards/${this.props.match.params.boardid}`)
            let tasksRes = await axios.get(`/api/archived-tasks/${this.props.match.params.boardid}`)
            this.setState({
                archivedCards: cardsRes.data,
                archivedTasks: tasksRes.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            try {
                let cardsRes = await axios.get(`/api/archived-cards/${this.props.match.params.boardid}`)
                let tasksRes = await axios.get(`/api/archived-tasks/${this.props.match.params.boardid}`)
                this.setState({
                    archivedCards: cardsRes.data,
                    archivedTasks: tasksRes.data
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    async restoreCard(cardId) {
        try {
            let cardsRes = await axios.put("/api/card-archived", { archived: false, cardId, boardId: this.props.match.params.boardid, type: true })
            this.setState({
                archivedCards: cardsRes.data
            })
            this.props.restoreCard()
        } catch (err) {
            console.log(err)
        }
    }

    async restoreTask(taskId) {
        try {
            let tasksRes = await axios.put("/api/task-archived", { archived: false, taskId, boardId: this.props.match.params.boardid })
            this.setState({
                archivedTasks: tasksRes.data
            })
            this.props.restoreTask()
        } catch (err) {
            console.log(err)
        }
    }

    async deleteCard(cardId) {
        try {
            let cardsRes = await axios.delete(`/api/card/${this.props.match.params.boardid}/${cardId}`)
            this.setState({
                archivedCards: cardsRes.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    async deleteTask(taskId) {
        try {
            let tasksRes = await axios.delete(`/api/task/${this.props.match.params.boardid}/${taskId}`)
            this.setState({
                archivedTasks: tasksRes.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.archivedCards) {
            var archivedCards = this.state.archivedCards.map(archivedCard => {
                return (
                    <ArchivedCard key={archivedCard.card_id} archivedCard={archivedCard} restoreCard={this.restoreCard} deleteCard={this.deleteCard} />
                )
            })
        }
        if (this.state.archivedTasks) {
            var archivedTasks = this.state.archivedTasks.map(archivedTask => {
                return (
                    <ArchivedTask key={archivedTask.task_id} archivedTask={archivedTask} restoreTask={this.restoreTask} deleteTask={this.deleteTask} />
                )
            })
        }
        const showHideClassName = this.props.show ? "cards_tasks_recycle_bin_display" : "cards_tasks_recycle_bin_display_none"
        return (
            <div className={showHideClassName}>
                <div className="cards-tasks_recycling_bin">
                    <div className="cards-tasks_recycling_bin_content">
                        <div className="close_button" onClick={() => this.props.updateShow()}>X</div>
                        <div className="archived_cards_tasks_content">
                            <h1>Cards:</h1>
                            <div className="archived_cards_tasks">
                                {
                                    this.state.archivedCards
                                        ?
                                        <div className="archived_cards_tasks_container">
                                            { archivedCards }
                                        </div>
                                        :
                                        <h1>Empty</h1>
                                }
                            </div>
                            <h1>Tasks:</h1>
                            <div className="archived_cards_tasks">
                                {
                                    this.state.archivedTasks
                                        ?
                                        <div  className="archived_cards_tasks_container">
                                            { archivedTasks }
                                        </div>
                                        :
                                        <h1>Empty</h1>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CardsTasksRecyclingBinModal)