export const userNameValidator = (text: string) => {
    // eslint-disable-next-line no-useless-escape
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
    return format.test(text)
}