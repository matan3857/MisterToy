import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { onUpdate } from '../store/user.actions'

function _UserProfile(props) {
    const { user } = props

    console.log('user', user)
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserUpdated, setIsUserUpdated] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        setUsername(user.username)
        setFullname(user.fullname)
        setIsAdmin(user.isAdmin)
    };

    const onSubmit = async (ev) => {
        ev.preventDefault()
        const userId = user._id
        let res
        res = await props.onUpdate({ userId, username, fullname, isAdmin })
        if (res) setIsUserUpdated(true)
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
                        readOnly
                    />
                    <input
                        type="text"
                        value={fullname}
                        onChange={(ev) => setFullname(ev.target.value)}
                        placeholder="Fullname"
                    />

                    <div className='flex'>
                        <label>Is Admin</label>
                        <input type="checkbox" value={isAdmin} checked={isAdmin} name="isAdmin" onChange={() => setIsAdmin(!isAdmin)} />
                    </div>
                    {isUserUpdated && <p>User updated!</p>}
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
    onUpdate
}

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)
