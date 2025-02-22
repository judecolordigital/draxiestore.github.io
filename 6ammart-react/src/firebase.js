import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCaJT2Lai2YC6nKRAwFjnOqViIZMzoh8M4",
  authDomain: "elohim-mart.firebaseapp.com",
  databaseURL: "https://elohim-mart-default-rtdb.firebaseio.com",
  projectId: "elohim-mart",
  storageBucket: "elohim-mart.firebasestorage.app",
  messagingSenderId: "746258864497",
  appId: "1:746258864497:web:a27ebdb1c716cc9cb23ed0",
  measurementId: "G-JV59ZEQ6RD",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BPV-NNpfwNfP05H_ARO4VMNz5jkzerayyItIeaDh1xbx2KqKnbU_iPXAd4U2RB_IIcnbICX72jPoGq8p2D51mMg",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
