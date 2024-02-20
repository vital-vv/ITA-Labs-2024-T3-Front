import * as Yup from 'yup';

export const betsFormInitialValues = {
    quantity: "",
    totalAmount: "",
}

const regx = {
    name: /^([1-9]|[1-2][\d]|3[0-2])$/,
}

const totalAmount = Yup.string()
    .matches(regx.name, "You should enter a number from the range")
    .required("Enter your bet")

export const schemas = {
    custom: Yup.object().shape({
        totalAmount,
    })
}