import React from 'react'
import {Link} from 'react-router-dom'

export default function ManagerView() {


    return (
        <div>
            <h1>Manager view</h1>
            <>
            <div>
            <Link to ="/managers/orders"> Check orders</Link>
            </div>
            <div>
            <Link to ="/managers/restaurants/create"> Create restaurant </Link>
            </div>
            <div>
            <Link to ="/managers/products/create"> Create product </Link>
            </div>
              </>
        </div>
    )
}
