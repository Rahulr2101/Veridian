import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 15,
    },
    headerText: {
        fontSize: 14,
        color: '#00000090',
        fontFamily: 'Inter',
        fontWeight:600,
        marginHorizontal: 0.03 * width,
        borderRadius:6,
        borderColor: '#FFEEDB',
        borderWidth: 1,
        paddingHorizontal: 0.05* width,
    },
    headerSelect:{
        color: '#FFEEDB',
        backgroundColor: '#CF5C36'
    }
    ,
    closeButton: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Inter ',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 20,
    },
    posttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    authorAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    authorName: {
        fontSize: 14,
        fontWeight: '600',
    },
    postInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    authorAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    authorName: {
        fontSize: 14,
        fontWeight: '600',
    },
    postInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomCard: {
        backgroundColor: '#FFEEDB',
        borderRadius: 20,
        marginHorizontal: width * 0.09,
        marginBottom: 20,
        padding: 15,
        flexDirection: 'column',
    },

    button: {
        height: 20,  // Adjusted for better alignment
        backgroundColor: '#C76938',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10, // Adjust spacing between button and count
    },

    buttonText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
        fontFamily: 'Inter',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 800,
        fontFamily: 'Inter', // Added fontFamily
    },
    subTitle: {
        color: 'grey',
        fontSize: 10,
        fontFamily: 'Inter', // Added fontFamily
    },

    dropdownContainer: {
        marginVertical: 2,
        marginHorizontal: 20,
        width: width* 0.18,
        alignItems: 'center',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
    },
    dropdownText: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'Inter',
    },
    dropdownArrow: {
        fontSize: 10,
        paddingHorizontal: 5,
        color: 'gray',
    },
    dropdownList: {
        marginTop: 0,
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
    dropdownItem: {
        padding: 10,
    },
});

export default styles;