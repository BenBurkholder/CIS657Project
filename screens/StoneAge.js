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

const StoneAge = ({ route, navigation }) => {

    const initialField = useRef(null);

    function totalScore() {
        updateStateObject({total: ((parseFloat(state.civ)*parseFloat(state.civ)) + parseFloat(state.farms) + parseFloat(state.tools) +   
            parseFloat(state.huts) + parseFloat(state.people)+ parseFloat(state.resources))}) 
    }

    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
        };

    const [state, setState] = useState({
        civ: "",
        farms: "",
        tools: "",
        huts: "",
        people: "",
        resources: "",
        total: "",
        });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <Input
                style={styles.input}
                placeholder="Enter number of civilization cards"
                ref={initialField}
                value={state.civ}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ civ: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for farms"
                value={state.farms}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ farms: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for tools"
                value={state.tools}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ tools: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for huts"
                value={state.huts}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ huts: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter points for people"
                ref={initialField}
                value={state.people}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ people: val })}
            />
            <Input
                style={styles.input}
                placeholder="Enter number of remaining resources"
                value={state.resources}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ resources: val })}
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
                        civ: "",
                        farms: "",
                        tools: "",
                        huts: "",
                        people: "",
                        resources: "",
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

export default StoneAge;