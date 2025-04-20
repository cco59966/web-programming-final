"use client"

import React, { useState, useEffect } from 'react';
import '.././message/message-page.css';
import Image from "next/image";
import Link from 'next/link';

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
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/authenticated">Authenticated</Link></li>
            <li><Link href="/checkout">Checkout</Link></li>
          </ul>
        </nav>
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
          <span className="text-base">© University of Georgia</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" className="hover:underline">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline">MyUGA</a>
          <a href="https://eits.uga.edu/support/" className="hover:underline">Help</a>
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