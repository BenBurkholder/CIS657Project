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
import { initGeoCalcDb, writeData, storeGeoItem, setupDataListener, setupReminderListener } from '../helpers/fb-games';



import { StatusBar } from 'expo-status-bar';

const SevenWonders = ({ route, navigation }) => {

    const initialField = useRef(null);

    function totalScore() {
        updateStateObject({total: (parseFloat(state.military) + Math.floor(parseFloat(state.coins)/3) + parseFloat(state.wonders) + parseFloat(state.blue) +   
            parseFloat(state.yellow) + parseFloat(state.purple)+ parseFloat(state.green))}) 
    }

    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
        };

    const [state, setState] = useState({
        military: "",
        coins: "",
        wonders: "",
        blue: "",
        yellow: "",
        purple: "",
        green: "",
        total: "",
        });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <Input
                style={styles.input}
                placeholder="Enter points for military"
                ref={initialField}
                value={state.military}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ military: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter number of coins"
                value={state.coins}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ coins: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for wonders"
                value={state.wonders}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ wonders: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for blue cards"
                value={state.blue}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ blue: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for yellow cards"
                ref={initialField}
                value={state.yellow}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ yellow: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for purple cards"
                value={state.purple}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ purple: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for green cards"
                ref={initialField}
                value={state.green}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ green: val })}
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
                        military: "",
                        coins: "",
                        wonders: "",
                        blue: "",
                        yellow: "",
                        purple: "",
                        green: "",
                        total: "",
                        });
                }}
                />
            </View>
            <View >
            
                <Text style={styles.resultsLabelText}> Total Score: {state.total}</Text>
            
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

export default SevenWonders;