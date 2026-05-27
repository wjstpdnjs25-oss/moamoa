import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const DEEP_PURPLE = '#261052';
const SOFT_PURPLE = '#f3f0fa';
const LINE_PURPLE = '#c8bfd9';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable style={styles.shareButton} hitSlop={12}>
          <Ionicons name="share-outline" size={34} color="#111111" />
        </Pressable>

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
                  <Text style={styles.wonText}>W</Text>
                </View>
                <Text style={styles.accountText}>은행 계좌</Text>
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
          <Text style={styles.title}>언제 어디서나 간편한 은행</Text>
          <Text style={styles.description}>
            지금 로그인하거나 회원가입하고,{'\n'}
            나만의 금융 생활을 만들어보세요.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>로그인하기</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>회원가입하기</Text>
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
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 34,
  },
  shareButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  illustrationWrap: {
    alignItems: 'center',
    height: 360,
    justifyContent: 'center',
    marginTop: 28,
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
    height: 90,
    justifyContent: 'center',
    position: 'absolute',
    right: 26,
    top: 214,
    width: 92,
  },
  phone: {
    backgroundColor: '#f9f8fd',
    borderColor: DEEP_PURPLE,
    borderRadius: 22,
    borderWidth: 3,
    height: 260,
    paddingHorizontal: 18,
    paddingTop: 14,
    width: 145,
  },
  phoneTop: {
    alignSelf: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 6,
    height: 3,
    marginBottom: 16,
    width: 42,
  },
  phoneScreen: {
    flex: 1,
  },
  menuLine: {
    backgroundColor: DEEP_PURPLE,
    borderRadius: 3,
    height: 3,
    marginBottom: 12,
    width: 17,
  },
  accountBox: {
    alignItems: 'center',
    borderColor: DEEP_PURPLE,
    borderRadius: 7,
    borderWidth: 2,
    height: 70,
    justifyContent: 'center',
    marginBottom: 17,
  },
  wonCircle: {
    alignItems: 'center',
    backgroundColor: SOFT_PURPLE,
    borderColor: DEEP_PURPLE,
    borderRadius: 18,
    borderWidth: 2,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  wonText: {
    color: DEEP_PURPLE,
    fontSize: 18,
    fontWeight: '800',
  },
  accountText: {
    color: DEEP_PURPLE,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  listRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    backgroundColor: DEEP_PURPLE,
    borderRadius: 3,
    height: 5,
    width: 5,
  },
  longLine: {
    backgroundColor: DEEP_PURPLE,
    borderRadius: 3,
    height: 3,
    width: 62,
  },
  midLine: {
    backgroundColor: DEEP_PURPLE,
    borderRadius: 3,
    height: 3,
    width: 44,
  },
  sendButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 5,
    height: 40,
    justifyContent: 'center',
    marginTop: 7,
    width: 98,
  },
  sendText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  copy: {
    alignItems: 'center',
    marginTop: 32,
  },
  title: {
    color: '#050505',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 40,
    textAlign: 'center',
  },
  description: {
    color: '#111111',
    fontSize: 21,
    fontWeight: '600',
    lineHeight: 33,
    marginTop: 22,
    textAlign: 'center',
  },
  actions: {
    gap: 16,
    marginTop: 'auto',
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
});
