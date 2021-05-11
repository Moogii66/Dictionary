import React, { useState } from 'react';
import {
   Text,
   View,
   StyleSheet,
   SafeAreaView,
   TextInput,
   Image,
   TouchableOpacity,
   Modal,
} from 'react-native';
// import LottieView from 'lottie-react-native';
const App = () => {
   const [modalVisible, setModalVisible] = useState(false);

   function modal() {
      return (
         <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               Alert.alert("Modal has been closed.");
               setModalVisible(!modalVisible);
            }}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modal}>
                  <View style={{ width: '30%', height: '30%', borderWidth: 1 }}>
                     {/* <LottieView
                        style={{ width: 70, height: 70, borderWidth: 1 }}
                        source={require('./assets/images/4080-sound-bars-animation.json')}
                        size={30}
                        autoPlay
                        loop
                     /> */}
                  </View>
                  <View style={styles.textContainer}>
                     <Text>Moogii</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                     <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>RETRY</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>OK</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
      );
   };

   function textInput() {
      return (
         <View style={styles.container}>
            <View style={styles.subContainer}>
               <TextInput
                  style={styles.input}
                  placeholder="Type"
                  keyboardType="numeric"
               />
               <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                     source={require("./assets/images/mic.png")}
                     resizeMode="contain"
                     style={{
                        width: 35,
                        height: 35,
                        marginVertical: 5,
                        marginLeft: 20,
                     }}
                  />
               </TouchableOpacity>
            </View>
            {/* <LottieView
               style={{ width: 70, height: 70, borderWidth: 1 }}
               source={require('./assets/images/4080-sound-bars-animation.json')}
               size={30}
               autoPlay
               loop
            /> */}
         </View>
      )
   }

   return (
      <SafeAreaView>
         {textInput()}
         {modal()}
      </SafeAreaView>
   );
};
const styles = StyleSheet.create({
   textContainer: {
      marginVertical: 15
   },
   btnText: {
      color: "white",
      fontWeight: "900"
   },
   button: {
      marginHorizontal: 20,
      width: '35%',
      height: '50%',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FF3366",
      borderRadius: 10,
   },
   buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end"
   },
   container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "lightgreen",
      marginTop: 100,
   },
   subContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      height: '40%',
      width: '90%',
      backgroundColor: "white",
   },
   input: {
      width: '70%',
   },
   modalContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: "#00000040",
      alignItems: "center",
      justifyContent: "center"
   },
   modal: {
      width: '70%',
      height: '30%',
      borderRadius: 20,
      backgroundColor: "white",
      alignItems: "center"
   }
})
export default App;