import React, { useState, useEffect } from 'react';
import firebaseConfig from '../firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Authentication = () => {
    const [user, setUser] = useState(null);

    // This runs when the component mounts and listens for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    image: currentUser.photoURL
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    const handleGoogleSignIn = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const userData = result.user;
                setUser({
                    name: userData.displayName,
                    email: userData.email,
                    image: userData.photoURL
                });
            })
            .catch((error) => {
                console.error('Error during sign-in: ', error);
            });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error('Error during logout: ', error);
            });
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    <img src={user.image} alt="User" width="100" />
                    <br />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>This is auth</p>
                    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                </div>
            )}
        </div>
    );
};

export default Authentication;
