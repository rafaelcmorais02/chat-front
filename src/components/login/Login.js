import React from "react";
import axios from "axios";
import Chat from '../chat/Chat'
import Repo from '../repo/Repo'
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
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount() {
        const authorization = JSON.parse(localStorage.getItem('authorization'))
        if ((authorization || {}).token && authorization.user && authorization.expiration) {
            const expiration = new Date(authorization.expiration)
            if (expiration > new Date()) {
                this.setState({
                    render: true,
                    token: authorization.token,
                    user: authorization.user,
                })
            } else {
                localStorage.setItem('authorization', JSON.stringify({}))
            }
        }
        if (this.props.data) {
            document.getElementById('inputUser').value = (this.props.data.state || {}).userName || ''
            document.getElementById('inputPassword').value = (this.props.data.state || {}).userPassword || ''
        }

    }
    renderChat() {
        if (this.state.render) {
            return (
                <div>
                    <Chat user={this.state.user} token={this.state.token} />
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }

    handleRegister() {
        this.props.navigation('/register')
    }

    handleLogout() {
        this.setState({
            render: false,
            token: '',
            user: '',
        })
        localStorage.setItem('authorization', JSON.stringify({}))
    }

    async handlerLogin() {
        this.setState({
            render: false
        })
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
            this.setState({
                render: true,
                token: credentials.data.token,
                user: credentials.data.email,
            })
            const now = new Date()
            const expiration = now.setDate(now.getDate() + 1)
            localStorage.setItem('authorization', JSON.stringify({
                token: credentials.data.token,
                user: credentials.data.email,
                expiration: expiration
            }))
            document.getElementById('inputUser').value = ''
            document.getElementById('inputPassword').value = ''
        } catch {
            window.alert('Credenciais incorretas')
        }
    }
    render() {
        return (
            <div>
                <Repo />
                <hr />
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
                        <button type="button" className="btn btn-primary" onClick={this.handlerLogin} style={{ "backgroundColor": "blueviolet", "border": "black" }}>LogIn</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleLogout} style={{ "backgroundColor": "blueviolet", "border": "black", "marginLeft": "10px" }}>LogOut</button>
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