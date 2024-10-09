import React from 'react';
import ProductCard from './ProductCard';
import ProductPanel from './ProductPanel';
import ProductList from './ProductDatabase';
import NavBar from './NavBar';
import Cart from './Cart';
import Footer from './Footer';

export default function App()
{
    const [isSearchBarEmpty, setIsSearchBarEmpty] = React.useState(true);
    const [searchBarValue, setSearchBarValue] = React.useState("");
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    const [cartItems, setCartItems] = React.useState
    (
        ProductList
        .filter(filterByOnSaleItems)
        .map(setQuantityField)
    )

    //Initialize with a limited amount of items of each type in the cart
    function setQuantityField(cartItem)
    {
        return {...cartItem, quantity: 5};
    }

    function onIncreaseButtonClick(itemID)
    {
        setCartItems(modifyQuantity(itemID, 1));
    }

    function onDecreaseButtonClick(itemID)
    {
        setCartItems(modifyQuantity(itemID, -1));
    }

    function modifyQuantity(itemID, modifyAmount)
    {
        return cartItems.map((product) =>
        {
            return {
            ...product,
            quantity: (product.ProductID === itemID) ?
            Math.max(1, product.quantity + modifyAmount) :
            product.quantity};
        });
    }

    function onAddToCartButtonClick(itemID)
    {
        const currentProductItemIndex = cartItems.findIndex((cartItem) => cartItem.ProductID === itemID);
        
        if (currentProductItemIndex < 0)
        {
            //MAY NEED REFACTORING
            const filteredCartItems = 
            ProductList.filter((product) => product.ProductID === itemID);
            filteredCartItems.forEach((product) => (product.quantity = 1));
            setCartItems([...cartItems, ...filteredCartItems]);
        }

        else
        {
            setCartItems(modifyQuantity(itemID, 1));
        }
    }

    function onDeleteCartItem(itemID)
    {
        setCartItems
        (
            cartItems.filter((cartItem) => cartItem.ProductID !== itemID)
        );
    }

    function handleContinueShopping()
    {
        console.log("Returning To Shop!");
        setIsCartOpen(false);
    }

    function handleProceedToCheckout()
    {
        console.log("Proceeding for Checkout!");
    }

    function onSearchBarValueChange(event)
    {
        setSearchBarValue(event.target.value);
        setIsSearchBarEmpty(event.target.value === "");
    }

    function createProductCard(productData)
    {
        return (
            <ProductCard 
                {...productData}
                key = {productData.ProductID}
                onAddToCartButtonClick = {onAddToCartButtonClick}
            />
        );
    }

    function filterByOnSaleItems(productData) 
    {
         return (parseFloat(productData.Discount) > 0);
    }
    
    function filterByNewItems(productData) { return productData.isNewProduct === true; }
    function filterBySearchQuery(productData)
    {
         return productData.Title.includes(searchBarValue);
    }

    return <div>
        <NavBar 
            onSearchBarValueChange={onSearchBarValueChange}
            onCartButtonClick={() => setIsCartOpen(true)}
        />
        {
            isCartOpen ?
            <Cart 
                cartItems = {cartItems}
                onContinueShopping = {handleContinueShopping}
                onProceedToCheckout = {handleProceedToCheckout}
                onIncreaseProductAmountOnCart = {onIncreaseButtonClick}
                onDecreaseProductAmountOnCart = {onDecreaseButtonClick}
                onDeleteCartItem = {onDeleteCartItem}
            /> :

            <div className="main-panel">
            {
                isSearchBarEmpty ?
                <>
                    <ProductPanel headerText="Trending New" productList={ProductList.filter(filterByNewItems).map(createProductCard)}/>
                    <ProductPanel headerText="On Sale" productList={ProductList.filter(filterByOnSaleItems).map(createProductCard)}/>
                    <Footer/>
                </> :
                <>
                    <ProductPanel 
                        headerText={"Search Results for: " + searchBarValue} 
                        productList={ProductList.filter(filterBySearchQuery).map(createProductCard)}
                    />
                </>
            }
            
            </div>
        }
    </div>
}