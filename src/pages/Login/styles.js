import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  containerLogo: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50
  },

  input: {
    backgroundColor: '#fafafa',
    width: '90%',
    height: 50,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#a7a7a7',
    paddingLeft: 5
  },

  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  submitText: {
    color: '#fff',
    fontSize: 18
  },

  btnRegister: {
    width: '90%',
    marginTop: 15,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#a7a7a7',
    alignItems: "center",
  },

  registerText: {
    color: '#a7a7a7'
  }
})

export default styles