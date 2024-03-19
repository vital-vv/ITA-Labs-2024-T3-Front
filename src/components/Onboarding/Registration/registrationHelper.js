import * as Yup from 'yup';

export const registrationFormInitialValues = {
    name: '',
    lastName: '',
    currency: '',
    countryCode: '+375',
    phoneNumber: null,
    avatar: null,
}

export const registrationValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').matches(/^[A-Za-zА-Яа-яЁё]+$/, 'This field must contains only letters'),
    lastName: Yup.string().required('Last Name is required').matches(/^[A-Za-zА-Яа-яЁё]+$/, 'This field must contains only letters'),
    phoneNumber: Yup.string().matches(/^[0-9]*$/, 'Номер телефона должен содержать только цифры').matches(/^\d{9}$/, 'Phone number must be 10 digits'),
    currency: Yup.string().required('Currency is required'),
});