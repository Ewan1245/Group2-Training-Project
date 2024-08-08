// Import the essential components from the chat UI kit.
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

// Import the OpenAI library for interacting with the OpenAI API.
import OpenAI from "openai";
import { useRef, useCallback, useEffect } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import '../css/Chat.css';

// Function to create an OpenAI instance with the given API key.
const createOpenAIInstance = (apiKey) => new OpenAI({
    baseURL: 'https://api.deepinfra.com/v1/openai',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});


const Chat = ({ chatHistory, setChatHistory, userInput, setUserInput }) => {
    const apiKey = process.env.REACT_APP_API_KEY;  // Get the API key from environment variables.
    const openai = useRef(createOpenAIInstance(apiKey)).current;  // Create and store the OpenAI instance.

    // Function to handle user input changes.
    const handleUserInput = useCallback((value) => {
        setUserInput(value);
    }, [setUserInput]);

    useEffect(() => {
        const welcomeMessage = "Hi, I am Jeff. I am your personal Sky sous-chef. How can I help you today?"
        setChatHistory(() => [
            { type: "bot", message: welcomeMessage },
        ]);
    }, setChatHistory);

    // Function to send a message to the chat.
    const sendMessage = useCallback(async (messageText) => {
        if (messageText.trim() === "") return;  // Do nothing if the message is empty.

        try {
            // Add the user's message to the chat history.
            setChatHistory((prev) => [
                ...prev,
                { type: "user", message: messageText },
            ]);

            // Send the user's message to OpenAI and get the response.
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: messageText }],
                model: "mistralai/Mistral-7B-Instruct-v0.3",
            });

            // Extract the bot's response from the completion object.
            const text = completion.choices[0].message.content;

            // Add the bot's response to the chat history.
            setChatHistory((prev) => [
                ...prev,
                { type: "bot", message: text },
            ]);
            setUserInput("");  // Clear the input field after sending the message.
        } catch (e) {
            console.log("Error occurred while fetching", e);
        }
    }, [openai, setChatHistory, setUserInput]);


    return (
        <div className="chat-content">
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {/* Render each message in the chat history */}
                        {chatHistory.map((elt, i) => (
                            <Message
                                key={i}
                                model={{
                                    message: elt.message,  // The message content.
                                    sender: elt.type,      // The sender (user or bot).
                                    direction: elt.type === "user" ? "outgoing" : "incoming",  // Message direction.
                                }}
                            />
                        ))}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        value={userInput}
                        onChange={(value) => handleUserInput(value)}
                        onSend={() => sendMessage(userInput)}
                        attachButton='false'
                        autoFocus='true'
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};

export default Chat;
