import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DisplayPosts')}
      >
        <Text style={styles.buttonText}>Display All Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateComment')}
      >
        <Text style={styles.buttonText}>Create Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#4682B4', // Steel Blue
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20, // Rounded corners
    marginVertical: 10,
    width: '80%',
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
    fontWeight: 'bold',
  },
});

export default HomeScreen;
