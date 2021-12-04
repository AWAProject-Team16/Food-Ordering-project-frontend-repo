import React from 'react'
import ProductCreateNew from './ProductCreateNew'
import RestaurantCreateNew from './RestaurantCreateNew'

export default function ManagerView() {


    return (
        <div>
            <h1>Manager view</h1>
            <ProductCreateNew/>
            <RestaurantCreateNew/>
        </div>
    )
}
