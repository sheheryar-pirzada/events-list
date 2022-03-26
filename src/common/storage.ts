import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToStorage = async (
  key: string,
  data: object,
): Promise<boolean> => {
  try {
    const val = JSON.stringify(data);
    await AsyncStorage.setItem(key, val);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFromStorage = async (key: string): Promise<null | object | Array<object>> => {
  try {
    const strData = await AsyncStorage.getItem(key);
    return strData !== null ? JSON.parse(strData) : null;
  } catch (error) {
    return null;
  }
};

export const removeFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
