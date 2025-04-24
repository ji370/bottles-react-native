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

// const ForgotPasswordScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendCode = async () => {
//     if (!email) {
//       return Alert.alert('Erreur', 'Veuillez entrer votre adresse email.');
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.post('http:// 20.20.18.89:5000/api/auth/forgot-password', {
//         email,
//       });

//       Alert.alert('Succès', response.data.message);
//       // Navigue vers la page de réinitialisation en envoyant l'email
//       navigation.navigate('ResetPassword', { email });
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Erreur', error.response?.data?.message || 'Une erreur est survenue');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <View style={styles.inner}>
//         <Text style={styles.title}>Réinitialiser le mot de passe</Text>
//         <Text style={styles.label}>Entrez votre adresse email</Text>
//         <TextInput
//           placeholder="votre@email.com"
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
//           placeholderTextColor="#999"
//         />
//         <TouchableOpacity
//           style={[styles.button, isLoading && styles.buttonDisabled]}
//           onPress={handleSendCode}
//           disabled={isLoading}
//         >
//           <Text style={styles.buttonText}>
//             {isLoading ? 'Envoi en cours...' : 'Envoyer le code'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default ForgotPasswordScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F5F0',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   inner: {
//     marginTop: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#3A5A40',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#6B8E6E',
//   },
//   input: {
//     height: 50,
//     borderColor: '#D1D9D1',
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     backgroundColor: '#FFF',
//     fontSize: 16,
//     color: '#3A5A40',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#3A5A40',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonDisabled: {
//     backgroundColor: '#A8B8A8',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      return Alert.alert('Erreur', 'Veuillez entrer votre adresse email.');
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://20.20.18.89:5000/api/auth/forgot-password', {
        email,
      });

      Alert.alert('Succès', response.data.message);
      // Navigation vers l'écran ResetPassword avec l'email
      navigation.navigate('ResetPassword', { email });
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Réinitialiser le mot de passe</Text>
        <Text style={styles.label}>Entrez votre adresse email</Text>
        <TextInput
          placeholder="votre@email.com"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSendCode}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer le code'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
    justifyContent: 'center',
    padding: 20,
  },
  inner: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3A5A40',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#6B8E6E',
  },
  input: {
    height: 50,
    borderColor: '#D1D9D1',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#3A5A40',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3A5A40',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A8B8A8',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
