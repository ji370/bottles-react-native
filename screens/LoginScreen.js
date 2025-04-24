

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/Feather';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 8;
//   };

//   const handleLogin = async () => {
//     if (!email || !password) {
//       return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
//     }

//     if (!validateEmail(email)) {
//       return Alert.alert('Erreur', "L'email n'est pas valide");
//     }

//     if (!validatePassword(password)) {
//       return Alert.alert(
//         'Erreur',
//         'Le mot de passe doit comporter au moins 8 caractères'
//       );
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.post('http://  20.20.18.89:5000/api/auth/login', {
//         email,
//         password,
//       });
//       console.log('Réponse serveur:', response.data);
//       const { token, userId, role } = response.data;
//       Alert.alert('Succès', 'Connexion réussie');

//       // Stockage local éventuel (AsyncStorage) ici si besoin

//       if (role === 'admin') {
//         navigation.navigate('Home'); // page d'accueil admin
//       } else {
//         navigation.navigate('LoginScreen'); // page utilisateur normale
//       }
//     } catch (error) {
//       console.error('Erreur de connexion :', error.response?.data || error.message);
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
//       <View style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Bienvenue</Text>
//           <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
//         </View>

//         <View style={styles.form}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             placeholder="votre@email.com"
//             style={styles.input}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//             placeholderTextColor="#A8B8A8"
//           />

//           <Text style={styles.label}>Mot de passe</Text>
//           <View style={styles.passwordContainer}>
//             <TextInput
//               placeholder="••••••••"
//               style={styles.passwordInput}
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               placeholderTextColor="#A8B8A8"
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.eyeIcon}
//             >
//               <Icon 
//                 name={showPassword ? 'eye' : 'eye-off'} 
//                 size={22} 
//                 color="#6B8E6E" 
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity 
//             style={[styles.button, isLoading && styles.buttonDisabled]} 
//             onPress={handleLogin}
//             disabled={isLoading}
//           >
//             <Text style={styles.buttonText}>
//               {isLoading ? 'Connexion...' : 'Se connecter'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             onPress={() => navigation.navigate('Signup')}
//             style={styles.linkContainer}
//           >
//             <Text style={styles.linkText}>
//               Pas de compte ? <Text style={styles.linkHighlight}>S'inscrire</Text>
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F5F0',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 30,
//     justifyContent: 'center',
//   },
//   header: {
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#3A5A40',
//     marginBottom: 8,
//     fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6B8E6E',
//     opacity: 0.8,
//   },
//   form: {
//     marginTop: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: '#3A5A40',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     height: 50,
//     borderColor: '#D1D9D1',
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     backgroundColor: '#FFF',
//     marginBottom: 20,
//     fontSize: 16,
//     color: '#3A5A40',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#D1D9D1',
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: '#FFF',
//     marginBottom: 20,
//     paddingHorizontal: 16,
//     height: 50,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#3A5A40',
//   },
//   eyeIcon: {
//     paddingLeft: 8,
//   },
//   button: {
//     backgroundColor: '#4A7856',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     shadowColor: '#4A7856',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   buttonDisabled: {
//     backgroundColor: '#A8B8A8',
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 16,
//     letterSpacing: 0.5,
//   },
//   linkContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#6B8E6E',
//     fontSize: 14,
//   },
//   linkHighlight: {
//     color: '#3A5A40',
//     fontWeight: '600',
//     textDecorationLine: 'underline',
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
  Image
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    if (!validateEmail(email)) {
      return Alert.alert('Erreur', "L'email n'est pas valide");
    }

    if (!validatePassword(password)) {
      return Alert.alert(
        'Erreur',
        'Le mot de passe doit comporter au moins 8 caractères'
      );
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://20.20.18.89:5000/api/auth/login', {
        email,
        password,
      });
      console.log('Réponse serveur:', response.data);
      const { token, userId, role } = response.data;
      Alert.alert('Succès', 'Connexion réussie');

      // Stockage local éventuel (AsyncStorage) ici si besoin

      if (role === 'admin') {
        navigation.navigate('Home'); // page d'accueil admin
      } else {
        navigation.navigate('LoginScreen'); // page utilisateur normale
      }
    } catch (error) {
      console.error('Erreur de connexion :', error.response?.data || error.message);
      Alert.alert('Erreur', error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgetPassword'); // Naviguer vers l'écran mot de passe oublié
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
        </View>

        <Image 
  source={require('../assets/aaa.png')} // Référence l'image localement dans le dossier assets
  style={styles.image} 
/>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="votre@email.com"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#A8B8A8"
          />

          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="••••••••"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#A8B8A8"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon 
                name={showPassword ? 'eye' : 'eye-off'} 
                size={22} 
                color="#6B8E6E" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleForgotPassword} // Lien vers la fonctionnalité "Mot de passe oublié"
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>
              Mot de passe oublié ? <Text style={styles.linkHighlight}>Réinitialiser</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Signup')}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>
              Pas de compte ? <Text style={styles.linkHighlight}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3A5A40',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B8E6E',
    opacity: 0.8,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#3A5A40',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#D1D9D1',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 20,
    fontSize: 16,
    color: '#3A5A40',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D1D9D1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#3A5A40',
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#4A7856',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#4A7856',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#A8B8A8',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#6B8E6E',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#3A5A40',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
