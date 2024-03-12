import * as Yup from 'yup';

export const betsFormInitialValues = {
    quantity: "",
    totalAmount: "",
}

export const schemas = {
    custom: Yup.object().shape({
        totalAmount: Yup.number()
            .min(1, "Минимальное значение - 1")
            .max(32, "Максимальное значение - 32")
            .required("Введите вашу ставку"),
    })
}