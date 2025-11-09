import React, { useState } from "react";
import { useUsers } from "../context/UserContext";

export default function Users() {
  const { users, createUser, updateUser, deleteUser } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "passenger" });

  const openAdd = () => { setForm({ name: "", email: "", phone: "", role: "passenger" }); setEditing(null); setShowForm(true); };
  const openEdit = (u) => { setForm({ name: u.name, email: u.email, phone: u.phone, role: u.role }); setEditing(u); setShowForm(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) updateUser(editing.id, { ...editing, ...form });
    else createUser(form);
    setShowForm(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <button className="btn btn-primary" onClick={openAdd}>Add User</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-3 card p-3">
          <div className="row">
            <div className="col-md-4 mb-2"><input required className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" /></div>
            <div className="col-md-4 mb-2"><input required className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" /></div>
            <div className="col-md-4 mb-2"><input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" /></div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-success">{editing ? 'Update' : 'Create'}</button>
            <button type="button" className="btn btn-secondary" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Bookings</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{(u.bookings||[]).length}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEdit(u)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => window.confirm('Delete user?') && deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
