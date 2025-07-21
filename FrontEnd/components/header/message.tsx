"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MdMessage } from "react-icons/md";

export default function Message(){
   
    const [messageCount, setMessageCount] = useState(0);
    const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3002/messages")
      .then((res) => {
        const fetchedMessageCount = res.data.length;
        const lastViewedMessageCount = parseInt(localStorage.getItem("lastViewedMessageCount") || "0", 10);

        // Show notification only for new Messages
        if (fetchedMessageCount > lastViewedMessageCount) {
          setNewMessageCount(fetchedMessageCount - lastViewedMessageCount);
        } else {
          setNewMessageCount(0);
        }

        setMessageCount(fetchedMessageCount);
      })
      
      .catch((err) => console.error(err));
  }, []);

  
  const handleViewMessages = () => {
    localStorage.setItem("lastViewedMessageCount", messageCount.toString());
    setNewMessageCount(0); // Reset new Message notification
  };

  return (
    <Link href="/message" className="bttn1  flex items-center space-x-1 p-2  rounded transition"
         onClick={handleViewMessages}>
          <MdMessage size={20} />
          {newMessageCount > 0 &&  (
        <span className=" bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
          {newMessageCount}
        </span>
      )}
      
        </Link>
  )

}