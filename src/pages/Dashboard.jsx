import React from 'react';
import { LabelChart } from '../cmps/LabelChart.jsx'
import { PriceChart } from '../cmps/PriceChart.jsx'
import { connect } from 'react-redux'

const calcChart = (toys) => {
    const toyTypes = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'];
    const toyCounts = [];
    for (let i = 0; i < toyTypes.length; i++) {
        toyCounts.push(0);
    }
    for (let i = 0; i < toys.length; i++) {
        for (let j = 0; j < toys[i].labels.length; j++) {
            toyCounts[toyTypes.indexOf(toys[i].labels[j])]++;
        }
    }
    return toyCounts;
}

const calcPriceChart = (toys) => {
    const toyTypes = ['0 ~ 25', '26 ~ 50', '51 ~ 75', '76 ~ 100', '100+'];
    const toyCounts = [];
    for (let i = 0; i < toyTypes.length; i++) {
        toyCounts.push(0);
    }

    toys.map(toy => {
        if (toy.price < 25) toyCounts[0]++
        else if (toy.price < 50) toyCounts[1]++
        else if (toy.price < 75) toyCounts[2]++
        else if (toy.price < 100) toyCounts[3]++
        if (toy.price > 100) toyCounts[4]++
    })
    return toyCounts;
}

const _Dashboard = ({ toys }) => {

    const labelsData = calcChart(toys)
    const pricesData = calcPriceChart(toys)

    return (
        <section className='dashboard-container'>
            <h2>Toys Labels:</h2>
            <div>
                <LabelChart labelsData={labelsData} />
            </div>
            <h2>Toys Prices:</h2>
            <div>
                <PriceChart pricesData={pricesData} />
            </div>
        </section>
    )
}


function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys
    }
}

export const Dashboard = connect(mapStateToProps, null)(_Dashboard)