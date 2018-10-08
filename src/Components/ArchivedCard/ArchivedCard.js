import React, { Component } from "react"

class ArchivedCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            archivedCard: this.props.archivedCard
        }
    }

    render() {
        const { archivedCard } = this.state
        return (
            <div className="archived_card_tasks">
                <h2>{archivedCard.card_name}</h2>
                <div className="archived_buttons_container">
                    <div className="archived_buttons" onClick={() => this.props.restoreCard(archivedCard.card_id)}>Restore</div>
                    <div className="archived_buttons" onClick={() => this.props.deleteCard(archivedCard.card_id)}>Delete</div>
                </div>
            </div>
        )
    }
}

export default ArchivedCard