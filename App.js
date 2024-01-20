import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform } from 'react-native'; // Import Platform here
import LoggedInPage from './LoggedInPage'; // Import the new component
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@env';
const backgroundImage = require('./frontbackgroundimage.png'); // Background image

const taskPadIcon = require('./assets/favicon.png'); // Update the path
const boardImage = require('./board.png'); // Update the path
const auth0ClientId = AUTH0_CLIENT_ID;
const auth0Domain = AUTH0_DOMAIN;
const logout = () => {
  // Implement your logout logic here
  setIsLoggedIn(false);
  setUserProfile(null);
};
export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginWithRedirect = () => {
    // Implement your login logic here
  };
  useEffect(() => {
    if (Platform.OS === 'web') {
      const urlSearchParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = urlSearchParams.get('access_token');
      
      if (accessToken) {
        // Fetch user profile using the access token
        fetch(`https://${auth0Domain}/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => response.json())
        .then(data => {
          setUserProfile(data);
          setIsLoggedIn(true); // Update login status
        })
        .catch(error => console.error("Error fetching user info", error));
      }
    }
  }, []);

 const login = () => {
    // Assuming you are using a web browser for auth
    if (Platform.OS === 'web') {
      window.location.href = `https://${auth0Domain}/authorize?` +
        `scope=openid%20profile%20email&` +
        `response_type=token&` +
        `client_id=${auth0ClientId}&` +
        `redirect_uri=${window.location.origin}`;
    } else {
      // Add logic for native app login here
    }
  };

 return (

    <View style={styles.container}>
       <View style={styles.topBar}>
          <View style={styles.logoContainer}>
            <Image source={taskPadIcon} style={styles.icon} />
            <Text style={styles.title}>Mark Bot</Text>
          </View>
 
          {isLoggedIn ? (
          <View style={styles.userContainer}>
            <TouchableOpacity onPress={logout} style={styles.loginButton}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={login} style={styles.loginButton}>
            <Text>Log In</Text>
          </TouchableOpacity>
        )}

          </View>
      {isLoggedIn ? (
      <LoggedInPage userProfile={userProfile} />
      ) : (
        
      
  <View>       
 <Image source={backgroundImage} style={styles.backgroundImage} />
        <View style={styles.frontpageContainer}>
       

          <View style={styles.frontpageBox}>
            <Text>Create a free account to access Mark Bot</Text>
            <TouchableOpacity onPress={login} style={styles.registerButton}>
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
          <Image source={boardImage} style={styles.boardImage} />
    
        </View>
       
</View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b8a7c', // Purple background
  },
  backgroundImage: {
    position: 'relative',
zIndex: '-1',
margin: 'auto',
resizeMode: 'cover',
top:30,
  },
  loginBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Add additional styling as needed
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskHeaderIcon: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
  },
  loginButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  frontpageContainer: {
    flex: 1,
    flexDirection: 'row', // Align items in a row
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: 100,
  },
  frontpageBox: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 20, // Add space between the box and the image
    height:200,
    width:200,

  },
  registerButton: {
    marginTop: 10, // Space above the button
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  boardImage: {
    width: 200, // Adjust size as needed
    height: 200, // Adjust size as needed
    borderRadius:5,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333', // Top bar color
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30, // Adjust size as needed
    height: 30, // Adjust size as needed
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    // Add more styling for your title
  },

});