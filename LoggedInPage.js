// Import necessary components
import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    // Update the conversation array
    const updatedConversation = [...conversation, { role: 'user', content: inputText }];
    setConversation(updatedConversation);

    // Call the PHP backend server
    try {
      const response = await fetch('https://skeba.info/API/chatcode.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedConversation),
      });
      const responseData = await response.json();

      // Extract the assistant's message
      const assistantMessage = responseData.choices[0].message.content;
  
      // Update the conversation with the assistant's response
      setConversation(current => [...current, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error:', error);
    }
  
    // Clear the input
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Dashboard</Text>
      <ScrollView style={styles.chatContainer}>
  {conversation.map((message, index) => (
    <View key={index} style={styles[message.role]}>
      <Text>
        {message.role === 'assistant' ? 'Mark Bot: ' : ''}
        {message.content}
      </Text>
    </View>
  ))}
</ScrollView>
      <View style={styles.inputContainer}>
      <TextInput
  style={styles.input}
  onChangeText={setInputText}
  value={inputText}
  placeholder="Type your message..."
  onSubmitEditing={handleSend} // Call handleSend when the enter key is pressed
  returnKeyType="send" // Optional: change the return key label (for iOS)
/>
<Button title="Send" onPress={handleSend} />

      </View>
    </View>
  );
};

// Add styles for your components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    width: '100%',
    maxWidth: 400, // Set max width to 400px
    alignSelf: 'center', // Center the chat container
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    maxWidth: 400, // Set max width to 300px
    alignSelf: 'center', // Center the input container
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    margin: 5,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // For Android
  },
  assistant: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    margin: 5,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // For Android
  },
  system: {
    textAlign: 'left',
    margin: 5,
  },
});

export default Dashboard;
