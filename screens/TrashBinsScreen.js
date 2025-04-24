
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import axios from 'axios';

// const TrashBinsScreen = () => {
//   const [bins, setBins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [name, setName] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [binCount, setBinCount] = useState(0);
//   const [totalBottles, setTotalBottles] = useState({ plastique: 0, verre: 0 });

//   const fetchBins = async () => {
//     try {
//       const response = await axios.get('http:// 20.20.17.152:5000/api/poubelles/poubelle');
//       setBins(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Erreur lors de la récupération des poubelles.");
//       setLoading(false);
//     }
//   };

//   const fetchBinCount = async () => {
//     try {
//       const response = await axios.get('http:// 20.20.17.152:5000/api/countpoubelle');
//       setBinCount(response.data.count);
//     } catch (err) {
//       console.error('Erreur fetchBinCount:', err.message);
//     }
//   };

//   const fetchTotalBottles = async () => {
//     try {
//       const response = await axios.get('http:// 20.20.17.152:5000/api/countTotalBouteilles');
//       setTotalBottles(response.data || { plastique: 0, verre: 0 });
//     } catch (err) {
//       console.error('Erreur fetchTotalBottles:', err.message);
//     }
//   };

//   const handleAddBin = async () => {
//     if (!name || !latitude || !longitude || !firstname || !lastname) {
//       return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
//     }
//     try {
//       await axios.post('http:// 20.20.17.152:5000/api/poubelles/poubelle', {
//         name,
//         lat: parseFloat(latitude),
//         lng: parseFloat(longitude),
//         firstname,
//         lastname,
//       });
//       setName('');
//       setLatitude('');
//       setLongitude('');
//       setFirstname('');
//       setLastname('');
//       await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
//     } catch (err) {
//       Alert.alert('Erreur', "Échec de l'ajout de la poubelle");
//     }
//   };

//   const handleDeleteBin = (id) => {
//     Alert.alert(
//       "Confirmation",
//       "Supprimer cette poubelle ?",
//       [
//         { text: "Annuler", style: "cancel" },
//         {
//           text: "Supprimer",
//           onPress: async () => {
//             try {
//               await axios.delete(`http:// 20.20.17.152:5000/api/poubelles/poubelle/${id}`);
//               await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
//             } catch (err) {
//               Alert.alert('Erreur', 'Échec de la suppression');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleShowStats = async (binId) => {
//     try {
//       const [binStats, userStats] = await Promise.all([
//         axios.get(`http:// 20.20.17.152:5000/api/count/${binId}`),
//         axios.get(`http:// 20.20.17.152:5000/api/contributions/${binId}`)
//       ]);

//       const userContributions = {};
      
//       userStats.data.forEach(contribution => {
//         const userId = contribution.userId._id;
//         if (!userContributions[userId]) {
//           userContributions[userId] = {
//             firstName: contribution.userId.firstName,
//             lastName: contribution.userId.lastName,
//             plastique: 0,
//             verre: 0
//           };
//         }
        
//         if (contribution.type === 'plastique') {
//           userContributions[userId].plastique += contribution.quantity;
//         } else if (contribution.type === 'verre') {
//           userContributions[userId].verre += contribution.quantity;
//         }
//       });

//       const userContrib = Object.values(userContributions).length > 0
//         ? Object.values(userContributions).map(u => 
//             `👤 ${u.firstName} ${u.lastName}:\n🥤 Plastique: ${u.plastique}  🍷 Verre: ${u.verre}`
//           ).join('\n\n')
//         : 'Aucune contribution d\'utilisateur disponible.';

//       Alert.alert(
//         "Statistiques",
//         `🥤 Plastique total: ${binStats.data.plastique}\n🍷 Verre total: ${binStats.data.verre}\n\n${userContrib}`
//       );
//     } catch (err) {
//       console.error("Erreur lors de l'affichage des statistiques:", err);
//       Alert.alert("Erreur", "Impossible de charger les statistiques");
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
//     };
//     init();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#8D9F87" />
//         <Text style={styles.loadingText}>Chargement...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity onPress={() => {
//           setLoading(true);
//           setError(null);
//           fetchBins();
//         }}>
//           <Text style={styles.retryText}>Réessayer</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Gestion des Poubelles Écologiques</Text>
//         <View style={styles.divider} />
//       </View>

