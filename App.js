import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import Feed from './src/pages/Feed';
import Login from './src/pages/Login';
import Likes from './src/pages/Likes';
import Coments from './src/pages/Comment';
import AnimatedAppLoader from './src/components/AnimatedAppLoader'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

import igtv from './src/assets/igtv.png';
import send from './src/assets/send.png';

const Stack = createStackNavigator()

export default class App extends React.Component {
  constructor () {
    super()
  }
  
  render () {
    return (
      <AnimatedAppLoader image={{ uri: Constants.manifest.splash.image }}>
        <View style={style.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Feed"
                component={Feed}
                options={{
                  headerTitleStyle: { alignSelf: 'center' },
                  headerStyle: { height: 100 },
                  headerTitle:
                    <>
                      <View style={style.logo}>
                        <Image source={require('./src/assets/logo.png')} />
                      </View>
                    </>,
                  headerLeft: () => (
                    <TouchableOpacity style={style.camera}>
                      <Image source={require('./src/assets/camera.png')} />
                    </TouchableOpacity>
                  ),
                  headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity style={style.igtv}>
                        <Image source={igtv} />
                      </TouchableOpacity>

                      <TouchableOpacity style={style.send}>
                        <Image source={send} />
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />
  
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                  headerTitleAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  headerTintColor: '#000'
                }}
              />
  
              <Stack.Screen
                name="Likes"
                component={Likes}
                options={{
                  headerStyle: { height: 100 },
                  headerTitleAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  headerTintColor: '#000'
                }}
              />
  
              <Stack.Screen
                name="Comments"
                component={Coments}
                options={{
                  headerStyle: { height: 100 },
                  headerTitleAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  headerTintColor: '#000'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AnimatedAppLoader>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    // paddingLeft: 50,
    // paddingRight: 50
  },
  camera: {
    paddingBottom: 8,
    paddingLeft: 10
  },
  igtv: {
    paddingBottom: 8,
    paddingRight: 15
  },
  send: {
    paddingBottom: 8,
    paddingRight: 10
  }
})