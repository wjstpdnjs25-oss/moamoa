import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '@/src/api';

const DEEP_PURPLE = '#261052';
const TEXT_BLACK = '#050505';

export default function LoginScreen() {
  const params = useLocalSearchParams<{
    signupId?: string | string[];
    signupPassword?: string | string[];
  }>();
  const signupId = getParamValue(params.signupId);
  const signupPassword = getParamValue(params.signupPassword);
  const [id, setId] = useState(signupId || '');
  const [password, setPassword] = useState(signupPassword || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (id.trim().length === 0 || password.trim().length === 0) {
      setErrorMessage('아이디와 비밀번호를 입력해주세요');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await apiClient.post('/api/auth/login', {
        identifier: id,
        password,
      });
      router.push('/main');
    } catch (error: any) {
      setErrorMessage(
        error?.message?.includes('401')
          ? '아이디와 비밀번호가 일치하지 않습니다'
          : '로그인에 실패했습니다. 다시 시도해주세요.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroCopy}>
          <Text style={styles.title}>언제 어디서나 간편한 은행</Text>
          <Text style={styles.description}>
            지금 로그인하고,{'
'}            나만의 금융 생활을 이어가세요.
          </Text>
          <View style={styles.securityNotice}>
            <Ionicons name="shield-checkmark-outline" size={18} color={DEEP_PURPLE} />
            <Text style={styles.securityNoticeText}>모아모아 보안 로그인</Text>
          </View>
        </View>

        <View style={styles.formArea}>
          <View style={styles.brand}>
            <View style={styles.brandLogoFrame}>
              <Image
                accessibilityLabel="모아모아 은행 로고"
                resizeMode="cover"
                source={require('@/assets/images/moamoa-splash.png')}
                style={styles.brandLogo}
              />
            </View>
            <Text style={styles.brandText}>Bank</Text>
          </View>

          <View style={styles.inputs}>
            <TextInput
              autoCapitalize="none"
              onChangeText={(value) => {
                setId(value);
                setErrorMessage('');
              }}
              placeholder="아이디 (ID)"
              placeholderTextColor="#5d5d5d"
              style={styles.input}
              value={id}
            />

            <View style={styles.passwordField}>
              <TextInput
                onChangeText={(value) => {
                  setPassword(value);
                  setErrorMessage('');
                }}
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

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <View style={styles.actions}>
            <Pressable
            disabled={isSubmitting}
            style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
            onPress={handleLogin}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>로그인하기</Text>
            )}
          </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function getParamValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
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
    paddingTop: 92,
  },
  heroCopy: {
    alignItems: 'center',
    backgroundColor: '#f1edf9',
    borderColor: '#ded6ee',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#261052',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
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
    marginTop: 20,
    textAlign: 'center',
  },
  securityNotice: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  securityNoticeText: {
    color: DEEP_PURPLE,
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 5,
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
  brandLogoFrame: {
    borderColor: '#d9cdef',
    borderRadius: 34,
    borderWidth: 2,
    height: 68,
    marginRight: 12,
    overflow: 'hidden',
    width: 68,
  },
  brandLogo: {
    height: '100%',
    width: '100%',
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
    marginTop: 28,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 12,
    height: 64,
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.65,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  errorText: {
    color: '#d82020',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
});
