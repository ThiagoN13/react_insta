import { StyleSheet, Text, Image, FlatList, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import LazyImage from '../../components/LazyImage';
import axios from 'axios';
import { Video } from 'expo-av';

import comment from '../../assets/comment.png';
import like from '../../assets/like.png';
import redLike from '../../assets/redLike.png';

import send from '../../assets/send.png';
import save from '../../assets/save.png';

import { Container, Post, Header, Avatar, Name, Loading } from './styles';

export default function Feed({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState('')
  const userName = 'usuario'

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (pageNumber === total) return;
    if (loading) return;

    setLoading(true);

    axios
      .get(`https://demo7471880.mockable.io/insta?page=${pageNumber}&limit=4`)
      .then(response => {
        const totalItems = response.headers["x-total-count"]
        const data = response.data
        //console.log(data)
        setLoading(false)
        setTotal(Math.floor(totalItems / 4));
        setPage(pageNumber + 1);
        setFeed(shouldRefresh ? data : [...feed, ...data]);
      })
      .catch(err => {
        setError(err.message);
        setLoading(true)
      })
  }

  async function refreshList() {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  }

  function addComment(item, text, index = -1) {
    item.comments.push({
      id: item.comments.length + 1,
      userName,
      userPhoto: 'https://www.w3schools.com/howto/img_avatar.png',
      comment: text
    })

    if (index === -1) {
      index = feed.findIndex(row => row.id === item.id)
    }

    feed[index] = item

    setFeed(feed);
  }

  function likePost(item) {
    item.likes.push({
      id: item.likes.length + 1,
      userName
    })

    const index = feed.findIndex(row => row.id === item.id)

    feed[index] = item

    setFeed(feed);
  }

  function liked(item) {
    return item.likes.some(row => row.userName == userName)
  }

  function renderLikeItem(item) {
    if (liked(item)) {
      return (
        <TouchableOpacity onPress={() => likePost(item)} style={styles.action}>
          <Image
            source={redLike}
          />
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity onPress={() => likePost(item)} style={styles.action}>
        <Image
          source={like}
        />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    loadPage()
  }, []);

  function loadItem(item) {
    const isImage = Boolean(item.feedPhoto)

    if (isImage) {
      return (
        <LazyImage
          aspectRatio={item.aspectRatio}
          shouldLoad={viewable.includes(item.id)}
          smallSource={{ uri: item.feedPhotoMini }}
          source={{ uri: item.feedPhoto }}
        />
      )
    }

    return (
      <Video
        source={{ uri: item.video }}
        rate={1.0}
        volume={1.0}
        resizeMode={Video.RESIZE_MODE_STRETCH}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 400, height: 300 }}
      />
    )
  }


  const renderItem = ({ item, index }) => {
    return (
      <Post style={styles.post}>
        <Header style={styles.postHeader}>
          <TouchableOpacity>
            <Avatar source={{ uri: item.profile.userPhoto }} />
          </TouchableOpacity>
          <Name style={styles.userName}>{item.profile.userName}</Name>
        </Header>

        {loadItem(item)}

        <View style={styles.footer}>
          <View style={styles.actions}>
            <View style={styles.leftActions}>
              {renderLikeItem(item)}

              <TouchableOpacity onPress={() => navigation.navigate('Comments')} style={styles.action}>
                <Image
                  source={comment}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Image
                  source={send}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  source={save}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Likes', { likes: item.likes })}>
              <Text style={styles.likes}>{item.likes.length} Curtidas</Text>
            </TouchableOpacity>

            <View style={styles.subtitle}>
              <TouchableOpacity>
                <Text style={styles.descName}>{item.profile.userName}</Text>
              </TouchableOpacity>
              <Text>{item.Subtitle}</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Comments', { item, addComment })}>
                <Text style={styles.comment}>Ver todos os comentários...</Text>
              </TouchableOpacity>

              {item.comments.slice(0, 2).map((comment) => {
                return (
                  <View style={styles.commentLine} key={comment.id}>
                    <Image style={styles.commentPhoto} source={{ uri: comment.userPhoto }} />
                    <Text style={styles.commentName}>{comment.userName}</Text>
                    <Text style={styles.commentCont}>{comment.comment}</Text>
                  </View>
                )
              })}
            </View>
          </View>

          <View style={styles.commentSpace}>
            <TextInput
              style={styles.text}
              value={text}
              multiline={true}
              onChangeText={(text) => setText(text)}
              placeholder={"Adicionar um comentario..."}
            />

            <TouchableOpacity onPress={() => addComment(item, text, index)}>
              <Text style={styles.textButton}>
                Publicar
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Post>
    )
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

  return (
    <Container>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={renderItem}
        ListFooterComponent={loading && <Loading />}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
      // onEndReached={() => loadPage()}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 15,
    lineHeight: 40,
    width: '80%',
    borderTopWidth: 1,
    borderTopColor: '#a7a7a7',
    flexDirection: 'column'
  },
  textButton: {
    fontSize: 15,
    color: '#35AAFF',
    lineHeight: 40,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderTopColor: '#a7a7a7',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  commentSpace: {
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  commentLine: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 5,
  },
  commentPhoto: {
    width: 20,
    height: 20,
    borderRadius: 16,
    marginRight: 10
  },
  commentName: {
    paddingRight: 5,
    fontSize: 13,
    fontWeight: 'bold',
  },
  commentCont: {
    fontSize: 13
  },
  comment: {
    color: '#a7a7a7',
  },
  post: {
    marginVertical: 5,
    backgroundColor: '#ffffff'
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
  userName: {
    fontWeight: 'bold',
    marginLeft: 0
  },
  place: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    paddingHorizontal: 15
  },
  actions: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  action: {
    marginRight: 8
  },
  leftActions: {
    flexDirection: 'row',
  },
  likes: {
    fontWeight: 'bold',
    fontSize: 12
  },
  description: {
    color: '#000',
    lineHeight: 18
  },
  descName: {
    fontWeight: 'bold',
    paddingRight: 5
  },
  subtitle: {
    flexDirection: 'row',
    paddingVertical: 5
  }
})