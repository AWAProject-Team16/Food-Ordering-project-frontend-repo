import React from 'react'
import ShoppingCartProduct from './ShoppingCartProduct'
import styles from './../css/ProductArea.module.css'

const ProductArea = props => {
    return <div className={styles.ProductArea}>
        <div className={styles.ProductAreaTitle}>
            All products
        </div>
        {
            props.Products.map(i => <ShoppingCartProduct {...i} 
                                    IncreaseAmount={props.IncreaseAmount} 
                                    DecreaseAmount={props.DecreaseAmount}
                                    DeleteProduct={props.DeleteProduct}
                                    key={ i.id }
                                    />)
        }
        <div className={styles.ProductTotal}>
            Total cost of all products: {props.ProductCosts} €
        </div>
    </div>
}

export default ProductArea

