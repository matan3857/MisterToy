import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'
// import { reviewService } from '../services/review.service.js'
import { loadReviews, addReview, removeReview } from '../store/review.actions.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { ChatApp } from '../cmps/ChatApp.jsx';


function Popup(props) {
    return (
        <section className="popup">

            <div className="header">
                <h2>Welcome to chat</h2>
            </div>

            <div className="main">
                {props.children}
            </div>

            <div className="footer">
                <p>press Esc key to exit</p>
            </div>

        </section>
    )
}

export class _ToyDetails extends React.Component {
    state = {
        toy: null,
        isShown: false
    }

    componentDidMount = async () => {
        const { toyId } = this.props.match.params
        const toy = await toyService.getById(toyId)
        this.setState(prevState => ({ ...prevState, toy }))
        document.body.addEventListener("keydown", this.escFunction, false);

        //LOAD REVIEW
        this.props.loadReviews({toyId})
    }
    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.escFunction, false);
    }
    setShown = () => {
        this.setState({ isShown: true })
    }
    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState(prevState => ({ ...prevState, isShown: false }))
        }
    }
    onAddReview = (review) => {
        this.props.addReview(review)
    }
    onRemoveReview = async reviewId => {
        await this.props.removeReview(reviewId)
      }

    render() {
        const { toy, isShown } = this.state
        const { reviews, user } = this.props
        if (!toy) return <div>Loading from Toy Details...</div>
        return (
            <article className="toy-details">
                <div className="item-pane">
                    <div className="item-preview">
                        <img src={`https://robohash.org/Talking Doll${toy.name}`} />
                    </div>

                    <div className="item-details">
                        <h1>{toy.name}</h1>
                        <h1>Created At: {utilService.formateDate(toy.createdAt)}</h1>
                        <h1>Is in stock: {toy.inStock ? 'Yes' : 'No'}</h1>
                        <h1>Price: {toy.price}$</h1>
                        <h1>Labels: {toy.labels.join(' , ')}</h1>
                    </div>
                </div>
                <ReviewAdd toy={toy} onAddReview={this.onAddReview} />
                <section className="toy-details-btns-section">
                    <Link className="btn-action back-btn" to="/toy">Back to Toys</Link>
                    <button className="btn-action chat-btn" onClick={this.setShown}>Open Chat</button>
                </section>

                <ReviewList toy={toy} reviews={reviews} onRemoveReview={this.onRemoveReview} user={user}/>
                {isShown && <Popup><ChatApp toyId={toy._id} username={user.username}/></Popup>}
            </article>
        )
    }
}

function mapStateToProps(state) {
    return {
        reviews: state.reviewModule.reviews,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadReviews,
    addReview,
    removeReview,
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)

