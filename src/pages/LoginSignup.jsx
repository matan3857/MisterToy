import React, { useState } from 'react'
import { connect } from 'react-redux'
import { onLogin, onLogout, onSignup } from '../store/user.actions.js'

function _LoginSignup(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        if (username.trim() && password.trim()) {
            let res
            if (!isLogin) {
                res = props.onSignup({ username, password, fullname });
            } else {
                res = await props.onLogin({ username, password });
            }
            if (res) props.history.push("/");
        }
    };

    return (
        <div className="login-signup">
            <div className="login-container flex column">
                <p>{isLogin ? 'Log in ' : 'Sign up '} to Mister Toy</p>
                <form className="login-form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(ev) => setUsername(ev.target.value)}
                        placeholder="Username"
                        autoFocus
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        placeholder="Enter Password"
                    />
                    {!isLogin &&
                        <input
                            type="text"
                            value={fullname}
                            onChange={(ev) => setFullname(ev.target.value)}
                            placeholder="Fullname"
                        />}
                    <button className="login-signup-btn">{isLogin ? 'Login!' : 'SignUp!'}</button>
                </form>

                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Or sign up..." : "Back to Login"}
                </p>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout
}

export const LoginSignup = connect(null, mapDispatchToProps)(_LoginSignup)