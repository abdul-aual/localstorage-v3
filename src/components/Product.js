import React from 'react';
import './product.css';
const Product = ({ pdData,handleClickBtn,inc,dec}) => {
    const { Nm, MRP, Sp,clicked,id,quantity } = pdData;
    return (
        <div className='product-main-div'>
            <div className='product-second-div'>
                <h4>{Nm}</h4>
                <p>{Sp}</p>
                <p>Price: {MRP}</p>
                <button className={`add-to-bag-btn ${clicked?'clicked':''}`}
                    onClick={clicked? null:()=>handleClickBtn(id)}
                >
                    {
                        clicked? (
                            <>
                            <span  className='dec' onClick={()=>dec(id)}>-</span>
                            <span className='qty'>{quantity}</span>
                            <span className='inc' onClick={()=>inc(id)} >+</span>
                            </>
                        ):(
                            'Add to Bag'
                        )
                    }
                    
                </button>
            </div>
        </div>
    );
};

export default Product;