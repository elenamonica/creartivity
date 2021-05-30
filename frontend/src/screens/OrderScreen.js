import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
function OrderScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},
              {order.shippingAddress.country}
            </p>
            {order.isDelivered? <MessageBox variant="sucess">Delivered at {orderDetails.deliveredAt}</MessageBox> :
            <MessageBox variant ="danger"> Not Delivered</MessageBox>
            }
            <div>
              <h3>Payment</h3>
              <p><strong>Payment Method: {order.paymentMethod}</strong></p>
              {order.isPaid? <MessageBox variant="sucess">Delivered at {orderDetails.paidAt}</MessageBox> :
            <MessageBox variant ="danger"> Not Paid</MessageBox>
            }
            </div>
          </div>
          <h3>Order items:</h3>
          <ul className="cart-list-container">
            {order.orderItems.map((item) => (
              <li key={item._id}>
                <div className="cart-item-container">
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/product/" + item.productId}>{item.name}</Link>
                    </div>
                    <div>
                      Qty:
                      {item.qty}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total price:</h3>
          <div className="row">
            <strong>${order.totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
