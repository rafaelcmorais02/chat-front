import React from "react";
import Login from './components/login/Login'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false
        }
        this.renderChange = this.renderChange.bind(this);
    }

    renderChange(render) {
        return this.setState({ render })
    }
    renderChat() {
        if (this.state.render) {
            return (
                <div>
                    <h1>
                        opa
                    </h1>
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