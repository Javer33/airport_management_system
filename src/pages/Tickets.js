import React, { useState } from "react";
import { useTickets } from "../context/TicketContext";
import { useUsers } from "../context/UserContext";

export default function Tickets() {
  const { tickets, createTicket, updateTicket, deleteTicket, bookTicket } = useTickets();
  const { users } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ flightNumber:'', origin:'', destination:'', departure:'', arrival:'', gate:'', status:'Scheduled', seatsAvailable:10, price:0 });

  const openAdd = () => { setForm({ flightNumber:'', origin:'', destination:'', departure:'', arrival:'', gate:'', status:'Scheduled', seatsAvailable:10, price:0}); setEditing(null); setShowForm(true); };
  const openEdit = (t) => { setForm({ ...t }); setEditing(t); setShowForm(true); };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) updateTicket(editing.id, form); else createTicket(form);
    setShowForm(false);
  };

  const handleBook = (ticketId) => {
    const userEmail = prompt('Enter user email to book:');
    if(!userEmail) return;
    const user = users.find(u=>u.email === userEmail);
    if(!user) return alert('User not found');
    try {
      bookTicket(user.id, ticketId);
      alert('Booked successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Flights</h3>
        <button className="btn btn-primary" onClick={openAdd}>Add Flight</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-3 card p-3">
          <div className="row">
            <div className="col-md-3 mb-2"><input required className="form-control" placeholder="Flight #" value={form.flightNumber} onChange={e=>setForm({...form,flightNumber:e.target.value})} /></div>
            <div className="col-md-3 mb-2"><input required className="form-control" placeholder="Origin" value={form.origin} onChange={e=>setForm({...form,origin:e.target.value})} /></div>
            <div className="col-md-3 mb-2"><input required className="form-control" placeholder="Destination" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} /></div>
            <div className="col-md-3 mb-2"><input type="datetime-local" className="form-control" value={form.departure} onChange={e=>setForm({...form,departure:e.target.value})} /></div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-success">{editing ? 'Update' : 'Create'}</button>
            <button type="button" className="btn btn-secondary" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <table className="table">
        <thead><tr><th>Flight</th><th>Route</th><th>Departure</th><th>Gate</th><th>Seats</th><th>Actions</th></tr></thead>
        <tbody>
          {tickets.map(t=>(
            <tr key={t.id}>
              <td>{t.flightNumber}</td>
              <td>{t.origin} → {t.destination}</td>
              <td>{t.departure ? new Date(t.departure).toLocaleString() : ''}</td>
              <td>{t.gate}</td>
              <td>{t.seatsAvailable}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>openEdit(t)}>Edit</button>
                <button className="btn btn-sm btn-outline-success me-2" onClick={()=>handleBook(t.id)} disabled={t.seatsAvailable<=0}>Book</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>window.confirm('Delete flight?') && deleteTicket(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
