import { useState, useEffect } from "react";
import axios from "axios";

const AllUsersTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(new Set());

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then((response) => setUsers(response.data.data))
            .catch((error) => console.log(error));
    }, []);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prevSelected => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(userId)) {
                updatedSelected.delete(userId);
            } else {
                updatedSelected.add(userId);
            }
            return updatedSelected;
        });
    };

    const handleDeleteSelected = () => {
        const idsToDelete = Array.from(selectedUsers);
        axios.all(idsToDelete.map(id => axios.delete(`http://localhost:8000/api/user/${id}`)))
            .then(() => {
                setUsers(users.filter(user => !idsToDelete.includes(user._id)));
                setSelectedUsers(new Set());
            })
            .catch((err) => console.log("Error during delete:", err));
    };
    return (
        <div>
            <button 
                onClick={handleDeleteSelected}
                className="btn btn-danger"
                disabled={selectedUsers.size === 0}
            >
                Delete Selected
            </button>
            <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                    <tr className="text-dark">
                        <th scope="col"><input className="form-check-input" type="checkbox" onChange={() => {}} /></th>
                        <th scope="col">Date</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={selectedUsers.has(user._id)}
                                        onChange={() => handleCheckboxChange(user._id)}
                                    />
                                </td>
                                <td>01 Jan 2045</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.phoneNumber}</td>
                                <td>$123</td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-primary">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsersTable;
