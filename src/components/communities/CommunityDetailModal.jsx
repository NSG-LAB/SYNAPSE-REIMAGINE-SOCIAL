import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { SafeImage } from '../common/SafeImage';
import { PostCard } from '../feed/PostCard';
import { Check, Plus, Award, ShieldAlert, Sparkles, PlusCircle } from 'lucide-react';

export function CommunityDetailModal() {
  const { 
    activeModal, 
    closeModal, 
    communities, 
    joinedCommunityIds, 
    toggleJoinCommunity, 
    posts, 
    openModal 
  } = useApp();

  const isOpen = activeModal.type === 'communityDetail';
  if (!isOpen || !activeModal.data) return null;

  // Find full community object
  const community = communities.find(c => c.id === activeModal.data.id) || activeModal.data;
  const isJoined = joinedCommunityIds.includes(community.id);

  // Filter posts belonging to this community
  const communityPosts = posts.filter(p => p.communityId === community.id);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={community.name} maxWidth="780px">
      <div>
        {/* Cover Banner */}
        <div
          style={{
            height: '180px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '1.25rem',
            background: 'var(--color-bg-elevated)'
          }}
        >
          <SafeImage
            src={community.coverImage}
            alt={community.name}
            type="cover"
            title={community.name}
            category={community.category}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {community.icon || '🚀'}
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800 }}>{community.name}</h3>
                <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{community.category}</span>
              </div>
            </div>

            <button
              onClick={() => toggleJoinCommunity(community.id)}
              className={`btn btn-sm ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {isJoined ? <><Check size={14} /> Joined</> : <><Plus size={14} /> Join Guild</>}
            </button>
          </div>
        </div>

        {/* Guild Description & Tagline */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>Guild Manifesto</h3>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            {community.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {community.topics?.map(topic => (
              <span
                key={topic}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-bg-elevated)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>

        {/* Active Pinned Sprint */}
        {community.featuredChallenge && (
          <div
            className="glass-panel"
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--color-accent-amber)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-accent-amber)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <Award size={15} /> Active Guild Sprint
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: '2px' }}>
                {community.featuredChallenge}
              </div>
            </div>
            <button
              onClick={() => {
                closeModal();
                openModal('createPost');
              }}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <Sparkles size={14} /> Submit Solution
            </button>
          </div>
        )}

        {/* Community Rules */}
        {community.rules && (
          <div style={{ background: 'var(--color-bg-elevated)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              <ShieldAlert size={15} color="var(--color-primary)" />
              Guild Principles & Standards
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {community.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Community Discussions Stream */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Live Guild Discussions ({communityPosts.length})
            </h3>
            <button
              onClick={() => {
                closeModal();
                openModal('createPost');
              }}
              className="btn btn-secondary btn-sm"
            >
              <PlusCircle size={14} /> New Post
            </button>
          </div>

          {communityPosts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {communityPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0' }}>
              No discussions posted in this guild yet. Be the first to ignite a spark!
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
