import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { GiftedChat ,Send} from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import {InputToolbar,Bubble} from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';




export default function ChatScreen({user,route}) {
    const [messages, setMessages] = useState([]);
    const {uid} = route.params;

    const getAllMessages = async() =>{
        // const docid = uid > user.uid ? user.uid + "-" +uid : uid + "-"+ user.uid;
        // const msgsnapshot =  await firestore().collection('chatrooms').doc(docid).collection('messages').orderBy("createdAt","desc").get()
        // const allmessages = msgsnapshot.docs.map(docSnap =>{
        //     return{
        //         ...docSnap.data(),
        //         createdAt:docSnap.data().createdAt.toDate()
        //     }
        // })


        // setMessages(allmessages);
    }

    useEffect(() => {
        // getAllMessages();
        const docid = uid > user.uid ? user.uid + "-" +uid : uid + "-"+ user.uid;
      const msgref =  firestore().collection('chatrooms').doc(docid).collection('messages').orderBy("createdAt","desc")
     const unsubs = msgref.onSnapshot((query)=>{
        const allmessages = query.docs.map(docSnap =>{
            const data = docSnap.data();
            if(data.createdAt){
            return{
                ...docSnap.data(),
                createdAt:docSnap.data().createdAt.toDate()
            }
        }else{
            return{
                ...docSnap.data(),
                createdAt:new Date()
            }
        }
        })

        setMessages(allmessages);
      })

      return ()=>{
        unsubs();
      }

      }, [])


  
   

      function renderSend(props) {
        return (
       
          <Send {...props}>
          
            <View style={styles.sendingContainer}>
              <IconButton icon="send-circle" size={32} color="#6646ee" />
            </View>
            </Send>
        );
      }


      const onSend = (allMessages) => {
          const msg = allMessages[0];
          const myMsg = {
              ...msg,
              sentBy:user.uid,
              sentTo:uid,
              createdAt:new Date
          }
          setMessages(previousMessages => GiftedChat.append(previousMessages,myMsg))
          const docid = uid > user.uid ? user.uid + "-" +uid : uid + "-"+ user.uid;
          firestore().collection('chatrooms').doc(docid).collection('messages').add({...myMsg,createdAt:firestore.FieldValue.serverTimestamp()})
      }

    return (
        <View style={{
            flex:1,
            backgroundColor:"azure"
        }}>
        <GiftedChat
        // renderBubble={renderBubble}
        messages={messages}
        minInputToolbarHeight={70}
        placeholder="Wana Chat ? Type Here ......"
        alwaysShowSend
        renderBubble={(props)=> {
            return <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: "pink"
                }
              }}
            />
        }
        }
        renderSend={renderSend}
        scrollToBottom
        onSend={text => onSend(text)}
        renderInputToolbar={(props)=>{
          return <InputToolbar {...props}
           containerStyle={{borderTopWidth: 1.5, borderTopColor: 'green'}} 
           textInputStyle={{ color: "black" }}
           />
      }}
        user={{
          _id: user.uid,
        }}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      color:"yellow"
    }
  });