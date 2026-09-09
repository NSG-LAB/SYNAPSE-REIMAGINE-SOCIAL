import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Sparkles, Flame, Vote, CheckCircle2, HelpCircle, Plus, Trash2 } from 'lucide-react';

export function CreatePostModal() {
  const { activeModal, closeModal, createPost, communities } = useApp();
  const isOpen = activeModal.type === 'createPost';

  const [type, setType] = useState('spark');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [communityId, setCommunityId] = useState(communities[0]?.id || 'comm-1');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const postTypes = [
    { id: 'spark', label: 'Idea Spark', icon: Sparkles },
    { id: 'challenge', label: 'Challenge', icon: Flame },
    { id: 'poll', label: 'Community Poll', icon: Vote },
    { id: 'showcase', label: 'Showcase', icon: CheckCircle2 },
    { id: 'question', label: 'Inquiry', icon: HelpCircle }
  ];

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions(prev => [...prev, '']);
    }
  };

  const handlePollOptionChange = (index, value) => {
    setPollOptions(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleRemovePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const selectedComm = communities.find(c => c.id === communityId);

    const postData = {
      type,
      title: title.trim(),
      content: content.trim(),
      communityId,
      communityName: selectedComm ? selectedComm.name : 'Community Guild',
      image: imageUrl.trim() || null,
      tags: tagsInput
        ? tagsInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean)
        : ['Community', 'Spark'],
      poll: type === 'poll' ? {
        id: 'poll-' + Date.now(),
        totalVotes: 0,
        userVotedOptionId: null,
        options: pollOptions.filter(o => o.trim()).map((text, idx) => ({
          id: `opt-${Date.now()}-${idx}`,
          text: text.trim(),
          votes: 0
        }))
      } : null
    };

    createPost(postData);
    // Reset form
    setTitle('');
    setContent('');
    setImageUrl('');
    setTagsInput('');
    setPollOptions(['', '']);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Share a New Spark or Challenge">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Type Selector */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Choose Format
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 110px), 1fr))', gap: '0.5rem' }}>
            {postTypes.map((pt) => {
              const Icon = pt.icon;
              const isSelected = type === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setType(pt.id)}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.6rem 0.4rem',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Icon size={18} />
                  <span style={{ fontSize: '0.78rem' }}>{pt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guild Selection */}
        <div>
          <label htmlFor="post-guild" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Target Guild / Community Space
          </label>
          <select
            id="post-guild"
            value={communityId}
            onChange={(e) => setCommunityId(e.target.value)}
            className="input-field"
          >
            {communities.map((comm) => (
              <option key={comm.id} value={comm.id}>
                {comm.icon} {comm.name} ({comm.category})
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="post-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Title / Headline *
          </label>
          <input
            id="post-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What idea, thesis, or challenge are you putting forward?"
            className="input-field"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="post-content" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Description & Context *
          </label>
          <textarea
            id="post-content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Explain the background, give constructive details, or invite specific collaborators..."
            className="textarea-field"
          />
        </div>

        {/* Conditional Poll Options */}
        {type === 'poll' && (
          <div style={{ background: 'var(--color-bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.5rem' }}>
              Poll Voting Options
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {pollOptions.map((opt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    required
                    value={opt}
                    onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                    className="input-field"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                  {pollOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePollOption(idx)}
                      className="btn-icon"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <Trash2 size={14} color="var(--color-accent-rose)" />
                    </button>
                  )}
                </div>
              ))}
              {pollOptions.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddPollOption}
                  className="btn btn-ghost btn-sm"
                  style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}
                >
                  <Plus size={14} /> Add Option
                </button>
              )}
            </div>
          </div>
        )}

        {/* Image URL */}
        <div>
          <label htmlFor="post-image" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Cover / Demonstration Image URL (Optional)
          </label>
          <input
            id="post-image"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="input-field"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="post-tags" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Topic Tags (comma-separated)
          </label>
          <input
            id="post-tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. CreativeCoding, WebGPU, Solarpunk"
            className="input-field"
          />
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="button" onClick={closeModal} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Publish to Community ⚡
          </button>
        </div>
      </form>
    </Modal>
  );
}
