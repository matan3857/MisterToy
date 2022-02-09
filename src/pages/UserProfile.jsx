const { connect } = ReactRedux
import { utilService } from '../services/util.service.js'
import { update } from '../store/user.action.js'

class _UserProfile extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
        this.props.update(this.props.user)
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        if (ev.target.type === 'color')
            this.setState(prevState => ({ ...prevState, user: { ...prevState.user, prefs: { ...prevState.user.prefs, [field]: value } } }));
        else
            this.setState(prevState => ({ ...prevState, user: { ...prevState.user, [field]: value } }));
    };

    onEditUser = () => {
        const user = { ...this.state.user }
        this.props.update(user)
    }

    render() {
        const { user } = this.state
        if (!user) return <div>Loading From User Profile...</div>
        return (
            <div>
                <h1>User Profile</h1>
                <div>
                    <form className="edit-user" onSubmit={(ev) => { ev.preventDefault(); this.onEditUser() }}>
                        <div>
                            <label htmlFor="fullname">Fullname:</label>
                            <input type="text" name="fullname" id="fullname" value={user.fullname} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="color">Color:</label>
                            <input type="color" name="color" value={user.prefs.color} onChange={this.handleChange} id="color"></input>
                        </div>
                        <div>
                            <label htmlFor="bgColor">Background:</label>
                            <input type="color" name="bgColor" value={user.prefs.bgColor} onChange={this.handleChange} id="bgColor"></input>
                        </div>
                        <button>Edit Submit</button>
                    </form>
                </div>
                <div className="todo-container">
                    <ul className="todo-list">
                        {user.activities && user.activities.map(todo => (
                            <div className="todo" key={todo._id}>
                                <li className="todo-item">{utilService.timeSince(todo.createdAt)} ago : {todo.text}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    update
}

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)
