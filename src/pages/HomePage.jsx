import React from 'react'
import { connect } from 'react-redux'
import logo from '../assets/img/logo.png'

function _HomePage(props) {
    const { user } = props
    
    return (
        <section className="home-page">
            <h1> {user ? `Hello ${user.fullname} Welcome back` : 'Welcome'} to Mister-Toy!</h1>
            <img src={logo} alt="Logo" />
        </section >
    )
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)