import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DisplayPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    >
      <View style={styles.postContent}>
        <Text style={styles.title}>Post ID: {item.id}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#200020" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={[styles.container, styles.noPostsContainer]}>
        <Text style={styles.noPostsText}>No Posts Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Text style={styles.buttonText}>Add New Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#200020',
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostsText: {
    fontSize: 18,
    color: '#200020',
  },
  postItem: {
    backgroundColor: '#fff',
    borderRadius: 10, // Increased border radius for rounded corners
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#200020',
  },
  postContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#200020',
  },
  addButton: {
    backgroundColor: '#4682B4', // Steel Blue
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10, // Rounded corners
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default DisplayPostsScreen;
