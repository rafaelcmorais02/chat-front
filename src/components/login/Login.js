import React from "react";
import axios from "axios";
import Chat from '../chat/Chat'
import { useLocation, useNavigate } from "react-router-dom";
import './login.css'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
        this.handlerLogin = this.handlerLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount() {
        if (this.props.data) {
            document.getElementById('inputUser').value = (this.props.data.state || {}).userName || ''
            document.getElementById('inputPassword').value = (this.props.data.state || {}).userPassword || ''
        }

    }
    changeState(render, token, user) {
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

    handleRegister() {
        this.props.navigation('/register')
    }
    async handlerLogin() {
        const user = document.getElementById('inputUser').value
        const password = document.getElementById('inputPassword').value
        const data = {
            username: user,
            password: password
        }
        const config = {
            method: 'post',
            url: 'https://chatapi.portfolio-rafael.com/api/v1/users/token',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };
        try {
            const credentials = await axios(config)
            this.changeState(true, credentials.data.token, credentials.data.email)
            document.getElementById('inputUser').value = ''
            document.getElementById('inputPassword').value = ''


        } catch {
            window.alert('Credenciais incorretas')
        }
    }
    render() {
        return (
            <div>
                <div className="login">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="inputUser" className="form-label">Endereço de email</label>
                            <input type="email" className="form-control" id="inputUser" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">Não usar dados reais</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handlerLogin} style={{ "backgroundColor": "blueviolet", "border": "black" }}>Fazer login</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleRegister} style={{ "backgroundColor": "blueviolet", "border": "black", "marginLeft": "10px" }}>Cadastrar</button>
                    </form>
                </div>
                <hr />
                {this.renderChat()}
            </div>
        )
    }
}
const WrapLogin = (props) => {
    const data = useLocation()
    const navigation = useNavigate()
    return <Login {...props} data={data} navigation={navigation} />;

}
export default WrapLogin