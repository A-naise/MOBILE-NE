import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateCommentScreen = ({ navigation }) => {
  const [postId, setPostId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleCreateComment = async () => {
    if (!postId.trim()) {
      Alert.alert('Error', 'Post ID is required.');
      return;
    }
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'A valid email is required.');
      return;
    }
    if (!body.trim()) {
      Alert.alert('Error', 'Body is required.');
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
        postId: parseInt(postId), // Ensure postId is sent as an integer
        name,
        email,
        body
      });
      Alert.alert('Success', 'Comment created successfully!');
      setPostId('');
      setName('');
      setEmail('');
      setBody('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create comment. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Post ID"
        value={postId}
        onChangeText={setPostId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter body"
        value={body}
        onChangeText={setBody}
        multiline
        style={[styles.input, { height: 100 }]} // Increased height for multiline input
      />
      <View style={styles.buttonContainer}>
        <Button title="Create Comment" onPress={handleCreateComment} color="#4682B4" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#200020',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 12,
    borderRadius: 10,
    overflow: 'hidden', // Ensure button stays within rounded bounds
  },
});

export default CreateCommentScreen;
