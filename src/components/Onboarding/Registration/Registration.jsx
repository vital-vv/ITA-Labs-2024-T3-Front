import styles from './Registration.module.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useState} from "react";
import {registrationFormInitialValues, registrationValidationSchema} from "./registrationHelper.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postOnboarding} from "../../../features/currentUser/currentUserSlice.js";

function Registration() {

    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();

    function setFormData(values) {
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            first_name: values.name,
            last_name: values.lastName,
            preferred_currency: values.currency,
            phoneNumber: values.phoneNumber ? values.countryCode + values.phoneNumber : null,

        }));
        if (values.avatar) {
            formData.append('avatar', values.avatar);
        }
        return formData;
    }

    const handleSubmit = (values) => {
        values.avatar = avatar;
        const formData = setFormData(values);
        dispatch(postOnboarding(formData));
        // navigate('/');
    }

    const handleAvatarChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    const showAvatarPlaceholder = (values) => {
        const nameInitial = values.name ? values.name.charAt(0).toLocaleUpperCase() : '';
        const lastNameInitial = values.lastName ? values.lastName.charAt(0).toLocaleUpperCase() : '';
        return nameInitial + lastNameInitial;
    };

    const handleAvatarRemove = () => {
        setAvatar(null);
    };

    return (
        <div className={styles.formContainer}>
            <Formik
                initialValues={registrationFormInitialValues}
                validationSchema={registrationValidationSchema}
                onSubmit={handleSubmit}>
                {({values}) => (
                    <Form className={styles.form}>
                        <Field autoComplete='off' placeholder="First Name" type="text" id="name" name="name"/>
                        <ErrorMessage name="name" component="span"/>

                        <Field autoComplete='off' placeholder="Last Name" type="text" id="lastName" name="lastName"/>
                        <ErrorMessage name="lastName" component="span"/>

                        <Field as="select" id="currency" name="currency">
                            <option value="">Select preferable currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </Field>
                        <ErrorMessage name="currency" component="span"/>

                        <div className={styles.phoneNumberContainer}>
                            <Field className={styles.countryCode} as="select" id="countryCode" name="countryCode">
                                <option value="+375">+375 (BY)</option>
                                <option value="+44">+44 (UK)</option>
                            </Field>
                            <Field autoComplete='off' type="text" id="phoneNumber" name="phoneNumber"/>
                            <ErrorMessage name="phoneNumber" component="span"/>
                        </div>
                        <div>
                            {avatar ? (
                                <div className={styles.avatarContainer}>
                                    <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" className={styles.avatarImage}/>
                                    <div className={styles.removeIcon} onClick={handleAvatarRemove}>×</div>
                                </div>
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {showAvatarPlaceholder(values)}
                                </div>
                            )}
                            <label className={styles.downloadBtn} htmlFor="avatar">
                                Download
                                <Field type="file" accept="image/*" id="avatar" name="avatar"
                                       onChange={(event) => handleAvatarChange(event)}/>
                            </label>
                        </div>
                        <button className={styles.confirmBtn} type="submit">Confirm</button>
                    </Form>)}
            </Formik>
            <div onClick={(() => navigate('/'))} className={styles.return}>Back to homepage →</div>
        </div>
    );
}

export {Registration};