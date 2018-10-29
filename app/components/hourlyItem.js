import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class hourlyItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>hourlyItem</Text>
            </View>
        );
    }
}
export default hourlyItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});