import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { onUpdate } from '../store/user.action.js'

function _UserProfile(props) {
    const { user } = props

    console.log('user', user)
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    // const [newPassword, setNewPassword] = useState('');
    // const [validPassword, setValidPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        setUsername(user.username)
        setFullname(user.fullname)
        setIsAdmin(user.isAdmin)
    };

    const onSubmit = (ev) => {
        let password = oldPassword
        ev.preventDefault();
        if (username.trim() && password.trim()) {
            let res
            res = props.onUpdate({ username, password, fullname, isAdmin });
        }
}

return (
    <div className="login-signup">
        <div className="login-container flex column">
            <p>Your Profile</p>
            <form className="login-form" onSubmit={onSubmit}>
                <input
                    className='unmuttable'
                    type="text"
                    value={username}
                    // onChange={(ev) => setUsername(ev.target.value)}
                    // placeholder="Username"
                    readOnly
                />
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(ev) => setOldPassword(ev.target.value)}
                    placeholder="Enter Password"
                />

                <input
                    type="text"
                    value={fullname}
                    onChange={(ev) => setFullname(ev.target.value)}
                    placeholder="Fullname"
                />

                <div className='flex'>
                    <label>Is Admin</label>
                    <input type="checkbox" value={isAdmin} checked={isAdmin} name="isAdmin" onChange={(ev) => setIsAdmin(ev.target.value)} />
                </div>
                <button className="login-signup-btn">Save!</button>
            </form>
        </div>
    </div>
)
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    // onUpdate
}

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)
