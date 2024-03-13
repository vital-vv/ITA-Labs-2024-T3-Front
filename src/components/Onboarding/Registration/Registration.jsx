import styles from './Registration.module.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useState} from "react";
import {registrationFormInitialValues, registrationValidationSchema} from "./registrationHelper.js";
import {useNavigate} from "react-router-dom";

function Registration() {

    const navigate = useNavigate();

    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleSubmit = () => {
        navigate('/')
    };

    const handleAvatarChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const showAvatarPlaceholder = (values) => {
        const nameInitial = values.name ? values.name.charAt(0).toLocaleUpperCase() : '';
        const lastNameInitial = values.lastName ? values.lastName.charAt(0).toLocaleUpperCase() : '';
        return nameInitial + lastNameInitial;
    };

    const handleAvatarRemove = () => {
        setAvatarPreview(null);
    };

    return (
        <div className={styles.formContainer}>
            <Formik
                initialValues={registrationFormInitialValues}
                validationSchema={registrationValidationSchema}
                onSubmit={handleSubmit}>
                {({values}) => (
                    <Form className={styles.form}>
                        <Field autocomplete='off' placeholder="First Name" type="text" id="name" name="name"/>
                        <ErrorMessage name="name" component="span"/>

                        <Field autocomplete='off' placeholder="Last Name" type="text" id="lastName" name="lastName"/>
                        <ErrorMessage name="lastName" component="span"/>


                        <Field as="select" id="currency" name="currency">
                            <option value="">Select preferable currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </Field>
                        <ErrorMessage name="currency" component="span"/>

                        <div className={styles.phoneNumberContainer}>
                            <Field className={styles.countryCode}  as="select" id="countryCode" name="countryCode">
                                <option value="+375">+375 (BY)</option>
                                <option value="+44">+44 (UK)</option>
                            </Field>
                            <Field autocomplete='off' type="text" id="phoneNumber" name="phoneNumber"/>
                            <ErrorMessage name="phoneNumber" component="span"/>
                        </div>
                        <div>
                            {avatarPreview ? (
                                <div className={styles.avatarContainer}>
                                    <img src={avatarPreview} alt="Avatar Preview" className={styles.avatarImage}/>
                                    <div className={styles.removeIcon} onClick={handleAvatarRemove}>×</div>
                                </div>
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {showAvatarPlaceholder(values)}
                                </div>
                            )}
                            <label className={styles.downloadBtn} for="avatar">
                                Download
                            <Field type="file" id="avatar" name="avatar" onChange={handleAvatarChange}/>
                            </label>
                        </div>

                        <button className={styles.confirmBtn} type="submit">Confirm</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export {Registration};