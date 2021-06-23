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
import { round, set } from "react-native-reanimated";
import { initGamesDb, writeData, setupDataListener} from '../helpers/fb-games'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';



import { StatusBar } from 'expo-status-bar';

const Castles = ({ route, navigation }) => {



    const initialField = useRef(null);

    function totalScore() {
        updateStateObject({total: (parseFloat(state.board) + parseFloat(state.unsold) + parseFloat(state.silverlings) + Math.floor(parseFloat(state.workers)/2) +  
            parseFloat(state.tiles))}) 
    }

    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
        };

    const [state, setState] = useState({
        board: "",
        unsold: "",
        silverlings: "",
        workers: "",
        tiles: "",
        total: "",
        });

        const [game, setGame] = useState("Castles of Burgandy");
        const [HS, setHS] = useState("0")
    
    useEffect(() => {
            if(state.total > HS){
                writeData(game, state.total);
                setHS(state.total)
            }
          }, [state.total]);
    
          function setupDataListener() {
            firebase
            .database()
            .ref(`gameData/Castles of Burgandy`)
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
                placeholder="Enter current points on board"
                ref={initialField}
                value={state.board}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ board: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter number of unsold goods"
                value={state.unsold}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ unsold: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter number of silverlings"
                value={state.silverlings}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ silverlings: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter number of workers"
                value={state.workers}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ workers: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points earned for yellow tiles"
                ref={initialField}
                value={state.tiles}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ tiles: val })}
            />
            
            
            <View>
                <Button
                style={styles.buttons}
                title="Total Score"
                onPress={() => {
                    Keyboard.dismiss();
                    totalScore()}}
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
                        board: "",
                        unsold: "",
                        silverling: "",
                        workers: "",
                        tiles: "",
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

export default Castles;