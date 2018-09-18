import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

class BoardsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boards: []
        }
    }
    async componentDidMount(){
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
        }catch(err) {
            if(err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }
        let boardsRes = await axios.get("/api/user-boards")
        this.setState({
            boards: boardsRes.data
        })
    }


    render() {
        return (
            <div>
                <h1>BoardsList</h1>
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

export default connected(BoardsList)