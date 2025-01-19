import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/Login" />;
  }

  return <>{children}</>;
}