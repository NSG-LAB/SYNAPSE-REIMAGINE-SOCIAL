import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { SafeImage } from '../common/SafeImage';
import { Heart, Bookmark, Share2, Send } from 'lucide-react';

export function PostDetailModal() {
  const [commentText, setCommentText] = useState('');
  const { 
    activeModal, 
    closeModal, 
    posts, 
    toggleLike, 
    toggleSave, 
    votePoll, 
    addComment, 
    likedPostIds, 
    savedPostIds, 
    addToast 
  } = useApp();

  const isOpen = activeModal.type === 'postDetail';
  if (!isOpen || !activeModal.data) return null;

  const post = posts.find(p => p.id === activeModal.data.id) || activeModal.data;

  const isLiked = likedPostIds.includes(post.id);
  const isSaved = savedPostIds.includes(post.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard! 🔗', 'success');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={post.title} maxWidth="740px">
      <div>
        {/* Author Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <SafeImage
            src={post.author.avatar}
            alt={post.author.name}
            type="avatar"
            name={post.author.name}
            style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{post.author.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              @{post.author.handle} • {post.communityName} • <time>{post.timestamp}</time>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>
          {post.content}
        </p>

        {/* Large Media Image if exists */}
        {post.image && (
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.25rem', maxHeight: '450px' }}>
            <SafeImage
              src={post.image}
              alt={post.title}
              type="post"
              title={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Poll if exists */}
        {post.poll && (
          <div style={{ background: 'var(--color-bg-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 600 }}>Active Community Vote</span>
              <span>{post.poll.totalVotes} total responses</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {post.poll.options.map((opt) => {
                const percentage = post.poll.totalVotes > 0
                  ? Math.round((opt.votes / post.poll.totalVotes) * 100)
                  : 0;
                const hasVotedThis = post.poll.userVotedOptionId === opt.id;
                const hasVotedAny = Boolean(post.poll.userVotedOptionId);

                return (
                  <button
                    key={opt.id}
                    onClick={() => votePoll(post.id, opt.id)}
                    disabled={hasVotedAny}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: hasVotedThis ? '1px solid var(--color-primary)' : '1px solid var(--border-medium)',
                      background: 'var(--color-bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left'
                    }}
                  >
                    {hasVotedAny && (
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${percentage}%`,
                          backgroundColor: hasVotedThis ? 'var(--color-primary-light)' : 'rgba(255, 255, 255, 0.05)',
                          zIndex: 0
                        }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1, fontSize: '0.9rem', fontWeight: hasVotedThis ? 700 : 500 }}>
                      {opt.text}
                    </span>
                    {hasVotedAny && (
                      <span style={{ position: 'relative', zIndex: 1, fontSize: '0.85rem', fontWeight: 700, color: hasVotedThis ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                        {percentage}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
          <button
            onClick={() => toggleLike(post.id)}
            className="btn btn-ghost btn-sm"
            style={{ color: isLiked ? 'var(--color-accent-rose)' : 'inherit' }}
          >
            <Heart size={18} fill={isLiked ? 'var(--color-accent-rose)' : 'none'} />
            <span>{post.likesCount} Likes</span>
          </button>
          <button
            onClick={() => toggleSave(post.id)}
            className="btn btn-ghost btn-sm"
            style={{ color: isSaved ? 'var(--color-accent-amber)' : 'inherit' }}
          >
            <Bookmark size={18} fill={isSaved ? 'var(--color-accent-amber)' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button onClick={handleShare} className="btn btn-ghost btn-sm">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        {/* Discussion Thread */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            Discussion & Peer Insights ({post.comments?.length || 0})
          </h3>

          {/* New Reply Box */}
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.5rem', width: '100%', alignItems: 'center' }}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Contribute constructive feedback, solution, or follow-up question..."
              className="input-field"
              style={{ flex: 1, minWidth: 0, width: 'auto', margin: 0, fontSize: '16px' }}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
              <Send size={16} /> Reply
            </button>
          </form>

          {/* Existing comments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map(c => (
                <div
                  key={c.id}
                  style={{
                    background: 'var(--color-bg-elevated)',
                    padding: '1rem 1.15rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                    <SafeImage
                      src={c.author.avatar}
                      alt={c.author.name}
                      type="avatar"
                      name={c.author.name}
                      style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{c.author.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                        {c.timestamp}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text-secondary)', margin: 0 }}>
                    {c.content}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                No replies yet. Join the conversation first!
              </p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
