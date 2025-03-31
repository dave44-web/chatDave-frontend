const API_BASE_URL = import.meta.env.VITE_API_KEY;

export const registerUser = async (name, email, password) => {
    try {const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),

    });
    const data = await response.json();
    console.log("Full Data: ", data);
    

    if(!response.ok) {
        throw new Error(data.message || "Registration Failed")
    }

    return data;
    } catch (error) {
        console.error("Register error", error.message);
        throw error;
    }
}

export const loginUser = async (email, password) => {
   try {const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    const responseText = await response.text();

    const data = JSON.parse(responseText)
    if(!response.ok) {
        throw new Error(data.message || "login failed");
    }
    
    return data;

    } catch(error) {
        console.error("Loggin error:", error);
        throw error;
    }
}

export const verifyOTP = async (email, otp) => {
    try {const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
    })

    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.message || "Otp Verification Failed");
    }
    return data;
    } catch (error) {
        console.error("Otp Verification Error:", error.message);
        throw error;
    }
}

export const sendOTP = async (email) => {
    try {const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })

    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.message || "Send otp failed");
    }
    return data;
    } catch (error) {
        console.error("Error sending otp: ", error.message);
        throw error;
    }
}

export const getNotes = async () => {
    try{
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log("full data: ", data);

        return data;
        
    } catch (error) {
        console.error("Error fetching note: ", error);
        
    }
}

export const addNotes = async (noteData) => {
    try{
        const token = localStorage.getItem("token");
        
        if(!token){
            throw new Error("no authentication token")
        }
        const response = await fetch(`${API_BASE_URL}/notes/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(noteData),
        });
        
        const data = await response.json();
        if(!response.ok) throw new Error(data.message || "Error adding note");

        return data;
        
    } catch (error) {
        console.error("Error adding note: ", error);
        
    }
}

export const editNote = async (noteId, updatedNote) => {
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedNote),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating note: ", error);
        
    }
}

export const deleteNote = async (noteId) => {
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting note: ", error);
        
    }
}

export const getUser = async () => {
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }
        const response = await fetch(`${API_BASE_URL}/auth/me/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting user: ", error);
        
    }
}

export const requestPasswordReset = async (email) => {
    const response = await fetch(`${API_BASE_URL}/forgotten-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
    });

    return await response.json();
}

export const resetPassword = async (email, otp, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp, newPassword }),
    });

    return await response.json();
}