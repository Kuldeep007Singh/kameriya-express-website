import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import './Track.css'

const STAGES = ['Forwarded', 'In Transit', 'Out for Delivery', 'Delivered']

export default function Track() {
  const [searchParams] = useSearchParams()
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [parcel, setParcel] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const idFromUrl = searchParams.get('id')
    if (idFromUrl) {
      handleSearch(null, idFromUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSearch(e, presetId) {
    if (e) e.preventDefault()
    const id = (presetId ?? trackingId).trim().toUpperCase()
    if (!id) return

    setLoading(true)
    setError(null)
    setParcel(null)
    setEvents([])

    const { data: parcelData, error: parcelError } = await supabase
      .from('parcels')
      .select('*')
      .eq('tracking_id', id)
      .maybeSingle()

    if (parcelError) {
      setError('Something went wrong looking up that tracking ID. Please try again.')
      setLoading(false)
      return
    }

    if (!parcelData) {
      setError(`No parcel found for tracking ID "${id}". Double-check the ID and try again.`)
      setLoading(false)
      return
    }

    const { data: eventData } = await supabase
      .from('tracking_events')
      .select('*')
      .eq('parcel_id', parcelData.id)
      .order('event_time', { ascending: true })

    setParcel(parcelData)
    setEvents(eventData || [])
    setLoading(false)
  }

  const currentStageIndex = parcel ? STAGES.indexOf(parcel.current_status) : -1

  return (
    <div className="container section">
      <span className="eyebrow">Track Parcel</span>
      <h1>Where's my shipment?</h1>
      <p>Enter your tracking ID below to see its current status and full checkpoint history.</p>

      <form onSubmit={handleSearch} className="track-form">
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="e.g. KMY24081401"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching…' : 'Track'}
        </button>
      </form>

      {error && <p className="track-error">{error}</p>}

      {parcel && (
        <div className="card track-result">
          <div className="track-result-header">
            <div>
              <h3>{parcel.tracking_id}</h3>
              <p>
                {parcel.origin || '—'} → {parcel.destination || '—'}
              </p>
            </div>
            <span className="status-pill">{parcel.current_status}</span>
          </div>

          <div className="stage-tracker">
            {STAGES.map((stage, i) => (
              <div key={stage} className={`stage ${i <= currentStageIndex ? 'done' : ''}`}>
                <span className="stage-dot" />
                <span className="stage-label">{stage}</span>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: '2rem' }}>Checkpoint History</h4>
          {events.length === 0 ? (
            <p>No checkpoint updates logged yet.</p>
          ) : (
            <ul className="timeline">
              {events.map((ev) => (
                <li key={ev.id}>
                  <span className="timeline-status">{ev.status}</span>
                  {ev.location && <span className="timeline-location"> — {ev.location}</span>}
                  <span className="timeline-time">
                    {new Date(ev.event_time).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                  {ev.note && <p className="timeline-note">{ev.note}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
