import React from "react";
import Login from './components/login/Login'
import Chat from "./components/chat/Chat";
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false
        }
        this.renderChange = this.renderChange.bind(this);
    }

    renderChange(render, token, user) {
        return this.setState({
            render,
            token,
            user,
        })
    }
    renderChat() {
        if (this.state.render) {
            return (
                <div>
                    <Chat user={this.state.user} token={this.state.token} />
                </div>
            )
        }
    }
    render() {
        return (
            <div className="container-sm">
                <h1>{this.state.render}</h1>
                <Login state={this.state} changeState={this.renderChange} />
                {this.renderChat()}
            </div>
        )
    }
}
export default App