import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../lib/AuthContext'
import './AdminDashboard.css'

const STAGES = ['Forwarded', 'In Transit', 'Out for Delivery', 'Delivered']

function generateTrackingId() {
  const now = new Date()
  const y = String(now.getFullYear()).slice(2)
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(100 + Math.random() * 900)
  return `KMY${y}${m}${d}${rand}`
}

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [parcels, setParcels] = useState([])
  const [loadingParcels, setLoadingParcels] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [events, setEvents] = useState([])
  const [message, setMessage] = useState(null)

  const [newParcel, setNewParcel] = useState({
    sender_name: '', sender_city: '', receiver_name: '', receiver_city: '',
    origin: '', destination: '',
  })

  const [checkpoint, setCheckpoint] = useState({ status: 'Forwarded', location: '', note: '' })

  async function loadParcels() {
    setLoadingParcels(true)
    const { data } = await supabase
      .from('parcels')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    setParcels(data || [])
    setLoadingParcels(false)
  }

  useEffect(() => { loadParcels() }, [])

  async function handleCreateParcel(e) {
    e.preventDefault()
    setMessage(null)
    const tracking_id = generateTrackingId()

    const { data, error } = await supabase
      .from('parcels')
      .insert([{ tracking_id, ...newParcel }])
      .select()
      .single()

    if (error) {
      setMessage({ type: 'error', text: 'Could not create parcel: ' + error.message })
      return
    }

    // First checkpoint event
    await supabase.from('tracking_events').insert([{
      parcel_id: data.id, status: 'Forwarded', location: newParcel.origin,
    }])

    setMessage({ type: 'success', text: `Parcel created: ${tracking_id}` })
    setNewParcel({ sender_name: '', sender_city: '', receiver_name: '', receiver_city: '', origin: '', destination: '' })
    loadParcels()
  }

  async function openParcel(p) {
    setSelected(p)
    setMessage(null)
    const { data } = await supabase
      .from('tracking_events')
      .select('*')
      .eq('parcel_id', p.id)
      .order('event_time', { ascending: false })
    setEvents(data || [])
  }

  async function handleAddCheckpoint(e) {
    e.preventDefault()
    if (!selected) return
    setMessage(null)

    const { error } = await supabase.from('tracking_events').insert([{
      parcel_id: selected.id,
      status: checkpoint.status,
      location: checkpoint.location,
      note: checkpoint.note || null,
    }])

    if (error) {
      setMessage({ type: 'error', text: 'Could not add update: ' + error.message })
      return
    }

    setMessage({ type: 'success', text: 'Checkpoint added.' })
    setCheckpoint({ status: checkpoint.status, location: '', note: '' })
    openParcel(selected)
    loadParcels()
  }

  const filteredParcels = parcels.filter((p) =>
    p.tracking_id.toLowerCase().includes(search.toLowerCase()) ||
    (p.receiver_name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container section admin-dash">
      <div className="admin-header">
        <div>
          <span className="eyebrow">Admin Dashboard</span>
          <h1>Manage Parcels</h1>
        </div>
        <button className="btn btn-outline" onClick={signOut}>Log Out</button>
      </div>

      {message && (
        <p className={message.type === 'error' ? 'admin-msg-error' : 'admin-msg-success'}>
          {message.text}
        </p>
      )}

      <div className="admin-grid">
        {/* Create new parcel */}
        <div className="card">
          <h3>Create New Parcel</h3>
          <form onSubmit={handleCreateParcel} className="admin-form">
            <input placeholder="Sender name" value={newParcel.sender_name}
              onChange={(e) => setNewParcel({ ...newParcel, sender_name: e.target.value })} />
            <input placeholder="Sender city / origin" value={newParcel.origin}
              onChange={(e) => setNewParcel({ ...newParcel, origin: e.target.value, sender_city: e.target.value })} />
            <input placeholder="Receiver name" value={newParcel.receiver_name}
              onChange={(e) => setNewParcel({ ...newParcel, receiver_name: e.target.value })} />
            <input placeholder="Receiver city / destination" value={newParcel.destination}
              onChange={(e) => setNewParcel({ ...newParcel, destination: e.target.value, receiver_city: e.target.value })} />
            <button type="submit" className="btn btn-primary">Create Parcel</button>
          </form>
        </div>

        {/* Add checkpoint to selected parcel */}
        <div className="card">
          <h3>Add Status / Location Update</h3>
          {!selected ? (
            <p>Select a parcel from the list below to add an update.</p>
          ) : (
            <>
              <p><strong>{selected.tracking_id}</strong> — {selected.receiver_name || 'No receiver name'}</p>
              <form onSubmit={handleAddCheckpoint} className="admin-form">
                <select value={checkpoint.status}
                  onChange={(e) => setCheckpoint({ ...checkpoint, status: e.target.value })}>
                  {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input placeholder="Location (e.g. Hyderabad)" value={checkpoint.location}
                  onChange={(e) => setCheckpoint({ ...checkpoint, location: e.target.value })} />
                <input placeholder="Note (optional, e.g. Delayed due to weather)" value={checkpoint.note}
                  onChange={(e) => setCheckpoint({ ...checkpoint, note: e.target.value })} />
                <button type="submit" className="btn btn-primary">Add Update</button>
              </form>

              <h4 style={{ marginTop: '1.5rem' }}>Recent Checkpoints</h4>
              <ul className="admin-events">
                {events.map((ev) => (
                  <li key={ev.id}>
                    <strong>{ev.status}</strong>{ev.location ? ` — ${ev.location}` : ''}
                    <span> ({new Date(ev.event_time).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })})</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Parcel list */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>All Parcels</h3>
        <input
          placeholder="Search by tracking ID or receiver name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: '1rem', maxWidth: 360 }}
        />

        {loadingParcels ? (
          <p>Loading…</p>
        ) : filteredParcels.length === 0 ? (
          <p>No parcels yet. Create one above.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Route</th>
                <th>Receiver</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredParcels.map((p) => (
                <tr key={p.id} className={selected?.id === p.id ? 'row-selected' : ''}>
                  <td>{p.tracking_id}</td>
                  <td>{p.origin || '—'} → {p.destination || '—'}</td>
                  <td>{p.receiver_name || '—'}</td>
                  <td><span className="status-pill-sm">{p.current_status}</span></td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openParcel(p)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
