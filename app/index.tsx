import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEEP_PURPLE = '#261052';
const TEXT_BLACK = '#050505';
const VALID_USER_ID = 'moamoa';
const VALID_PASSWORD = '1234';

export default function Home() {
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
      <View style={styles.container}>
        <View style={styles.heroCopy}>
          <Text style={styles.title}>언제 어디서나 간편한 은행</Text>
          <Text style={styles.description}>
            지금 로그인하거나 회원가입하고,{'\n'}
            나만의 금융 생활을 만들어보세요.
          </Text>
        </View>

        <View style={styles.formArea}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>W</Text>
            </View>
            <Text style={styles.brandText}>Bank</Text>
          </View>

          <View style={styles.inputs}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChangeUserId}
              placeholder="아이디 (ID)"
              placeholderTextColor="#5d5d5d"
              style={styles.input}
              value={userId}
            />

            <View style={styles.passwordField}>
              <TextInput
                autoCapitalize="none"
                onChangeText={handleChangePassword}
                placeholder="비밀번호 (Password)"
                placeholderTextColor="#5d5d5d"
                secureTextEntry
                style={styles.passwordInput}
                value={password}
              />
              <Pressable hitSlop={10} style={styles.eyeButton}>
                <Ionicons name="eye-off-outline" size={28} color={DEEP_PURPLE} />
              </Pressable>
            </View>
          </View>

          {loginError ? (
            <Text style={styles.errorText}>아이디랑 비번이 일치 하지 않습니다</Text>
          ) : null}

          <View style={styles.actions}>
            <Pressable style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>로그인하기</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>회원가입하기</Text>
            </Pressable>
          </View>

          <Pressable hitSlop={10} style={styles.findAccountButton}>
            <Text style={styles.findAccountText}>아이디/비밀번호 찾기 ↗</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 42,
    paddingHorizontal: 28,
    paddingTop: 158,
  },
  heroCopy: {
    alignItems: 'center',
  },
  title: {
    color: TEXT_BLACK,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 40,
    textAlign: 'center',
  },
  description: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 35,
    marginTop: 22,
    textAlign: 'center',
  },
  formArea: {
    paddingBottom: 4,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 38,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: '#e9e2fb',
    borderColor: DEEP_PURPLE,
    borderRadius: 31,
    borderWidth: 2,
    height: 62,
    justifyContent: 'center',
    marginRight: 12,
    width: 62,
  },
  brandMarkText: {
    color: DEEP_PURPLE,
    fontSize: 30,
    fontWeight: '900',
    textDecorationLine: 'line-through',
  },
  brandText: {
    color: DEEP_PURPLE,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 0,
  },
  inputs: {
    gap: 22,
  },
  input: {
    borderColor: DEEP_PURPLE,
    borderRadius: 12,
    borderWidth: 2,
    color: TEXT_BLACK,
    fontSize: 25,
    fontWeight: '500',
    height: 72,
    paddingHorizontal: 28,
  },
  passwordField: {
    alignItems: 'center',
    borderColor: DEEP_PURPLE,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    height: 72,
  },
  passwordInput: {
    color: TEXT_BLACK,
    flex: 1,
    fontSize: 25,
    fontWeight: '500',
    height: '100%',
    paddingLeft: 28,
    paddingRight: 8,
  },
  eyeButton: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    marginRight: 18,
    width: 44,
  },
  actions: {
    gap: 16,
    marginTop: 28,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 12,
    height: 64,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: DEEP_PURPLE,
    borderRadius: 12,
    borderWidth: 2,
    height: 64,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: DEEP_PURPLE,
    fontSize: 23,
    fontWeight: '900',
  },
  findAccountButton: {
    alignItems: 'center',
    marginTop: 38,
  },
  findAccountText: {
    color: '#140929',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 0,
  },
  errorText: {
    color: '#d82020',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },
});
