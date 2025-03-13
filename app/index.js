import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const API_URL = 'https://random-data-api.com/api/users/random_user?size=80';

const UserInfoApp = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />;
  }

  const currentUser = users[currentIndex];

  return (
    <View style={styles.container}>
      {currentUser && (
        <>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <Text style={styles.heading}>User</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>ID:</Text><Text style={styles.value}>{currentUser.id}</Text>
            <Text style={styles.label}>UID:</Text><Text style={styles.value}>{currentUser.uid}</Text>
            <Text style={styles.label}>Name:</Text><Text style={styles.value}>{currentUser.first_name} {currentUser.last_name}</Text>
            <Text style={styles.label}>Username:</Text><Text style={styles.value}>{currentUser.username}</Text>
            <Text style={styles.label}>Email:</Text><Text style={styles.value}>{currentUser.email}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, currentIndex === 0 && styles.disabledButton]}
              onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, currentIndex === users.length - 1 && styles.disabledButton]}
              onPress={() => setCurrentIndex((prev) => Math.min(prev + 1, users.length - 1))}
              disabled={currentIndex === users.length - 1}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4A90E2',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: 120,
  },
  disabledButton: {
    backgroundColor: '#B0C4DE',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserInfoApp;