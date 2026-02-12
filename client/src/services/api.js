const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.errors?.join(', ') || 'API request failed');
  }
  return data;
};

export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return handleResponse(response);
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  return handleResponse(response);
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

export const toggleComplete = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  });
  return handleResponse(response);
};
