import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEEP_PURPLE = '#261052';
const SOFT_PURPLE = '#f0ebff';
const CARD_BACKGROUND = '#ffffff';
const TEXT_BLACK = '#050505';
const VALID_USER_ID = 'moamoa';
const VALID_PASSWORD = '1234';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          <View style={styles.startLogo}>
            <Image
              source={require('@/assets/images/moamoa-bank-logo.png')}
              style={styles.startLogoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.description}>
            오늘의 소비를 모으고,{'\n'}
            나만의 금융 생활을 시작해보세요.
          </Text>
        </View>

        <View style={styles.formArea}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Image
                source={require('@/assets/images/moamoa-bank-logo.png')}
                style={styles.brandMarkImage}
                resizeMode="contain"
              />
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
                secureTextEntry={!isPasswordVisible}
                style={styles.passwordInput}
                value={password}
              />
              <Pressable
                accessibilityLabel={isPasswordVisible ? '비밀번호 가리기' : '비밀번호 보기'}
                hitSlop={10}
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                style={styles.eyeButton}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={28}
                  color={DEEP_PURPLE}
                />
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SOFT_PURPLE,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 42,
    paddingHorizontal: 28,
    paddingTop: 92,
  },
  heroCopy: {
    alignItems: 'center',
  },
  startLogo: {
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND,
    borderColor: DEEP_PURPLE,
    borderRadius: 42,
    borderWidth: 3,
    height: 84,
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: DEEP_PURPLE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    width: 84,
    elevation: 5,
  },
  startLogoImage: {
    height: 76,
    width: 76,
  },
  description: {
    color: '#4d4268',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 31,
    marginTop: 16,
    textAlign: 'center',
  },
  formArea: {
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 28,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 28,
    shadowColor: DEEP_PURPLE,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    elevation: 6,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 28,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: SOFT_PURPLE,
    borderColor: DEEP_PURPLE,
    borderRadius: 27,
    borderWidth: 2,
    height: 54,
    justifyContent: 'center',
    marginRight: 10,
    width: 54,
  },
  brandMarkImage: {
    height: 48,
    width: 48,
  },
  brandText: {
    color: DEEP_PURPLE,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
  },
  inputs: {
    gap: 16,
  },
  input: {
    backgroundColor: '#fbfaff',
    borderColor: '#d8cff5',
    borderRadius: 16,
    borderWidth: 1,
    color: TEXT_BLACK,
    fontSize: 21,
    fontWeight: '500',
    height: 64,
    paddingHorizontal: 22,
  },
  passwordField: {
    alignItems: 'center',
    backgroundColor: '#fbfaff',
    borderColor: '#d8cff5',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    height: 64,
  },
  passwordInput: {
    color: TEXT_BLACK,
    flex: 1,
    fontSize: 21,
    fontWeight: '500',
    height: '100%',
    paddingLeft: 22,
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
    gap: 12,
    marginTop: 24,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 18,
    height: 60,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: SOFT_PURPLE,
    borderColor: '#d8cff5',
    borderRadius: 18,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: DEEP_PURPLE,
    fontSize: 21,
    fontWeight: '900',
  },
  errorText: {
    color: '#d82020',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },
});
