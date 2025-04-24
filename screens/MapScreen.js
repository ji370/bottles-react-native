import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Modal, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = ({ route }) => {
  const bins = route?.params?.bins || [];

  const initialLatitude = bins.length > 0 ? bins[0].latitude : 48.8566;
  const initialLongitude = bins.length > 0 ? bins[0].longitude : 2.3522;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [emplacement, setEmplacement] = useState('');

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoords({ latitude, longitude });
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!selectedCoords || !name || !type || !emplacement) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    const { latitude, longitude } = selectedCoords;

    try {
      // Remplacer par l'URL de ton API pour ajouter une poubelle
      await axios.post('http://192.168.1.234:5000/api/poubelles/poubelle', {
        lat: latitude,
        lng: longitude,
        name,
        emplacement,
        type,
      });

      Alert.alert('Succès', 'Poubelle ajoutée avec succès');

      // Fermer le modal après l'ajout
      setModalVisible(false);
      setSelectedCoords(null);
      setName('');
      setType('');
      setEmplacement('');
    } catch (error) {
      console.error('[handleSubmit] Erreur ajout:', error);
      Alert.alert('Erreur', 'Impossible d\'ajouter la poubelle');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}  // Permet d'ajouter une poubelle en cliquant sur la carte
      >
        {bins.map((bin, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: bin.latitude,
              longitude: bin.longitude,
            }}
            title={bin.name}
            description={`Gérée par: ${bin.firstname || 'Admin'} ${bin.lastname || 'System'}`}
          />
        ))}

        {/* Afficher un marker temporaire lors de la sélection de la position */}
        {selectedCoords && (
          <Marker
            coordinate={selectedCoords}
            pinColor="green"
            title="Nouvelle Poubelle"
          />
        )}
      </MapView>

      {/* Modal pour ajouter une poubelle */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une Poubelle</Text>
            <Text>Latitude: {selectedCoords?.latitude.toFixed(6)}</Text>
            <Text>Longitude: {selectedCoords?.longitude.toFixed(6)}</Text>
            <TextInput
              placeholder="Nom de la Poubelle"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Emplacement"
              value={emplacement}
              onChangeText={setEmplacement}
              style={styles.input}
            />
            <TextInput
              placeholder="Type (verre/plastique)"
              value={type}
              onChangeText={setType}
              style={styles.input}
            />
            <Button title="Ajouter Poubelle" onPress={handleSubmit} />
            <Button
              title="Annuler"
              color="gray"
              onPress={() => {
                setModalVisible(false);
                setSelectedCoords(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
});

export default MapScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Button,
//   Alert,
//   ScrollView,
//   Text,
//   Modal,
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MapScreen = () => {
//   const [bins, setBins] = useState([]);
//   const [selectedCoords, setSelectedCoords] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [name, setName] = useState('');
//   const [emplacement, setEmplacement] = useState('');
//   const [type, setType] = useState('');

//   const fetchBins = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       console.log('[fetchBins] Token récupéré:', token ? '***token_masqué***' : 'null');

//       const response = await axios.get('http:// 192.168.1.234:5000/api/poubelles/poubelle', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log('[fetchBins] Réponse reçue:', response.data);
//       setBins(response.data);
//     } catch (err) {
//       console.error('[fetchBins] Erreur:', err);
//     }
//   };

//   useEffect(() => {
//     fetchBins();
//   }, []);

//   const handleMapPress = (event) => {
//     const { latitude, longitude } = event.nativeEvent.coordinate;
//     console.log('[MapPress] Coordonnées sélectionnées:', latitude, longitude);
//     setSelectedCoords({ latitude, longitude });
//     setModalVisible(true);
//   };

//   const handleSubmit = async () => {
//     if (!selectedCoords || !name || !emplacement || !type) {
//       Alert.alert('Erreur', 'Tous les champs sont requis');
//       return;
//     }

//     const { latitude, longitude } = selectedCoords;

//     try {
//       const response = await axios.post('http:// 192.168.1.234:5000/api/poubelles/poubelle', {
//         lat: latitude,
//         lng: longitude,
//         name,
//         emplacement,
//         type,
//       });

//       console.log('[handleSubmit] Réponse ajout:', response.data);
//       Alert.alert('Succès', 'Poubelle ajoutée avec succès');
//       setModalVisible(false);
//       fetchBins();

//       // Reset form
//       setName('');
//       setEmplacement('');
//       setType('');
//       setSelectedCoords(null);
//     } catch (error) {
//       console.error('[handleSubmit] Erreur ajout:', error.response?.data || error.message);
//       Alert.alert('Erreur', 'Impossible d\'ajouter la poubelle');
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 36.8065,
//           longitude: 10.1815,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         onPress={handleMapPress}
//       >
//         {bins.map((bin) => (
//           <Marker
//             key={bin._id}
//             coordinate={{
//               latitude: parseFloat(bin.lat),
//               longitude: parseFloat(bin.lng),
//             }}
//             title={bin.name}
//             description={`Ajouté par: ${bin.firstname || ''} ${bin.lastname || ''}`}
//           />
//         ))}

//         {selectedCoords && (
//           <Marker
//             coordinate={selectedCoords}
//             pinColor="green"
//             title="Nouvelle Poubelle"
//           />
//         )}
//       </MapView>

//       <Modal visible={modalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.form}>
//             <Text style={styles.modalTitle}>Ajouter une Poubelle</Text>
//             <Text>Latitude: {selectedCoords?.latitude.toFixed(6)}</Text>
//             <Text>Longitude: {selectedCoords?.longitude.toFixed(6)}</Text>
//             <TextInput
//               placeholder="Nom"
//               value={name}
//               onChangeText={setName}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Emplacement"
//               value={emplacement}
//               onChangeText={setEmplacement}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Type (verre/plastique)"
//               value={type}
//               onChangeText={setType}
//               style={styles.input}
//             />
//             <Button title="Ajouter Poubelle" onPress={handleSubmit} />
//             <View style={{ marginTop: 10 }}>
//               <Button
//                 title="Annuler"
//                 color="gray"
//                 onPress={() => {
//                   setModalVisible(false);
//                   setSelectedCoords(null);
//                 }}
//               />
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: '#00000066',
//   },
//   form: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     elevation: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 8,
//   },
// });

// export default MapScreen;
