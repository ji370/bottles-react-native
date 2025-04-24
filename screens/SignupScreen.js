import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';

const countryCodes = [
  { label: '🇹🇳 Tunisie (+216)', value: '+216' },
  { label: '🇫🇷 France (+33)', value: '+33' },
  { label: '🇲🇦 Maroc (+212)', value: '+212' },
  { label: '🇩🇿 Algérie (+213)', value: '+213' },
  { label: '🇨🇦 Canada (+1)', value: '+1' },
  { label: '🇨🇭 Suisse (+41)', value: '+41' },
  { label: '🇧🇪 Belgique (+32)', value: '+32' },
];

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [genre, setGenre] = useState('homme');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('+216');
  const [showCountries, setShowCountries] = useState(false);

  const handleRegister = async () => {
    console.log('🔧 Début de la fonction handleRegister');

    if (!firstName || !lastName || !email || !password || !telephone || !adresse) {
      setSuccess(false);
      setMessage('⚠️ Tous les champs sont requis.');
      console.log('❌ Champ(s) manquant(s)');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      setSuccess(false);
      setMessage("❌ L'adresse email doit se terminer par @gmail.com.");
      console.log('❌ Email non valide');
      return;
    }

    if (password.length < 8) {
      setSuccess(false);
      setMessage('❌ Le mot de passe doit contenir au moins 8 caractères.');
      console.log('❌ Mot de passe trop court');
      return;
    }

    try {
      console.log('📤 Envoi des données au backend...');
      const response = await axios.post('http://20.20.18.89:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
        genre,
        telephone: countryCode + telephone,
        adresse,
      });

      console.log('✅ Réponse reçue du backend :', response.data);

      setSuccess(true);
      setMessage(`✅ Compte créé avec succès. Bienvenue, ${response.data.user?.firstName || firstName} !`);
      setTimeout(() => navigation.navigate('Login'), 2000);
    } catch (error) {
      setSuccess(false);
      if (error.response) {
        console.log('❌ Erreur du serveur :', error.response.data);
        if (error.response.status === 409) {
          setMessage('❌ Un compte avec cet email existe déjà.');
        } else {
          setMessage(`❌ Erreur : ${error.response.data.message || 'Une erreur est survenue.'}`);
        }
      } else {
        console.log('❌ Erreur réseau :', error.message);
        setMessage(`❌ Erreur réseau : ${error.message}`);
      }
    }
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        console.log('🌍 Code pays sélectionné :', item.value);
        setCountryCode(item.value);
        setShowCountries(false);
      }}
    >
      <Text style={styles.countryText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={[
            
            // { key: 'title', value: 'Créer un compte' },
            { key: 'firstName', value: firstName, placeholder: 'Prénom', setter: setFirstName },
            { key: 'lastName', value: lastName, placeholder: 'Nom', setter: setLastName },
            { key: 'email', value: email, placeholder: 'Email', setter: setEmail, keyboardType: 'email-address' },
            { key: 'adresse', value: adresse, placeholder: 'Adresse', setter: setAdresse },
            { key: 'codePays', isCustom: true },
            { key: 'telephone', value: telephone, placeholder: 'Téléphone', setter: setTelephone, keyboardType: 'phone-pad' },
          ]}
          renderItem={({ item }) => {
            if (item.key === 'title') {
              return <Text style={styles.title}>{item.value}</Text>;
            }

            if (item.key === 'codePays') {
              return (
                <View style={styles.pickerWrapper}>
                  <Text style={styles.label}>Code pays</Text>
                  <TouchableOpacity
                    style={styles.pickerContainer}
                    onPress={() => setShowCountries(!showCountries)}
                  >
                    <Text style={styles.countryText}>
                      {countryCodes.find(c => c.value === countryCode)?.label || 'Sélectionner un pays'}
                    </Text>
                  </TouchableOpacity>
                  {showCountries && (
                    <FlatList
                      data={countryCodes}
                      renderItem={renderCountryItem}
                      keyExtractor={(item) => item.value}
                      style={styles.countryList}
                    />
                  )}
                </View>
              );
            }

            return (
              <TextInput
                style={styles.input}
                placeholder={item.placeholder}
                value={item.value}
                onChangeText={(text) => {
                  console.log(`📝 ${item.key} modifié :`, text);
                  item.setter(text);
                }}
                keyboardType={item.keyboardType || 'default'}
                placeholderTextColor="#8a8a8a"
              />
            );
          }}
          ListFooterComponent={
            <>
              <View style={styles.genreContainer}>
                {['homme', 'femme'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.genreButton, genre === option && styles.selectedButton]}
                    onPress={() => {
                      console.log('👤 Genre sélectionné :', option);
                      setGenre(option);
                    }}
                  >
                    <Text style={[styles.genreText, genre === option && styles.selectedText]}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Mot de passe"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    console.log('🔑 Mot de passe modifié');
                    setPassword(text);
                  }}
                  placeholderTextColor="#8a8a8a"
                />
                <TouchableOpacity onPress={() => {
                  console.log('👁️ Toggle mot de passe');
                  setShowPassword(!showPassword);
                }}>
                  <Text style={styles.eye}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>

              {message !== '' && (
                <Text style={[styles.message, { color: success ? '#5E8B7E' : '#BF616A' }]}>{message}</Text>
              )}
            </>
          }
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.formContainer}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 30,
  },
  formContainer: {
    padding: 25,
    paddingBottom: 40,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2F5D62',
    marginBottom: 20,
    fontFamily: 'sans-serif-medium',
  },
  pickerWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: '#DFD7CA',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  countryText: {
    fontSize: 16,
    color: '#2F5D62',
  },
  countryList: {
    marginTop: 10,
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
  },
  countryItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    color: '#5E8B7E',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    height: 55,
    borderColor: '#DFD7CA',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#2F5D62',
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#DFD7CA',
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#5E8B7E',
  },
  genreText: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 55,
    borderColor: '#DFD7CA',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#2F5D62',
  },
  eye: {
    marginLeft: 10,
    fontSize: 22,
    color: '#5E8B7E',
  },
  button: {
    backgroundColor: '#5E8B7E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignupScreen;
