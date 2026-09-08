import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  CheckCircle2, 
  Send,
  Vote
} from 'lucide-react';

export function PostCard({ post }) {
  const { 
    toggleLike, 
    toggleSave, 
    votePoll, 
    addComment, 
    likedPostIds, 
    savedPostIds, 
    openModal, 
    addToast 
  } = useApp();

  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const isLiked = likedPostIds.includes(post.id);
  const isSaved = savedPostIds.includes(post.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
    setCommentsExpanded(true);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/post/${post.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      addToast('Discussion link copied to clipboard! 🔗', 'success');
    } else {
      addToast('Shared post link!', 'info');
    }
  };

  // Badge rendering based on post type
  const renderTypeBadge = () => {
    switch (post.type) {
      case 'challenge':
        return <span className="badge badge-rose"><Flame size={12} /> Challenge</span>;
      case 'poll':
        return <span className="badge badge-amber"><Vote size={12} /> Active Poll</span>;
      case 'showcase':
        return <span className="badge badge-cyan"><CheckCircle2 size={12} /> Proof of Work</span>;
      case 'question':
        return <span className="badge badge-indigo"><HelpCircle size={12} /> Peer Inquiry</span>;
      case 'spark':
      default:
        return <span className="badge badge-indigo"><Sparkles size={12} /> Idea Spark</span>;
    }
  };

  return (
    <article
      className="glass-panel post-card"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.35rem',
        marginBottom: '1.25rem',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--border-subtle)',
        transition: 'border-color var(--transition-normal), transform var(--transition-normal)'
      }}
    >
      {/* Header: Author + Meta */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => openModal('profileDetail', post.author)}
            style={{ padding: 0 }}
            aria-label={`View ${post.author.name}'s profile`}
          >
            <SafeImage
              src={post.author.avatar}
              alt={post.author.name}
              type="avatar"
              name={post.author.name}
              style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
            />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => openModal('profileDetail', post.author)}
                style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}
              >
                {post.author.name}
              </button>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                @{post.author.handle}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <span>in</span>
              <button
                onClick={() => openModal('communityDetail', { id: post.communityId, name: post.communityName })}
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
              >
                {post.communityName}
              </button>
              <span>•</span>
              <time>{post.timestamp}</time>
            </div>
          </div>
        </div>

        {/* Post Type Badge */}
        <div>{renderTypeBadge()}</div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          lineHeight: 1.35
        }}
      >
        <button
          type="button"
          onClick={() => openModal('postDetail', post)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            font: 'inherit',
            color: 'inherit',
            textAlign: 'left',
            cursor: 'pointer',
            width: '100%',
            display: 'block'
          }}
        >
          {post.title}
        </button>
      </h3>

      {/* Content */}
      <p
        style={{
          fontSize: '0.9375rem',
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          marginBottom: '0.85rem'
        }}
      >
        {post.content}
      </p>

      {/* Media Image */}
      {post.image && (
        <div
          style={{
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '1rem',
            maxHeight: '380px',
            background: 'var(--color-bg-base)'
          }}
        >
          <SafeImage
            src={post.image}
            alt={post.title}
            type="post"
            title={post.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Interactive Poll Widget */}
      {post.poll && (
        <div
          style={{
            background: 'var(--color-bg-elevated)',
            padding: '1.1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontWeight: 600 }}>Community Vote</span>
            <span>{post.poll.totalVotes} votes cast</span>
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
                    padding: '0.65rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    border: hasVotedThis ? '1px solid var(--color-primary)' : '1px solid var(--border-medium)',
                    background: 'var(--color-bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: hasVotedAny ? 'default' : 'pointer'
                  }}
                >
                  {/* Background Fill for percentage */}
                  {hasVotedAny && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${percentage}%`,
                        backgroundColor: hasVotedThis ? 'var(--color-primary-light)' : 'rgba(255, 255, 255, 0.05)',
                        transition: 'width 0.4s ease-out',
                        zIndex: 0
                      }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1, fontSize: '0.875rem', fontWeight: hasVotedThis ? 700 : 500 }}>
                    {opt.text}
                  </span>
                  {hasVotedAny && (
                    <span style={{ position: 'relative', zIndex: 1, fontSize: '0.8125rem', fontWeight: 700, color: hasVotedThis ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                      {percentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                background: 'var(--color-bg-elevated)',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Like */}
          <button
            onClick={() => toggleLike(post.id)}
            className="btn btn-ghost btn-sm"
            style={{ color: isLiked ? 'var(--color-accent-rose)' : 'var(--color-text-secondary)' }}
            aria-label={`${isLiked ? 'Unlike' : 'Like'} spark (${post.likesCount})`}
          >
            <Heart size={16} fill={isLiked ? 'var(--color-accent-rose)' : 'none'} />
            <span>{post.likesCount}</span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setCommentsExpanded(prev => !prev)}
            className="btn btn-ghost btn-sm"
            aria-expanded={commentsExpanded}
            aria-label={`View ${post.commentsCount || 0} discussion replies`}
          >
            <MessageSquare size={16} />
            <span>{post.commentsCount || 0}</span>
          </button>

          {/* Save */}
          <button
            onClick={() => toggleSave(post.id)}
            className="btn btn-ghost btn-sm"
            style={{ color: isSaved ? 'var(--color-accent-amber)' : 'var(--color-text-secondary)' }}
            aria-label={`${isSaved ? 'Remove bookmark' : 'Bookmark spark'}`}
          >
            <Bookmark size={16} fill={isSaved ? 'var(--color-accent-amber)' : 'none'} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="btn btn-ghost btn-sm"
            aria-label="Share discussion link"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Action button */}
        <button
          onClick={() => openModal('postDetail', post)}
          className="btn btn-secondary btn-sm"
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          Join Discussion
        </button>
      </div>

      {/* Expandable Comments Section */}
      {commentsExpanded && (
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Comment input */}
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', width: '100%', alignItems: 'center' }}>
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add your insight or question..."
              className="input-field"
              style={{ fontSize: '0.875rem', flex: 1, minWidth: 0, width: 'auto', margin: 0 }}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0, height: '38px', padding: '0 0.85rem' }}>
              <Send size={15} />
            </button>
          </form>

          {/* Comment list */}
          {post.comments && post.comments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {post.comments.map((comm) => (
                <div
                  key={comm.id}
                  style={{
                    display: 'flex',
                    gap: '0.65rem',
                    background: 'var(--color-bg-elevated)',
                    padding: '0.75rem 0.9rem',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <SafeImage
                    src={comm.author.avatar}
                    alt={comm.author.name}
                    type="avatar"
                    name={comm.author.name}
                    style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{comm.author.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{comm.timestamp}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      {comm.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textAlign: 'center', margin: '0.5rem 0' }}>
              No comments yet. Be the first to spark the conversation!
            </p>
          )}
        </div>
      )}
    </article>
  );
}
