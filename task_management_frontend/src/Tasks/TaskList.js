import { Oval } from 'react-loader-spinner'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tasks/', {
          params: {
            user: 'sai',
          },
        });
        const adminTasks = Object.values(response.data).filter(task => task.user === Cookies.get('Admin') );

    
        setTasks(adminTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}/`);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleCheckboxChange = async (id, completed) => {
    // Find the task with the specified id
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: completed === '0' ? '1' : '0' } : task
    );

    setTasks(updatedTasks);

    try {
      // Find the specific task for the provided id
      const selectedTask = tasks.find((task) => task.id === id);

      // Update the 'completed' field in the database
      const response = await axios.put(`http://localhost:8000/tasks/${id}/`, {
        completed: completed === '0' ? '1' : '0',
        user: Cookies.get('Admin'),
        title: selectedTask.title,
        description: selectedTask.description,
        due_date: selectedTask.due_date,
      });

      console.log('Update successful. Server response:', response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  
  const exampleModal = document.getElementById('exampleModal');
const Description = document.getElementById('Description');
const due_date = document.getElementById('duedate');
const  TaskId = document.getElementById('taskId');
const  Title = document.getElementById('Title');

if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const title = button.getAttribute('data-bs-title');
    const taskId = button.getAttribute('data-bs-id');
    const description = button.getAttribute('data-bs-description');
    const dueDate = button.getAttribute('data-bs-due_date');
  
    const modalTitle = exampleModal.querySelector('.modal-title');
    const modalBodyInput = exampleModal.querySelector('.modal-body input');
  
    modalTitle.textContent = `Update Task`;
    Title.value = title;
    Description.value = description;
    due_date.value = dueDate;
    TaskId.value = taskId;  
  
  });
}




const handleSave = async () => {
  try {
    // Get values from the modal form
    const task_id = document.getElementById('taskId').value;
    const title = document.getElementById('Title').value;
    const description = document.getElementById('Description').value;
    const due_date = document.getElementById('duedate').value;
    const completed = tasks.find((task) => task.id == task_id).completed; 

    // Find the specific task for the provided id
    const selectedTask = tasks.find((task) => task_id === taskId);

    // Update the task in the database
    const response = await axios.put(`http://localhost:8000/tasks/${task_id}/`, {
      completed, 
            user: Cookies.get('Admin'),
      taskId,
      title,
      description,
      due_date,
    });

    console.log('Update successful. Server response:', response.data);

    // Close the modal after saving
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
    window.location.reload();

  } catch (error) {
    console.error('Error updating task:', error);
  }
};




  return (
        <div>
          
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Completed</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                {tasks && tasks.map((task,index) => (
                        <tr key={task.id}>
                            <th scope="row" className='py-4'>{index + 1}</th>
                            <td className='py-4'>{task.title}</td>
                            <td className='py-4'>{task.description}</td>
                            <td className='py-4'>{task.due_date}</td>
                            <td className='py-4'>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(task.id)}>X</button>
                            </td>
                            <td className='py-4'>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={`flexSwitchCheckChecked_${task.id}`}
                                        checked={task.completed === '1'}
                                        onChange={() => handleCheckboxChange(task.id, task.completed)}
                                    />
                                </div>
                            </td>
                            <td className='py-4'>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-id={task.id} data-bs-title={task.title} data-bs-description={task.description} data-bs-due_date={task.due_date}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Task</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
        <div className="mb-3">
            <label htmlFor="Title" className="col-form-label">Id:</label>
        <input type="text" className="form-control" id="taskId" disabled/>
          </div>

          <div className="mb-3">
            <label htmlFor="Title" className="col-form-label">Title:</label>
            <input type="text" className="form-control" id="Title"/>
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="col-form-label">Description:</label>
            <textarea className="form-control" id="Description"></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="duedate" className="col-form-label">Due date:</label>
            <input type="date" className="form-control" id="duedate"/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default TaskList;
