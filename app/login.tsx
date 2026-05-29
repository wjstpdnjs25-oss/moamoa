import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const DEEP_PURPLE = '#261052';
const ERROR_RED = '#d13f3f';
const VALID_USER_ID = 'moamoa';
const VALID_PASSWORD = '1234';

export default function LoginScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    const isMatched = userId.trim() === VALID_USER_ID && password === VALID_PASSWORD;

    if (!isMatched) {
      setLoginError(true);
      return;
    }

    setLoginError(false);
    router.push('/main');
  };

  const handleChangeUserId = (value: string) => {
    setUserId(value);
    setLoginError(false);
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
    setLoginError(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <View style={styles.container}>
          <Pressable
            accessibilityLabel="뒤로 가기"
            hitSlop={12}
            onPress={() => router.back()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={26} color={DEEP_PURPLE} />
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.title}>로그인</Text>
            <Text style={styles.description}>계정 정보를 입력해주세요.</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChangeUserId}
              placeholder="아이디"
              placeholderTextColor="#9c94ac"
              style={styles.input}
              value={userId}
            />
            <TextInput
              autoCapitalize="none"
              onChangeText={handleChangePassword}
              placeholder="비밀번호"
              placeholderTextColor="#9c94ac"
              secureTextEntry
              style={styles.input}
              value={password}
            />

            {loginError ? (
              <Text style={styles.errorText}>아이디랑 비번이 일치 하지 않습니다</Text>
            ) : null}
          </View>

          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인하기</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 34,
    paddingTop: 18,
  },
  backButton: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  header: {
    marginTop: 34,
  },
  title: {
    color: '#050505',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 42,
  },
  description: {
    color: '#4a4554',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginTop: 10,
  },
  form: {
    gap: 14,
    marginTop: 42,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#c8bfd9',
    borderRadius: 10,
    borderWidth: 2,
    color: '#111111',
    fontSize: 18,
    fontWeight: '700',
    height: 58,
    paddingHorizontal: 18,
  },
  errorText: {
    color: ERROR_RED,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginTop: -4,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 12,
    height: 64,
    justifyContent: 'center',
    marginTop: 'auto',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '900',
  },
});
