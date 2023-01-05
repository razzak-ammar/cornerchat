import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import ChatBubble from '../../Components/ChatBubble';
import ChatInputBox from '../../Components/ChatInputBox';
import ChatTopBar from '../../Components/ChatTopBar';
import authContext from '../../store/auth/authContext';
import chatContext from '../../store/chat/chatContext';

const Chat = (props) => {
  const ChatContext = useContext(chatContext);
  const AuthContext = useContext(authContext);

  const scrollView = useRef();

  let ScreenHeight = Dimensions.get('window').height;

  const [currentChatName, setCurrentChatName] = useState('');
  const [messages, setCurrentMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [scrollViewMultiplier, setScrollViewMultiplier] = useState(0.8);
  const [userInChat, setUserInChat] = useState(false);

  useEffect(() => {
    if (ChatContext.currentChatName.length > 0) {
      setCurrentChatName(ChatContext.currentChatName);
      ChatContext.getCurrentChatMessages();
    }
  }, [ChatContext.currentChatName, ChatContext.currentChatId]);

  // Current messages
  useEffect(() => {
    setCurrentMessages(ChatContext.currentChatMessages);
    console.log('There is a new message');
  }, [ChatContext.currentChatMessages]);
  // }, []

  useEffect(() => {
    ChatContext.listenToChatMessages();
  }, []);

  useEffect(() => {
    setUserInChat(true);
  }, [ChatContext.userInChat]);

  useLayoutEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      scrollView.current.style.height = ScreenHeight * 0.3;
    });

    props.navigation.getParent().setOptions({
      tabBarStyle: {
        display: 'none'
      }
    });
    // Keyboard.addListener('keyboardDidHide', () => {
    //   setScrollViewMultiplier(0.7);
    // });
  }, []);

  if (ChatContext.loading) {
    return <Text>Loading page... please wait </Text>;
  }

  const onSend = () => {
    // Need to send: message, sender_id, sender_name
    console.log(AuthContext.user._id);
    console.log('I am sending a message');
    if (inputText.length >= 1) {
      ChatContext.sendMessage({
        message: inputText,
        sender_id: AuthContext.user._id,
        sender_name: AuthContext.user.name
      });
      setInputText('');
    }
  };

  return (
    <View>
      <ChatTopBar chatName={currentChatName} userInChat={userInChat} />

      <ScrollView
        ref={scrollView}
        style={{
          maxHeight: ScreenHeight * scrollViewMultiplier,
          height: ScreenHeight * scrollViewMultiplier
        }}
        onContentSizeChange={(contentHeight, contentWidth) => {
          scrollView.current.scrollToEnd({ animated: true });
        }}
        showsVerticalScrollIndicator={false}
      >
        {messages.length > 0
          ? messages.map((msg) =>
              msg.sender_id == AuthContext.user._id ? (
                <ChatBubble
                  content={msg.content}
                  key={msg.timestamp}
                  arrow={'right'}
                />
              ) : (
                <ChatBubble
                  content={msg.content}
                  key={msg.timestamp}
                  arrow={'left'}
                />
              )
            )
          : null}
      </ScrollView>
      <KeyboardAvoidingView behavior='position'>
        <ChatInputBox
          onSend={onSend}
          inputText={inputText}
          setInputText={setInputText}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
