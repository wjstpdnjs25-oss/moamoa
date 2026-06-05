import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEEP_PURPLE = '#261052';
const TEXT_BLACK = '#050505';

const TERMS_ITEMS = [
  {
    title: '제1조 목적',
    body: '본 약관은 모아모아 은행 회원가입 및 서비스 이용에 필요한 권리, 의무, 책임사항과 개인정보 처리 기준을 정합니다.',
  },
  {
    title: '제2조 수집 항목',
    body: '회원 식별과 서비스 제공을 위해 이름, 주민등록번호, 아이디, 비밀번호, 이메일 정보를 수집합니다.',
  },
  {
    title: '제3조 이용 목적',
    body: '수집한 정보는 본인 확인, 계정 생성, 로그인 인증, 고객 안내, 부정 이용 방지 및 서비스 품질 개선에 사용합니다.',
  },
  {
    title: '제4조 보관 및 파기',
    body: '개인정보는 회원 탈퇴 또는 목적 달성 시 지체 없이 파기하며, 관계 법령에 따라 보관이 필요한 경우 해당 기간 동안 안전하게 보관합니다.',
  },
  {
    title: '제5조 동의 철회',
    body: '회원은 언제든지 개인정보 수집 및 이용 동의를 철회할 수 있으며, 철회 시 일부 서비스 이용이 제한될 수 있습니다.',
  },
];

type Step = 'form' | 'confirm' | 'complete';

