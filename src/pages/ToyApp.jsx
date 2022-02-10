import React from 'react'
import { connect } from 'react-redux'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { AddToy } from '../cmps/AddToy.jsx'
import { loadToys, onAddToy, handleChange, onEditTodo, onRemoveToy } from '../store/toy.actions.js'

class _ToyApp extends React.Component {
    state = {
        isAddShown: false
    }

    componentDidMount() {
        this.props.loadToys(this.props.filterBy)
    }
    onRemoveToy = (toyId) => {
        this.props.onRemoveToy(toyId)
    }
    onAddToy = async (toy) => {
        await this.props.onAddToy(toy)
        this.props.loadToys(this.props.filterBy)
        this.onToggleAdd()
    }
    onToyDetails = (toyId) => {
        this.props.history.push(`/details/${toyId}`)
    }
    onEditToy = (todoId) => {
        this.props.history.push(`/edit/${todoId}`)
    }

    onHandleChange = (event) => {
        this.props.handleChange(event, this.props.filterBy)
    }

    onToggleAdd = () => {
        this.setState({ isAddShown: !this.state.isAddShown })
    }

    render() {
        const { toys, user } = this.props
        const { isAddShown } = this.state
        if (!toys) return <div>Loading...</div>
        return (
            <main className="toy-app-container">
                <ToyFilter handleChange={this.onHandleChange} />
                <button className="btn-add-toy" onClick={this.onToggleAdd}>Add Toy</button>
                {isAddShown && <AddToy onAddToy={this.onAddToy} />}
                <ToyList user={user} toys={toys} onRemoveToy={this.onRemoveToy} onEditToy={this.onEditToy} onToyDetails={this.onToyDetails} />
            </main>

        )
    }
}


function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        filterBy: state.toyModule.filterBy,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadToys,
    onAddToy,
    onRemoveToy,
    handleChange
}


export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)


//{/* <button className="btn-add-toy" onClick={this.onAddToy}>Add Toy</button> */}