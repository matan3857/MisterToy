import React, { Component } from 'react';
import Select from 'react-select';

export class AddToy extends Component {
    state = {
        toy: {
            name: '',
            price: '',
            labels: [],
        },
        options: [],

    }

    componentDidMount() {
        this.loadLabels()
    }

    loadLabels() {
        const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
        const options = labels.map(label => {
            return { value: label.toLowerCase(), label }
        })
        this.setState((prevState) => ({ ...prevState, options }))
    }

    handleChange = (ev) => {
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        const field = ev.target.name;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [field]: value } }))
    }

    handleSelectChange = (ev) => {
        const value = ev;
        if (value.length > 3) return;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, labels: value } }))
    }

    render() {
        const { toy, options } = this.state
        const { onAddToy } = this.props
        return (
            <form className="add-toy">
                <div className='label-container flex'>
                    <label htmlFor="name">
                        <input type="text" name="name"
                            placeholder="Enter toy name " id="name"
                            value={toy.name} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="price">
                        <input type="number" name="price"
                            placeholder="Enter toy price" id="price"
                            value={toy.price} onChange={this.handleChange} />
                    </label>
                </div>

                <Select
                    closeMenuOnSelect={false}
                    className="select"
                    value={toy.labels}
                    isMulti
                    onChange={this.handleSelectChange}
                    options={options}
                    placeholder="Choose up to 3 labels" />

                <button type="submit" className="btn-add" onClick={(event) => {
                    event.preventDefault();
                    onAddToy(toy)
                }}>
                    <span className="fas fa-plus"></span>
                </button>
            </form>
        )
    }
}