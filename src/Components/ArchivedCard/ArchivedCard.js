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
            <div>
                <h2>{archivedCard.card_name}</h2>
            </div>
        )
    }
}

export default ArchivedCard