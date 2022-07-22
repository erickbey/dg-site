import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Navigationbar from '../../components/NavigationBar/Navigationbar';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { ADD_REVIEW_MUTATION, GET_DISC_REVIEWS } from '../../queries/ReviewQueries';
import { ADD_TO_WISHLIST_MUTATION, DELETE_FROM_WISHLIST_MUTATION, GET_USER } from '../../queries/UserQueries';
import { GET_ONE_DISC } from '../../queries/DiscQueries';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import ('./DetailedProduct.css');



function DetailedProduct() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState("");
  const [userWishlist, setUserWishlist] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [cartMessageShow, setCartMessageShow] = useState(false);

  
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(cartFromLocalStorage);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, userWishlist])

  const location = useLocation();
  const state = location.state.disc.id

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addReview] = useMutation(ADD_REVIEW_MUTATION, {
      refetchQueries: [{ query: GET_DISC_REVIEWS }]}, {onCompleted: (data) => console.log(data)
    })
    
  const [addToWishlist] = useMutation(ADD_TO_WISHLIST_MUTATION, {
    onCompleted: (data) => {
      console.log(data)
      if (data.addToWishlist.status === 'Success') {
        window.location.reload();
      }
    }
      
  })

  const [deleteFromWishlist] = useMutation(DELETE_FROM_WISHLIST_MUTATION, {
    onCompleted: (data) => {
      console.log(data)
      if (data.deleteFromWishlist.status === 'Success') {
        setUserWishlist([])
      }}
  })

  const handleAddToWishlist = () => {
    addToWishlist({
      variables: {
        input: state
      }
    })
  }

  const handleRemoveFromWishlist = () => {
    deleteFromWishlist({
      variables: {
        input: state
      }
    })
  }

  const handleCartMessageShow = () => {
    setCartMessageShow(true)
  
    setTimeout(() => {
       setCartMessageShow(false)
    }, 2000)
  }

  const handleAddToCart = () => {
    console.log("Item added to cart")
    setCart([...cart, data])
    
    handleCartMessageShow();
  }

  const handleReviewSubmit = () => {    
    addReview({
        variables: {
          user: userId,
          disc: data.disc.id,
          title, 
          comment, 
          rating: Number(rating) 
        }
    });
    handleClose()
  }

    const { loading, data } = useQuery(GET_ONE_DISC, {
      variables: {
        id: state
      } 
    })

    useQuery(GET_USER, {
      onCompleted: (userData) => {
        if(userData.user) {
          setUserId(userData.user.id);
          setUserWishlist(userData.user.wishlist)
        }
        return null
      }
    });

    useQuery(GET_DISC_REVIEWS, {
      variables: {
        discId: state
      }, onCompleted: (discReviews) => {
        setReviewsList(discReviews.reviews)
      }
    })


    const renderWishlistButton = () => {
      if (userWishlist.some(item => item.id === state)) {
        return true
      } else {
        return false
      }
    }

  if(!loading) {
    return (
      <div>
        <Navigationbar cartLength={cart.length}/>

        <div className="content-container">
          <div className="image-container">
            <img
              className="detailed-disc-image"
              src={require(`../../images/${data.disc.image}`)}
              alt="disc"
            />
          </div>
          <div className="disc-info-container">
            <h1>
              {data.disc.manufacture} {data.disc.name}
            </h1>
            <h2>{data.disc.category}</h2>
            <p>Plastic Type: {data.disc.plasticType}</p>
            <p>
              Speed:{data.disc.speed} Glide:{data.disc.glide} Turn:
              {data.disc.turn} Fade:{data.disc.fade}{" "}
            </p>
            
            <div className='buttons-container'>
              <button type="submit" className='cart-button' onClick={handleAddToCart}>Add to Cart</button>
              {renderWishlistButton() 
                ? <button type="submit" className='wishlist-button' onClick={handleRemoveFromWishlist}>Remove from Wishlist</button> 
                : <button type="submit" className='wishlist-button' onClick={handleAddToWishlist}>Add to Wishlist</button>
              }
          </div>
              
          </div>
          
          {cartMessageShow
            ? <SuccessMessage message={'Item added to cart'} />
            : <div></div>
          }
        </div>

        <div className="reviews-container">
          <h2>Reviews</h2> 

          { reviewsList.map((review, index) =>
            (review.disc.id === state) ?
            <div className='reviews-list'>
              <p><strong>{review.user.userName}</strong></p>
              <Rating name="read-only" value={review.rating} readOnly />
              <p className='review-title'>{review.title}</p>
              <p>{review.comment}</p>
            </div>
            :
             null
          )}

          <button className='review-button' onClick={handleShow}>
            Leave A Review
          </button>

          <Modal contentClassName="my-modal"
            show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create Your Review
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <input type="text" className='review-input' title="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/><br/>
                <textarea className='review-input-textarea' title="comment" placeholder="Enter your review here..." onChange={(e) => setComment(e.target.value)}></textarea><br/>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  onChange={(e) => {setRating(e.target.value)}}
                /> <br/>
                <Button onClick={handleReviewSubmit} >Submit</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="footer-placement">
          <Footer />
        </div>
      </div>
    );
  }
}

export default DetailedProduct