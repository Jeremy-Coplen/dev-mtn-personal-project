import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData, updateBackgroundImage } from "../../Ducks/reducer"

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
            this.props.updateBackgroundImage(this.props.user.background_image)
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

    // componentDidUpdate(prevProps) {
    //     if(prevProps.backgroundImage !== this.props.backgroundImage) {
    //         console.log("Updated")
    //     }
    // }

    render() {
        const { lastBoardViewed } = this.state
        return (
            <div className="dashboard" style={{backgroundImage: `url(${this.props.backgroundImage})`}}>
                <div className="nav_bar_space"></div>
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
        user: state.user,
        backgroundImage: state.backgroundImage
    }
}

const actionOutputs = {
    getUserData: getUserData,
    updateBackgroundImage: updateBackgroundImage
}

const connected = connect(mapStateToProps, actionOutputs)

export default connected(Dashboard)