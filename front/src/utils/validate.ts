type UserInformation = {
  email: string,
  password: string
}

function validateUser(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.'
  }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자의 숫자와 영문으로 입력해주세요.'
  }

  return errors
}

function validateLogin(values: UserInformation) {
  return validateUser(values)
}

function validateSignup(values: UserInformation & {passwordConfirm: string}) {
  const errors = validateUser(values)
  const signupErrors = {...errors, passwordConfirm: ''}

  if (values.password != values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
  }

  return signupErrors
}

export {validateLogin, validateSignup}