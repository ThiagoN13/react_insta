import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  post: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  rowComment: {
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#a7a7a7'
  },
  commentLine: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 5,
  },
  commentPhoto: {
    width: 35,
    height: 35,
    borderRadius: 16,
    marginRight: 10
  },
  commentName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  commentSubmit: {
    paddingTop: 20,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
  },
  textSubmit: {
    width: '80%',
    color: '#000',
    fontSize: 15,
    borderTopWidth: 1,
    borderTopColor: '#a7a7a7',
  },
  textButtonSubmit: {
    fontSize: 15,
    color: '#35AAFF',
    paddingLeft: 5,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#a7a7a7',
  }
}
)

export default styles;