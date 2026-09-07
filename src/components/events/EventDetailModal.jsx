import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Calendar, Clock, MapPin, Users, Zap, Check, Plus, CheckCircle2, Circle } from 'lucide-react';

export function EventDetailModal() {
  const { activeModal, closeModal, events, joinedEventIds, toggleJoinEvent, openModal } = useApp();
  const isOpen = activeModal.type === 'eventDetail';
  if (!isOpen || !activeModal.data) return null;

  const event = events.find(e => e.id === activeModal.data.id) || activeModal.data;
  const isJoined = joinedEventIds.includes(event.id);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={event.title} maxWidth="720px">
      <div>
        {/* Cover */}
        <div
          style={{
            height: '200px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '1.25rem',
            background: 'var(--color-bg-elevated)'
          }}
        >
          <img
            src={event.coverImage}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85))'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1.25rem',
              right: '1.25rem',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-indigo">{event.category}</span>
                <span className="badge badge-amber"><Zap size={12} /> +{event.rewardXP} XP Bounty</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800 }}>{event.title}</h3>
            </div>

            <button
              onClick={() => toggleJoinEvent(event.id)}
              className={`btn btn-sm ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {isJoined ? <><Check size={14} /> Joined</> : <><Plus size={14} /> Join Challenge</>}
            </button>
          </div>
        </div>

        {/* Event Schedule & Location Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            background: 'var(--color-bg-elevated)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--color-primary)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Timeline</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{event.date}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="var(--color-accent-amber)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Format</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{event.time}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={18} color="var(--color-accent-emerald)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Location</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{event.location}</div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Challenge Brief & Goal</h4>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            {event.description}
          </p>
        </div>

        {/* Stages Checklist */}
        {event.stages && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Sprint Milestones & Progression
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {event.stages.map((stage) => (
                <div
                  key={stage.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: stage.completed ? 'var(--color-primary-light)' : 'var(--color-bg-elevated)',
                    border: stage.completed ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {stage.completed ? (
                      <CheckCircle2 size={18} color="var(--color-primary)" />
                    ) : (
                      <Circle size={18} color="var(--color-text-muted)" />
                    )}
                    <span style={{ fontSize: '0.875rem', fontWeight: stage.completed ? 700 : 500 }}>
                      {stage.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    {stage.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizer info */}
        <div style={{ padding: '1rem', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{event.organizer.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Lead Organizer • @{event.organizer.handle}</div>
            </div>
          </div>

          <button
            onClick={() => {
              closeModal();
              openModal('profileDetail', event.organizer);
            }}
            className="btn btn-secondary btn-sm"
          >
            View Host Profile
          </button>
        </div>
      </div>
    </Modal>
  );
}
