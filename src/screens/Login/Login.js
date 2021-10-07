import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Login/Login.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { shadow } from '@/theme';
import { logo } from '@/assets';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function Login() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showButton, setShowButton] = useState(false);
  const errors = useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN], state));

  useEffect(() => {
    if (Boolean(username) && Boolean(password)) {
      LayoutAnimation.configureNext(LayoutAnimation.create(500, 'easeInEaseOut', 'opacity'));
      setShowButton(true);
    }

    if (Boolean(!username) || Boolean(!password)) {
      LayoutAnimation.configureNext(LayoutAnimation.create(500, 'easeInEaseOut', 'opacity'));
      setShowButton(false);
    }
  }, [username, password, showButton]);

  const handleSubmit = () => {
    dispatch(login(username, password));
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} accessibilityIgnoresInvertColors />
      <View style={[styles.formContainer, shadow.primary, { backgroundColor: colors.card }]}>
        <TextField
          autoCapitalize="none"
          accessibilityHint={strings.login.usernameHint}
          accessibilityLabel={strings.login.username}
          onChangeText={setUsername}
          placeholder={strings.login.username}
          value={username}
        />
        <TextField
          secureTextEntry
          accessibilityHint={strings.login.passwordHint}
          accessibilityLabel={strings.login.password}
          autoCapitalize="none"
          onChangeText={setPassword}
          placeholder={strings.login.password}
          textContentType="password"
          value={password}
        />
        <ErrorView errors={errors} />
        {showButton && (
          <Button
            onPress={handleSubmit}
            style={styles.submitButton}
            title={isLoading ? strings.common.loading : strings.login.button}
          />
        )}
      </View>
    </View>
  );
}
