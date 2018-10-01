import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

import Card from "../Card/Card"
import CardsTasksRecyclingBinModal from "../CardsTasksRecyclingBinModal/CardsTasksRecyclingBinModal"

class SingleBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardInfo: [],
            boardImage: "",
            boardName: "",
            boardType: "",
            cardName: "",
            editingImage: false,
            editingName: false,
            editingType: false,
            addingCard: false,
            show: false,
            restoreTask: false
        }
        this.updateEditing = this.updateEditing.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.handleSelection = this.handleSelection.bind(this)
        this.updateShow = this.updateShow.bind(this)
        this.recycleCard = this.recycleCard.bind(this)
        this.restoreCard = this.recycleCard.bind(this)
        this.restoreTask = this.restoreTask.bind(this)
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

        let elems = document.getElementsByClassName("background_image")
            for(let i = 0; i < elems.length; i++) {
                elems[i].style.backgroundImage = `url("${this.props.user.background_image}")`
            }

        try {
            let boardRes = await axios.get(`/api/board-cards/${this.props.match.params.boardid}`)
            this.setState({
                cardInfo: boardRes.data[1],
                boardImage: boardRes.data[0].board_image,
                boardName: boardRes.data[0].board_name,
                boardType: boardRes.data[0].board_type
            })
            await axios.put("/api/last-board-viewed", {boardId: this.props.match.params.boardid})
        } catch (err) {
            console.log(err)
        }
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
        try{
            if (e.key === "Enter" && this.state[e.target.name].length > 0) {
                this.setState({
                    [edit]: false
                })
                if (e.target.name === "boardImage") {
                    axios.put(`/api/board-image}`, { image: value, boardId: this.props.match.params.boardid })
                }
                else if (e.target.name === "boardName") {
                    axios.put(`/api/board-name`, { name: value, boardId: this.props.match.params.boardid })
                }
                else if (e.target.name === "cardName") {
                    let newCard = await axios.post("/api/card", { name: value, boardId: this.props.match.params.boardid })
                    this.setState({
                        cardInfo: [...this.state.cardInfo, newCard.data],
                        cardName: ""
                    })
                }
            }
            else if(e.key === "Enter" && this.state[e.target.name].length === 0) {
                this.setState({
                    [edit]: false
                })
            }
        }catch(err) {
            console.log(err)
        }
    }

    handleSelection(e) {
        this.setState({
            boardType: e.target.value,
            editingType: false
        })
        axios.put(`/api/board-type`, { type: e.target.value, boardId: this.props.match.params.boardid })
    }

    updateShow() {
        this.setState({
            show: !this.state.show
        })
    }

    async recycleCard(cardId) {
        try{
            let cardsRes = await axios.put("/api/card-archived", { archived: true, cardId, boardId: this.props.match.params.boardid, type: false})
            this.setState({
                cardInfo: cardsRes.data
            })
        }catch(err) {
            console.log(err)
        }
    }

    async restoreCard() {
        try{
            let cardsRes = await axios.get(`/api/board-cards/${this.props.match.params.boardid}`)
            this.setState({
                cardInfo: cardsRes.data[1]
            })
        }catch(err) {
            console.log(err)
        }
    }

    restoreTask() {
        this.setState({
            restoreTask: !this.state.restoreTask
        })
    }


    render() {
        if (this.state.cardInfo) {
            var card = this.state.cardInfo.map(card => {
                return (
                    <Card key={card.card_id} card={card} boardId={this.props.match.params.boardid} recycleCard={this.recycleCard} restoreTask={this.state.restoreTask} />
                )
            })
        }
        return (
            <div className="background_image">
                <div>
                    {
                        this.state.editingImage
                            ?
                            <input type="text"
                                name="boardImage"
                                value={this.state.boardImage}
                                onChange={this.updateInput}
                                onKeyPress={(e) => this.handleKeyPress(e, "editingImage", this.state.boardImage)} />
                            :
                            <img src={this.state.boardImage}
                                alt="board"
                                name="editingImage"
                                onClick={this.updateEditing} />
                    }
                    {
                        this.state.editingName
                            ?
                            <input type="text"
                                name="boardName"
                                value={this.state.boardName}
                                onChange={this.updateInput}
                                onKeyPress={(e) => this.handleKeyPress(e, "editingName", this.state.boardName)} />
                            :
                            <button
                                name="editingName"
                                onClick={this.updateEditing}>{this.state.boardName}</button>
                    }
                    {
                        this.state.editingType
                            ?
                            <select defaultValue={this.state.boardType} onChange={this.handleSelection} >
                                <option value={this.state.boardType === "Personal" ? "Personal" : "Team"} disabled hidden>{this.state.boardType}</option>
                                <option value={this.state.boardType === "Personal" ? "Team" : "Personal"}>{this.state.boardType === "Personal" ? "Team" : "Personal"}</option>
                            </select>
                            :
                            <button
                                name="editingType"
                                onClick={this.updateEditing}>{this.state.boardType}</button>
                    }
                    <button onClick={this.updateShow}>Recycling Bin</button>
                </div>
                {card}
                {
                    this.state.addingCard
                        ?
                        <input type="text"
                            placeholder="Enter Card Name"
                            name="cardName"
                            value={this.state.cardName}
                            onChange={this.updateInput}
                            onKeyPress={(e) => this.handleKeyPress(e, "addingCard", this.state.cardName)} />
                        :
                        <button
                            name="addingCard"
                            onClick={this.updateEditing}>Add Card</button>
                }
                <CardsTasksRecyclingBinModal show={this.state.show} updateShow={this.updateShow} restoreCard={this.restoreCard} restoreTask={this.restoreTask} />
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

export default connected(SingleBoard)