import React from 'react'
import { connect } from 'react-redux'

import logo from '../assets/img/logo.png'
// import home_bg from '../assets/img/home-img.jpg'

class _HomePage extends React.Component {
    state = {}

    render() {
        const { user } = this.props
        return (
            <section className="home-page">

                {!user && <h1>Welcome to Mister-Toy!</h1>}
                {user && <section className="user-info">
                    <h1>Hello {user.fullname} Welcome back to Mister Toy!</h1>
                </section>}
                <img src={logo} alt="Logo" />
                {/* <img src={home_bg} alt="bg" /> */}
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)