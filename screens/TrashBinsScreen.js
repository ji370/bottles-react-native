


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TrashBinsScreen = () => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const fetchBins = async () => {
    try {
      const response = await axios.get('http://192.168.43.102:5000/api/poubelles/poubelle');
      setBins(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des poubelles.");
      setLoading(false);
    }
  };

  const handleAddBin = async () => {
    if (!name || !lat || !lng) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await axios.post('http://20.20.16.73:5000/api/poubelles/poubelle', {
        name,
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
      setName('');
      setLat('');
      setLng('');
      fetchBins(); // Recharge la liste des poubelles
    } catch (err) {
      alert("Erreur lors de l'ajout de la poubelle.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Chargement des poubelles...</Text>
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
      {/* Formulaire pour ajouter une poubelle */}
      <View style={styles.form}>
        <Text style={styles.label}>Nom de la poubelle</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nom unique"
        />
        
        <Text style={styles.label}>Latitude</Text>
        <TextInput
          style={styles.input}
          value={lat}
          onChangeText={setLat}
          placeholder="Ex : 36.82"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Longitude</Text>
        <TextInput
          style={styles.input}
          value={lng}
          onChangeText={setLng}
          placeholder="Ex : 10.17"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleAddBin}>
          <Text style={styles.buttonText}>Ajouter une poubelle</Text>
        </TouchableOpacity>
      </View>

      {/* Affichage des poubelles */}
      <Text style={styles.title}>📦 Nombre de poubelles</Text>
      <Text style={styles.countText}>{bins.length} poubelle(s) trouvée(s)</Text>

      {/* Affichage des détails de chaque poubelle */}
      {bins.map((bin, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>Nom: {bin.name}</Text>
          <Text style={styles.detail}>Latitude: {bin.lat}</Text>
          <Text style={styles.detail}>Longitude: {bin.lng}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F8',
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  countText: {
    fontSize: 18,
    marginBottom: 20,
  },
  form: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    fontSize: 14,
    color: '#444',
  },
});

export default TrashBinsScreen;

TrashBinsScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const TrashBinsScreen = ({ navigation }) => {
//   const [bins, setBins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [name, setName] = useState('');
//   const [lat, setLat] = useState('');
//   const [lng, setLng] = useState('');

//   const fetchBins = async () => {
//     try {
//       const response = await axios.get('http://192.168.1.234:5000/api/poubelles/poubelle');
//       setBins(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Erreur lors de la récupération des poubelles.");
//       setLoading(false);
//     }
//   };

//   const handleAddBin = async () => {
//     if (!name || !lat || !lng) {
//       alert("Veuillez remplir tous les champs.");
//       return;
//     }

//     try {
//       await axios.post('http://192.168.1.234:5000/api/poubelles/poubelle', {
//         name,
//         lat: parseFloat(lat),
//         lng: parseFloat(lng)
//       });
//       setName('');
//       setLat('');
//       setLng('');
//       fetchBins(); // Recharge la liste des poubelles
//     } catch (err) {
//       alert("Erreur lors de l'ajout de la poubelle.");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBins();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#6200ee" />
//         <Text style={styles.loadingText}>Chargement des poubelles...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Formulaire pour ajouter une poubelle */}
//       <View style={styles.form}>
//         <Text style={styles.label}>Nom de la poubelle</Text>
//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           placeholder="Nom unique"
//         />
        
//         <Text style={styles.label}>Latitude</Text>
//         <TextInput
//           style={styles.input}
//           value={lat}
//           onChangeText={setLat}
//           placeholder="Ex : 36.82"
//           keyboardType="numeric"
//         />

//         <Text style={styles.label}>Longitude</Text>
//         <TextInput
//           style={styles.input}
//           value={lng}
//           onChangeText={setLng}
//           placeholder="Ex : 10.17"
//           keyboardType="numeric"
//         />

//         <TouchableOpacity style={styles.button} onPress={handleAddBin}>
//           <Text style={styles.buttonText}>Ajouter une poubelle</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Affichage des poubelles */}
//       <Text style={styles.title}>📦 Nombre de poubelles</Text>
//       <Text style={styles.countText}>{bins.length} poubelle(s) trouvée(s)</Text>

//       {/* Affichage des détails de chaque poubelle */}
//       {bins.map((bin, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.card}
//           onPress={() => navigation.navigate('BinDetailsScreen', { binId: bin._id })}
//         >
//           <Text style={styles.label}>Nom: {bin.name}</Text>
//           <Text style={styles.detail}>Latitude: {bin.lat}</Text>
//           <Text style={styles.detail}>Longitude: {bin.lng}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#F4F6F8',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F4F6F8',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#555',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   countText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   form: {
//     marginBottom: 30,
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#6200ee',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   label: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   detail: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
// });

// export default TrashBinsScreen;
