import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Spacer from '../components/Spacer';
import Subheading from '../components/Subheading';
import useAuth from '../hooks/useAuth';
import { LoginFormData } from '../types';

type ACCOUNT_TYPE = 'account';
type M3U_FILE_TYPE = 'm3u-file';
type PLAYLIST_ID_TYPE = 'playlist-id';

const ACCOUNT = 'account';
const M3U_FILE = 'm3u-file';
const PLAYLIST_ID = 'playlist-id';

const LoginScreen: React.FC = () => {
  const [loginType, setLoginType] = useState<
    ACCOUNT_TYPE | M3U_FILE_TYPE | PLAYLIST_ID_TYPE
  >('account');
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    server: '',
  });
  const [url, setUrl] = useState<null | string>(null);
  const [id, setId] = useState<null | string>(null);
  const { login, loginWithPlaylistId, submitFormData } = useAuth();

  const isAccountLoginType = loginType === ACCOUNT;
  const isM3uFileLoginType = loginType === M3U_FILE;
  const isPlaylistIdLoginType = loginType === PLAYLIST_ID;

  const buttonMode = (isActive: boolean): string =>
    isActive ? 'contained' : 'text';

  const onChangeText = (key: string, value: string): void =>
    setFormData({
      ...formData,
      [key]: value,
    });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.tabs}>
            <Button
              mode={buttonMode(isAccountLoginType)}
              style={styles.buttonNav}
              onPress={() => setLoginType(ACCOUNT)}>
              Account
            </Button>
            <Button
              mode={buttonMode(isM3uFileLoginType)}
              style={styles.buttonNav}
              onPress={() => setLoginType(M3U_FILE)}>
              M3U file
            </Button>
            <Button
              mode={buttonMode(isPlaylistIdLoginType)}
              style={styles.buttonNav}
              onPress={() => setLoginType(PLAYLIST_ID)}>
              Playlist ID
            </Button>
          </View>
          {isAccountLoginType && (
            <AcountLogin
              onChangeText={onChangeText}
              onSubmit={() => submitFormData(formData)}
            />
          )}
          {isM3uFileLoginType && (
            <M3uFileLogin onChangeText={setUrl} onSubmit={() => login(url)} />
          )}
          {isPlaylistIdLoginType && (
            <PlaylistIdLogin
              onChangeText={setId}
              onSubmit={() => loginWithPlaylistId(id)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const AcountLogin = ({ onChangeText, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPress = (): void => {
    setLoading(true);
    return onSubmit();
  };

  return (
    <>
      <Spacer height={40} />
      <Subheading color="black">Account</Subheading>
      <View style={styles.form}>
        <Spacer height={10} />
        <TextInput
          mode="outlined"
          label="Username"
          onChangeText={(username) => onChangeText('username', username)}
        />
        <Spacer height={15} />
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={(password) => onChangeText('password', password)}
        />
        <Spacer height={15} />
        <TextInput
          mode="outlined"
          label="Server"
          onChangeText={(server) => onChangeText('server', server)}
        />
        <Spacer height={15} />
        <Button mode="contained" loading={loading} onPress={onPress}>
          Submit
        </Button>
      </View>
    </>
  );
};

const M3uFileLogin = ({ onChangeText, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPress = (): void => {
    setLoading(true);
    return onSubmit();
  };

  return (
    <>
      <Spacer height={40} />
      <Subheading color="black">Account</Subheading>
      <View style={styles.form}>
        <Spacer height={15} />
        <TextInput mode="outlined" label="url" onChangeText={onChangeText} />
        <Spacer height={15} />
        <Button mode="contained" loading={loading} onPress={onPress}>
          Submit
        </Button>
      </View>
    </>
  );
};

const PlaylistIdLogin = ({ onChangeText, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPress = (): void => {
    setLoading(true);
    return onSubmit();
  };

  return (
    <>
      <Spacer height={40} />
      <Subheading color="black">Playlist ID</Subheading>
      <View style={styles.form}>
        <Spacer height={15} />
        <TextInput
          mode="outlined"
          label="Playlist ID"
          onChangeText={onChangeText}
        />
        <Spacer height={15} />
        <Button mode="contained" loading={loading} onPress={onPress}>
          Submit
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  tabs: { flexDirection: 'row', justifyContent: 'center' },
  buttonNav: {
    marginHorizontal: 10,
  },
  form: {
    paddingHorizontal: 15,
  },
});

export default LoginScreen;
