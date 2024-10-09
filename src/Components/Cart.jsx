import React from 'react';
import CartItem from './CartItem';
import CartOrderSummary from './CartOrderSummary';

export default function Cart(
    {
        cartItems, 
        onContinueShopping, 
        onProceedToCheckout,
        onIncreaseProductAmountOnCart,
        onDecreaseProductAmountOnCart,
        onDeleteCartItem
    })
{
    const totalProductCost = getTotalCost();

    function getTotalCost()
    {
        
        return cartItems.reduce((totalCost, currentProduct) =>
        (totalCost + 
        ((currentProduct.Price * (1 - 
        (isNaN(currentProduct.Discount) ? 0 : currentProduct.Discount))) * 
        currentProduct.quantity)), 0)
        .toFixed(2);
    }

    function createCartItem(cartItemData)
    {
        return <CartItem 
            {...cartItemData}
            key={cartItemData.ProductID}
            onIncreaseButtonClick={onIncreaseProductAmountOnCart}
            onDecreaseButtonClick={onDecreaseProductAmountOnCart}
            onDeleteCartItem={onDeleteCartItem}
        />
    }

    return <div className="cart-body">
        <div className="cart-item-header">Shopping Cart</div>
        <hr className="cart-hr" />
        <div>
            <div className="cart-container">
                {
                    cartItems.map(createCartItem)
                }
            </div>
            <div className="cart-order-summary">
                <CartOrderSummary
                    productCost = {totalProductCost}
                    shippingCost = {35}
                    taxAmount = {5}
                    onContinueShopping = {onContinueShopping}
                    onProceedToCheckout = {onProceedToCheckout}
                />
            </div>
        </div>
        <hr className="cart-hr" />
    </div>
}