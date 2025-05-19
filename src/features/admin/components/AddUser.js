import react, { useState, useEffect } from "react";

const AddUserModal = ({onClose, onAddUser, updateUser, users})=> {
    const [formData, setFormData] = useState(
        updateUser ||
        {
        name: "",
        email: "",
        password: "",
        role: ""
        }
    )
    const [emailError, setEmailError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "email") setEmailError(""); // reset lỗi khi nhập lại
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra trùng email nếu là thêm mới
        if (!updateUser) {
            const emailExists = users.some(
                (user) => user.email.toLowerCase() === formData.email.toLowerCase()
            );
            if (emailExists) {
                setEmailError("This email is already in use.");
                return;
            }
        }
        onAddUser(formData);
        if (!updateUser) {
        setFormData({ name: "", email: "", password: "", role: "" });
        }
    }
    return (
        <div className="add-user-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                &times;
                </span>
                <h2 className="modal-title">
                 {updateUser ? "Update User" : "Add New User"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name …"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email …"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {emailError && (
                        <p style={{ color: "red", marginTop: "4px" }}>{emailError}</p>
                    )}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password …"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="role">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choose your role</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                    <div className="btn-add__cancel">
                        <button type="submit" className="btn-add">
                            {updateUser ? "Save" : "Add"}
                        </button>
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUserModal;