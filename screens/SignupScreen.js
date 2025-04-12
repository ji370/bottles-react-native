// // import React, { useState } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';

// // const SignupScreen = ({ navigation }) => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');

// //   return (
// //     <KeyboardAvoidingView 
// //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //       style={styles.container}
// //     >
// //       <View style={styles.innerContainer}>
// //         <View style={styles.logoContainer}>
         
// //           <Text style={styles.title}>Create Account</Text>
// //         </View>

// //         <View style={styles.formContainer}>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Full Name"
// //             placeholderTextColor="#999"
// //             value={name}
// //             onChangeText={setName}
// //             autoCapitalize="words"
// //           />

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Email"
// //             placeholderTextColor="#999"
// //             value={email}
// //             onChangeText={setEmail}
// //             keyboardType="email-address"
// //             autoCapitalize="none"
// //           />

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Password"
// //             placeholderTextColor="#999"
// //             value={password}
// //             onChangeText={setPassword}
// //             secureTextEntry
// //           />

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Confirm Password"
// //             placeholderTextColor="#999"
// //             value={confirmPassword}
// //             onChangeText={setConfirmPassword}
// //             secureTextEntry
// //           />

// //           <TouchableOpacity style={styles.signupButton}>
// //             <Text style={styles.signupButtonText}>Sign Up</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.footer}>
// //           <Text style={styles.footerText}>Already have an account?</Text>
// //           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
// //             <Text style={styles.loginText}>Log In</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   innerContainer: {
// //     flex: 1,
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   logoContainer: {
// //     alignItems: 'center',
// //     marginBottom: 30,
// //   },
// //   logo: {
// //     width: 100,
// //     height: 100,
// //     marginBottom: 15,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   formContainer: {
// //     marginBottom: 20,
// //   },
// //   input: {
// //     height: 50,
// //     borderColor: '#ddd',
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 15,
// //     marginBottom: 15,
// //     fontSize: 16,
// //   },
// //   signupButton: {
// //     backgroundColor: '#4CAF50',
// //     padding: 15,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   signupButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   footer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     marginTop: 20,
// //   },
// //   footerText: {
// //     color: '#666',
// //     marginRight: 5,
// //   },
// //   loginText: {
// //     color: '#4CAF50',
// //     fontWeight: 'bold',
// //   },
// // });

// // export default SignupScreen;



// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import axios from 'axios';

// const SignupScreen = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const BACKEND_URL = "http://192.168.1.234:5000/api/auth/register";

//   const handleSignup = async () => {
//     // Validation des champs
//     if (!name || !email || !password || !confirmPassword) {
//       Alert.alert('Error', 'All fields are required');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       console.log("Sending registration request to:", BACKEND_URL);
//       console.log("Payload:", { name, email, password });

//       const response = await axios.post(BACKEND_URL, {
//         name,
//         email,
//         password
//       });

//       console.log('Registration response:', response.data);

//       if (response.data.success) {
//         Alert.alert('Success', 'Registration successful!', [
//           { text: 'OK', onPress: () => navigation.navigate('Login') }
//         ]);
//       } else {
//         Alert.alert('Error', response.data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.log("Registration error:", error);
//       Alert.alert(
//         'Error', 
//         error.response?.data?.message || 
//         error.message || 
//         'Registration failed. Please try again.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <View style={styles.innerContainer}>
//         <View style={styles.logoContainer}>
//           <Text style={styles.title}>Create Account</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             placeholderTextColor="#999"
//             value={name}
//             onChangeText={setName}
//             autoCapitalize="words"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="#999"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Password (min 6 characters)"
//             placeholderTextColor="#999"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             placeholderTextColor="#999"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry
//           />

//           <TouchableOpacity 
//             style={styles.signupButton} 
//             onPress={handleSignup}
//             disabled={isLoading}
//           >
//             <Text style={styles.signupButtonText}>
//               {isLoading ? 'Creating Account...' : 'Sign Up'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Already have an account?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//             <Text style={styles.loginText}>Log In</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   innerContainer: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   formContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   signupButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   signupButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   footerText: {
//     color: '#666',
//     marginRight: 5,
//   },
//   loginText: {
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
// });

// export default SignupScreen;
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    // Vérification de la validité des champs (tu peux ajouter plus de validation si nécessaire)
    if (!firstName || !lastName || !email || !password) {
      setMessage('Tous les champs sont requis.');
      return;
    }

    try {
      // Envoi des données à l'API backend
      const response = await axios.post('http://192.168.1.203:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // Afficher la réponse de l'API (message de succès ou token)
      setMessage(`✅ Compte créé avec succès: ${response.data.message}`);
    } catch (error) {
      // Afficher les erreurs provenant du backend
      if (error.response) {
        setMessage(`❌ Erreur : ${error.response.data.message}`);
      } else {
        setMessage(`❌ Erreur de réseau : ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="S’inscrire" onPress={handleRegister} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
