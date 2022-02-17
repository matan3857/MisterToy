import React from 'react'
import { socketService } from '../services/socket.service.js'

export class ChatApp extends React.Component {

    state = {
        txt: '',
        msgs: []
    }

    componentDidMount() {
        socketService.setup()
        socketService.emit('chat topic', this.props.toyId)
        socketService.on('chat addMsg', this.addMsg)
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg)
        socketService.terminate()
        clearTimeout(this.timeout)
    }

    addMsg = newMsg => {
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }))
        // if (this.state.isBotMode) this.sendBotResponse();
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ txt: value });
    }

    onSend = (ev) => {
        ev.preventDefault();
        if (!this.state.txt) return
        // const userMsg = `You: ${this.state.txt}`
        socketService.emit('chat newMsg', { from: this.props.username, txt: this.state.txt })
        // this.setState({ msgs: [...this.state.msgs, userMsg], txt: '' });
        this.setState((prevState) => ({ ...prevState,  txt: '' }))

        // setTimeout(() => {
        //     const autoMsg = 'Support: Sure thing honey'
        //     this.setState({ msgs: [...this.state.msgs, autoMsg] })
        // }, 1000);

    }

    render() {
        const { txt, msgs } = this.state;
        return (
            <section className="chat-container">
                {msgs.length !== 0 && <section className="chat-list">
                    {msgs.map((msg, idx) => <p key={idx}>{msg.from}:{msg.txt}</p>)}
                </section>
                }
                <form className="chat-form" onSubmit={this.onSend}>
                    <input placeholder="Ask something" type="text" value={txt} onChange={this.handleChange} autoFocus required />
                    <button>Send!</button>
                </form>
            </section>
        )
    }
}