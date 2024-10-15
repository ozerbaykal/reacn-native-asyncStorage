import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>ReactNative AstncStorage</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Type a todo" style={styles.input} />
          <TouchableOpacity style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.todoItem}>
          <Text style={{color: '#00000'}}>text</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.updateButton]}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
  buttonContainer: {},
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 10,
  },
});
export default App;
