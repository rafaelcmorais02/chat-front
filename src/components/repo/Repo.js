import React from "react";
import './repo.css'

class Repo extends React.Component {
    render() {
        return (
            <div className="repo">
                <h1>
                    Chat demo!
                </h1>
                <a href="https://github.com/rafaelcmorais02/chat-front">Repositório front-end</a>
                <a href="https://github.com/rafaelcmorais02/chat-server">Repositório back-end</a>
            </div>
        )
    }
}
export default Repo