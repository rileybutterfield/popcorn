import * as SecureStore from "expo-secure-store"

const key = "authToken"

const storeToken = async authToken => {
  try{
    const string = JSON.stringify(authToken)
    await SecureStore.setItemAsync(key, string)
  }
  catch(error){
    console.log("Error storing the auth token", error)
  }
}

const getToken = async () => {
  try {
    const authToken = await SecureStore.getItemAsync(key)
    return authToken
  } catch(error){
    console.log("Error getting the auth token", error)
  }
}


const removeToken = async () => {
  try{
    await SecureStore.deleteItemAsync(key)
  } catch(error){
    console.log("Error removing the auth token", error)
  }
}

export default {
  getToken, removeToken, storeToken
}
