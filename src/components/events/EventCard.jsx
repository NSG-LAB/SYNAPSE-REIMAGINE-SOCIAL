import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { Calendar, MapPin, Users, Check, Plus, Zap } from 'lucide-react';

export function EventCard({ event }) {
  const { joinedEventIds, toggleJoinEvent, openModal } = useApp();
  const isJoined = joinedEventIds.includes(event.id);

  return (
    <div
      className="glass-panel event-card"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--border-subtle)',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
      }}
    >
      {/* Cover Image with Type and Bounty Badges */}
      <button
        type="button"
        aria-label={`View details for ${event.title}`}
        style={{
          height: '140px',
          width: '100%',
          position: 'relative',
          background: 'var(--color-bg-elevated)',
          overflow: 'hidden',
          cursor: 'pointer',
          border: 'none',
          padding: 0,
          display: 'block',
          textAlign: 'left'
        }}
        onClick={() => openModal('eventDetail', event)}
      >
        <SafeImage
          src={event.coverImage}
          alt={event.title}
          type="cover"
          title={event.title}
          category={event.category}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))'
          }}
        />

        {/* Category Pill */}
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(10, 13, 20, 0.8)',
            backdropFilter: 'blur(8px)',
            color: 'var(--color-text-primary)'
          }}
        >
          {event.category}
        </span>

        {/* XP Karma Bounty */}
        <span
          className="badge badge-amber"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontWeight: 800,
            background: 'rgba(245, 158, 11, 0.25)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Zap size={12} /> +{event.rewardXP} XP
        </span>

        {/* Date Bottom Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#ffffff',
            fontSize: '0.8rem',
            fontWeight: 600,
            textShadow: '0 1px 4px rgba(0,0,0,0.6)'
          }}
        >
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
      </button>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            lineHeight: 1.3
          }}
        >
          <button
            type="button"
            onClick={() => openModal('eventDetail', event)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              display: 'block'
            }}
          >
            {event.title}
          </button>
        </h3>

        {/* Meta Line: Location & Difficulty */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={13} /> {event.location}
          </span>
          <span>•</span>
          <span className="badge badge-indigo" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
            {event.difficulty}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
          {event.description}
        </p>

        {/* Organizer info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-elevated)' }}>
          <SafeImage
            src={event.organizer.avatar}
            alt={event.organizer.name}
            type="avatar"
            name={event.organizer.name}
            style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
          />
          <div style={{ fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Organized by </span>
            <span style={{ fontWeight: 600 }}>{event.organizer.name}</span>
          </div>
        </div>

        {/* Footer: Participants & Join Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            <Users size={15} />
            <span>{event.participantsCount} / {event.maxParticipants} builders</span>
          </div>

          <button
            onClick={() => toggleJoinEvent(event.id)}
            className={`btn btn-sm ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
            aria-label={`${isJoined ? 'Leave' : 'Join'} event ${event.title}`}
          >
            {isJoined ? (
              <>
                <Check size={14} color="var(--color-accent-emerald)" /> Joined
              </>
            ) : (
              <>
                <Plus size={14} /> Join Sprint
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
