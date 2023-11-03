import * as SecureStore from "expo-secure-store";

const TOKEN = 'secure_token';

export async function getItem(key) {
  const value = await SecureStore.getItemAsync(key);
  return value ? value : null;
}

export async function setItem(key, value) {
  return await SecureStore.setItemAsync(key, value);
}
export async function removeItem(key) {
  return await SecureStore.deleteItemAsync(key);
}

export const getToken = async() => await getItem(TOKEN);
export const removeToken = async() => await removeItem(TOKEN);
export const setToken = async(value) => await setItem(TOKEN, value);

export const header = async () => {
  // console.log("==token====token====token====token==", await getToken());
  if (getToken) {
    return {
      Authorization: "Bearer " + await getToken(),
      ContentType: "application/json",
    };
  }
};