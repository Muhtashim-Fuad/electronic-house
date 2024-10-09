import React from "react";

export default function CartOrderSummary(
    {
         productCost,
         shippingCost, 
         taxAmount,
         onProceedToCheckout,
         onContinueShopping
    })
{
    return <>
        <div className="cart-summary-header">Order Summary</div><br/>
            <div className="cart-text">
                <div>
                    <div>Product Cost:</div>
                    <div>${productCost}</div>
                </div>
                <div>
                    <div>Shipping Cost:</div>
                    <div>${shippingCost}</div>
                </div>
                <div>
                    <div>Estimated Tax:</div>
                    <div>${taxAmount}</div>
                </div>
                <hr/>
                <b><div>
                    <div>Total Cost:</div>
                    <div>$
                        {
                            Number(
                            Number(productCost) +
                            shippingCost + 
                            taxAmount)
                            .toFixed(2)
                        }
                    </div>
                </div></b>
            </div>
            <div className="cart-button-container">
                <div 
                    className="cart-button button-secondary button-generic"
                    onClick={onProceedToCheckout}>
                    Proceed To Checkout
                </div>
                <div 
                    className="cart-button button-secondary button-generic"
                    onClick={onContinueShopping}>
                    Continue Shopping
                </div>
            </div>
    </>
}