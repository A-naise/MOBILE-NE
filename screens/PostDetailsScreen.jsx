import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PostDetailScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostDetails();
    fetchCommentsForPost();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentsForPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      Alert.alert('Success', 'Post deleted successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post. Please try again.');
      console.error(error);
    }
  };

  if (loading || !post) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#200020" />
        <Text style={styles.loadingText}>Loading post details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post ID: {post.id}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDeletePost}>
        <Text style={styles.buttonText}>Delete Post</Text>
      </TouchableOpacity>
      <Text style={styles.commentsTitle}>Comments:</Text>
      {comments.length === 0 ? (
        <Text style={styles.noCommentsText}>No comments associated with this post</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Text style={styles.commentEmail}>{item.email}</Text>
              <Text style={styles.commentBody}>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#200020',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#200020',
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4682B4', // Steel Blue
    paddingVertical: 20, // Increased padding for larger size
    paddingHorizontal: 30,
    borderRadius: 20, // Rounded corners
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#200020',
  },
  noCommentsText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#4682B4', // Steel Blue
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  commentName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentEmail: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  commentBody: {
    marginBottom: 5,
  },
});

export default PostDetailScreen;
