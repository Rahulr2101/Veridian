import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import SVGComponent from '../../components/bar'; // Corrected import path
import { LineChart } from 'react-native-gifted-charts';

const Progress = () => {
  const daa = [
    { label: 'Last 7 days', value: '1' },
    { label: 'Last 2 Weeks', value: '2' },
    { label: 'Last Month', value: '3' },
    { label: 'Total', value: '4' },
  ];

  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // Simplified chart data with whole numbers
  const chartData = [
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 2, label: 'Thu' },
    { value: 1, label: 'Fri' },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Progress</Text>
            </View>
            <Image
              source={{ uri: 'https://xsgames.co/randomusers/assets/avatars/male/19.jpg' }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.dropdownContainer}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: '#FFEEDB' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={daa}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Last 7 days' : 'Last 7 days'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.progressContainer}>
            <View>
              <Text style={styles.progressText}>52%</Text>
              <Text style={styles.progressSubText}>Great Progress</Text>
              <Text>keep it up!</Text>
            </View>
            <SVGComponent />
          </View>
        </View>
        <View style={styles.chartContainer}>
          <Text>Completed in the last 7 days</Text>
          <LineChart
            data={chartData}
            maxValue={3}
            stepValue={1}
            initialSpacing={10}
            spacing={50}
            curved={true}
            thickness={3}
            color="#FF6347"
            isAnimated={true}
            animationDuration={1000}
            hideDataPoints={false}
            dataPointsColor="#FF6347"
            dataPointsRadius={5}
            areaChart
            startFillColor="#FF6347"
            endFillColor="rgba(255, 99, 71, 0.2)"
            startOpacity={1}
            endOpacity={0.3}
            xAxisLabelTextStyle={{ color: 'gray', fontSize: 12 }}
            yAxisLabelWidth={10}
            xAxisColor="lightgray"
            yAxisColor="lightgray"
            yAxisLabelTexts={['0', '1', '2', '3']}
            horizontalRulesStyle={{
              strokeDasharray: [0, 0],
              strokeWidth: 1,
              strokeColor: 'lightgray',
            }}
            width={300}
            height={150}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsCardTitle}>Average Smokes Daily</Text>
            <Text style={styles.statsCardValue}>2.5</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsCardTitle}>Average stress</Text>
            <Text style={styles.statsCardValue}>LOW😊</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft:10
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#FFEEDB',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressSubText: {
    fontSize: 16,
    color: 'green',
  },
  chartContainer: {
    backgroundColor: '#FFEEDB',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFEEDB',
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  statsCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 8,
  },
});

export default Progress;
