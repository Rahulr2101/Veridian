import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import SVGComponent from '../../components/circularProgress';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import {Image} from 'react-native';
import uri from "ajv/lib/runtime/uri";

const Home = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isMeditationPlaying, setIsMeditationPlaying] = useState(false)
  const [currentMeditation, setCurrentMeditation] = useState(null)
  const [sound, setSound] = useState(null);

  //  Moved cleanup useEffect to the top
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
          console.log("No user is logged in");
          return;
        }

        const userRef = doc(FIREBASE_DB, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("User document not found, creating a dummy document...");
          const dummyData = {
            name: "New User",
            picture: "https://via.placeholder.com/150", // Placeholder image
            lastSmoked: null, // Example field
            streak: 0,
            saved: 0,
          };
          await setDoc(userRef, dummyData);
          setUserData(dummyData); // Set the dummy data as the user's data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  const meditationAudio = {
    1: require('../../assets/audio/calm.mp3'),
    2: require('../../assets/audio/relief.mp3'),
    3: require('../../assets/audio/relax.mp3'),
    4: require('../../assets/audio/focus.mp3'),
    5: require('../../assets/audio/breath.mp3'),
  };

  const meditationGradients = {
    1: ['#FFD1DC', '#FFE4E1'], // Pink
    2: ['#FFFACD', '#FAF0E6'], // Light Yellow
    3: ['#F0E6EF', '#D8BFD8'], // Lavender
    4: ['#FFF8DC', '#FFE4B5'], // Light Beige
    5: ['#F5F5DC', '#FAFAD2']
  };

  const meditationCardColors = {
    1: ['#FFD1DC', '#FFE4E1'], // Pink
    2: ['#FFFACD', '#FAF0E6'], // Light Yellow
    3: ['#F0E6EF', '#D8BFD8'], // Lavender
    4: ['#FFF8DC', '#FFE4B5'], // Light Beige
    5: ['#F5F5DC', '#FAFAD2']
  };

  // Sample Guided Meditations Data (Replace with your actual data source)
  const guidedMeditations = [
    {
      id: 1,
      title: 'Morning Calm',
      duration: '10 min',
    },
    {
      id: 2,
      title: 'Stress Relief',
      duration: '15 min',
    },
    {
      id: 3,
      title: 'Evening Relaxation',
      duration: '20 min',
    },
    {
      id: 4,
      title: 'Mindfulness Focus',
      duration: '5 min',
    },
    {
      id: 5,
      title: 'Breath Awareness',
      duration: '12 min',
    },
  ];

  const playAudio = async (meditationId) => {
    if (sound) {
      await sound.unloadAsync();
    }
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
          meditationAudio[meditationId]
      );
      setSound(newSound);
      await newSound.playAsync()
    } catch (error) {
      console.error('Error loading or playing audio', error)
    }
  };

  const handleMeditationPress = async (meditation) => {
    if (isMeditationPlaying && currentMeditation === meditation.id) {
      setIsMeditationPlaying(false)
      setCurrentMeditation(null)
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync();
        }
      }
    } else {
      setCurrentMeditation(meditation.id);
      setIsMeditationPlaying(true);
      await playAudio(meditation.id)
    }
  };


  return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hello</Text>
              <Text style={styles.username}>{userData.name}</Text>
            </View>
            <View style={styles.headerRight}>
              <FontAwesome name="bell-o" size={20} color="#000" />
              <TouchableOpacity onPress={() => router.push('../profile')}>
                <Image
                    source={{ uri: userData.picture }}
                    style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsLeft}>
              <View style={{ justifyContent: 'space-evenly', paddingBottom: 10 }}>
                <SVGComponent height={120} width={120} />
                <View style={styles.statsTextContainer}>
                  <Text style={styles.statsText}>+2 hrs ago</Text>
                  <Text style={styles.statsSubText}>last smoked</Text>
                </View>
              </View>
            </View>
            <View style={styles.statsRight}>
              <View style={styles.noCigarettesContainer}>
                <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/15/15146.png',
                    }}
                    style={styles.noCigarettesImage}
                />
                <Text style={styles.noCigarettesText}>No cigarettes</Text>
              </View>
              <Text style={styles.streakText}>
                <Text style={styles.streakCount}>4</Text>/10 days
              </Text>
              <TouchableOpacity
                  style={styles.checkInButton}
                  onPress={() => router.push('/qs1')}
              >
                <Text style={styles.checkInButtonText}>Check-in</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Saved</Text>
                <TouchableOpacity onPress={() => router.push('../saved')}>
                  <Image
                      source={require('../../assets/images/arrow.png')}
                      style={styles.cardArrow}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardText}>
                With this money you could buy a gym membership for a month
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardAmount}>₹300</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Weekly Average</Text>
                <TouchableOpacity onPress={() => router.push('/progress')}>
                  <Image
                      source={require('../../assets/images/arrow.png')}
                      style={styles.cardArrow}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cardStats}>
                <Text style={styles.cardStatsValue}>2.5</Text>
                <Text style={styles.cardStatsText}>Daily Average Smokes</Text>
              </View>
              <Text style={styles.cardStatsChange}>↓ 12% vs last week</Text>
            </View>
          </View>

          {/* Guided Meditations Section */}
          <View style={styles.meditationsContainer}>
            <Text style={styles.meditationsHeader}>Guided Meditations</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {guidedMeditations.map((meditation) => (
                  <TouchableOpacity
                      key={meditation.id}
                      style={[styles.meditationCard, { backgroundColor: meditationCardColors[meditation.id] ? meditationCardColors[meditation.id][0] : '#f8f8f8' }]}
                      onPress={() => handleMeditationPress(meditation)}
                  >
                    <View style={styles.meditationDetails}>
                      <Text style={styles.meditationTitle}>{meditation.title}</Text>
                      <Text style={styles.meditationDuration}>{meditation.duration}</Text>
                    </View>
                  </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        {isMeditationPlaying && currentMeditation ? (
            <View style={styles.fullScreen}>
              <LinearGradient
                  colors={meditationGradients[currentMeditation] || ['#FFFFFF', '#FFFFFF']}
                  style={styles.fullScreen}
              >
                <TouchableOpacity onPress={() => handleMeditationPress({ id: currentMeditation })}>
                  <Text style={styles.fullScreenText}>Click to stop</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
        ) : null}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullScreenText: {
    fontSize: 20,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    overflow: 'hidden',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFEEDB',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  statsLeft: {
    flex: 1,
    alignItems: 'center',
  },
  statsTextContainer: {
    position: 'absolute',
    bottom: '25%',
    alignItems: 'center',
    marginTop: 20,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSubText: {
    fontSize: 14,
  },
  statsRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCigarettesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noCigarettesImage: {
    width: 28,
    height: 28,
  },
  noCigarettesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  streakCount: {
    color: '#FF0000',
  },
  checkInButton: {
    backgroundColor: '#FF6347',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFEEDB',
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardArrow: {
    width: 24,
    height: 24,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cardStatsValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardStatsText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  cardStatsChange: {
    fontSize: 14,
    color: '#00FF00',
    marginTop: 8,
  },
  activityLog: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  activityLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityLogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityLogArrow: {
    width: 24,
    height: 24,
  },
  // Meditation Styles
  meditationsContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  meditationsHeader: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  meditationCard: {
    width: 160,
    height: 250,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    padding: 10,
    justifyContent: 'center',

  },
  meditationDetails: {
    padding: 10,
    justifyContent: 'center'
  },
  meditationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meditationDuration: {
    fontSize: 14,
    color: '#555',
  },
});

export default Home;
