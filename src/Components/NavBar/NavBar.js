import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editingBackgroundImage: false,
            backgroundImage: ""
        }
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.background_image !== this.props.user.background_image){
            this.setState({
                backgroundImage: this.props.user.background_image
            })
            let elems = document.getElementsByClassName("background_image")
            for(let i = 0; i < elems.length; i++) {
                elems[i].style.backgroundImage = `url("${this.props.user.background_image}")`
            }
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
            }catch(err) {
                if(err.response.status === 401) {
                    alert("Go Login")
                    this.props.history.push("/")
                }
            }
            let elems = document.getElementsByClassName("background_image")
            for(let i = 0; i < elems.length; i++) {
                elems[i].style.backgroundImage = `url("${e.target.value}")`
            } 
        }
        else if (e.key === "Enter" && this.state.backgroundImage.length === 0) {
            this.setState({
                editingBackgroundImage: false
            })
        }
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
                        <div>
                            <img src="" alt="logo" />
                            <Link to="/dashboard"><button>Dashboard</button></Link>
                            <Link to="/boards"><button>Boards</button></Link>
                            <Link to="/teams"><button>Teams</button></Link>
                            <img className="profile_image" src={user.profile_image} alt="profile" />
                            <h3>{user.username}</h3>
                            {
                                this.state.editingBackgroundImage
                                    ?
                                    <input type="text"
                                        placeholder="Enter image url"
                                        value={this.state.backgroundImage}
                                        onChange={(e) => this.updateBackgroundImage(e.target.value)}
                                        onKeyPress={this.handleKeyPress} />
                                    :
                                    <button onClick={() => this.updateEditingBackgroundImage()}>Change Background</button>
                            }
                            <a href="http://localhost:3000/logout"><button>Logout</button></a>
                        </div>
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

export default withRouter(connected(NavBar))