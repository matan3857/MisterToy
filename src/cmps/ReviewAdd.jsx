import React from 'react'
import { connect } from 'react-redux'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { Stars } from './Stars.jsx'
import ReactStars from "react-rating-stars-component";


// import SendIcon from '@mui/icons-material/Send';

export class _ReviewAdd extends React.Component {
    state = {
        review: {
            userId: '',
            toyId: '',
            content: '',
            rate: 0
        }
    }

    componentDidMount = () => {
        const { user, toy } = this.props
        let userId = ''
        if (user) userId = user._id
        const toyId = toy._id
        this.setState(prevState => ({ ...prevState, review: { ...prevState.review, userId, toyId } }))
    }

    handleChange = (ev) => {
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        const field = ev.target.name;
        this.setState((prevState) => ({ ...prevState, review: { ...prevState.review, [field]: value } }))
    }

    ratingChanged = (newRating) => {
        this.setState((prevState) => ({ ...prevState, review: { ...prevState.review, rate: newRating } }))
    };

    clearInput = () => {
        this.setState((prevState) => ({ ...prevState, review: { ...prevState.review, content: '' , rate : 0} }))
    }

    render() {
        const { user, onAddReview } = this.props
        const { review } = this.state
        return (
            <div className="review-add">
                {user &&
                    <form className="add-review-form">
                        <h2>Hello {user.username} please add a review</h2>
                        <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={40}
                            activeColor="#ffb400"
                            value={this.state.review.rate}
                        />
                        <TextField
                            id="content"
                            label="Add Content Here..."
                            name="content"
                            multiline
                            rows={7}
                            value={review.content}
                            onChange={this.handleChange}
                        /><br />
                        <Button variant="contained" type="submit" onClick={(event) => {
                            this.clearInput()
                            event.preventDefault();
                            onAddReview(review)
                        }}>
                            Send
                        </Button>

                    </form>//endIcon={<SendIcon />}
                }
                {!user && <h3>Please login to add a review</h3>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {}

export const ReviewAdd = connect(mapStateToProps, mapDispatchToProps)(_ReviewAdd)

