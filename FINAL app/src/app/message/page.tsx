"use client"

import React, { useState, useEffect } from 'react';
import '.././message/message-page.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import '.././css/VRPage.css';
// Our beautiful message page that users and non-users can see
const MessagePage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


// Sees if the user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser._id); 
      setUserName(parsedUser.name); 
    }
  
    fetchMessages();
  }, []);
  
// Gets the messages from the database
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/items"); 
      const data = await res.json();
      setComments(data.messages.reverse());
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  // Allows the user to delete their own comments
  const handleDeleteComment = async (messageId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
  
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "deleteMessage",
          data: {
            messageId,
            userId: userId,
          }
          
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(`Delete failed: ${result.error}`);
        return;
      }
      fetchMessages();
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Something went wrong deleting the message.");
    }
  };
  
  // Allows the user to add new comments
  const addNewComment = async () => {
    if (userName.trim() && commentText.trim()) {
      try {
        const res = await fetch("/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "message",
            data: {
              name: userName.trim(),
              message: commentText.trim(),
              postedBy: userId,
            }
            
          }),
        });
        if (res.ok) {
          setUserName('');
          setCommentText('');
          fetchMessages();
        } else {

          // This happens if the user is not logged in
          const errorText = await res.text();
          console.error("Failed to post comment", res.status, errorText);
          alert("Comment Failed. Please Login to post a comment.");
        }
      } catch (err) {
        console.error("Error posting comment:", err);
      }
    } else {
      alert('Please enter both your name and a comment');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNewComment();
    }
  };

  return (
    
      
    <div className="app-container">
      
      {/* Universal header */}
     <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <div className="flex items-center justify-start">
          <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
        </div>
        <div className="flex gap-4">
         
          <button 
            onClick={() => router.push("home")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Return Home
          </button>
          {isLoggedIn && (
          <button 
            onClick={() => router.push("checkout")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Add Items
          </button>
          )}
           {isLoggedIn && (
          <button 
            onClick={() => router.push("authenticated")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
          View Current Reservations
          </button>
          )}
        </div>
      </header>

      {/* Section to add comments */}
      <div className="content-area">
        <div className="forum-container">
          <div className="comment-form">

             {/* Displays to the user if they aren't logged in */}
          {!isLoggedIn && (
       
       <h3>Login to add comments!</h3>
         
          )}
          {isLoggedIn && (    
       <h3>Add a comment</h3>       
          )}
            <input
              type="text"
              className="name-input"
              placeholder="Your name (Or type Anonymous)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <textarea
              placeholder="Type your message here!"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            <button onClick={addNewComment}>Post Comment</button>
          </div>

          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">No comments right now. Add something to fix that!</div>
            ) : (

              // The map function that shows the comments to the user, no matter if they
              // are logged in or not
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-header">
                    <span>{comment.name}</span>
                  </div>
                  <div className="comment-content">{comment.message}</div>
                  {comment.postedBy === userId && (
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Universal footer*/}
       <footer className="bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
         <div className="flex items-center space-x-4 mb-4 sm:mb-0">
           <div className="relative w-40 h-20">
             <Image
               src="https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
               alt="UGA Logo"
               fill
               className="object-contain"
             />
           </div>
           <span className="text-base flex-1 text-center">© University of Georgia</span>
         </div>
 
         <div className="flex flex-col items-center space-y-2">
           <a href="https://eits.uga.edu/resources/" className="hover:underline">
             Resources
           </a>
           <a href="https://warnell.uga.edu/resources-students" className="hover:underline">
             Contact Warnell IT
           </a>
           <a
             href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP"
             className="hover:underline"
           >
             MyUGA
           </a>
           <a href="https://eits.uga.edu/support/" className="hover:underline">
             Help
           </a>
         </div>
       </footer>

       </div>
  );
};

export default MessagePage;
