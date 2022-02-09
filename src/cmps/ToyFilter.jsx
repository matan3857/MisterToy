import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

export class ToyFilter extends React.Component {
    state = {
        selectedOptions: [],
    };

    options = [
        { value: 'On wheels', label: 'On wheels' },
        { value: 'Box game', label: 'Box game' },
        { value: 'Art', label: 'Art' },
        { value: 'Baby', label: 'Baby' },
        { value: 'Doll', label: 'Doll' },
        { value: 'Puzzle', label: 'Puzzle' },
        { value: 'Outdoor', label: 'Outdoor' },
    ];

    handleChangeSelect = (event) => {
        this.setState({ selectedOptions: event.map(option => option) }, () => {
            this.props.handleChange(event);
        });
    };

    render() {
        const { handleChange } = this.props
        const { selectedOptions } = this.state
        return (
            <form className="toy-filter-container" onSubmit={(ev) => { ev.preventDefault(); }}>
                <div className='filter-options'>
                    <div className='filter-option'>
                        <input type='search' name='name' className="toy-input" placeholder='Filter by toy name' onChange={handleChange} /><br />
                    </div>

                    <div className='filter-option'>
                        <label>In Stock</label>
                        <input type="radio" value={true} name="inStock" onChange={handleChange} />
                        <label>All</label>
                        <input type="radio" value={false} name="inStock" onChange={handleChange} />
                    </div>

                    <div className='filter-option'>
                        <select className="filter-toy" onChange={handleChange} name='sortBy'>
                            <option value='all'>All</option>
                            <option value='name'>Name</option>
                            <option value='date'>Date</option>
                            <option value='price'>Price</option>
                        </select>
                    </div>
                </div>
                <Select
                    onChange={this.handleChangeSelect}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={selectedOptions}
                    options={this.options}
                />
            </form >
        )
    }
}
