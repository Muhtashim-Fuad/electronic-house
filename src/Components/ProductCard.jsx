import React from 'react';
import Rating from './Rating';

export default function ProductCard(productData)
{
    var productPrice = Number(productData.Price);
    var productDiscount = parseFloat(productData.Discount);

    var discountedProductPrice = (productPrice - productDiscount * productPrice).toFixed(2);
    
    return <div className="product-card">
        <div className="product-image">
            <img src= {process.env.PUBLIC_URL + productData.Cover}/>
        </div>
        <div className="product-info">
            <div className="product-title">{productData.Title}</div>
            {
                isNaN(productDiscount) === true ?
                <div className="product-text-info">${productPrice}</div> :
                <div className="product-text-info">
                        <span style={{color: "#656565", textDecoration: "line-through"}}>${productPrice}</span>
                        <span>
                            ${discountedProductPrice}
                            <span className="discount-percentage"> (-{productDiscount * 100}%)</span>
                        </span>
                </div>
            }
            {
                productData.isOutOfStock ?
                    <div className="product-text-info" style={{color:"red"}}>
                        Out of Stock
                    </div>:
                    <div className="product-text-info" style={{color:"green"}}>
                        In Stock
                    </div>
            }
            
        </div>
        {productData.isNewProduct ? <NewProduct/> : null}
        {isNaN(productDiscount) ? null : <DiscountProduct/>}
        <Rating ratingValue={productData.Rating} reviewCount={productData.ReviewCount}/>
        {
            productData.isOutOfStock ?
            null :
            <AddToCartButton onClick={() => productData.onAddToCartButtonClick(productData.ProductID)}/>
        }
        
    </div>
}

function AddToCartButton({ onClick })
{
    return <div className="button-primary button-generic" onClick={onClick} disabled >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>
        Add To Cart
    </div>
}

function NewProduct()
{
    return <div className="new-product">
        New
    </div>
}

function DiscountProduct()
{
    return <div className="discounted-product">On Sale</div>
}