//       <View style={styles.statsContainer}>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>{binCount}</Text>
//           <Text style={styles.statLabel}>Poubelles</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>{totalBottles.plastique}</Text>
//           <Text style={styles.statLabel}>Bouteilles Plastique</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>{totalBottles.verre}</Text>
//           <Text style={styles.statLabel}>Bouteilles Verre</Text>
//         </View>
//       </View>

//       <View style={styles.formContainer}>
//         <Text style={styles.sectionTitle}>Ajouter une Nouvelle Poubelle</Text>
//         <View style={styles.inputContainer}>
//           <TextInput 
//             style={styles.input} 
//             placeholder="Nom de la poubelle" 
//             placeholderTextColor="#A5A5A5"
//             value={name} 
//             onChangeText={setName} 
//           />
//           <View style={styles.coordinatesContainer}>
//             <TextInput 
//               style={[styles.input, styles.coordinateInput]} 
//               placeholder="Latitude" 
//               placeholderTextColor="#A5A5A5"
//               value={latitude} 
//               onChangeText={setLatitude} 
//               keyboardType="numeric" 
//             />
//             <TextInput 
//               style={[styles.input, styles.coordinateInput]} 
//               placeholder="Longitude" 
//               placeholderTextColor="#A5A5A5"
//               value={longitude} 
//               onChangeText={setLongitude} 
//               keyboardType="numeric" 
//             />
//           </View>
//           <View style={styles.coordinatesContainer}>
//             <TextInput 
//               style={[styles.input, styles.coordinateInput]} 
//               placeholder="Prénom" 
//               placeholderTextColor="#A5A5A5"
//               value={firstname} 
//               onChangeText={setFirstname} 
//             />
//             <TextInput 
//               style={[styles.input, styles.coordinateInput]} 
//               placeholder="Nom" 
//               placeholderTextColor="#A5A5A5"
//               value={lastname} 
//               onChangeText={setLastname} 
//             />
//           </View>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddBin}>
//           <Text style={styles.addButtonText}>+ Ajouter la Poubelle</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.binsContainer}>
//         <Text style={styles.sectionTitle}>Liste des Poubelles</Text>
//         {bins.map((bin) => (
//           <View key={bin._id} style={styles.binCard}>
//             <View style={styles.binHeader}>
//               <Text style={styles.binName}>🗑️ {bin.name}</Text>
//               <View style={styles.binLocation}>
//                 <Text style={styles.binLocationText}>📍 {bin.latitude}, {bin.longitude}</Text>
//               </View>
//             </View>
            
//             <View style={styles.binUser}>
//               <Text style={styles.binUserText}>
//                 {bin.firstname && bin.lastname 
//                   ? `👤 ${bin.firstname} ${bin.lastname}`
//                   : '👤 Utilisateur Anonyme'}
//               </Text>
//             </View>

