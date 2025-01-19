import { StyleSheet, Dimensions } from 'react-native';
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
        fontWeight: 600,
        marginHorizontal: 0.03 * width,
        borderRadius: 6,
        borderColor: '#FFEEDB',
        borderWidth: 1,
        paddingHorizontal: 0.05 * width,
    },
    headerSelect: {
        color: '#FFEEDB',
        backgroundColor: '#CF5C36',
    },
    closeButton: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Inter',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 10,
        borderWidth:2,
        borderColor: '#FFEEDB',
    },
    posttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'Inter',
    },
    authorAndIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensures icons and username are horizontally aligned
        alignItems: 'center',
        marginTop: 10,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    authorName: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Inter',
        color: '#4c4c4c',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWithCount: {
        alignItems: 'center',
        marginLeft: 10,
    },
    iconCount: {
        fontSize: 12,
        color: 'gray',
        marginTop: 3, // Space between icon and count
    },
    roomCard: {
        backgroundColor: '#FFEEDB',
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10, // Ensure consistent padding inside the card
        borderWidth: 1,
        borderColor: '#CF5C36',
        flexDirection: 'column', // Ensure items are stacked in column
        justifyContent: 'space-between', // Evenly space content inside the card
    },

    participantAvatarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // Add spacing between avatars and button
    },

    button: {
        backgroundColor: '#C76938',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    title: {
        fontSize: 16,
        fontWeight: 800,
        fontFamily: 'Inter',
    },
    subTitle: {
        color: 'grey',
        fontSize: 10,
        fontFamily: 'Inter',
    },
    dropdownContainer: {
        marginVertical: 2,
        marginHorizontal: 20,
        width: width * 0.18,
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
    popularRoomsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },


    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background to highlight modal
    },
    modalContent: {
        width: '90%', // Adjust modal width
        backgroundColor: 'white', // Opaque background for modal
        borderRadius: 10,
        padding: 20, // Add padding for content inside the modal
        shadowColor: '#000', // Optional shadow for better usability
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
});

export default styles;