type SignupInfo = {
  name: string;
  residentNumber: string;
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const initialSignupInfo: SignupInfo = {
  name: '',
  residentNumber: '',
  id: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const PASSWORD_REQUIREMENT_MESSAGE = '영문자+숫자포함 6글자 이상을 작성해주세요';

function isValidPassword(value: string) {
  return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value);
}

function isValidResidentNumber(value: string) {
  return value.replace(/\D/g, '').length === 13;
}

function hasEnglishLetter(value: string) {
  return /[A-Za-z]/.test(value);
}

export default function SignupScreen() {
  const [step, setStep] = useState<Step>('form');
  const [signupInfo, setSignupInfo] = useState<SignupInfo>(initialSignupInfo);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {step === 'form' ? (
          <SignupForm info={signupInfo} onChange={setSignupInfo} onNext={() => setStep('confirm')} />
        ) : step === 'confirm' ? (
          <ConfirmInfo
            info={signupInfo}
            onBack={() => setStep('form')}
            onComplete={() => setStep('complete')}
          />
        ) : (
          <CompleteSignup
            info={signupInfo}
            onLogin={() =>
              router.push({
                pathname: '/login',
                params: {
                  signupId: signupInfo.id,
                  signupPassword: signupInfo.password,
                },
              })
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.brand, compact && styles.brandCompact]}>
      <View style={[styles.brandLogoFrame, compact && styles.brandLogoFrameCompact]}>
        <Image
          accessibilityLabel="모아모아 은행 로고"
          resizeMode="cover"
          source={require('@/assets/images/moamoa-splash.png')}
          style={styles.brandLogo}
        />
      </View>
      <Text style={[styles.brandText, compact && styles.brandTextCompact]}>Bank</Text>
    </View>
  );
}

function SignupForm({
  info,
  onChange,
  onNext,
}: {
  info: SignupInfo;
  onChange: (info: SignupInfo) => void;
  onNext: () => void;
}) {
  const [showRequiredErrors, setShowRequiredErrors] = useState(false);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);
  const [isIdFocused, setIsIdFocused] = useState(false);
  const emailParts = splitEmail(info.email);

  const updateField = (field: keyof SignupInfo, value: string) => {
    onChange({ ...info, [field]: value });
  };

  const updateEmailPart = (part: 'local' | 'domain', value: string) => {
    const nextEmail = part === 'local' ? `${value}@${emailParts.domain}` : `${emailParts.local}@${value}`;
    updateField('email', nextEmail);
  };

  const isFieldEmpty = (field: keyof SignupInfo) => info[field].trim().length === 0;
  const isEmailIncomplete =
    emailParts.local.trim().length === 0 || emailParts.domain.trim().length === 0;
  const hasEmptyField =
    Object.entries(info).some(([field, value]) => field !== 'email' && value.trim().length === 0) ||
    isEmailIncomplete;
  const showResidentNumberFormatError =
    showRequiredErrors && !isFieldEmpty('residentNumber') && !isValidResidentNumber(info.residentNumber);
  const showPasswordRequirement =
    info.password.length > 0 && !isValidPassword(info.password);
  const showPasswordMismatch =
    info.confirmPassword.length > 0 && info.password !== info.confirmPassword;
  const showIdHint = isIdFocused && !hasEnglishLetter(info.id);
  const handleNext = () => {
    setShowRequiredErrors(true);

    if (
      hasEmptyField ||
      !isValidResidentNumber(info.residentNumber) ||
      !isValidPassword(info.password) ||
      showPasswordMismatch ||
      !isTermsAgreed
    ) {
      return;
    }

    onNext();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.formScrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.formScreen}>
        <Brand />

        <View style={styles.signupHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>STEP 1</Text>
          </View>
          <Text style={styles.formTitle}>회원가입</Text>
          <Text style={styles.formDescription}>
            안전한 계좌 이용을 위해 회원 정보를 입력해주세요.
          </Text>
        </View>

        <View style={styles.signupFields}>
          <TextInput
            placeholder="이름 [홍길동]"
            placeholderTextColor="#777777"
            style={styles.input}
            value={info.name}
            onChangeText={(value) => updateField('name', value)}
          />
          {showRequiredErrors && isFieldEmpty('name') ? (
            <Text style={styles.requiredText}>정보를 입력해주세요</Text>
          ) : null}
          <TextInput
            keyboardType="number-pad"
            maxLength={14}
            placeholder="주민등록번호 [######-#######]"
            placeholderTextColor="#777777"
            style={styles.input}
            value={info.residentNumber}
            onChangeText={(value) => updateField('residentNumber', formatResidentNumber(value))}
          />
          {showRequiredErrors && isFieldEmpty('residentNumber') ? (
            <Text style={styles.requiredText}>정보를 입력해주세요</Text>
          ) : null}
          {showResidentNumberFormatError ? (
            <Text style={styles.requiredText}>주민등록번호 13자리를 입력해주세요</Text>
          ) : null}

          <TextInput
            autoCapitalize="none"
            placeholder="아이디 [e.g., example123]"
            placeholderTextColor="#777777"
            style={styles.input}
            value={info.id}
            onBlur={() => setIsIdFocused(false)}
            onChangeText={(value) => updateField('id', value)}
            onFocus={() => setIsIdFocused(true)}
          />
          {showIdHint ? (
            <Text style={styles.fieldHintText}>영문자로 작성해주세요</Text>
          ) : null}
          {showRequiredErrors && isFieldEmpty('id') ? (
            <Text style={styles.requiredText}>정보를 입력해주세요</Text>
          ) : null}

          <PasswordInput
            placeholder="비밀번호 [New Password]"
            value={info.password}
            onChangeText={(value) => updateField('password', value)}
          />
          {showRequiredErrors && isFieldEmpty('password') ? (
            <Text style={styles.requiredText}>정보를 입력해주세요</Text>
          ) : null}
          {showPasswordRequirement ? (
            <Text style={styles.passwordMismatchText}>{PASSWORD_REQUIREMENT_MESSAGE}</Text>
          ) : null}
          <PasswordInput
            placeholder="비밀번호 확인"
            value={info.confirmPassword}
            onChangeText={(value) => updateField('confirmPassword', value)}
          />
          {showRequiredErrors && isFieldEmpty('confirmPassword') ? (
            <Text style={styles.requiredText}>정보를 입력해주세요</Text>
          ) : null}
          {showPasswordMismatch ? (
            <Text style={styles.passwordMismatchText}>비밀번호가 일치하지 않습니다</Text>
          ) : null}

          <View style={styles.emailRow}>
            <View style={styles.emailUnderlineWrap}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="email"
                placeholderTextColor="#777777"
                style={styles.emailUnderlineInput}
                value={emailParts.local}
                onChangeText={(value) => updateEmailPart('local', value)}
              />
            </View>
            <Text style={styles.emailAtText}>@</Text>
            <View style={[styles.emailUnderlineWrap, styles.emailDomainWrap]}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="address.com"
                placeholderTextColor="#777777"
                style={styles.emailUnderlineInput}
                value={emailParts.domain}
                onChangeText={(value) => updateEmailPart('domain', value)}
              />
            </View>
          </View>
          {showRequiredErrors && isEmailIncomplete ? (
            <Text style={styles.requiredText}>정보를 입력해주세요</Text>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isTermsAgreed }}
          hitSlop={8}
          style={styles.termsAgreement}
          onPress={() => setIsTermsAgreed((agreed) => !agreed)}>
          <View style={[styles.checkbox, isTermsAgreed && styles.checkboxChecked]}>
            {isTermsAgreed ? <Ionicons name="checkmark" size={18} color="#ffffff" /> : null}
          </View>
          <Text style={styles.termsAgreementText}>이용약관/개인정보 동의</Text>
        </Pressable>
        <View style={styles.termsSummaryRow}>
          <Text style={styles.termsDescription}>
            회원가입 및 서비스 이용을 위해 이름, 주민등록번호, 아이디, 비밀번호, 이메일 정보를
            수집하고 약관에 따라 관리합니다.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: isTermsExpanded }}
            hitSlop={10}
            style={styles.termsToggleButton}
            onPress={() => setIsTermsExpanded((expanded) => !expanded)}>
            <Text style={styles.termsToggleText}>
              {isTermsExpanded ? '접기' : '전문 보기'}
            </Text>
            <Ionicons
              name={isTermsExpanded ? 'chevron-up' : 'chevron-down'}
              size={17}
              color={DEEP_PURPLE}
            />
          </Pressable>
        </View>
        {isTermsExpanded ? (
          <View style={styles.termsDetailBox}>
            <Text style={styles.termsDetailTitle}>이용약관 및 개인정보 수집 이용 동의서</Text>
            {TERMS_ITEMS.map((item) => (
              <View key={item.title} style={styles.termsDetailItem}>
                <Text style={styles.termsDetailItemTitle}>{item.title}</Text>
                <Text style={styles.termsDetailBody}>{item.body}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {showRequiredErrors && !isTermsAgreed ? (
          <Text style={styles.termsErrorText}>이용약관에 동의해주세요</Text>
        ) : null}

        <Pressable style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>다음 단계</Text>
        </Pressable>

        <Pressable hitSlop={10} style={styles.loginLink} onPress={() => router.push('/login')}>
          <Text style={styles.loginLinkText}>
            이미 계정이 있으신가요? <Text style={styles.loginLinkBold}>로그인하기</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function PasswordInput({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.passwordField}>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#777777"
        secureTextEntry={!isPasswordVisible}
        style={styles.passwordInput}
        value={value}
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
  );
}

function ConfirmInfo({
  info,
  onBack,
  onComplete,
}: {
  info: SignupInfo;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maskedPassword = info.password ? '•'.repeat(Math.min(info.password.length, 8)) : '-';
  const visiblePassword = info.password || '-';
  const maskedResidentNumber = maskResidentNumber(info.residentNumber);
  const handleComplete = () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(onComplete, 900);
  };

  return (
    <View style={styles.confirmScreen}>
      <Brand compact />

      <View style={styles.confirmHeader}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>STEP 2</Text>
        </View>
        <Text style={styles.confirmTitle}>가입 정보 확인</Text>
        <Text style={styles.confirmDescription}>입력하신 정보가 맞는지 확인해주세요.</Text>
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="이름" value={info.name || '-'} />
        <InfoRow label="아이디" value={info.id || '-'} />
        <InfoRow label="이메일" value={info.email || '-'} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>비밀번호</Text>
          <View style={styles.infoValueWrap}>
            <Text style={styles.infoValue}>
              {isPasswordVisible ? visiblePassword : maskedPassword}
            </Text>
            {isPasswordVisible ? null : (
              <Text style={styles.infoHint}>(보안상 가림)</Text>
            )}
          </View>
          <Pressable
            accessibilityLabel={isPasswordVisible ? '비밀번호 가리기' : '비밀번호 보기'}
            hitSlop={10}
            onPress={() => setIsPasswordVisible((visible) => !visible)}
            style={styles.infoEyeButton}>
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color={DEEP_PURPLE}
            />
          </Pressable>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>주민등록번호</Text>
          <View style={styles.infoValueWrap}>
            <Text style={styles.infoValue}>{maskedResidentNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.confirmActions}>
        <Pressable style={styles.outlineButton} onPress={onBack}>
          <Text style={styles.outlineButtonText}>수정하기</Text>
          <Text style={styles.smallActionText}>→ 다시 1단계로 돌아가기</Text>
        </Pressable>

        <Pressable
          disabled={isSubmitting}
          style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]}
          onPress={handleComplete}>
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Text style={styles.confirmButtonText}>가입 완료</Text>
              <Text style={styles.confirmButtonSubText}>→ 완료 화면으로 이동</Text>
            </>
          )}
        </Pressable>
      </View>

      <Text style={styles.footer}>₩ Bank © 2024. All rights reserved.</Text>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function CompleteSignup({ info, onLogin }: { info: SignupInfo; onLogin: () => void }) {
  return (
    <View style={styles.completeScreen}>
      <Brand compact />
      <Text style={styles.completeTitle}>
 feat_wishsave
        회원가입이{'\n'}       
        완료되었습니다!

        회원가입이 완료되었습니다!
        main
      </Text>

      <View style={styles.completeIllustration}>
        <View style={styles.house}>
          <View style={styles.roof} />
          <View style={styles.houseBody}>
            <View style={styles.door} />
          </View>
        </View>
        <View style={styles.person}>
          <View style={styles.face}>
            <Ionicons name="happy-outline" size={29} color={DEEP_PURPLE} />
          </View>
          <View style={styles.bodyLine} />
          <View style={styles.leftArm} />
          <View style={styles.rightArm} />
          <View style={styles.leftLeg} />
          <View style={styles.rightLeg} />
        </View>
        <MaterialCommunityIcons
          name="party-popper"
          size={38}
          color="#8e76b7"
          style={styles.confetti}
        />
      </View>

      <Text style={styles.welcomeText}>
 feat_wishsave
        [{info.name || '회원'}]님, W Bank의 새로운{'\n'}   
        회원이 되신 것을 환영합니다.

        [{info.name || '회원'}]님, W Bank의 새로운 회원이 되신 것을 환영합니다.
 main
      </Text>

      <Pressable style={styles.homeButton} onPress={onLogin}>
        <Text style={styles.homeButtonText}>로그인 하러 가기</Text>
      </Pressable>
    </View>
  );
}

function maskResidentNumber(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.length >= 6) {
    return `${digits.slice(0, 6)}-*******`;
  }

  return value || '-';
}

function formatResidentNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 13);

  if (digits.length >= 6) {
    return `${digits.slice(0, 6)}-${digits.slice(6)}`;
  }

  return digits;
}

