import { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:3000/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  
  // Views: 'login', 'register', 'dashboard'
  const [view, setView] = useState(token ? 'dashboard' : 'login');
  
  // Auth Form State
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [authError, setAuthError] = useState('');
  
  // Todos state
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
      fetchTodos();
      setView('dashboard');
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/current`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todo/getTodos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTodos(data.todos || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setView('dashboard');
      } else {
        setAuthError(data.message || 'Registration failed');
      }
    } catch (err) {
      setAuthError('An error occurred');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setView('dashboard');
      } else {
        setAuthError(data.message || 'Login failed');
      }
    } catch (err) {
      setAuthError('An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setTodos([]);
    setView('login');
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title || !newTodo.description) return;
    try {
      const res = await fetch(`${API_BASE}/todo/addTodo`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...newTodo, status: 'pending' })
      });
      if (res.ok) {
        setNewTodo({ title: '', description: '' });
        fetchTodos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/todo/deleteTodo/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // Views
  if (view === 'login' || view === 'register') {
    return (
      <div className="auth-container">
        <div className="auth-box glass-panel">
          <h2>{view === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          {authError && <p className="error">{authError}</p>}
          <form onSubmit={view === 'login' ? handleLogin : handleRegister}>
            {view === 'register' && (
              <input 
                type="text" name="name" placeholder="Full Name" 
                value={authForm.name} onChange={handleAuthChange} required 
              />
            )}
            <input 
              type="email" name="email" placeholder="Email" 
              value={authForm.email} onChange={handleAuthChange} required 
            />
            <input 
              type="password" name="password" placeholder="Password" 
              value={authForm.password} onChange={handleAuthChange} required 
            />
            <button type="submit" className="primary-btn">
              {view === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
          <p className="toggle-auth">
            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => { setView(view === 'login' ? 'register' : 'login'); setAuthError(''); }}>
              {view === 'login' ? 'Register here' : 'Login here'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="glass-panel">
        <div className="header-content">
          <h1>My Tasks</h1>
          <div className="user-info">
            <span>{user?.name || 'User'}</span>
            <button onClick={handleLogout} className="outline-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="add-todo glass-panel">
          <h3>Add New Task</h3>
          <form onSubmit={handleAddTodo}>
            <input 
              type="text" 
              placeholder="Task Title" 
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              required
            />
            <textarea 
              placeholder="Task Description" 
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              required
            ></textarea>
            <button type="submit" className="primary-btn">Add Task</button>
          </form>
        </section>

        <section className="todos-list">
          {todos.length === 0 ? (
            <div className="no-todos glass-panel">
              <p>No tasks yet. Create one!</p>
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo._id} className="todo-item glass-panel">
                <div className="todo-content">
                  <h4>{todo.title}</h4>
                  <p>{todo.description}</p>
                </div>
                <button 
                  onClick={() => handleDeleteTodo(todo._id)} 
                  className="danger-btn"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
