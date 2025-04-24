// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ResetPasswordScreen = ({ route, navigation }) => {
//   const { email,token  } = route.params || {};
//   const [resetCode, setResetCode] = useState('');
//   const [newPassword, setNewPassword] = useState('');


// const handleResetPassword = async () => {
//     if (!resetCode || !newPassword) {
//       return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
//     }
  
//     if (newPassword.length < 6) {
//       return Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
//     }
  
//     try {
//       console.log('Données envoyées :', JSON.stringify({ resetCode, newPassword }));
  
//       const res = await axios.post(`http://192.168.1.234:5000/api/auth/reset-password`, {
//         resetCode,
//         newPassword,
//         headers: {
//             Authorization: `Bearer ${token}`,
//           },
//       });
  
//       console.log('Réponse du serveur :', res.data);
  
//       Alert.alert('Succès', 'Votre mot de passe a été modifié');
//       navigation.navigate('LoginScreen');
//     } catch (error) {
//       console.log('Erreur Axios:', error);
//       console.log('Erreur côté serveur:', error.response?.data);
  
//       Alert.alert('Erreur', error.response?.data?.message || 'Échec de la réinitialisation');
//     }
//   };
  
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.form}>
//         <Text style={styles.label}>Code reçu par email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Code"
//           keyboardType="numeric"
//           value={resetCode}
//           onChangeText={setResetCode}
//           placeholderTextColor="#A8B8A8"
//         />

//         <Text style={styles.label}>Nouveau mot de passe</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Nouveau mot de passe"
//           secureTextEntry
//           value={newPassword}
//           onChangeText={setNewPassword}
//           placeholderTextColor="#A8B8A8"
//         />

//         <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//           <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.linkContainer}
//           onPress={() => navigation.navigate('LoginScreen')}
//         >
//           <Text style={styles.linkText}>Retour à la connexion</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default ResetPasswordScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F4F4',
//     justifyContent: 'center',
//     paddingHorizontal: 25,
//   },
//   form: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#3A5A40',
//   },
//   input: {
//     height: 50,
//     borderColor: '#D0D0D0',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     backgroundColor: '#FFF',
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#3A5A40',
//     paddingVertical: 15,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#FFF',
//     textAlign: 'center',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   linkContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#6B8E6E',
//     textDecorationLine: 'underline',
//   },
// });
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordScreen = ({ navigation }) => {
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Récupérer le token depuis AsyncStorage lorsque l'écran est monté
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      console.log('Token récupéré depuis AsyncStorage :', storedToken); // Log du token récupéré
    };

    getToken();
  }, []);

  const handleResetPassword = async () => {
    // Vérifier que tous les champs sont remplis
    if (!resetCode || !newPassword) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    // Vérifier que le mot de passe est suffisamment long
    if (newPassword.length < 6) {
      return Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
    }

    console.log('Données envoyées :', JSON.stringify({ resetCode, newPassword })); // Log des données envoyées
    console.log('Token envoyé dans la requête :', token); // Log du token envoyé dans l'en-tête

    try {
      // Envoi de la requête avec le token dans l'en-tête
      const res = await axios.post(
        `http://20.20.18.89:5000/api/auth/reset-password`,
        { resetCode, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Log de la réponse du serveur
      console.log('Réponse du serveur :', res.data);

      // Si la requête est réussie, afficher un message et naviguer vers l'écran de connexion
      Alert.alert('Succès', 'Votre mot de passe a été modifié');
      navigation.navigate('LoginScreen');
    } catch (error) {
      // Log de l'erreur Axios
      console.log('Erreur Axios:', error);
      
      // Log de l'erreur côté serveur (réponse détaillée)
      if (error.response) {
        console.log('Erreur côté serveur:', error.response?.data);
      } else {
        console.log('Erreur de connexion ou autre erreur:', error.message);
      }

      // Afficher l'alerte avec le message d'erreur du serveur
      Alert.alert('Erreur', error.response?.data?.message || 'Échec de la réinitialisation');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Code reçu par email</Text>
        <TextInput
          style={styles.input}
          placeholder="Code"
          keyboardType="numeric"
          value={resetCode}
          onChangeText={setResetCode}
          placeholderTextColor="#A8B8A8"
        />

        <Text style={styles.label}>Nouveau mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#A8B8A8"
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.linkText}>Retour à la connexion</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#3A5A40',
  },
  input: {
    height: 50,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    color: '#333',
  },
  button: {
    backgroundColor: '#3A5A40',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#6B8E6E',
    textDecorationLine: 'underline',
  },
});
