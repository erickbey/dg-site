import './Cart.css';
import Navigationbar from '../../components/NavigationBar/Navigationbar'
import { useMutation } from '@apollo/client';
import { ADD_ORDER_MUTATION } from '../../queries/OrderQueries';
import { useEffect, useState } from 'react';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';


function Cart() {
  const items = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(items);

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    JSON.parse(localStorage.getItem("cart") || "[]")
  }, [cart])

  

  const handleRemoveFromCart = (itemId) => {
    console.log("Item removed from cart")
    const index = cart.findIndex(item => {
      return item.disc.id === itemId
    });
    if (index > -1) { 
      cart.splice(index, 1)
    }
    setCart(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  let cartTotal = 0;
  let itemIds = [];
  
  cart.map(item => {
    itemIds.push(item.disc.id)
    cartTotal += item.disc.price
    return true
  });

  const [addOrder, { data }] = useMutation(ADD_ORDER_MUTATION, {onCompleted: (data) => {
    console.log(data)
      if (data.addOrder.status === "Success") {
        setCart([])
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    }});

  const handleCheckout = () => {    
    addOrder({
        variables: {
          items: itemIds
        }
    });
  }
  
  useEffect(() => {
    if(data){
      if(data.addOrder.status === 'Success'){
        setSuccess(true);
      };
    }
  }, [data])

  return (
    <div className='cart-page-container'>
      <Navigationbar />

      <h2>Items in Cart</h2>
      <div className='centering-div'>
      {success ? <SuccessMessage message={'Order executed successfully'} /> : null}
        <div className='all-items-container'>
          { cart.map((item, index) => 
            <div className='item-container'>
              <h2 className='disc-info'>{item.disc.name}    ${item.disc.price}</h2>
              <img
                  className="cart-disc-image"
                  src={require(`../../images/${item.disc.image}`)}
                  alt="disc"
                />
                <button type="submit" className='cart-button' onClick={() => handleRemoveFromCart(item.disc.id)}>Remove From Cart</button>
            </div>
          )}
          <h3>Total: ${cartTotal}</h3>
          <button className='checkout-button' onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart