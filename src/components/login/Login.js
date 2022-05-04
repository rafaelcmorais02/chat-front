import React from "react";
import axios from "axios";
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state
        this.changeState = props.changeState
        this.handlerLogin = this.handlerLogin.bind(this);
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
            url: 'https://chat.emillieerafael.com/api/v1/users/token',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };
        const token = await axios(config)
        console.log(token)
        this.changeState(true)
    }
    render() {
        return (
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
                    <button type="button" className="btn btn-primary" onClick={this.handlerLogin}>Fazer login</button>
                </form>
            </div>
        )
    }
}
export default Login