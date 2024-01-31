// src/components/TaskForm.js

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: '',
    user: '',
    description: '',
    completed:'',
    due_date: '',
  });
  const [listening, setListening] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const user = Cookies.get('Admin');
      const completed = '0';  
  
      await axios.post('http://localhost:8000/tasks/', {
        ...task,
        user,
        completed,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setTask({
        title: '',
        user,
        completed,
        description: '',
        due_date: '',
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  




  const handleVoiceInput = () => {
    setTask({
      ...task,
      description: transcript, // Set description to the transcript value
    });
  };
  const {
    transcript,
    resetTranscript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  
  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  useEffect(() => {
    setTask({
      ...task,
      description: transcript, // Set description to the transcript value
    });
  }, [transcript]);

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listening]);
  return (
  <div className="container">
     <form onSubmit={handleSubmit}>
     <div className="row g-3 mt-5">
      <div className="col-md-6 mb-3">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="Title" name="title" value={task.title} onChange={handleChange} required/>
              <label htmlFor="floatingInput">Title</label>
            </div>
      </div>
      <div className="col-md-6 mb-3">
            <div className="form-floating mb-3">
              <input type="date" className="form-control" id="floatingInput" placeholder="due_date" name="due_date" value={task.due_date} onChange={handleChange} required/>
              <label htmlFor="floatingInput">Due Date</label>
            </div>
        </div>
      <div className="col-md-12 mb-3">
            <div className="form-floating mb-3">
              <textarea type="text" className="form-control" id="floatingInput" placeholder="description" name="description" value={task.description} onChange={handleChange} required></textarea>
              <label htmlFor="floatingInput">Description</label>
            </div>
            <div>
                <p>Mention your description through voice:<span className='fw-bold'> {listening ? 'on' : 'off'}</span></p>
                <p className='fw-bold'>(Use Chrome For Voice Utilzation)</p>

                <span className="btn btn-success"onClick={() => setListening(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
  <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z"/>
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
</svg>
                </span>
                <span className="ms-3 btn btn-danger"onClick={() => setListening(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-mute-fill" viewBox="0 0 16 16">
  <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3"/>
  <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z"/>
</svg>
                </span>
                <span className="ms-3 btn btn-secondary"onClick={resetTranscript}>Reset</span>
        </div>
      </div>
      <div className="col-md-12 mb-3">
            <div className="form-floating mb-3">
            <button type="submit" className="btn btn-primary">Add Task</button>
            </div>
      </div>
      
    </div>
    </form>

    </div>





   
  );
};

export default TaskForm;
