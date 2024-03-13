import * as Yup from 'yup';

export const betsFormInitialValues = {
    quantity: "",
    totalAmount: "",
}

export const schemas = {
    custom: (minValue, maxValue) => Yup.object().shape({
        totalAmount: Yup.number()
            .min(minValue, `Minimal Value - ${minValue}`)
            .max(maxValue, `Maximal Value - ${maxValue}`)
            .required("Enter your bet"),
    })
}