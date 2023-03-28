import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useStateValue } from "../../store/AuthContext/authContext";

import "./AddComment.css";

const FIREBASE_DOMAIN = "http://127.0.0.1:8000/api/v1";

const AddComment = ({ webID, fetchCommentHandler }) => {
  const [commentInput, setCommentInput] = useState();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    if (user) {
      await fetch(`${FIREBASE_DOMAIN}/comments`, {
        method: "POST",
        body: JSON.stringify({
          username: user.displayName,
          comment: commentInput,
          web_id: webID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCommentInput("");
      fetchCommentHandler();
    } else {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={commentSubmitHandler}>
      <div className="addComment__container">
        <div className="addComment__info">
          <input
            className="addComment__input"
            value={commentInput}
            onChange={(event) => setCommentInput(event.target.value)}
          />
          <button className="addComment__button" onClick={commentSubmitHandler}>
            Add Comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
