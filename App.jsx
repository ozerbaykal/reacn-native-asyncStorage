import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  //input içerisindeki değer
  const [todo, setTodo] = useState('');
  //eklenilen todolar
  const [todos, setTodos] = useState([]);

  const saveTodos = async saveTodo => {
    try {
      //storage' veri kaydettik
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = id => {
    //id'si eşit olmyanaları çıkar ve bizi dizi olarak döndür
    const updatedTodos = todos.filter(item => item.id !== id);

    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };
  const updateTodos = id => {
    const exitingTodo = todos?.find(item => item.id === id);
    if (!exitingTodo) return;

    Alert.prompt(
      'Edit Todo',
      'Please  enter a new text!',

      newUpdateText => {
        if (newUpdateText) {
          const updateTodos = todos.map(item =>
            item?.id === id ? {...item, text: newUpdateText} : item,
          );
          setTodos(updateTodos);
          saveTodos(updateTodos);
        }
      },
      'plain-text',
      exitingTodo.text,
    );
  };

  useEffect(() => {
    //app açıldığında asyncstorage'daki todos'ı yüklüyoruz
    loadTodos();
  }, []);

  //add butonuna basıldığında çalışacak fonk.
  const addToDo = () => {
    // yeni bir todo objesi oluştur ve todos state'ine aktar
    const updatedTodos = [...todos, {id: uuid.v4(), text: todo}];
    //state'i güncelle
    setTodos(updatedTodos);
    //storage'i güncelle
    saveTodos(updatedTodos);
    setTodo(' ');
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>ReactNative AstncStorage</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            onChangeText={text => setTodo(text)}
            placeholder="Type a todo"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={addToDo}
            style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text style={{color: '#00000'}}>{item.text}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
                    style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cff8f8',
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
    alignItems: 'center',
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
