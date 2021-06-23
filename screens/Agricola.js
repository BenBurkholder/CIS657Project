import { Button, Input } from "react-native-elements";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { set } from "react-native-reanimated";
import { initGamesDb, writeData, setupDataListener} from '../helpers/fb-games'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from '../helpers/fb-credentials';



import { StatusBar } from 'expo-status-bar';

const Agricola = ({ route, navigation }) => {

    const initialField = useRef(null);
    const [game, setGame] = useState("Agricola");
    const [HS, setHS] = useState("0")

    function totalScore() {
        updateStateObject({total: (parseFloat(state.fields) + parseFloat(state.pastures) + parseFloat(state.grain) + parseFloat(state.vegatables) + parseFloat(state.animals) 
            - parseFloat(state.unused) + parseFloat(state.stables) + parseFloat(state.rooms) + parseFloat(state.family) + parseFloat(state.cards))})             
    }
    

    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
      };

    const [state, setState] = useState({
        fields: "",
        pastures: "",
        grain: "",
        vegatables: "",
        animals: "",
        unused: "",
        stables: "",
        rooms: "",
        family: "",
        cards: "",
        total: "",
      });

      
      useEffect(() => {
        if(state.total > HS){
            writeData(game, state.total);
            setHS(state.total)
        }
      }, [state.total]);

      function setupDataListener() {
        firebase
        .database()
        .ref(`gameData/Agricola`)
        .on('value', (snapshot) => {
            setHS(snapshot.val());
        });
      }

      useEffect(() => {
        setupDataListener()
        }, [state.total]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Input
              style={styles.input}
              placeholder="Enter points for fields"
              ref={initialField}
              value={state.fields}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ fields: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for pastures"
              value={state.pastures}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ pastures: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for grain"
              value={state.grain}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ grain: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for vegatables"
              value={state.vegatables}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ vegatables: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for animals"
              ref={initialField}
              value={state.animals}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ animals: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for unused spaces"
              value={state.unused}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ unused: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for fenced in stables"
              ref={initialField}
              value={state.stables}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ stables: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for rooms"
              value={state.rooms}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ rooms: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for family members"
              value={state.family}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ family: val })}
            />
            <Input
              style={styles.input}
              placeholder="Enter points for points on cards"
              value={state.cards}
              autoCorrect={false}
              onChangeText={(val) => updateStateObject({ cards: val })}
            />
          
            
            <View>
              <Button
                style={styles.buttons}
                title="Total Score"
                onPress={() => {
                    Keyboard.dismiss();
                    totalScore();}}
              />
            </View>
            <View>
              <Button
                style={styles.buttons}
                title="Next Player"
                onPress={() => {
                  //initialField.current.focus();
                  Keyboard.dismiss();
                  setState({
                    fields: "",
                    pastures: "",
                    grain: "",
                    vegatables: "",
                    animals: "",
                    unused: "",
                    stables: "",
                    rooms: "",
                    family: "",
                    cards: "",
                    total: "",
                  });
                }}
              />
            </View>
            <View >
            
              <Text style={styles.resultsLabelText}> Total Score: {state.total}</Text>
              <Text style={styles.resultsLabelText}> High Score: {HS}</Text>
            
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 1,
        backgroundColor: "#E8EAF6",
        flex: 1,
      },
      buttons: {
        padding: 1,
      },
      inputError: {
        color: "red",
      },
      input: {
        padding: 1,
      },
      resultsGrid: {
        borderColor: "#000",
        borderWidth: 1,
      },
      resultsRow: {
        flexDirection: "row",
        borderColor: "#000",
        borderBottomWidth: 1,
      },
      resultsLabelContainer: {
        borderRightWidth: 1,
        borderRightColor: "#000",
        flex: 1,
      },
      resultsLabelText: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
      },
      resultsValueText: {
        fontWeight: "bold",
        fontSize: 20,
        flex: 1,
        padding: 10,
      },
    });

export default Agricola;