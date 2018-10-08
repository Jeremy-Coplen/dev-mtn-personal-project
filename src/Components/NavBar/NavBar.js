import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData, updateBackgroundImage } from "../../Ducks/reducer"

import TutorialModal from "../TutorialModal/TutorialModal"

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editingBackgroundImage: false,
            backgroundImage: "",
            show: false
        }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.updateShow = this.updateShow.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.background_image !== this.props.user.background_image) {
            this.setState({
                backgroundImage: this.props.user.background_image
            })
        }
    }

    updateEditingBackgroundImage() {
        this.setState({
            editingBackgroundImage: true
        })
    }

    updateBackgroundImage(val) {
        this.setState({
            backgroundImage: val
        })
    }

    async handleKeyPress(e) {
        e.persist()
        if (e.key === "Enter" && this.state.backgroundImage.length !== 0) {
            this.setState({
                editingBackgroundImage: false
            })
            try {
                await axios.put("/api/user-background", { backgroundImage: e.target.value })
                let userRes = await axios.get("/api/user-data")
                this.props.getUserData(userRes.data)
                this.props.updateBackgroundImage(this.props.user.background_image)
            } catch (err) {
                if (err.response.status === 401) {
                    alert("Go Login")
                    this.props.history.push("/")
                }
            }
        }
        else if (e.key === "Enter" && this.state.backgroundImage.length === 0) {
            this.setState({
                editingBackgroundImage: false
            })
        }
    }

    updateShow() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                {
                    this.props.location.pathname === "/"
                        ?
                        null
                        :
                        <div className="nav_bar">
                            <img className="logo" src="https://cdn0.iconfinder.com/data/icons/business-and-finance-vol-2/48/65-512.png" alt="logo" />
                            <div className="nav_bar_links">
                                <Link className="link_button" to="/dashboard"><div>Dashboard</div></Link>
                                <Link className="link_button" to="/boards"><div>Boards</div></Link>
                                <Link className="link_button" to="/teams"><div>Teams</div></Link>
                            </div>
                            <div className="site_name">
                                <h2>Get On Track</h2>
                            </div>
                            <div className="nav_bar_profile">
                                {
                                    this.state.editingBackgroundImage
                                        ?
                                        <input type="text"
                                            placeholder="Enter image url"
                                            value={this.state.backgroundImage}
                                            onChange={(e) => this.updateBackgroundImage(e.target.value)}
                                            onKeyPress={this.handleKeyPress} />
                                        :
                                        <div className="background_button" onClick={() => this.updateEditingBackgroundImage()}>Change Background</div>
                                }
                                <div className="tutorial_button" onClick={this.updateShow}>Tutorial</div>
                                <img className="profile_image" src={user.profile_image} alt="profile" />
                                <h3>{user.username}</h3>
                                <a className="logout_button" href={`${process.env.REACT_APP_LOGOUT}`}><div>Logout</div></a>
                            </div>
                        </div>
                }
                <TutorialModal show={this.state.show} updateShow={this.updateShow}/>
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

export default withRouter(connected(NavBar))