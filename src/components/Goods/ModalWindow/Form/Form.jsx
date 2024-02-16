import styles from './Form.module.scss';

import {Formik, Form} from 'formik';
import {Input} from './Input.jsx';

import {betsFormInitialValues, schemas} from "./helper.js";
import {Button} from "./Button.jsx";

function ModalForm() {
    return (
        <Formik
            initialValues={betsFormInitialValues}
            validationSchema={schemas.custom}
            onSubmit={() => console.log('success')}
        >
            {formik => {
                return(
                    <Form className={styles.form}>
                        <Input disabled={true} label="Quantity" name="quantity" id="quantity" placeholder="10000 kg"/>
                        <Input label="Total amount" name="totalAmount" id="totalAmount" placeholder="Enter your bet here"/>
                        <Button isValid={formik.isValid}>Bet</Button>
                    </Form>
                )
            }}

        </Formik>
    );
}

export {ModalForm};
