import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { onLogin, onLogout, onSignup } from '../store/user.actions.js'
import { UserMsg } from './UserMsg.jsx'
import { Hamburger } from './Hamburger.jsx'


class _AppHeader extends React.Component {

    state = {
        isHamburger: false,
        isNavOpen: false
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        (window.innerWidth < 910) ? this.setState({ isHamburger: true }) :
            this.setState({ isHamburger: false })
    }

    onLogout = () => {
        this.props.onLogout()
    }

    render() {
        const { user } = this.props
        const { isHamburger } = this.state
        return (
            <header className="main-header">
                {isHamburger && <Hamburger />}

                {!isHamburger &&
                    <div className="reg-nav">
                        <div className="logo">
                            <h1>MisterToy</h1>
                        </div>
                        <nav className="nav-header">
                            <NavLink to="/"><span>Home</span></NavLink>
                            <NavLink to="/toy"><span>Toys</span></NavLink>
                            <NavLink to="/toy/dashboard"><span>Dashboard</span></NavLink>
                            <NavLink to="/about"><span>About</span></NavLink>
                            {!user && <NavLink to="/login"><span>Login <i className="fas fa-sign-in-alt"></i></span></NavLink>}
                            {user &&  <NavLink onClick={this.onLogout} to="/"><span>Logout <i className="fas fa-sign-out-alt"></i></span></NavLink>}
                        </nav>
                    </div>
                }
                <UserMsg />
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        count: state.userModule.count
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)


{/* <NavLink to="/">Home</NavLink> |
<NavLink to="/toy">Toys</NavLink> |
<NavLink to="/toy/dashboard">Dashboard</NavLink> |
<NavLink to="/about">About</NavLink> |
<NavLink to="/login">Login</NavLink> */}