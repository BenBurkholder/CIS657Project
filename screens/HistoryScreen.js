import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from 'react-native';
import { setupReminderListener} from '../helpers/fb-history'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from '../helpers/fb-credentials';

const items = [
    {lat1: '1', long1: '2', lat2: '3', long2: '4'},
    {lat1: '2', long1: '2', lat2: '3', long2: '3'},
    {lat1: '3', long1: '1', lat2: '4', long2: '4'},
];


const HistoryScreen = ({ route, navigation }) => {

    const [history, setHistory] = useState(items);
    const [latitude1, setLatitude1] = useState(-200);
    const [longitude1, setLongitude1] = useState(2);
    const [latitude2, setLatitude2] = useState(3);
    const [longitude2, setLongitude2] = useState(4);
    

    // useEffect(() => {        
    //     setHistory(route.params.reminders);
    // },[route.params.reminders]);

    // useEffect(() => {
    //     try {
    //       initGeoCalcDb();
    //     } catch (err) {
    //       console.log(err);
    //     }
    //     setHistory(setupReminderListener());
    //   }, []);
    
    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Geo Calculator")}>
              <Text > Geo Calculator </Text>
            </TouchableOpacity>
          ),    

        });
    });

    useEffect(() => {
        if(latitude1 != -200) {
            navigation.navigate("Geo Calculator", {
                latitude1,
                longitude1,
                latitude2,
                longitude2
            })
    }}, [longitude2]);

    return(
        <FlatList
            
            keyExtractor={(item) => item.lat1}
            data={history}
            renderItem={({ index, item}) => {
                return(
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => {
                            // navigate back with new settings.
                            
                            setLatitude1(item.lat1);
                            setLongitude1(item.long1);
                            setLatitude2(item.lat2);
                            setLongitude2(item.long2);
                          }}>
                    <Text 
                    style ={{
                        borderBottomWidth: 1
                    }}>Start: {item.lat1}, {item.long1} {"\n"}
                     End: {item.lat2}, {item.long2}</Text>
                     </TouchableHighlight>
                )
            }            
            }
            // ItemSeparatorComponent={this.renderSeparator}
        />

        

        
    );


};

const styles = StyleSheet.create({

    
});
export default HistoryScreen;
