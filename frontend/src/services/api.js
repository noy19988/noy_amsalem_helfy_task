const BASE_URL = 'http://localhost:4000/api/tasks';

const handleResponse = async (res) => {
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Something went wrong');
    }
    if (res.status === 204) return null;
    return res.json();
};

const api = {
    getTasks: async () => {
        const res = await fetch(BASE_URL);
        return handleResponse(res);
    },

    createTask: async (data) => {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    updateTask: async (id, data) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    toggleTaskStatus: async (id) => {
        const res = await fetch(`${BASE_URL}/${id}/toggle`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        });
        return handleResponse(res);
    },

    deleteTask: async (id) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(res);
    },
};

export default api;