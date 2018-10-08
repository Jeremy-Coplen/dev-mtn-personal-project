import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lastBoardViewed: {}
        }
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
            let lastBoardRes = await axios.get(`/api/last-board-viewed/${this.props.user.last_board_viewed}`)
            this.setState({
                lastBoardViewed: lastBoardRes.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { lastBoardViewed } = this.state
        return (
            <div className="dashboard">
                <div className="side_bar">
                    <Link className="link_button boards_button" to="/boards"><div>Boards</div></Link>
                    <Link className="link_button" to="/teams"><div>Teams</div></Link>
                </div>
                {
                    lastBoardViewed
                        ?
                        <Link to={`/board/${lastBoardViewed.board_id}`}>
                            <div>
                                <img className="dashboard_board_image" src={lastBoardViewed.board_image} alt="board" />
                                <div className="last_board_viewed">
                                    <h1>{lastBoardViewed.board_name}</h1>
                                    <h2>Type: {lastBoardViewed.board_type}</h2>
                                </div>
                            </div>
                        </Link>
                        :
                        <h1>No board found</h1>
                }
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

export default connected(Dashboard)