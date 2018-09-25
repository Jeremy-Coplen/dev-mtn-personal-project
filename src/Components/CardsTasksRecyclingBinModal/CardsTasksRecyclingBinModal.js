import React, { Component } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"

import ArchivedCard from "../ArchivedCard/ArchivedCard"

class CardsTasksRecyclingBinModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            archivedCards: [],
            archivedTasks: []
        }
    }

    async componentDidMount() {
            try{
                let cardsRes = await axios.get(`/api/archived-cards/${this.props.match.params.boardid}`)
                this.setState({
                    archivedCards: cardsRes.data
                })
            }catch(err) {
                console.log(err)
            }
    }

    render() {
        console.log(this.state)
        if(this.state.archivedCards) {
           var archivedCards = this.state.archivedCards.map(archivedCard => {
                return (
                    <ArchivedCard key={archivedCard.card_id} archivedCard={archivedCard} />
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
                </div>
            </div>
        )
    }
}

export default withRouter(CardsTasksRecyclingBinModal)