import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const SubscriptonDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View>
            <Text>Subscripton Details: {id}</Text>

            <Link href="/">Go back</Link>
        </View>
    );
};

export default SubscriptonDetails;
