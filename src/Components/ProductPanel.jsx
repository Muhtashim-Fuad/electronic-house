import React from 'react';

export default function ProductPanel({ headerText, productList })
{
    return <div className="product-card-container-header">
        <div className="product-panel-header-text">{headerText}<br/><hr/></div>
        <div className="product-card-container">
        {productList}
    </div>
    </div>
}