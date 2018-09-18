import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

class Dashboard extends Component {
     async componentDidMount() {
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
        }catch(err) {
            if(err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }
    }

    render() {
        return (
            <div>
                <Link to="/boards"><button>Boards</button></Link>
                <Link to="/teams"><button>Teams</button></Link>
                <div>
                    <h1>This is where the last looked at board will go</h1>
                </div>
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