import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserDetailsScreen = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.203:5000/api/users/${userId}`);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur de récupération des détails de l'utilisateur");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Chargement des informations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.userRole}>{user.genre === 'F' ? '👩 Femme' : '👨 Homme'}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>📧 Email</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>📞 Téléphone</Text>
        <Text style={styles.info}>{user.telephone}</Text>
      </View>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>🎁 Note</Text>
        <Text style={styles.noteText}>
          Lorsque vous avez un certain nombre de bouteilles, vous pouvez gagner un cadeau selon le montant accumulé.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TrashBins')}
      >
        <Text style={styles.buttonText}>Voir les poubelles</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F8',
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E2E2E',
  },
  userRole: {
    fontSize: 18,
    color: '#666',
    marginTop: 6,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  info: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  noteBox: {
    backgroundColor: '#E8F0FE',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3366cc',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    color: '#444',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserDetailsScreen;
