// copilot: disable
import { useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

function PostCreate() {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(title)
    await axios.post('http://localhost:4000/post', {
      title
    })

    setTitle('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
