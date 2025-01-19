import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Image } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import logo from '../assets/images/react-logo.png';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, FirebaseError } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState(""); 
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const signIn = async () => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      if (userCredential.user) {
        router.replace('./start');
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/invalid-email':
          setEmailError('Invalid email address');
          break;
        case 'auth/user-not-found':
          setEmailError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setPasswordError('Incorrect password');
          break;
        default:
          setPasswordError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => { 
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      if (userCredential.user) {
        const userData = {
          userId: userCredential.user.uid, // Add user ID
          picture: 'https://randomuser.me/api/portraits/men/1.jpg', // Default picture
          name: `User-${uuidv4().slice(0, 8)}`, // Random name
          exp: 0,
          streakCount: 0,
          addiction: null,
          trigger: 0,
        };
        await setDoc(doc(FIREBASE_DB, 'users', userCredential.user.uid), userData);
        router.replace('./start');
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          setEmailError('Email already in use');
          break;
        case 'auth/invalid-email':
          setEmailError('Invalid email address');
          break;
        case 'auth/weak-password':
          setPasswordError('Password should be at least 6 characters');
          break;
        default:
          setPasswordError('Sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError("");
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#8B4513"
        editable={!loading}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError("");
        }}
        secureTextEntry
        placeholderTextColor="#8B4513"
        editable={!loading}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Pressable
        onPress={signIn}
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed || isHovered ? '#cf5c36' : '#FFFFFF' },
          loading && styles.disabledButton
        ]}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
      </Pressable>
      <Pressable
        onPress={signUp}
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed || isHovered ? '#cf5c36' : '#FFFFFF' },
          loading && styles.disabledButton
        ]}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Create Account'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEEDB',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#8B4513", // Match the color theme
    backgroundColor: '#FFEEDB', // Match the background color
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: '80%',
    color: '#8B4513', // Match the text color to the theme
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }, 
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#8B4513', // Match the text color
  },
  disabledButton: {
    opacity: 0.5,
  }
});

export default Login;