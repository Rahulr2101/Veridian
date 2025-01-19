// styles.ts
import {Dimensions, StyleSheet} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    backButton: {
        backgroundColor: '#CF5C36',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    backButtonText: {
        fontSize: 24,
        color: '#000000',
        paddingTop: 2,
    },
    question: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#CF5C36',
        marginTop: 20,
        marginBottom: 40,
        fontFamily: 'Playfair-Bold',
    },
    button: {
        backgroundColor: '#FFEEDB',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#CF5C36',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Playfair-Semibold',
    },

    finalContainer:{
        flex: 1,
        backgroundColor:'#FFEEDB',
        alignContent: "center",
    },

    motiv:{
      color: '#CF5C36',
      marginTop: height * 0.3,
      marginLeft: 20,
      marginRight: 20,
      fontSize: 28,
      fontWeight: 'bold',
      fontFamily: 'Playfair-ExtraBold'

    },
    motiv2:{
        color: '#090C02',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15,
        fontFamily: 'Playfair'

    },

    progress:{
        height: height * 0.01,
        backgroundColor: '#FFEEDB',
        marginTop: 20,
        borderRadius: 8,
    },
    progress1:{
        flex: 1,
        backgroundColor: '#CF5C36',
        width: width * 0.1,
        borderRadius:8,
    },
    progress2:{
        flex: 1,
        backgroundColor: '#CF5C36',
        width: width * 0.4,
        borderRadius:8,
    },
    progress3:{
        flex: 1,
        backgroundColor: '#CF5C36',
        width: width * 0.7,
        borderRadius:8,
    },
    progressContainer:{
        height:200,
    }
});

export default styles;