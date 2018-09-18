import React, { Component } from "react"
import axios from "axios"

class Dashboard extends Component {
    async componentDidMount() {
        let res = await axios.get("/api/user-data")
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard