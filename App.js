import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [input1, setInput1] = useState(''); // Primer campo de texto
  const [input2, setInput2] = useState(''); // Segundo campo de texto
  const [imageUri, setImageUri] = useState(require('./assets/ses.jpg')); // URI de la imagen por defecto

  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permisos son requeridos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri });
    } else {
      Alert.alert('No se seleccionó ninguna imagen.');
    }
  };

  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permisos son requeridos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri });
    } else {
      Alert.alert('No se tomó ninguna foto.');
    }
  };

  const handleLogin = () => {
    // Validar que ambos campos están llenos
    if (!input1 || !input2) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    
    // Aquí se podría agregar la lógica de autenticación real
    Alert.alert('Éxito', 'Inicio de sesión exitoso :)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIAR SESIÓN</Text>

      <Image
        source={imageUri}
        style={styles.image}
      />

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nombre de usuario"
        value={input1}
        onChangeText={setInput1}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Contraseña"
        secureTextEntry
        value={input2}
        onChangeText={setInput2}
      />

      <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#007BFF',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    height: 45,
    width: '85%',
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    marginTop: 15,
    width: '85%',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
