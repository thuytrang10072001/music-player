import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required('Tên là bắt buộc'),
    email: Yup.string()
        .trim()
        .email('Email không hợp lệ')
        .required('Email là bắt buộc'),
    password: Yup.string()
        .trim()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .required('Mật khẩu là bắt buộc')
        .test(
            'no-spaces',
            'Mật khẩu không được chứa khoảng trắng',
            (value) => !/\s/.test(value)
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
        .required('Xác nhận mật khẩu là bắt buộc')
})

export { RegisterSchema }