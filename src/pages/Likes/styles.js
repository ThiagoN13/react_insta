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
  likeLine: {
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#a7a7a7',
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likePhoto: {
    width: 20,
    height: 20,
    borderRadius: 16,
    marginRight: 10
  },
  photoName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  likeName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 5,
  }
})

export default styles