import React from 'react'
import { connect } from 'react-redux'


import { reviewService } from '../services/review.service.js';
import { ReviewPreview } from './ReviewPreview.jsx'


export class ReviewList extends React.Component {
    state = {}

    // async componentDidMount() {
    //     try {
    //         // const reviews = await reviewService.query({toyId : this.props.toy._id})
    //         // this.setState({ reviews })
    //     } catch (err) {
    //         console.log('cannot load reviews form sever', err);
    //     }
    // }

    //FOR CHECK REVIEWS
    render() {
        const { reviews, onRemoveReview, user } = this.props
        console.log('ALL reviews in ReviewList',reviews)
        if (!reviews) return <div>No Reviews yet..</div>

        return (
            <div className="review-list">
                {reviews.map(review => <ReviewPreview key={review._id} review={review} onRemoveReview={onRemoveReview} user={user}/>)}
            </div>
        )
    }
}



