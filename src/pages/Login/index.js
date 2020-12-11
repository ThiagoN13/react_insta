import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  Animated
} from 'react-native';
import styles from './styles'

export default class Login extends React.Component {
  constructor ({ navigation, props }) {
    super(props)

    this.state = {
      navigation,
      offset: new Animated.ValueXY({ x: 0, y: 80 }),
      opacity: new Animated.Value(0),
      logo: new Animated.ValueXY({ x: 190, y: 54 }),
      password: null,
      login: null
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.spring(this.state.offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
  }

  onChangePassword (password) {
    this.setState({ password })
  }

  onChangeLogin (login) {
    this.setState({ login })
  }

  render () {
    return (
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Animated.Image
            style={{
              width: this.state.logo.x,
              height: this.state.logo.y,
            }}
            source={require('../../assets/logo.png')} />
        </View>
  
        <Animated.View
          style={[
            styles.container,
            {
              opacity: this.state.opacity,
              transform: [
                { translateY: this.state.offset.y }
              ]
            }
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={(event) => this.onChangeLogin(event.target.value)}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={(event) => this.onChangePassword(event.target.value)}
          />
  
          <TouchableOpacity onPress={() => this.state.navigation.navigate('Feed')} style={styles.btnSubmit}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.btnRegister}>
            <Text style={styles.registerText}>Criar conta gratuita</Text>
          </TouchableOpacity>
        </Animated.View >
      </KeyboardAvoidingView>
    );
  }
}