//             <View style={styles.binActions}>
//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.statsButton]} 
//                 onPress={() => handleShowStats(bin._id)}
//               >
//                 <Text style={styles.actionButtonText}>📊 Voir Statistiques</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.deleteButton]} 
//                 onPress={() => handleDeleteBin(bin._id)}
//               >
//                 <Text style={styles.actionButtonText}>🗑️ Supprimer</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#F5F5F0',
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F0',
//   },
//   loadingText: {
//     marginTop: 15,
//     fontSize: 16,
//     color: '#8D9F87',
//   },
//   errorText: {
//     color: '#D32F2F',
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   retryText: {
//     color: '#8D9F87',
//     fontSize: 16,
//     textDecorationLine: 'underline',
//   },
//   header: {
//     marginBottom: 25,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#5A6D57',
//     textAlign: 'center',
//   },
//   divider: {
//     height: 2,
//     width: '40%',
//     backgroundColor: '#D1D9C8',
//     marginTop: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 25,
//   },
//   statCard: {
//     backgroundColor: '#E8EDE3',
//     borderRadius: 12,
//     padding: 15,
//     width: '30%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#5A6D57',
//     marginBottom: 5,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#7A7A7A',
//     textAlign: 'center',
//   },
//   formContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 25,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#5A6D57',
//     marginBottom: 15,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   input: {
//     backgroundColor: '#FAFAFA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 12,
//     fontSize: 14,
//     color: '#333',
//   },
//   coordinatesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   coordinateInput: {
//     width: '48%',
//   },
//   addButton: {
//     backgroundColor: '#8D9F87',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   binsContainer: {
//     marginBottom: 30,
//   },
//   binCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 18,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   binHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   binName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#5A6D57',
//   },
//   binLocation: {
//     backgroundColor: '#E8EDE3',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   binLocationText: {
//     fontSize: 12,
//     color: '#5A6D57',
//   },
//   binUser: {
//     marginBottom: 15,
//   },
//   binUserText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   binActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionButton: {
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   statsButton: {
//     backgroundColor: '#D1D9C8',
//   },
//   deleteButton: {
//     backgroundColor: '#E8C4C4',
//   },
//   actionButtonText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#5A6D57',
//   },
// });

// export default TrashBinsScreen;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const TrashBinsScreen = () => {
//   console.log('[TrashBinsScreen] Composant rendu');
//   const navigation = useNavigation();
//   const [bins, setBins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [binCount, setBinCount] = useState(0);
//   const [totalBottles, setTotalBottles] = useState({ plastique: 0, verre: 0 });

//   const handleLogout = async () => {
//     console.log('[handleLogout] Début de la déconnexion');
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       console.log('[handleLogout] Token récupéré:', token ? '***token_masqué***' : 'null');

//       console.log('[handleLogout] Envoi requête de déconnexion au serveur');
//       await axios.post('http://20.20.17.152:5000/api/auth/logout', {}, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       console.log('[handleLogout] Nettoyage du stockage local');
//       await AsyncStorage.multiRemove(['userToken', 'userData']);
      
//       console.log('[handleLogout] Redirection vers Login');
//       navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      
//     } catch (error) {
//       console.error('[handleLogout] Erreur:', error.message);
//       Alert.alert('Erreur', 'Échec de la déconnexion');
//     }
//   };

//   const fetchBins = async () => {
//     console.log('[fetchBins] Début récupération poubelles');
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       console.log('[fetchBins] Token utilisé:', token ? '***token_masqué***' : 'null');

//       const response = await axios.get('http://20.20.17.152:5000/api/poubelles/poubelle', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       console.log('[fetchBins] Réponse reçue:', response.data.length, 'poubelles');
//       setBins(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('[fetchBins] Erreur:', err.message);
//       console.log('[fetchBins] Statut erreur:', err.response?.status);
      
//       if (err.response?.status === 401) {
//         console.log('[fetchBins] Token invalide - déconnexion');
//         handleLogout();
//       }
//       setError("Erreur lors de la récupération des poubelles.");
//       setLoading(false);
//     }
//   };

//   const fetchBinCount = async () => {
//     console.log('[fetchBinCount] Début récupération nombre poubelles');
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       const response = await axios.get('http://20.20.17.152:5000/api/countpoubelle', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       console.log('[fetchBinCount] Nombre poubelles:', response.data.count);
//       setBinCount(response.data.count);
//     } catch (err) {
//       console.error('[fetchBinCount] Erreur:', err.message);
//     }
//   };

//   const fetchTotalBottles = async () => {
//     console.log('[fetchTotalBottles] Début récupération totaux bouteilles');
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       const response = await axios.get('http://20.20.17.152:5000/api/countTotalBouteilles', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       console.log('[fetchTotalBottles] Totaux:', response.data);
//       setTotalBottles(response.data || { plastique: 0, verre: 0 });
//     } catch (err) {
//       console.error('[fetchTotalBottles] Erreur:', err.message);
//     }
//   };

//   const showAddBinAlert = () => {
//     console.log('[showAddBinAlert] Affichage alerte ajout poubelle');
    
//     Alert.prompt(
//       'Ajouter une poubelle',
//       'Veuillez entrer les détails de la poubelle',
//       [
//         {
//           text: 'Annuler',
//           style: 'cancel',
//           onPress: () => console.log('[showAddBinAlert] Ajout annulé')
//         },
//         {
//           text: 'Ajouter',
//           onPress: async (text) => {
//             console.log('[showAddBinAlert] Données saisies:', text);
//             const [name, latitude, longitude, firstname, lastname] = text.split('|').map(item => item.trim());
            
//             if (!name || !latitude || !longitude || !firstname || !lastname) {
//               console.log('[showAddBinAlert] Champs manquants');
//               Alert.alert('Erreur', 'Tous les champs sont obligatoires');
//               return;
//             }
            
//             try {
//               const token = await AsyncStorage.getItem('userToken');
//               console.log('[showAddBinAlert] Envoi requête POST');
              
//               await axios.post('http://20.20.17.152:5000/api/poubelles/poubelle', {
//                 name,
//                 lat: parseFloat(latitude),
//                 lng: parseFloat(longitude),
//                 firstname,
//                 lastname,
//               }, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//               });
              
//               console.log('[showAddBinAlert] Rechargement données');
//               await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
//             } catch (err) {
//               console.error('[showAddBinAlert] Erreur:', err.message);
//               Alert.alert('Erreur', "Échec de l'ajout de la poubelle");
//             }
//           }
//         }
//       ],
//       'plain-text',
//       '',
//       'default',
//       {
//         placeholder: 'Nom|Latitude|Longitude|Prénom|Nom\n(Séparés par des "|")'
//       }
//     );
//   };

//   const handleDeleteBin = (id) => {
//     console.log('[handleDeleteBin] Tentative suppression poubelle ID:', id);
//     Alert.alert(
//       "Confirmation",
//       "Supprimer cette poubelle ?",
//       [
//         { 
//           text: "Annuler", 
//           style: "cancel",
//           onPress: () => console.log('[handleDeleteBin] Suppression annulée') 
//         },
//         {
//           text: "Supprimer",
//           onPress: async () => {
//             console.log('[handleDeleteBin] Confirmation suppression');
//             try {
//               const token = await AsyncStorage.getItem('userToken');
//               await axios.delete(`http://20.20.17.152:5000/api/poubelles/poubelle/${id}`, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//               });
              
//               console.log('[handleDeleteBin] Rechargement données');
//               await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
//             } catch (err) {
//               console.error('[handleDeleteBin] Erreur:', err.message);
//               Alert.alert('Erreur', 'Échec de la suppression');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleShowStats = async (binId) => {
//     console.log('[handleShowStats] Affichage stats poubelle ID:', binId);
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       console.log('[handleShowStats] Récupération stats');
      
//       const [binStats, userStats] = await Promise.all([
//         axios.get(`http://20.20.17.152:5000/api/count/${binId}`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }),
//         axios.get(`http://20.20.17.152:5000/api/contributions/${binId}`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         })
//       ]);

//       console.log('[handleShowStats] Stats reçues:', {
//         binStats: binStats.data,
//         userStatsCount: userStats.data.length
//       });

//       const userContributions = {};
      
//       userStats.data.forEach(contribution => {
//         const userId = contribution.userId._id;
//         if (!userContributions[userId]) {
//           userContributions[userId] = {
//             firstName: contribution.userId.firstName,
//             lastName: contribution.userId.lastName,
//             plastique: 0,
//             verre: 0
//           };
//         }
        
//         if (contribution.type === 'plastique') {
//           userContributions[userId].plastique += contribution.quantity;
//         } else if (contribution.type === 'verre') {
//           userContributions[userId].verre += contribution.quantity;
//         }
//       });

//       const userContrib = Object.values(userContributions).length > 0
//         ? Object.values(userContributions).map(u => 
//             `👤 ${u.firstName} ${u.lastName}:\n🥤 Plastique: ${u.plastique}  � Verre: ${u.verre}`
//           ).join('\n\n')
//         : 'Aucune contribution utilisateur';

//       console.log('[handleShowStats] Affichage alert');
//       Alert.alert(
//         "Statistiques",
//         `🥤 Plastique: ${binStats.data.plastique}\n🍷 Verre: ${binStats.data.verre}\n\n${userContrib}`
//       );
//     } catch (err) {
//       console.error("[handleShowStats] Erreur:", err);
//       Alert.alert("Erreur", "Impossible de charger les statistiques");
//     }
//   };

//   useEffect(() => {
//     console.log('[useEffect] Initialisation composant');
//     const init = async () => {
//       console.log('[init] Chargement données initiales');
//       await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
//       console.log('[init] Données chargées');
//     };
//     init();

//     return () => {
//       console.log('[useEffect] Nettoyage composant');
//     };
//   }, []);

//   if (loading) {
//     console.log('[RENDER] Affichage loader');
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#8D9F87" />
//         <Text style={styles.loadingText}>Chargement...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     console.log('[RENDER] Affichage erreur:', error);
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity onPress={() => {
//           console.log('[RENDER] Clic Réessayer');
//           setLoading(true);
//           setError(null);
//           fetchBins();
//         }}>
//           <Text style={styles.retryText}>Réessayer</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   console.log('[RENDER] Affichage interface principale');
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.headerContainer}>
//         <View style={styles.header}>
//           <TouchableOpacity 
//             onPress={handleLogout} 
//             style={styles.logoutButton}
//             onPressIn={() => console.log('[LOGOUT] Bouton pressé')}
//           >
//             <Text style={styles.logoutText}>Déconnexion</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.divider} />
//       </View>

//       <View style={styles.statsContainer}>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>{binCount}</Text>
//           <Text style={styles.statLabel}>Poubelles</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>{totalBottles.plastique}</Text>
//           <Text style={styles.statLabel}>Plastique</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>{totalBottles.verre}</Text>
//           <Text style={styles.statLabel}>Verre</Text>
//         </View>
//       </View>

//       <TouchableOpacity 
//         style={styles.addButton} 
//         onPress={showAddBinAlert}
//         onPressIn={() => console.log('[ADD] Bouton pressé')}
//       >
//         <Text style={styles.addButtonText}>+ Ajouter une poubelle</Text>
//       </TouchableOpacity>

//       <View style={styles.binsContainer}>
//         <Text style={styles.sectionTitle}>Liste des Poubelles</Text>
//         {bins.map((bin) => (
//           <View key={bin._id} style={styles.binCard}>
//             <View style={styles.binHeader}>
//               <Text style={styles.binName}>🗑️ {bin.name}</Text>
//               <View style={styles.binLocation}>
//                 <Text style={styles.binLocationText}>📍 {bin.latitude}, {bin.longitude}</Text>
//               </View>
//             </View>
            
//             <View style={styles.binUser}>
//               <Text style={styles.binUserText}>
//                 {bin.firstname && bin.lastname 
//                   ? `👤 ${bin.firstname} ${bin.lastname}`
//                   : '👤 Anonyme'}
//               </Text>
//             </View>

//             <View style={styles.binActions}>
//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.statsButton]} 
//                 onPress={() => {
//                   console.log('[STATS] Bouton pressé pour:', bin._id);
//                   handleShowStats(bin._id);
//                 }}
//               >
//                 <Text style={styles.actionButtonText}>📊 Stats</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.deleteButton]} 
//                 onPress={() => {
//                   console.log('[DELETE] Bouton pressé pour:', bin._id);
//                   handleDeleteBin(bin._id);
//                 }}
//               >
//                 <Text style={styles.actionButtonText}>🗑️ Supprimer</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#F5F5F0',
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F0',
//   },
//   loadingText: {
//     marginTop: 15,
//     fontSize: 16,
//     color: '#8D9F87',
//   },
//   errorText: {
//     color: '#D32F2F',
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   retryText: {
//     color: '#8D9F87',
//     fontSize: 16,
//     textDecorationLine: 'underline',
//   },
//   headerContainer: {
//     marginBottom: 25,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#5A6D57',
//     textAlign: 'center',
//     flex: 1,
//   },
//   logoutButton: {
//     backgroundColor: '#E8C4C4',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   logoutText: {
//     color: '#D32F2F',
//     fontWeight: '500',
//   },
//   divider: {
//     height: 2,
//     width: '100%',
//     backgroundColor: '#D1D9C8',
//     marginTop: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 25,
//   },
//   statCard: {
//     backgroundColor: '#E8EDE3',
//     borderRadius: 12,
//     padding: 15,
//     width: '30%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#5A6D57',
//     marginBottom: 5,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#7A7A7A',
//     textAlign: 'center',
//   },
//   addButton: {
//     backgroundColor: '#8D9F87',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   binsContainer: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#5A6D57',
//     marginBottom: 15,
//   },
//   binCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 18,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TrashBinsScreen = () => {
  console.log('[TrashBinsScreen] Composant rendu');
  const navigation = useNavigation();
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [binCount, setBinCount] = useState(0);
  const [totalBottles, setTotalBottles] = useState({ plastique: 0, verre: 0 });

  const handleLogout = async () => {
    console.log('[handleLogout] Début de la déconnexion');
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('[handleLogout] Token récupéré:', token ? '***token_masqué***' : 'null');

      console.log('[handleLogout] Envoi requête de déconnexion au serveur');
      await axios.post('http:// 20.20.18.89:5000/api/auth/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('[handleLogout] Nettoyage du stockage local');
      await AsyncStorage.multiRemove(['userToken', 'userData']);
      
      console.log('[handleLogout] Redirection vers Login');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      
    } catch (error) {
      console.error('[handleLogout] Erreur:', error.message);
      Alert.alert('Erreur', 'Échec de la déconnexion');
    }
  };

  const fetchBins = async () => {
    console.log('[fetchBins] Début récupération poubelles');
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('[fetchBins] Token utilisé:', token ? '***token_masqué***' : 'null');

      const response = await axios.get('http://20.20.18.89:5000/api/poubelles/poubelle', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('[fetchBins] Réponse reçue:', response.data.length, 'poubelles');
      setBins(response.data);
      setLoading(false);
    } catch (err) {
      console.error('[fetchBins] Erreur:', err.message);
      console.log('[fetchBins] Statut erreur:', err.response?.status);
      
      if (err.response?.status === 401) {
        console.log('[fetchBins] Token invalide - déconnexion');
        handleLogout();
      }
      setError("Erreur lors de la récupération des poubelles.");
      setLoading(false);
    }
  };

  const fetchBinCount = async () => {
    console.log('[fetchBinCount] Début récupération nombre poubelles');
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://20.20.18.89:5000/api/countpoubelle', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('[fetchBinCount] Nombre poubelles:', response.data.count);
      setBinCount(response.data.count);
    } catch (err) {
      console.error('[fetchBinCount] Erreur:', err.message);
    }
  };

  const fetchTotalBottles = async () => {
    console.log('[fetchTotalBottles] Début récupération totaux bouteilles');
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://20.20.18.89:5000/api/countTotalBouteilles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('[fetchTotalBottles] Totaux:', response.data);
      setTotalBottles(response.data || { plastique: 0, verre: 0 });
    } catch (err) {
      console.error('[fetchTotalBottles] Erreur:', err.message);
    }
  };

  const showAddBinAlert = () => {
    console.log('[showAddBinAlert] Affichage alerte ajout poubelle');
    
    Alert.prompt(
      'Ajouter une poubelle',
      'Veuillez entrer les détails de la poubelle (séparés par "|")',
      [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: () => console.log('[showAddBinAlert] Ajout annulé')
        },
        {
          text: 'Ajouter',
          onPress: async (text) => {
            console.log('[showAddBinAlert] Données saisies:', text);
            const [name, latitude, longitude] = text.split('|').map(item => item.trim());
            
            if (!name || !latitude || !longitude) {
              console.log('[showAddBinAlert] Champs manquants');
              Alert.alert('Erreur', 'Tous les champs sont obligatoires');
              return;
            }
            
            try {
              const token = await AsyncStorage.getItem('userToken');
              console.log('[showAddBinAlert] Envoi requête POST');
              
              await axios.post('http://20.20.18.89:5000/api/poubelles/poubelle', {
                name,
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
                firstname: 'Admin', // Valeur par défaut
                lastname: 'System' // Valeur par défaut
              }, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              console.log('[showAddBinAlert] Rechargement données');
              await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
            } catch (err) {
              console.error('[showAddBinAlert] Erreur:', err.message);
              Alert.alert('Erreur', "Échec de l'ajout de la poubelle");
            }
          }
        }
      ],
      'plain-text',
      '',
      'default',
      {
        placeholder: 'Nom|Latitude|Longitude\nEx: Poubelle centrale|48.8566|2.3522'
      }
    );
  };

  const handleDeleteBin = (id) => {
    console.log('[handleDeleteBin] Tentative suppression poubelle ID:', id);
    Alert.alert(
      "Confirmation",
      "Supprimer cette poubelle ?",
      [
        { 
          text: "Annuler", 
          style: "cancel",
          onPress: () => console.log('[handleDeleteBin] Suppression annulée') 
        },
        {
          text: "Supprimer",
          onPress: async () => {
            console.log('[handleDeleteBin] Confirmation suppression');
            try {
              const token = await AsyncStorage.getItem('userToken');
              await axios.delete(`http://20.20.18.89:5000/api/poubelles/poubelle/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              console.log('[handleDeleteBin] Rechargement données');
              await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
            } catch (err) {
              console.error('[handleDeleteBin] Erreur:', err.message);
              Alert.alert('Erreur', 'Échec de la suppression');
            }
          },
        },
      ]
    );
  };

  const handleShowStats = async (binId) => {
    console.log('[handleShowStats] Affichage stats poubelle ID:', binId);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('[handleShowStats] Récupération stats');
      
      const [binStats, userStats] = await Promise.all([
        axios.get(`http://20.20.18.89:5000/api/count/${binId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`http://20.20.18.89:5000/api/contributions/${binId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      console.log('[handleShowStats] Stats reçues:', {
        binStats: binStats.data,
        userStatsCount: userStats.data.length
      });

      const userContributions = {};
      
      userStats.data.forEach(contribution => {
        const userId = contribution.userId._id;
        if (!userContributions[userId]) {
          userContributions[userId] = {
            firstName: contribution.userId.firstName,
            lastName: contribution.userId.lastName,
            plastique: 0,
            verre: 0
          };
        }
        
        if (contribution.type === 'plastique') {
          userContributions[userId].plastique += contribution.quantity;
        } else if (contribution.type === 'verre') {
          userContributions[userId].verre += contribution.quantity;
        }
      });

      const userContrib = Object.values(userContributions).length > 0
        ? Object.values(userContributions).map(u => 
            `👤 ${u.firstName} ${u.lastName}:\n🥤 Plastique: ${u.plastique}  � Verre: ${u.verre}`
          ).join('\n\n')
        : 'Aucune contribution utilisateur';

      console.log('[handleShowStats] Affichage alert');
      Alert.alert(
        "Statistiques",
        `🥤 Plastique: ${binStats.data.plastique}\n🍷 Verre: ${binStats.data.verre}\n\n${userContrib}`
      );
    } catch (err) {
      console.error("[handleShowStats] Erreur:", err);
      Alert.alert("Erreur", "Impossible de charger les statistiques");
    }
  };

  useEffect(() => {
    console.log('[useEffect] Initialisation composant');
    const init = async () => {
      console.log('[init] Chargement données initiales');
      await Promise.all([fetchBins(), fetchBinCount(), fetchTotalBottles()]);
      console.log('[init] Données chargées');
    };
    init();

    return () => {
      console.log('[useEffect] Nettoyage composant');
    };
  }, []);

  if (loading) {
    console.log('[RENDER] Affichage loader');
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#8D9F87" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    console.log('[RENDER] Affichage erreur:', error);
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => {
          console.log('[RENDER] Clic Réessayer');
          setLoading(true);
          setError(null);
          fetchBins();
        }}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log('[RENDER] Affichage interface principale');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* <Text style={styles.title}>Gestion des Poubelles Écologiques</Text> */}
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Map', { bins })}
              style={styles.mapButton}
            >
              <Text style={styles.mapButtonText}>🗺️ Carte</Text>
            </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleLogout} 
            style={styles.logoutButton}
            onPressIn={() => console.log('[LOGOUT] Bouton pressé')}
          >
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{binCount}</Text>
          <Text style={styles.statLabel}>Poubelles</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalBottles.plastique}</Text>
          <Text style={styles.statLabel}>Plastique</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalBottles.verre}</Text>
          <Text style={styles.statLabel}>Verre</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={showAddBinAlert}
        onPressIn={() => console.log('[ADD] Bouton pressé')}
      >
        <Text style={styles.addButtonText}>+ Ajouter une poubelle</Text>
      </TouchableOpacity>

      <View style={styles.binsContainer}>
        <Text style={styles.sectionTitle}>Liste des Poubelles</Text>
        {bins.map((bin) => (
          <View key={bin._id} style={styles.binCard}>
            <View style={styles.binHeader}>
              <Text style={styles.binName}>🗑️ {bin.name}</Text>
              <View style={styles.binLocation}>
                <Text style={styles.binLocationText}>📍 {bin.latitude}, {bin.longitude}</Text>
              </View>
            </View>
            
            <View style={styles.binUser}>
              <Text style={styles.binUserText}>
                {bin.firstname && bin.lastname 
                  ? `👤 ${bin.firstname} ${bin.lastname}`
                  : '👤 Anonyme'}
              </Text>
            </View>

            <View style={styles.binActions}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.statsButton]} 
                onPress={() => {
                  console.log('[STATS] Bouton pressé pour:', bin._id);
                  handleShowStats(bin._id);
                }}
              >
                <Text style={styles.actionButtonText}>📊 Stats</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]} 
                onPress={() => {
                  console.log('[DELETE] Bouton pressé pour:', bin._id);
                  handleDeleteBin(bin._id);
                }}
              >
                <Text style={styles.actionButtonText}>🗑️ Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F0',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F0',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#8D9F87',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    marginBottom: 15,
  },
  retryText: {
    color: '#8D9F87',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  headerContainer: {
    marginBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5A6D57',
    textAlign: 'center',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#E8C4C4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: '500',
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#D1D9C8',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: '#E8EDE3',
    borderRadius: 12,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A6D57',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7A7A7A',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#8D9F87',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 25,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  binsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5A6D57',
    marginBottom: 15,
  },
  binCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  binHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  binName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A6D57',
  },
  binLocation: {
    backgroundColor: '#E8EDE3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  binLocationText: {
    fontSize: 12,
    color: '#5A6D57',
  },
  binUser: {
    marginBottom: 15,
  },
  binUserText: {
    fontSize: 14,
    color: '#666',
  },
  binActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statsButton: {
    backgroundColor: '#D1D9C8',
  },
  deleteButton: {
    backgroundColor: '#E8C4C4',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5A6D57',
  },
});


export default TrashBinsScreen;