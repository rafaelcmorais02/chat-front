import axios from "axios";
import React from "react";
import './register.css'
import { useNavigate } from 'react-router-dom';
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }
    handleBack() {
        this.props.navigation('/')
    }
    async handleSubmitRegister(event) {
        const user_name = document.getElementById('email').value
        const first_name = document.getElementById('firstName').value
        const last_name = document.getElementById('lastName').value
        const password = document.getElementById('password2').value
        const password_confirmation = document.getElementById('passwordValidator').value
        event.preventDefault()
        if (user_name && first_name && last_name && password && password_confirmation) {
            const data = JSON.stringify({
                user_name,
                first_name,
                last_name,
                password,
                password_confirmation
            })
            const config = {
                method: 'post',
                url: 'http://localhost:8000/api/v1/users/register',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            try {
                await axios(config)
                document.getElementById('email').value = ''
                document.getElementById('firstName').value = ''
                document.getElementById('lastName').value = ''
                document.getElementById('password2').value = ''
                document.getElementById('passwordValidator').value = ''
                this.props.navigation('/', {
                    state: {
                        userName: user_name,
                        userPassword: password
                    }
                })
            } catch (error) {
                if (error.request.response.includes('erro no cadastro do usuário')) {
                    window.alert('Usuário já cadastrado')
                } else if (error.request.response.includes('As senhas devem ser iguais')) {
                    window.alert('As senhas devem ser iguais')
                }
                else {
                    window.alert('Erro na comunicação com o servidor')
                }

            }
        } else {
            window.alert('Complete todos os campos para continuar')
        }
    }
    render() {
        return (
            <div className="register">
                <form onSubmit={this.handleSubmitRegister}>
                    <h1>Caso não tenha conta, registre-se aqui (não use dados reais):</h1>
                    <hr></hr>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Seu endereço de email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Aplicação feita para testes. Por segurança não forneça dados reais</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Primeiro nome</label>
                        <input type="text" className="form-control" id="firstName" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Sobrenome</label>
                        <input type="text" className="form-control" id="lastName" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="password2" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordValidator" className="form-label">Repita sua senha</label>
                        <input type="password" className="form-control" id="passwordValidator" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ "backgroundColor": "blueviolet", "border": "black" }}>Registrar</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleBack} style={{ "backgroundColor": "blueviolet", "border": "black", "marginLeft": "10px" }}>Voltar</button>
                </form>
            </div>
        )
    }
}
const WrapRegister = (props) => {
    const navigation = useNavigate();
    return <Register {...props} navigation={navigation} />;
}
export default WrapRegister
