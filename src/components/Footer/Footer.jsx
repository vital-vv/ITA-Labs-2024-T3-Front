import Facebook from '../../assets/svg/Facebook';
import Instagram from '../../assets/svg/Instagram';
import Leaf from '../../assets/svg/Leaf';
import Mail from '../../assets/svg/Mail';
import Telegram from '../../assets/svg/Telegram';
import classes from './Footer.module.scss';

function Footer() {
  return (
    <div className={classes.footer}>
      <div>
        <p className={classes.logo}>
          <span>
            <Leaf/>
          </span>
          <span>Agroex</span>
        </p>
        <p className={classes.rights}>2022 AGROEX. All rights received.</p>
      </div>
      <div className={classes.about}>
        <div>
          <p>PORTAL</p>
          <p>About Agroex</p>
          <p>Category map</p>
          <p>Cookie files</p>
        </div>
        <div>
          <p>RESOURCES</p>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
        <div>
          <p>RESOURCES</p>
          <p>Support</p>
          <p>Help</p>
        </div>
      </div>
      <div className={classes.networks}>
        <span className={classes.contact}>
          <span>
            <Mail/>
          </span>
          <span>Contact us</span>
        </span>
        <span>
          <Telegram/>
        </span>
        <span>
          <Instagram/>
        </span>
        <span>
          <Facebook/>
        </span>
      </div>
    </div>
  );
}

export default Footer;