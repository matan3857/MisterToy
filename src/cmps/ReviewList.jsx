import React from 'react'
import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList(props) {
    const { reviews, onRemoveReview, user } = props
    if (!reviews) return <div>No Reviews yet..</div>

    return (
        <div className="review-list">
            {reviews.map(review => <ReviewPreview key={review._id} review={review} onRemoveReview={onRemoveReview} user={user} />)}
        </div>
    )
}



