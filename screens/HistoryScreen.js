import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from 'react-native';
import { initGamesDb, writeData, setupDataListener} from '../helpers/fb-games'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from '../helpers/fb-credentials';

const items = [
    {title: `Agricola`, players: `2-5`, times: "0"},
    {title: `Castles of Burgandy`, players: `2-4`, times: "0"},
    {title: `Seven Wonders`, players: `2-7`, times: "0"},
    {title: `Lords of Waterdeep`, players: `2-5`, times: "0"},
    {title: `Stone Age`, players: `2-4`, times: "0"}
];


const HistoryScreen = ({ route, navigation }) => {

    const [history, setHistory] = useState(items);
    const [title, setTitle] = useState(-200);
    const [players, setPlayers] = useState(2);

    

    

    // useEffect(() => {        
    //     setHistory(route.params.reminders);
    // },[route.params.reminders]);

    useEffect(() => {
        try {
          initGamesDb();
        } catch (err) {
          console.log(err);
        }
        setupDataListener('Agricola');
        setupDataListener('Castles of Burgandy');
        setupDataListener('Lords of Waterdeep');
        setupDataListener('Seven Wonders');
        setupDataListener('Stone Age');
      }, []);
    
    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Geo Calculator")}>
              <Text > Geo Calculator </Text>
            </TouchableOpacity>
          ),    

        });
    });

    // useEffect(() => {
    //     if(latitude1 != -200) {
    //         navigation.navigate("Geo Calculator", {
    //             latitude1,
    //             longitude1,
    //             latitude2,
    //             longitude2
    //         })
    // }}, [longitude2]);

    return(
        <FlatList
            
            keyExtractor={(item) => item.title}
            data={history}
            renderItem={({ index, item}) => {
                return(
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => {
                            // navigate back with new settings.
                            
                            // setLatitude1(item.lat1);
                            // setLongitude1(item.long1);
                            // setLatitude2(item.lat2);
                            // setLongitude2(item.long2);
                            navigation.navigate(item.title)
                            writeData(item.title, parseInt(item.times) + 1)
                          }}>
                    <Text 
                    style ={{
                        borderBottomWidth: 1
                    }}>{item.title}{"\n"}
                     Players: {item.players}{"\n"}
                     Times played: {item.times}</Text>
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
