import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import like from '../../assets/like.png';
import styles from './styles'

export default class Comment extends React.Component {
  constructor ({ route, props }) {
    super(props)
    const { item = [], addComment } = route.params

    this.state = {
      text: '',
      addComment,
      item
    }
  }

  onSetText (text) {
    this.setState({ text })
  }

  addComment () {
    this.state.addComment(this.state.item, this.state.text)

    this.setState({ text: '' })
  }

  render () {
    return (
      <View style={styles.post}>
        <View style={styles.footer}>
          <ScrollView>
            {this.state.item.comments.map(comment => {
              return (
                <View key={comment.id}>
                  <View style={styles.commentLine}>
                    <Image style={styles.commentPhoto} source={{ uri: comment.userPhoto }} />
                    <Text style={styles.commentName}>{comment.userName}</Text>
                  </View>

                  <View style={styles.rowComment}>
                    <Text style={styles.commentCont}>{comment.comment}</Text>
                    <TouchableOpacity>
                      <Image source={like} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
  
        <View style={styles.commentSubmit}>
          <TextInput
            style={styles.textSubmit}
            placeholder={"Adicionar um comentario..."}
            autoCorrect={false}
            onChange={(event) => this.onSetText(event.nativeEvent.text)}
          />
  
          <TouchableOpacity onPress={() => this.addComment()}>
            <Text style={styles.textButtonSubmit}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
