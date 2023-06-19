import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView,Alert,Button } from 'react-native';
import Task from '../Component/Task';
import { useNavigation } from '@react-navigation/native';


const TodoScreen = ()=> {
  //initialize the task and list of tasks
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  //call the get all notes api and map the data onto the screen

  const navigationback = useNavigation();
  

  const handleAddTask = () => {
    Keyboard.dismiss();
    
    if(task==null){alert("can't add Empty note")}
    else{
      //call the add note api with the content and user id to add it in db

    setTaskItems([...taskItems, task])
    setTask(null);}
  }
  const Logout = ()=>{
    //delete token and username and id
    navigationback.reset({
      index:0,
      routes:[{name:"LoginScreen"}]
    })
    
  }

  const completeTask = (index) => {
    //use the delete note api and give it the content and user id
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    
    <><View style={styles.container}>
      <Button
      color='#bccbe3'
      title="Logout"
      onPress={()=>Logout()}
      style={styles.button}>
        {/* <Text>Logout</Text> */}
      </Button>

      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          
          <Text style={styles.sectionTitle}>Todo List</Text>
          <TouchableOpacity
          style={styles.sectionTitle}
          onPress={()=>Logout()}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => Alert.alert(`Are you sure you want to delete`,
                    `${item}`,
                    [{ text: `Yes`, onPress: () => { completeTask(index); } },
                    { text: 'No', onPress: () => { } },
                    ])}>

                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}

        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>ADD</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View></>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  button: {
    marginTop: 30,
    
  },
});

export default TodoScreen;