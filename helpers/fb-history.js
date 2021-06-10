import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initGeoCalcDb() {
    firebase.initializeApp(firebaseConfig);
}


export function storeGeoItem(item) {
    firebase.database().ref('geocData/').push(item);
}
export function writeData(lat1, log1, lat2, log2) {
    firebase.database().ref('geocData/').push({
      lat1: lat1,
      long1: log1,
      lat2: lat2,
      long2: log2
    });
  }



export function setupReminderListener(updateFunc) {
    firebase
      .database()
      .ref('geocData/')
      .on('value', (snapshot) => {
        if (snapshot?.val()) {
          const fbObject = snapshot.val();
          const newArr = [];
          Object.keys(fbObject).map((key, index) => {            
            newArr.push({ ...fbObject[key], id: key});
          });
          return newArr;
        }
      });
  }
