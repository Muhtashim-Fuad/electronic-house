import React from 'react';
import RatingStar from './RatingStar';


export default function Rating(context)
{
    const rateValue = Math.min(Math.max(context.ratingValue, 0), 5);
    return <div className="rating-container">
        <RatingStar type={rateValue >= 0.5 ? "star-fill" : "star-void"} className={rateValue >= 0.5 ? "rating-fill" : "rating-hollow"}/>
        <RatingStar type={rateValue >= 1.5 ? "star-fill" : "star-void"} className={rateValue >= 1.5 ? "rating-fill" : "rating-hollow"}/>
        <RatingStar type={rateValue >= 2.5 ? "star-fill" : "star-void"} className={rateValue >= 2.5 ? "rating-fill" : "rating-hollow"}/>
        <RatingStar type={rateValue >= 3.5 ? "star-fill" : "star-void"} className={rateValue >= 3.5 ? "rating-fill" : "rating-hollow"}/>
        <RatingStar type={rateValue >= 4.5 ? "star-fill" : "star-void"} className={rateValue >= 4.5 ? "rating-fill" : "rating-hollow"}/>
        <div className="rating-text">({context.reviewCount})</div><br/>
    </div>
}