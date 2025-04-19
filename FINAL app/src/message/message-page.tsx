"use client"

import React, { useState } from 'react';
import '.././css/CheckoutPage.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface Comment {
    id: number;
    name: string;
    text: string;
    timestamp: string;
  }
  
  const MessagePage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [noComments, setNoComments] = useState(true);
  
    useEffect(() => {
      loadComments();
    }, []);
  
    const loadComments = () => {
      const savedComments = JSON.parse(localStorage.getItem('warnellForumComments') || '[]');
      setComments(savedComments);
      setNoComments(savedComments.length === 0);
    };
  
    const saveComments = (newComments: Comment[]) => {
      localStorage.setItem('warnellForumComments', JSON.stringify(newComments));
    };
  
    const addNewComment = () => {
      if (userName.trim() && commentText.trim()) {
        const newComment: Comment = {
          id: Date.now(),
          name: userName.trim(),
          text: commentText.trim(),
          timestamp: new Date().toLocaleString()
        };
  
        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        saveComments(updatedComments);
        
        setUserName('');
        setCommentText('');
        setNoComments(false);
      } else {
        alert('Please enter both your name and a comment');
      }
    };
  
    const deleteComment = (id: number) => {
      if (window.confirm('Are you sure you want to delete this comment?')) {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
        saveComments(updatedComments);
        setNoComments(updatedComments.length === 0);
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
              {noComments ? (
                <div className="no-comments">No comments yet. Be the first to share!</div>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <span>{comment.name}</span>
                      <span>{comment.timestamp}</span>
                    </div>
                    <div className="comment-content">{comment.text}</div>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete Comment
                    </button>
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
  
        <img src="univ.png" alt="UGA Logo" className="logo" />
      </div>
    );
  };
  
  export default MessagePage;