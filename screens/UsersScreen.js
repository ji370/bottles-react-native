// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const UsersScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://   20.20.18.89:5000/api/users');
//       setUsers(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Erreur:", err);
//       setError("Impossible de charger les utilisateurs");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const renderUserItem = ({ item }) => (
//     <View style={styles.userCard}>
//       <View style={styles.cardHeader}>
//         <View style={styles.avatarContainer}>
//           <Icon 
//             name={item.genre === 'F' ? 'person-outline' : 'person-outline'} 
//             size={24} 
//             color={item.genre === 'F' ? '#8D6E63' : '#5D4037'} 
//           />
//         </View>
//         <View style={styles.userInfoContainer}>
//           <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
//           <Text style={styles.userEmail}>{item.email}</Text>
//         </View>
//         <Icon name="chevron-right" size={24} color="#A8B8A8" />
//       </View>
//       <View style={styles.divider} />
//       <View style={styles.cardFooter}>
//         <View style={styles.infoItem}>
//           <Icon name="phone" size={16} color="#6B8E6E" />
//           <Text style={styles.infoText}>{item.telephone}</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <Icon name="event" size={16} color="#6B8E6E" />
//           <Text style={styles.infoText}>Inscrit le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
// </Text>

//         </View>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6B8E6E" />
//         <Text style={styles.loadingText}>Chargement en cours...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Icon name="error-outline" size={40} color="#BCAAA4" />
//         <Text style={styles.errorText}>{error}</Text>
//         <View style={styles.retryButton} onTouchEnd={fetchUsers}>
//           <Text style={styles.retryText}>Réessayer</Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Utilisateurs</Text>
//         <Text style={styles.subtitle}>{users.length} utilisateurs trouvés</Text>
//       </View>
      
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={renderUserItem}
//         contentContainerStyle={styles.listContent}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Icon name="people-outline" size={50} color="#BCAAA4" />
//             <Text style={styles.emptyText}>Aucun utilisateur trouvé</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F1',
//   },
//   header: {
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#3A5A40',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#8D8D8D',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F1',
//   },
//   loadingText: {
//     marginTop: 16,
//     color: '#6B8E6E',
//     fontSize: 16,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F1',
//     padding: 20,
//   },
//   errorText: {
//     marginTop: 16,
//     color: '#8D6E63',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   retryButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#6B8E6E',
//     borderRadius: 6,
//   },
//   retryText: {
//     color: '#FFFFFF',
//     fontWeight: '500',
//   },
//   listContent: {
//     padding: 16,
//   },
//   userCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   avatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#EFEBE9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   userInfoContainer: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#3A5A40',
//     marginBottom: 2,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: '#8D8D8D',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EFEBE9',
//     marginVertical: 8,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   infoText: {
//     fontSize: 13,
//     color: '#6B8E6E',
//     marginLeft: 6,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//   },
//   emptyText: {
//     marginTop: 16,
//     color: '#8D6E63',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default UsersScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users from API...');
      const response = await axios.get('http://20.20.18.89:5000/api/users');
      console.log('Réponse complète :', response.data);

      // Log de chaque utilisateur pour vérification
      response.data.forEach((user, index) => {
        console.log(`Utilisateur ${index + 1} :`, user);
        console.log(`Nom : ${user.firstName} ${user.lastName}`);
        console.log(`Créé le (timestamp brut) : ${user.createdAt}`);
        console.log(`Date formatée : ${new Date(user.createdAt).toLocaleDateString('fr-FR')}`);
      });

      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du fetch :", err);
      setError("Impossible de charger les utilisateurs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Icon 
            name={item.genre === 'F' ? 'person-outline' : 'person-outline'} 
            size={24} 
            color={item.genre === 'F' ? '#8D6E63' : '#5D4037'} 
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#A8B8A8" />
      </View>
      <View style={styles.divider} />
      <View style={styles.cardFooter}>
        <View style={styles.infoItem}>
          <Icon name="phone" size={16} color="#6B8E6E" />
          <Text style={styles.infoText}>{item.telephone}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="event" size={16} color="#6B8E6E" />
          <Text style={styles.infoText}>
            Inscrit le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B8E6E" />
        <Text style={styles.loadingText}>Chargement en cours...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={40} color="#BCAAA4" />
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.retryButton} onTouchEnd={fetchUsers}>
          <Text style={styles.retryText}>Réessayer</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Utilisateurs</Text>
        <Text style={styles.subtitle}>{users.length} utilisateurs trouvés</Text>
      </View>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="people-outline" size={50} color="#BCAAA4" />
            <Text style={styles.emptyText}>Aucun utilisateur trouvé</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F1',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3A5A40',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8D8D8D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F1',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B8E6E',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F1',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    color: '#8D6E63',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6B8E6E',
    borderRadius: 6,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEBE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A5A40',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#8D8D8D',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEBE9',
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    color: '#6B8E6E',
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    color: '#8D6E63',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UsersScreen;
