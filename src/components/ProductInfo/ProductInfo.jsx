import ImagesOfProduct from '../ImagesOfProduct/ImagesOfProduct'
import Description from '../Description/Description'
import classes from './ProductInfo.module.scss'

function ProductInfo() {
    return ( 
        <div className={classes.productInfo}>
            <ImagesOfProduct/>
            <Description/>
        </div>
    );
}

export default ProductInfo;