"use client"

import React, { useState, useEffect } from 'react';
import '.././message/message-page.css';
import Image from "next/image";

const MessagePage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);


  const userId = "67f68c137a5d74179328d274"; // CHANGE THIS WHEN LOGIN IS WORKING CORRECTLY

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/items"); 
      const data = await res.json();
      setComments(data.messages.reverse());
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };
  const handleDeleteComment = async (messageId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (!confirm) return;
  
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "deleteMessage",
          data: {
            messageId,
            userId,
          }
        }),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        console.error("❌ Failed to delete:", result.error);
        alert(`Delete failed: ${result.error}`);
        return;
      }
  
      fetchMessages();
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Something went wrong deleting the message.");
    }
  };
  
  const addNewComment = async () => {
 

    if (userName.trim() && commentText.trim()) {
      try {
        const res = await fetch("/api/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
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
          const errorText = await res.text();
          console.error("Failed to post comment", res.status, errorText);
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
      <header>
        <div className="title">Warnell VR Forum</div>
      </header>

      <div className="content-area">
        <div className="forum-container">
          <div className="comment-form">
            <h3>Add Your Comment</h3>
            <input
              type="text"
              className="name-input"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <textarea
              placeholder="Share your thoughts about VR technology at Warnell..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            <button onClick={addNewComment}>Post Comment</button>
          </div>

          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">No comments yet. Be the first to share!</div>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-header">
                    <span>{comment.name}</span>
                  </div>
                  <div className="comment-content">{comment.message}</div>
              
                  {comment.postedBy === userId && (
                    <button onClick={() => handleDeleteComment(comment._id)}>
                     Delete Comment
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <div className="links-column">
            <a href="https://eits.uga.edu/resources/" target="_blank" rel="noopener noreferrer">Resources</a>
            <a href="https://warnell.uga.edu/resources-students" target="_blank" rel="noopener noreferrer">Contact Warnell IT</a>
            <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" target="_blank" rel="noopener noreferrer">MYUGA</a>
            <a href="https://eits.uga.edu/support/" target="_blank" rel="noopener noreferrer">Help</a>
          </div>
        </div>
        <div className="copyright">
          © University of Georgia.
        </div>
      </footer>

      <Image
        src="/univ.png"
        alt="UGA Logo"
        width={200}
        height={100}
        className="logo"
      />
    </div>
  );
};

export default MessagePage;
