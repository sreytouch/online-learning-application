import * as SecureStore from 'expo-secure-store';
export const header = async () => {
  const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
  };
  const token = await getToken().then(token => console.log(token));
  if (token) {
    return {
      // Authorization: "Bearer " + token,
      // ContentType: "application/json",
      'content-type': 'application/x-www-form-urlencoded',
      AntiTemperSignature: token,
    };
  }
};