function splitEmail(value: string) {
  const [local = '', ...domainParts] = value.split('@');

  return {
    local,
    domain: domainParts.join('@'),
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
  },
  formScrollContent: {
    flexGrow: 1,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  brandCompact: {
    marginBottom: 24,
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
  brandLogoFrameCompact: {
    borderRadius: 23,
    height: 46,
    marginRight: 8,
    width: 46,
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
  brandTextCompact: {
    fontSize: 27,
  },
  formScreen: {
    paddingBottom: 32,
    paddingTop: 54,
  },
  signupHeader: {
    alignItems: 'center',
    backgroundColor: '#f1edf9',
    borderColor: '#ded6ee',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 34,
    marginTop: 28,
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#261052',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  confirmHeader: {
    alignItems: 'center',
    backgroundColor: '#f1edf9',
    borderColor: '#ded6ee',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 34,
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#261052',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  stepBadge: {
    backgroundColor: DEEP_PURPLE,
    borderRadius: 999,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  stepBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  formTitle: {
    color: TEXT_BLACK,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 42,
    textAlign: 'center',
  },
  formDescription: {
    color: '#5f5f68',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    marginTop: 8,
    textAlign: 'center',
  },
  signupFields: {
    gap: 14,
  },
  input: {
    borderColor: DEEP_PURPLE,
    borderRadius: 12,
    borderWidth: 1,
    color: TEXT_BLACK,
    fontSize: 24,
    fontWeight: '500',
    height: 70,
    paddingHorizontal: 28,
  },
  emailRow: {
    alignItems: 'center',
    borderColor: DEEP_PURPLE,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 22,
  },
  emailUnderlineWrap: {
    borderBottomColor: '#777777',
    borderBottomWidth: 2,
    flex: 1,
    minWidth: 0,
  },
  emailDomainWrap: {
    flex: 1.25,
  },
  emailUnderlineInput: {
    color: TEXT_BLACK,
    fontSize: 22,
    fontWeight: '500',
    height: 48,
    paddingHorizontal: 4,
    paddingVertical: 0,
  },
  emailAtText: {
    color: DEEP_PURPLE,
    fontSize: 24,
    fontWeight: '900',
    marginHorizontal: 10,
  },
  passwordField: {
    alignItems: 'center',
    borderColor: DEEP_PURPLE,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    height: 70,
    paddingLeft: 28,
    paddingRight: 24,
  },
  passwordInput: {
    color: TEXT_BLACK,
    flex: 1,
    fontSize: 24,
    fontWeight: '500',
    height: '100%',
  },
  eyeButton: {
    alignItems: 'center',
    height: 52,
    justifyContent: 'center',
    width: 44,
  },
  passwordMismatchText: {
    color: '#d82020',
    fontSize: 13,
    fontWeight: '700',
    marginTop: -6,
    paddingLeft: 6,
  },
  fieldHintText: {
    color: '#5f5f68',
    fontSize: 13,
    fontWeight: '600',
    marginTop: -6,
    paddingLeft: 6,
  },
  requiredText: {
    color: '#d82020',
    fontSize: 13,
    fontWeight: '700',
    marginTop: -6,
    paddingLeft: 6,
  },
  termsAgreement: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: DEEP_PURPLE,
    borderRadius: 4,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    marginRight: 10,
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: DEEP_PURPLE,
  },
  termsAgreementText: {
    color: TEXT_BLACK,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
  },
  termsSummaryRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    paddingLeft: 34,
  },
  termsDescription: {
    color: '#5f5f68',
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },
  termsToggleButton: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 28,
    paddingLeft: 4,
  },
  termsToggleText: {
    color: DEEP_PURPLE,
    fontSize: 13,
    fontWeight: '900',
    marginRight: 2,
  },
  termsDetailBox: {
    backgroundColor: '#ffffff',
    borderColor: '#ded6ee',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  termsDetailTitle: {
    color: TEXT_BLACK,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
    marginBottom: 10,
  },
  termsDetailItem: {
    marginTop: 9,
  },
  termsDetailItemTitle: {
    color: DEEP_PURPLE,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
  },
  termsDetailBody: {
    color: '#5f5f68',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 3,
  },
  termsErrorText: {
    color: '#d82020',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    paddingLeft: 6,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 12,
    height: 70,
    justifyContent: 'center',
    marginTop: 32,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 34,
  },
  loginLinkText: {
    color: TEXT_BLACK,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
  },
  loginLinkBold: {
    color: DEEP_PURPLE,
    fontWeight: '900',
  },
  confirmScreen: {
    flex: 1,
    paddingBottom: 28,
    paddingTop: 58,
  },
  confirmTitle: {
    color: TEXT_BLACK,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 42,
    textAlign: 'center',
  },
  confirmDescription: {
    color: '#5f5f68',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    marginTop: 8,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderColor: '#d0ccd8',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    gap: 30,
    paddingHorizontal: 22,
    paddingVertical: 32,
    shadowColor: '#261052',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  infoRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  infoLabel: {
    color: TEXT_BLACK,
    fontSize: 21,
    fontWeight: '500',
    width: 122,
  },
  infoValueWrap: {
    flex: 1,
  },
  infoValue: {
    color: TEXT_BLACK,
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
  },
  infoHint: {
    color: TEXT_BLACK,
    fontSize: 17,
    fontWeight: '500',
    marginTop: 4,
  },
  infoEyeButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 36,
  },
  outlineButton: {
    alignItems: 'center',
    borderColor: DEEP_PURPLE,
    borderRadius: 9,
    borderWidth: 2,
    flex: 1,
    height: 82,
    justifyContent: 'center',
  },
  outlineButtonText: {
    color: TEXT_BLACK,
    fontSize: 21,
    fontWeight: '900',
  },
  smallActionText: {
    color: TEXT_BLACK,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 5,
  },
  confirmButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 9,
    flex: 1,
    height: 82,
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.82,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '900',
  },
  confirmButtonSubText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 5,
  },
  footer: {
    color: TEXT_BLACK,
    fontSize: 14,
    marginTop: 'auto',
    textAlign: 'center',
  },
  completeScreen: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 48,
    paddingTop: 88,
  },
  completeTitle: {
    color: TEXT_BLACK,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 48,
    marginTop: 12,
    textAlign: 'center',
  },
  completeIllustration: {
    height: 210,
    marginTop: 52,
    position: 'relative',
    width: 260,
  },
  house: {
    bottom: 24,
    height: 142,
    left: 34,
    position: 'absolute',
    width: 126,
  },
  roof: {
    borderLeftColor: 'transparent',
    borderLeftWidth: 70,
    borderRightColor: 'transparent',
    borderRightWidth: 70,
    borderStyle: 'solid',
    borderBottomColor: '#b8a8d3',
    borderBottomWidth: 60,
    height: 0,
    left: -8,
    position: 'absolute',
    top: 0,
    transform: [{ rotate: '0deg' }],
    width: 0,
  },
  houseBody: {
    backgroundColor: '#f6f3fb',
    borderColor: DEEP_PURPLE,
    borderRadius: 10,
    borderTopWidth: 0,
    borderWidth: 3,
  },
  door: {
    backgroundColor: '#8e76b7',
    borderRadius: 10,
    height: 48,
    left: 42,
    position: 'absolute',
    top: 58,
    width: 32,
  },
  person: {
    alignItems: 'center',
    bottom: 18,
    left: 148,
    position: 'absolute',
    width: 86,
  },
  face: {
    alignItems: 'center',
    backgroundColor: '#ffe8e8',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#f2dffd',
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  bodyLine: {
    backgroundColor: '#8e76b7',
    height: 58,
    marginTop: 12,
    width: 8,
  },
  leftArm: {
    backgroundColor: '#8e76b7',
    height: 42,
    left: -18,
    position: 'absolute',
    top: 26,
    width: 10,
  },
  rightArm: {
    backgroundColor: '#8e76b7',
    height: 42,
    position: 'absolute',
    right: -18,
    top: 26,
    width: 10,
  },
  leftLeg: {
    backgroundColor: '#8e76b7',
    height: 42,
    left: -10,
    position: 'absolute',
    top: 70,
    width: 10,
  },
  rightLeg: {
    backgroundColor: '#8e76b7',
    height: 42,
    position: 'absolute',
    right: -10,
    top: 70,
    width: 10,
  },
  confetti: {
    position: 'absolute',
    right: -10,
    top: 16,
  },
  welcomeText: {
    color: TEXT_BLACK,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 34,
    marginTop: 32,
    textAlign: 'center',
  },
  homeButton: {
    alignItems: 'center',
    backgroundColor: DEEP_PURPLE,
    borderRadius: 14,
    height: 70,
    justifyContent: 'center',
    marginTop: 38,
    width: '100%',
  },
  homeButtonText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900',
  },
});
