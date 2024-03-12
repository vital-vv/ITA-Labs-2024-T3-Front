import styles from './Form.module.scss';

import {Formik, Form} from 'formik';
import {Input} from './Input.jsx';

import {betsFormInitialValues, schemas} from "./helper.js";
import {Button} from "./Button.jsx";

function ModalForm({minValue, maxValue, id}) {

    minValue = (minValue * 10000 + 1).toLocaleString('ru');
    maxValue = (maxValue * 10000 - 1).toLocaleString('ru');

    return (
        <Formik
            initialValues={betsFormInitialValues}
            validationSchema={schemas.custom}
            onSubmit={(values) => console.log(values)}
        >
            {formik => {
                return (
                    <Form className={styles.form}>
                        <Input disabled={true} label="Quantity" name="quantity" id="quantity" placeholder="10000 kg"/>
                        <Input label="Total amount" name="totalAmount" id="totalAmount"
                               placeholder="Enter your bet here" />
                        {formik.isValid &&
                            <div className={styles.label}>
                                From ${minValue} to ${maxValue}
                            </div>
                        }
                        <Button btnText={'Bet'} isDirty={formik.dirty} isValid={formik.isValid} id={id}></Button>
                    </Form>
                )
            }}

        </Formik>
    );
}

export {ModalForm};
