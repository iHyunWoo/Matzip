import React, { useRef, useState } from "react"
import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native"
import InputField from "../../components/common/InputField.tsx";
import CustomButton from "../../components/common/CustomButton.tsx";
import useForm from "../../hooks/useForm";
import { validateLogin } from "../../utils";
import useAuth from "../../hooks/queries/useAuth";

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null)
  const {loginMutation} = useAuth()
  const login = useForm({
    initialValue: {
      email: '',
      password: ''
    },
    validate: validateLogin,
  })

  const handleSubmit = () => {
    console.log('values', login.values)
    loginMutation.mutate(login.values)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          returnKeyType="next"
          onSubmitEditing={()=>passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
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
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
