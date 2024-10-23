import { auth, provider} from '../Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import required functions from Firebase
import { signInWithPopup}  from 'firebase/auth';
import  { SET_USER, SET_LOADING_STATUS,GET_ARTICLES } from './actionType';
import db from '../Firebase';
import { collection, addDoc,  query, onSnapshot,orderBy } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore';


 export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
 });

export const setLoading =(status) => ({
type: SET_LOADING_STATUS,
status:status,
})

export const getArticles =(payload) => ({
  type:GET_ARTICLES,
  status:payload,
})

 export function signInAPI() {
    return (dispatch) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          // Extract only serializable properties
          dispatch(
            setUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
            
          );
         
        })
        .catch((error) => {
          console.error('Sign-in error:', error.message);
          alert(error.message);
        });
    };
  }

  export function getUserAuth() {
    return (dispatch) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(
            setUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );
        }
      });
    };
  }

  export function signOutAPI(){
    return (dispatch) => {
        auth
        .signOut()
        .then(() => {
            dispatch(setUser(null))
        })
        .catch((error) => {
            console.log(error.message);
            
        });
    };
  }
  
  export function postArticleAPI(payload) {
    return (dispatch) => {
      dispatch (setLoading(true))

      const timestamp = payload.timestamp ? payload.timestamp : Timestamp.now(); // Ensure a valid timestamp

      if (payload.image !== "") {
        const storage = getStorage(); // Initialize Firebase storage
        const storageRef = ref(storage, `images/${payload.image.name}`); // Create a reference for the image
  
        const uploadTask = uploadBytesResumable(storageRef, payload.image); // Upload the file
  
        // Monitor the progress of the upload
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progress: ${progress}%`);
            if (snapshot.state === 'running') {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => {
            console.log('Upload error:', error.code);
          },
          async () => {
            // Get the download URL and then add the article to Firestore
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
            try {
              // Add the article to Firestore
              await addDoc(collection(db, 'articles'), {
                actor: {
                  description: payload.user.email,
                  title: payload.user.displayName,
                  date: payload.timestamp,
                  image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: downloadURL, // Use the correct download URL for the image
                comments: 0,
                description: payload.description,
              });
  
              dispatch(setLoading(false));
            } catch (error) {
              console.error('Error adding document:', error);
            }
          }
        );
      } else if (payload.video) { // Fixed typo: payload.vedio -> payload.video
        // If the payload contains a video instead of an image
        addDoc(collection(db, "articles"), {
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: "", // No image in this case
          comments: 0,
          description: payload.description,
        })
        .then(() => dispatch(setLoading(false)))
        .catch((error) => console.error('Error adding document:', error));
      }
    };
  }

 // Fetching articles from Firestore
export function getArticlesAPI() {
  return (dispatch) => {
    const q = query(collection(db, 'articles'), orderBy('actor.date', 'desc'));
    
    onSnapshot(q, (snapshot) => {
      const payload = snapshot.docs.map((doc) => doc.data());
      
      dispatch(getArticles(payload));
      // Dispatch action to store the articles in the Redux state, if necessary
    });
  };
}