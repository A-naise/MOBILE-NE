import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePostForm from "./screens/CreatePostForm";
import DisplayPostsScreen from "./screens/DisplayPostsScreen";
import PostDetailScreen from "./screens/PostDetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import CreateCommentScreen from "./screens/CreateCommentScreen";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Posts Management"
          // options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen name="CreatePost" component={CreatePostForm} />
        <Stack.Screen name="DisplayPosts" component={DisplayPostsScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="CreateComment" component={CreateCommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
