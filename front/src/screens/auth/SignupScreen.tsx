import React, { useRef } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/common/InputField.tsx';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/common/CustomButton.tsx';
import { validateSignup } from '../../utils';
import { TextInput } from 'react-native-gesture-handler';
import useAuth from '../../hooks/queries/useAuth';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null)
  const passwordConfirmRef = useRef<TextInput | null>(null)
  const {signupMutation, loginMutation} = useAuth()

  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validate: validateSignup
  })

  const handleSubmit = () => {
    console.log('signup.values', signup.values)
    const {email, password} = signup.values
    signupMutation.mutate(signup.values, {
      onSuccess: () => loginMutation.mutate({email, password})
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputConatiner}>
      <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType='next'
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType='oneTimeCode'
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType='next'
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          textContentType='oneTimeCode'
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          returnKeyType='join'
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label='회원가입'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputConatiner: {
    gap: 20,
    marginBottom: 30
  }
});

export default SignupScreen;
