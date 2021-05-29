import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckOutSteps from "../components/CheckOutSteps";
import { ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS } from "../constants/orderConstants";
function OrderScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  if (!shipping.address) {
    props.history.push("/shipping");
  }
  else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  useEffect(() => {
    dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4> </CheckOutSteps>
        <div className="placeorder">
          <div className="placeorder-info">
            <div>
              <h3>Shipping</h3>
              <div>
                {cart.shipping.address}, {cart.shipping.city},
                {cart.shipping.postalCode}, {cart.shipping.country}
              </div>
              <div>
                <h3>Payment</h3>
                <div>Payment Method: {cart.payment.paymentMethod}</div>
              </div>
            </div>
            <ul className="cart-list-container">
                <li>
                  <h3>Shopping Cart</h3>
                  <div>Price</div>
                </li>
                {cartItems.length === 0 ? (
                  <div>Your cart is empty.</div>
                ) : (
                  cartItems.map((item) => (
                    <li key={item._id}>
                      <div className="cart-item-container">
                        <div className="cart-image">
                          <img src={item.image} alt="product" />
                        </div>
                        <div className="cart-name">
                          <div>
                            <Link to={"/product/" + item.productId}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            Qty:
                            {item.qty}
                          </div>
                        </div>
                        <div className="cart-price">${item.price}</div>
                      </div>
                    </li>
                  ))
                )}
             </ul>
          </div>
      
        <div className="placeorder-action">
          <ul>
            <li>
              <button onClick={placeOrderHandler} className="button primary full-width"> Place Order</button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>
                Items
              </div>
              <div>
                ${itemsPrice}
              </div>
            </li>
            <li>
              <div>
                Shipping
              </div>
              <div>
                ${shippingPrice}
              </div>
            </li>
            <li>
              <div>
                Tax
              </div>
              <div>
                ${taxPrice}
              </div>
            </li>
            <li>
              <div>
                Order Total
              </div>
              <div>
                ${totalPrice}
              </div>
            </li>
          </ul>
         </div>
        </div>
    </div>
  );
}

export default PlaceOrderScreen;
