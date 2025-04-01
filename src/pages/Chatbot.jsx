import React, { useEffect, useRef, useState } from 'react'
import { getGeminiResponse } from '../utils/geminiAPI';
import TypingIndicator from '../components/TypingIndicator';
import { BiSolidSend } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const Chatbot = () => {

  function showSidebar(){
    const sideBar = document.querySelector('.sidebar');
    const visibility = sideBar.getAttribute('data-visible');

    if(visibility == 'false'){
      sideBar.setAttribute('data-visible', true);
    }
  }
  
  function closeSidebar(){
    const sideBar = document.querySelector('.sidebar');
    const visibility = sideBar.getAttribute('data-visible');

    if(visibility == 'true'){
      sideBar.setAttribute('data-visible', false);
    }
  }

  const [messages, setMessages] = useState([{ text: "Hey there, How can I help you today?", sender: "bot"}])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);


  const sendMessage = async () => {
    if(!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try{
      const botReply = await getGeminiResponse([...messages, userMessage]);
  
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Oops! something went wrong.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className='chatbot'>

      <div className="historyicon">
        <button onClick={() => showSidebar()}><FaHistory /></button>
      </div>
      
      <div className="sidebar" data-visible='false'>
        <button onClick={() => closeSidebar()}><FaArrowLeft /></button>
        <p>History</p>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
        <div key={index} className={msg.sender === "bot" ? "incoming-message" : "outgoing-message"}>
          <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br />") }}></p>
        </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="input">
        <input type="text" placeholder='Ask me anything...' value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}/>
        <input type="file" id='file-upload' hidden/>
        <button onClick={() => sendMessage()}><BiSolidSend /></button>
      </div>
    </div>
  )
}

export default Chatbot