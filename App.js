import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading'
import AuthNavigator from "./app/navigation/AuthNavigator"
import AppNavigator from "./app/navigation/AppNavigator"
import navigationTheme from "./app/navigation/navigationTheme"
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';

export default function App() {
  console.log("App executed!")
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false)


  const restoreToken = async () => {
    const token = await authStorage.getToken()
    if(!token) return
    setUser(token)
  }

  if(!isReady)
  return <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)}  onError={console.warn} />

  return (
    <AuthContext.Provider value={{user, setUser}}>
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
