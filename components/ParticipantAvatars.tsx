import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ParticipantAvatars = ({ participants }) => {
    return (
        <View style={styles.avatarContainer}>
            {participants.map((uri, index) => (
                <Image
                    key={index}
                    source={{ uri }}
                    style={[
                        styles.avatar,
                        index !== 0 && { marginLeft: -10 }, // Overlap effect
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30, // Adjust size as needed
        height: 30,
        borderRadius: 20, // Half of width/height for a perfect circle
    },
});

export default ParticipantAvatars;