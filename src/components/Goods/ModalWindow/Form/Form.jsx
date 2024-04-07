import styles from './Form.module.scss';
import { Formik, Form } from 'formik';
import { Input } from './Input.jsx';
import { betsFormInitialValues, schemas } from './helper.js';
import { Button } from './Button.jsx';
import { useSelector } from 'react-redux';

function ModalForm({ minValue, maxValue, onClose, quantity }) { 
  const {currencyThisSession} = useSelector(state=> state.currentUser)

  return (
    <Formik
      initialValues={betsFormInitialValues}
      validationSchema={schemas.custom(minValue, maxValue)}
    >
      {(formik) => {
        return (
          <Form className={styles.form}>
            <Input
              disabled={true}
              label="Quantity"
              name="quantity"
              id="quantity"
              placeholder={quantity}
            />
            <Input
              label="Total amount"
              name="totalAmount"
              id="totalAmount"
              placeholder="Enter your bet here"
            />
            {formik.isValid && (
              <div className={styles.label}>
                From {currencyThisSession} {minValue.toFixed(2)} to {currencyThisSession} {maxValue}
              </div>
            )}
            <Button
              btnText={'Bet'}
              isDirty={formik.dirty}
              isValid={formik.isValid}
              onClose={onClose}
            ></Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export { ModalForm };
