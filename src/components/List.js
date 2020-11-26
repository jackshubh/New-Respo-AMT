import React, { useState, memo } from "react";
import { Button,FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { logoutUser } from "../api/auth-api";
import { theme } from "../core/theme";


const Item = ({ item, onPress, style, textTobeRendered }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{textTobeRendered.textTobeRendered}</Text>
    </TouchableOpacity>
);


const CustomList = ({ children }) => {
    const [selectedId, setSelectedId] = useState(null);
    const onSelection = (id) => {
        if (id === selectedId){
            setSelectedId('');
        }else{
            setSelectedId(id);
        }
        console.log(selectedId);
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#00ff00" : theme.colors.surface;
        const textTobeRendered = item.id === selectedId ? "Logout" : "Login";
        return (
            <Item
                item={item}
                onPress={() => onSelection(item.id)}
                style={{ backgroundColor }}
                textTobeRendered={{ textTobeRendered }}
            />
        );
    };

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={children}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        //marginTop: StatusBar.currentHeight || 0,
        marginVertical: 12,
        height: 270
        // width: "100%",
        // marginVertical: 12
    },
    item: {
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 4,
        backgroundColor: theme.colors.surface
    },
    title: {
        flex: 2,
        fontSize: 14,
        color: theme.colors.secondary,
    }
});

export default memo(CustomList);


