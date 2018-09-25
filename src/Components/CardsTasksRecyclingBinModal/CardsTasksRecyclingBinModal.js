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
    }

    async componentDidMount() {
            try {
                let cardsRes = await axios.get(`/api/archived-cards/${this.props.match.params.boardid}`)
                let tasksRes = await axios.get(`/api/archived-tasks/${this.props.match.params.boardid}`)
                this.setState({
                    archivedCards: cardsRes.data,
                    archivedTasks: tasksRes.data
                })
            }catch(err) {
                console.log(err)
            }
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.show !== this.props.show) {
            try {
                let cardsRes = await axios.get(`/api/archived-cards/${this.props.match.params.boardid}`)
                let tasksRes = await axios.get(`/api/archived-tasks/${this.props.match.params.boardid}`)
                this.setState({
                    archivedCards: cardsRes.data,
                    archivedTasks: tasksRes.data
                })
            }catch(err) {
                console.log(err)
            }
        }
    }

    async restoreCard(cardId) {
        try {
            let cardsRes = await axios.put("/api/card-archived", { archived: false, cardId, boardId: this.props.match.params.boardid, type: true})
            this.setState({
                archivedCards: cardsRes.data
            })
            this.props.restoreCard()
        }catch(err) {
            console.log(err)
        }
    }

    render() {
        if(this.state.archivedCards) {
           var archivedCards = this.state.archivedCards.map(archivedCard => {
                return (
                    <ArchivedCard key={archivedCard.card_id} archivedCard={archivedCard} restoreCard={this.restoreCard}/>
                )
            })
        }
        if(this.state.archivedTasks) {
            var archivedTasks = this.state.archivedTasks.map(archivedTask => {
                return (
                    <ArchivedTask key={archivedTask.task_id} archivedTask={archivedTask}/>
                )
            })
        }
        const showHideClassName = this.props.show ? "cards_tasks_recycle_bin_display" : "cards_tasks_recycle_bin_display_none"
        return (
            <div className={showHideClassName}>
                <div>
                    <button onClick={() => this.props.updateShow()}>Close</button>
                    <h1>Cards:</h1>
                    {archivedCards}
                    <h2>Tasks:</h2>
                    {archivedTasks}
                </div>
            </div>
        )
    }
}

export default withRouter(CardsTasksRecyclingBinModal)