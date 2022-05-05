import React from "react";
import axios from "axios";
import './chat.css'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.userSender = props.user
        this.token = props.token
        this.state = {}
    }

    async componentDidMount() {
        const config = {
            method: 'get',
            url: 'http://localhost:8000/api/v1/users/all',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        };
        const userListReciever = await axios(config)
        this.setState({
            userListReciever: userListReciever.data.data
        })
        console.log(this.state.userListReciever)
    }

    render() {
        return (
            <div className="chat">
                <h1>Chat Demo! Bem vindo {this.userSender}</h1>
                <div className="chatTextArea">
                    <h1>teste</h1>
                </div>
                <div className="chatInput">
                    <div className="chatInputRow">
                        <select className="chatInputDropDown" id="user_receiver">
                            <option defaultValue>...</option>
                            {(this.state.userListReciever || []).map(x => {
                                return (
                                    <option key={x.id} value={x.id}>{x.user_name}</option>
                                )
                            })}
                        </select>
                        <input type="text" className="form-control" aria-label="Text input with dropdown button" />
                        <button type="button" className="btn btn-primary chatInputButton" onClick={this.handlerLogin} style={{ "backgroundColor": "blueviolet", "border": "black" }}>Enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat