import './Cart.css';
import { useLocation } from 'react-router-dom';
import Navigationbar from '../../components/NavigationBar/Navigationbar'
import { useMutation } from '@apollo/client';
import { ADD_ORDER_MUTATION } from '../../queries/OrderQueries';
import { useEffect, useState } from 'react';


function Cart() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(cartFromLocalStorage);

  const location = useLocation();
  const items = location.state.items;

  let cartTotal = 0;
  let itemIds = [];

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const [addOrder, { data }] = useMutation(ADD_ORDER_MUTATION, {onCompleted: (data) => console.log(data)});

  const handleCheckout = () => {    
    addOrder({
        variables: {
          items: itemIds
        }
    });

    if (data.addOrder.status === "Success") {
      console.log(true)
      localStorage.setItem("cart", [])
      setCart([])
    }
  }

  return (
    <div>
      <Navigationbar />

      <h2>Items in Cart</h2>
      { items.map((item, index) => 
        <div className='item-container'>
          {cartTotal += item.disc.price} {itemIds.push(item.disc.id)}
          {item.disc.name}    ${item.disc.price}
        </div>
      )}
      {cartTotal}
      <button className='checkout-button' onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Cart