


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function HomeScreen({ route }) {
//   const navigation = useNavigation();
//   const [user, setUser] = useState(route?.params?.user || {}); // Sécuriser si user non passé
//   const [bottleCount, setBottleCount] = useState(0); // Pour stocker le nombre total des utilisateurs
//   const [loading, setLoading] = useState(true);

//   // Fonction pour récupérer les données utilisateur et le nombre total des utilisateurs
//   const fetchUserData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const userId = await AsyncStorage.getItem('userId');

//       if (!token || !userId) {
//         console.error("⛔ Token ou UserID manquant.");
//         return;
//       }

//       // Récupérer les données utilisateur
//       const userRes = await axios.get(`http:// 20.20.19.255:5000/api/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(userRes.data);

//       // Récupérer le nombre total des utilisateurs
//       const countRes = await axios.get(`http:// 20.20.19.255:5000/api/count`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (countRes.data && countRes.data.count) {
//         setBottleCount(countRes.data.count);
//       }

//     } catch (error) {
//       console.error("❌ Erreur lors du chargement des données :", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#1E90FF" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>
//         Bienvenue 👋 {user.name || user.firstName || user.email || 'Utilisateur'}
//       </Text>

//       {/* 👤 Section Utilisateur */}
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => {
//           console.log("✅ Navigation vers UsersScreen");
//           navigation.navigate('UsersScreen', { user });
//         }}
//       >
//         <Text style={styles.cardTitle}>👤 Informations Utilisateur</Text>
//       </TouchableOpacity>

//       {/* 🗑️ Section Poubelles */}
//       <TouchableOpacity
//         style={[styles.card, styles.trashCard]}
//         onPress={() => {
//           console.log("✅ Navigation vers TrashBins");
//           navigation.navigate('TrashBins');
//         }}
//       >
//         <Text style={styles.cardTitle}>🗑️ Poubelles Connectées</Text>
//       </TouchableOpacity>

//       {/* 🧴 Section Nombre total d'utilisateurs */}
//       <View style={styles.bottleCard}>
//         <Text style={styles.bottleText}>Total des utilisateurs : {bottleCount}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#f0f4f7',
//     flexGrow: 1,
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#2c3e50',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 15,
//     padding: 30,
//     marginBottom: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     alignItems: 'center',
//   },
//   trashCard: {
//     backgroundColor: '#e0f7fa',
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#00796b',
//   },
//   bottleCard: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   bottleText: {
//     fontSize: 15,
//     color: '#444',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(route?.params?.user || {});
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données utilisateur
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        console.error("⛔ Token ou UserID manquant.");
        return;
      }

      // Récupérer les données utilisateur
      const userRes = await axios.get(`http://20.20.18.89:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);

    } catch (error) {
      console.error("❌ Erreur lors du chargement des données :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
       Hello 👋
      </Text>

      {/* 👤 Section Utilisateur */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("✅ Navigation vers UsersScreen");
          navigation.navigate('UsersScreen', { user });
        }}
      >
        <Text style={styles.cardTitle}>👤 Les informations des utilisateurs</Text>
      </TouchableOpacity>

      {/* 🗑️ Section Poubelles */}
      <TouchableOpacity
        style={[styles.card, styles.trashCard]}
        onPress={() => {
          console.log("✅ Navigation vers TrashBins");
          navigation.navigate('TrashBins');
        }}
      >
        <Text style={styles.cardTitle}>🗑️ Les informations des poubelles </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F4F4',
    flexGrow: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2E4A3C',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 1.2,
  },
  card: {
    backgroundColor: '#FFF5E1',
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  trashCard: {
    backgroundColor: '#C8E6C9',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#388E3C',
    textAlign: 'center',
    marginVertical: 15,
    letterSpacing: 0.5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
});