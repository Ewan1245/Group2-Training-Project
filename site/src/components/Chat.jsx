import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import OpenAI from "openai";
import { useEffect, useRef } from 'react';
import '../css/Chat.css';



const Chat = ({ chatHistory, setChatHistory, userInput, setUserInput }) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const openai = new OpenAI({
        baseURL: 'https://api.deepinfra.com/v1/openai',
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });

    const handleUserInput = (value) => {
        setUserInput(value);
    };

    const sendMessage = async (messageText) => {
        if (messageText.trim() === "") return;

        try {
            setChatHistory((prev) => [
                ...prev,
                { type: "user", message: messageText },
            ]);

            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: messageText }],
                model: "mistralai/Mistral-7B-Instruct-v0.3",
            });

            const text = completion.choices[0].message.content;

            setChatHistory((prev) => [
                ...prev,
                { type: "bot", message: text },
            ]);

            setUserInput(""); // Clear the input field

        } catch (e) {
            console.log("Error occurred while fetching", e);
        }
    };

    const messageListRef = useRef(null);
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [chatHistory]);


    return (
        <div className="chat-content">
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {chatHistory.map((elt, i) => (
                            <Message
                                key={i}
                                model={{
                                    message: elt.message,
                                    sender: elt.type,
                                    sentTime: "just now",
                                    direction: elt.type === "user" ? "outgoing" : "incoming",
                                }}
                            />
                        ))}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        value={userInput}
                        onChange={(value) => handleUserInput(value)}
                        onSend={() => {
                            sendMessage(userInput);
                            setUserInput("");
                        }}
                    />
                </ChatContainer>
            </MainContainer>
        </div >
    );
};

export default Chat;
