// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
// import { HomeScreen } from './src/HomeScreen';
// import { CallScreen } from './src/CallScreen';

// const apiKey = 'mmhfdzb5evj2';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0NvdW50X0Rvb2t1IiwidXNlcl9pZCI6IkNvdW50X0Rvb2t1IiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzcyMDE2OTUsImV4cCI6MTczNzgwNjQ5NX0.OZXO3Xptuu5FCvV-iackaGz6zE-TWqVrTnABwlAFOsQ';
// const userId = 'Count_Dooku';
// const callId = 'GEe8IUmIraqI';

// const user = {
//   id: userId,
//   name: 'John Doe',
//   image: `https://getstream.io/random_png/?id=${userId}&name=John+Doe`,
// };

// const client = new StreamVideoClient({ apiKey, user, token });

// export default function App() {
//   const [activeScreen, setActiveScreen] = useState<'home' | 'call'>('home');
//   const [callId] = useState('audio_room_example'); // Example call ID

//   return (
//     <StreamVideo client={client}>
//       <SafeAreaView style={styles.container}>
//         {activeScreen === 'home' && (
//           <HomeScreen goToCallScreen={() => setActiveScreen('call')} />
//         )}
//         {activeScreen === 'call' && (
//           <CallScreen goToHomeScreen={() => setActiveScreen('home')} callId={callId} />
//         )}
//       </SafeAreaView>
//     </StreamVideo>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });