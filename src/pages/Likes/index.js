import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import redLike from '../../assets/redLike.png';
import styles from './styles'

export default class Likes extends React.Component {
  constructor ({ props, route }) {
    super(props)
    const { likes = [] } = route.params

    this.state = {
      likes
    }
  }

  render () {
    return (
      <View style={styles.post}>
        <View style={styles.footer}>
          <ScrollView>
            {this.state.likes.map(like => {
              return (
                <View key={like.id}>
                  <View>
                    <Image style={styles.likePhoto} source={{ uri: like.userPhoto }} />
                    <Text style={styles.photoName}>{like.userName}</Text>
                  </View>
                  <View style={styles.likeLine}>
                    <Text style={styles.photoCont}>Curtiu sua foto</Text>
                    <TouchableOpacity>
                      <Image source={redLike} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    );

  }
}