import BredCrumbs from '../BredCrumbs/BredCrumbs';
import classes from './LotView.module.scss';
import ProductInfo from '../ProductInfo/ProductInfo'

function LotView() {
  return (
    <div className={classes.lotView}>
      <div className={classes.bredCrumbs}>
        <BredCrumbs />
      </div>
        <ProductInfo/>
    </div>
  );
}

export default LotView;
