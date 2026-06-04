import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const DEEP_PURPLE = '#4f287f';
const SOFT_PURPLE = '#f5efff';
const LINE_PURPLE = '#d7c7f0';
const SPLASH_BACKGROUND = '#f6f1ff';
const BRAND_BORDER = '#dfd0f4';
const SUB_TEXT_PURPLE = '#7b6a90';

export default function BudgetScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <SafeAreaView style={styles.splashScreen}>
        <View style={styles.splashLogoFrame}>
          <Image
            source={require('@/assets/images/moamoa-splash.png')}
            style={styles.splashLogo}
            resizeMode="cover"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandHeader}>
          <View style={styles.brandMark}>
            <Image
              source={require('@/assets/images/moamoa-splash.png')}
              style={styles.brandLogo}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.brandName}>모아모아 은행</Text>
            <Text style={styles.brandSubText}>MOAMOA BANK</Text>
          </View>
        </View>

        <View style={styles.illustrationWrap}>
          <View style={[styles.backCard, styles.leftBackCard]} />
          <View style={[styles.backCard, styles.rightBackCard]} />

          <View style={styles.bankCard}>
            <MaterialCommunityIcons name="credit-card-outline" size={38} color={DEEP_PURPLE} />
          </View>

          <View style={styles.moneyCard}>
            <MaterialCommunityIcons name="sack" size={56} color={DEEP_PURPLE} />
            <View style={styles.coin}>
              <Text style={styles.coinText}>$</Text>
            </View>
          </View>

          <View style={styles.securityCard}>
            <MaterialCommunityIcons name="shield-lock-outline" size={58} color={DEEP_PURPLE} />
          </View>

          <View style={styles.phone}>
            <View style={styles.phoneTop} />
            <View style={styles.phoneScreen}>
              <View style={styles.menuLine} />
              <View style={styles.accountBox}>
                <View style={styles.wonCircle}>
                  <Text style={styles.wonText}>모</Text>
                </View>
                <Text style={styles.accountText}>모아모아 계좌</Text>
              </View>
              <View style={styles.listRow}>
                <View style={styles.dot} />
                <View style={styles.longLine} />
              </View>
              <View style={styles.listRow}>
                <View style={styles.dot} />
                <View style={styles.midLine} />
              </View>
              <View style={styles.sendButton}>
                <Ionicons name="arrow-forward" size={17} color="#ffffff" />
                <Text style={styles.sendText}>전송</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>모아모아와 함께하는 간편한 은행</Text>
          <Text style={styles.description}>
            흩어진 금융 생활을 모아, 나만의 계좌 관리를 시작해보세요.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/login')}>
            <Text style={styles.primaryButtonText}>로그인하기</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => router.push('/signup')}>
            <Text style={styles.secondaryButtonText}>회원가입하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    alignItems: 'center',
    backgroundColor: SPLASH_BACKGROUND,
    flex: 1,
    justifyContent: 'center',
  },
  splashLogoFrame: {
    borderRadius: 160,
    height: 320,
    overflow: 'hidden',
    width: 320,
  },
  splashLogo: {
    height: '100%',
    width: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 34,
  },
  brandHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: SPLASH_BACKGROUND,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BRAND_BORDER,
    overflow: 'hidden',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  brandLogo: {
    height: 36,
    width: 36,
  },
  brandName: {
    color: DEEP_PURPLE,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  brandSubText: {
    color: SUB_TEXT_PURPLE,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
    marginTop: 1,
  },
  illustrationWrap: {
    alignItems: 'center',
    height: 342,
    justifyContent: 'center',
    marginTop: 18,
    position: 'relative',
  },
  backCard: {
    borderColor: LINE_PURPLE,
    borderRadius: 10,
    borderWidth: 2,
    height: 162,
    opacity: 0.85,
    position: 'absolute',
    width: 168,
  },
  leftBackCard: {
    left: 36,
    top: 80,
  },
  rightBackCard: {
    right: 28,
    top: 112,
  },
  bankCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: DEEP_PURPLE,
    borderRadius: 10,
    borderWidth: 2,
    bottom: 54,
    height: 70,
    justifyContent: 'center',
    left: 8,
    position: 'absolute',
    shadowColor: DEEP_PURPLE,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    width: 92,
  },
  moneyCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: DEEP_PURPLE,
    borderRadius: 10,
    borderWidth: 2,
    height: 102,
    justifyContent: 'center',
    position: 'absolute',
    right: 42,
    top: 48,
    width: 102,
  },
  coin: {
    alignItems: 'center',
    backgroundColor: SOFT_PURPLE,
    borderColor: DEEP_PURPLE,
    borderRadius: 18,
    borderWidth: 2,
    bottom: 22,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: 14,
    width: 36,
  },
  coinText: {
    color: DEEP_PURPLE,
    fontSize: 22,
    fontWeight: '800',
  },
  securityCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: DEEP_PURPLE,
    borderRadius: 10,
    borderWidth: 2,
    height: 118,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 18,
    left: 56,
    width: 118,
  },
  phone: {
    alignItems: 'center',
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#e9dff8',
    height: 180,
    justifyContent: 'center',
    marginTop: 16,
    overflow: 'hidden',
    width: 140,
  },
  phoneTop: {
    backgroundColor: '#f1edf9',
    height: 12,
    marginTop: -18,
    width: '100%',
  },
  phoneScreen: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 26,
    height: 154,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 122,
  },
  menuLine: {
    backgroundColor: '#e4d9f5',
    borderRadius: 4,
    height: 5,
    marginBottom: 10,
    width: 42,
  },
  accountBox: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  wonCircle: {
    alignItems: 'center',
    backgroundColor: '#f7f0ff',
    borderRadius: 12,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  wonText: {
    color: DEEP_PURPLE,
    fontSize: 15,
    fontWeight: '900',
  },
  accountText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '700',
  },
  listRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
    width: '100%',
  },
  dot: {
    backgroundColor: '#d9cff5',
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  longLine: {
    backgroundColor: '#f0eafc',
    borderRadius: 999,
    flex: 1,
    height: 8,
  },
  midLine: {
    backgroundColor: '#f0eafc',
    borderRadius: 999,
    flex: 0.7,
    height: 8,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 8,
    height: 38,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sendText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  copy: {
    marginTop: 22,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    fontWeight: '800',
  },
  description: {
    color: '#7b6a90',
    fontSize: 16,
    marginTop: 14,
    lineHeight: 24,
  },
  actions: {
    gap: 14,
    marginTop: 18,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 16,
    height: 64,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BRAND_BORDER,
    height: 64,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: DEEP_PURPLE,
    fontSize: 16,
    fontWeight: '700',
  },
});
