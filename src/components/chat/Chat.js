import React from "react";
import axios from "axios";
import './chat.css'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.userSender = props.user
        this.token = props.token
        this.state = {}
        this.handlerSend = this.handlerSend.bind(this)
    }

    renderMessage(message, user) {
        return (
            `${(user || { user_name: this.userSender }).user_name} - ${message.message}`
        )
    }

    async componentDidMount() {
        setInterval(async () => {
            let config = {
                method: 'get',
                url: 'https://chatapi.portfolio-rafael.com/api/v1/messages/all',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            };
            const messages = await axios(config)
            config = {
                method: 'get',
                url: 'https://chatapi.portfolio-rafael.com/api/v1/users/all',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            };
            const userList = await axios(config)
            this.setState({
                userList: userList.data.data,
                messages: messages.data.data
            })
        }, 1000)
    }

    async handlerSend() {
        if (document.getElementById('userToSend').value && document.getElementById('userToSend').value) {

            const data = {
                message: document.getElementById('message').value,
                user_receiver: document.getElementById('userToSend').value
            };
            const config = {
                method: 'post',
                url: 'https://chatapi.portfolio-rafael.com/api/v1/messages/register',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            try {
                if (data.message && data.user_receiver)
                    await axios(config)
                document.getElementById('message').value = ''
            } catch (error) {
                window.alert('Erro no envio da mensagem')
            }
        } else {
            window.alert('Escolha um destinatário e então envie uma mensagem')
        }
    }

    listCssClass(userToSend, message) {
        if (message.user_sender === userToSend)
            return 'chatListReciever'
        else
            return 'chatListSender'
    }
    render() {
        return (
            <div className="chat">
                <h2>{this.userSender}</h2>
                <hr />
                <div className="chatUserToSend">
                    <h2>Conversar com: </h2>
                    <select className="chatInputDropDown" id="userToSend">
                        <option defaultValue>...</option>
                        {(this.state.userList || []).map(x => {
                            return (
                                <option key={x.id} value={x.id}>{x.user_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="chatTextArea">
                    <ul className="chatList">
                        {(this.state.messages || []).map((message, index) => {
                            const user = (this.state.userList || []).find(x => x.id === message.user_sender)
                            const userToSend = parseInt(document.getElementById('userToSend').value)
                            if ((message.user_sender) === userToSend || (message.user_receiver) === userToSend) {
                                return (
                                    <li className={this.listCssClass(userToSend, message)} key={index}>{
                                        this.renderMessage(message, user)
                                    }</li>
                                )
                            }
                            return null
                        })}
                    </ul>
                </div>
                <div className="chatInput">
                    <div className="chatInputRow">
                        <input type="text" id="message" className="form-control" aria-label="Text input with dropdown button" />
                        <button type="button" className="btn btn-primary chatInputButton" onClick={this.handlerSend} style={{ "backgroundColor": "blueviolet", "border": "black" }}>Enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat