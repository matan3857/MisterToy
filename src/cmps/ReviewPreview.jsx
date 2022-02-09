import React from 'react'
import { utilService } from '../services/util.service.js'

export function ReviewPreview({ review, onRemoveReview, user }) {
    return (
        <div className="review-card">
            <h1>Name: {review.user.username}</h1>
            <h3>Date: {utilService.formateDate(review.createdAt)}</h3>
            <div className="ratings">
                {
                    [1, 2, 3, 4, 5].map((num) => <span key={num} className={`fa fa-star ${(review.rate >= num) ? 'checked' : ''}`}> </span>)
                }
            </div>
            <h3>Comment: {review.txt}</h3>
            {user && (user._id === review.userId || user.isAdmin) &&
                <button onClick={() => { onRemoveReview(review._id) }} className="review-trash-btn"><i className="fas fa-trash"></i></button>
            }
        </div>
    )
}

