import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';

import Voice from '@react-native-voice/voice';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [voiceText, setVoiceText] = useState('qewrtryt');
  const [cancelBtn, setCancelBtn] = useState(false);

  const switchBtn = () => setCancelBtn(!cancelBtn);

  function modal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={require('./assets/images/cancel.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  margin: 8,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 170,
                height: 170,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={
                  parseInt(pitch) >= 0
                    ? [
                        styles.circle,
                        {
                          width: 50 + (parseInt(pitch) * 110) / 10,
                          height: 50 + (parseInt(pitch) * 110) / 10,
                          borderRadius: 50 + (parseInt(pitch) * 110) / 10 / 2,
                        },
                      ]
                    : [
                        styles.circle,
                        {
                          width: 60,
                          height: 60,
                          borderRadius: 60 / 2,
                        },
                      ]
                }>
                <View style={styles.subCircle}>
                  <Image
                    source={require('./assets/images/whiteMic.png')}
                    resizeMode="contain"
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.textContainer}>
              {partialResults.map(result => {
                return (
                  <Text
                    // key={`partial-result-${index}`}
                    style={styles.textStyle}>
                    {result}
                  </Text>
                );
              })}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={startRecognizing}>
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
  }

  function textInput() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              source={require('./assets/images/mic.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                marginVertical: 5,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
          <Image
            visible={cancelBtn}
            source={require('./assets/images/Search.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              marginLeft: 10,
            }}
          />
          <TextInput
            style={styles.input}
            value={voiceText.toString()}
            placeholder="Хайх үгээ бичнэ үү."
          />
          <TouchableOpacity
            onPress={() => {
              setVoiceText(''), switchBtn;
            }}>
            <Text
              style={{
                color: '#ff3366',
                fontWeight: 'bold',
              }}>
              БОЛИХ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const [pitch, setPitch] = useState('1');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };
  const onSpeechError = e => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError('No voice ');
    // setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setVoiceText(e.value);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setPitch('1');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {textInput()}
      {modal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#FF336640',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#FF3366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeBar: {
    width: '48%',
    height: '100%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  textStyle: {
    textAlign: 'center',
    color: 'red',
  },
  textStyle1: {
    textAlign: 'center',
  },
  textContainer: {
    marginVertical: 15,
    width: '80%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  btnText: {
    color: 'white',
    fontWeight: '900',
  },
  button: {
    marginHorizontal: 20,
    width: '35%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3366',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 150,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '40%',
    width: '90%',
    backgroundColor: '#f4f4f4',
    borderRadius: 25,
  },
  input: {
    width: '50%',
    color: 'black',
    fontSize: 15,
    marginLeft: 10,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '70%',
    height: '40%',
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default App;
