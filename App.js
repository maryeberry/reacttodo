import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, TouchableOpacity } from 'react-native';
import { CheckBox, Input, Text } from '@rneui/themed';

export default function App() {

  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy groceries', completed: false },
    { key: '2', description: 'Walk the dog', completed: false },
    { key: '3', description: 'Do laundry', completed: false },
  ]);

  const [inputText, setInputText] = useState('');

  const addTask = () => {
    if (inputText === '') {
      return;
    }
    const newTask = {
      key: Date.now().toString(),
      description: inputText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputText('');
  };

  const toggleTask = (key) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskRow}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTask(item.key)}
          checkedIcon={<View style={styles.checkedBox} />}
          uncheckedIcon={<View style={styles.uncheckedBox} />}
        />
        <Text style={item.completed ? styles.completedText : styles.taskText}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.inputRow}>
        <Input
          style={styles.input}
          placeholder="Add a new task..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {},
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderWidth: 1,
  },
  addButton: {},
  addButtonText: {},
  uncheckedBox: {
    width: 22,
    height: 22,
    borderWidth: 2,
  },
  checkedBox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    backgroundColor: '#000',
  },
});
