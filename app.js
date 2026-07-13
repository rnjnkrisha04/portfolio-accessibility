document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Load initial state from localStorage
    let todos = JSON.parse(localStorage.getItem('portfolio-todos')) || [];

    // Save state to localStorage
    const saveTodos = () => {
        localStorage.setItem('portfolio-todos', JSON.stringify(todos));
    };

    // Render logic (Read)
    const renderTodos = (filter = 'all') => {
        todoList.innerHTML = '';
        
        const filteredTodos = todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;
            
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} class="toggle-status" aria-label="Mark task as complete">
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" aria-label="Delete task">Delete</button>
            `;
            todoList.appendChild(li);
        });
    };

    // Add Task logic (Create)
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (!taskText) return;

        const newTodo = {
            id: Date.now().toString(),
            text: taskText,
            completed: false
        };

        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    });

    // Event Delegation (Update & Delete)
    todoList.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;
        const id = item.dataset.id;

        // Toggle complete status (Update)
        if (e.target.classList.contains('toggle-status')) {
            todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
            saveTodos();
            renderTodos(document.querySelector('.filter-btn.active').dataset.filter);
        }

        // Remove item from array (Delete)
        if (e.target.classList.contains('delete-btn')) {
            todos = todos.filter(t => t.id !== id);
            saveTodos();
            renderTodos(document.querySelector('.filter-btn.active').dataset.filter);
        }
    });

    // Advanced Filtering implementation
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTodos(btn.dataset.filter);
        });
    });

    // Initial load view
    renderTodos();
});
