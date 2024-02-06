import Check from '../../assets/svg/Check';
import Lock from '../../assets/svg/Lock';
import InputContainerUser from '../InputContainerUser/InputContainerUser';
import classes from './Account.module.scss';
import { settings } from '../dataoffilter';
import ElementForFilter from '../ElementForFilter/ElementForFilter';
import { v4 as uuidv4 } from 'uuid';
import Pencil from '../../assets/svg/Pencil';

function Account() {
  return (
    <div className={classes.userInfo}>
      <p>Personal data</p>
      <div>
        <div className={classes.userForm}>
          <div className={classes.circle}>
            SF
            <div className={classes.takePhoto}>
              <Pencil/>
            </div>
          </div>
          <InputContainerUser />
        </div>
        <div className={classes.buttonContainer}>
          <div>Cancel</div>
          <div>
            <Check />
            <p>Save changes</p>
          </div>
        </div>
      </div>
      <div className={classes.security}>
        <p>Security</p>
        <div>
          <Lock />
          <p>Change password</p>
        </div>
      </div>
      <div className={classes.settings}>
        <p>Additional settings</p>
        {settings.map((item) => {
          return <ElementForFilter key={uuidv4()} name={item} />;
        })}
      </div>
    </div>
  );
}

export default Account;
