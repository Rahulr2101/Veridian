import React, { useCallback, useRef, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export const ResourceBottomSheet = ({
                                        resources,
                                        isVisible,
                                        onClose
                                    }: {
    resources: any[];
    isVisible: boolean;
    onClose: () => void;
}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={isVisible ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.indicator}
        >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                {resources.map((resource, index) => (
                    <View key={index} style={styles.resourceCard}>
                        <Text style={styles.resourceTitle}>{resource.name}</Text>
                        <Text style={styles.resourceSummary}>{resource.summary}</Text>
                    </View>
                ))}
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: 'white', // Light background color
    },
    indicator: {
        backgroundColor: '#CF5C36', // Dark indicator color
        width: 60,
    },
    contentContainer: {
        padding: 16,
    },
    resourceCard: {
        backgroundColor: '#FFFFFF', // White card background
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#CF5C36', // Dark border color
    },
    resourceTitle: {
        color: '#CF5C36', // Dark text color for title
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    resourceSummary: {
        color: '#000000', // black color for text
        fontSize: 14,
        lineHeight: 20,
    },
});
