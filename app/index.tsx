import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./globals.css"
export default function Index() {
  const [user, setUser] = useState(FIREBASE_AUTH.currentUser);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthChecked) {
    // Show a loading indicator until the auth state is resolved
    return null;
  }

  return user ? <Redirect href="/(tabs)/home" /> : <Redirect href="/Login" />;
}
