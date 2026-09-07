import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { categories } from '../../data/topics';
import { Compass, Sparkles } from 'lucide-react';

export function CreateCommunityModal() {
  const { activeModal, closeModal, createCommunity } = useApp();
  const isOpen = activeModal.type === 'createCommunity';

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [icon, setIcon] = useState('🚀');
  const [featuredChallenge, setFeaturedChallenge] = useState('');
  const [topicsInput, setTopicsInput] = useState('');

  const emojiOptions = ['🚀', '✨', '🌿', '🎧', '🎨', '⚡', '📷', '📚', '🪐', '🧬', '☀️', '🛠️', '💡', '🕹️'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    createCommunity({
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      category,
      icon,
      featuredChallenge: featuredChallenge.trim() || 'Founding Community Sprint',
      topics: topicsInput ? topicsInput.split(',').map(t => t.trim()).filter(Boolean) : ['Guild', category]
    });

    setName('');
    setTagline('');
    setDescription('');
    setFeaturedChallenge('');
    setTopicsInput('');
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Launch a New Community Guild">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Guild Icon Picker */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Choose Guild Sigil / Icon
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {emojiOptions.map((em) => (
              <button
                key={em}
                type="button"
                onClick={() => setIcon(em)}
                className="btn-icon"
                style={{
                  fontSize: '1.25rem',
                  border: icon === em ? '2px solid var(--color-primary)' : '1px solid var(--border-medium)',
                  background: icon === em ? 'var(--color-primary-light)' : 'var(--color-bg-surface)'
                }}
              >
                {em}
              </button>
            ))}
          </div>
        </div>

        {/* Guild Name */}
        <div>
          <label htmlFor="comm-name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Guild Name *
          </label>
          <input
            id="comm-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Generative Soundscapes & Modular Synths"
            className="input-field"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="comm-category" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Primary Category
          </label>
          <select
            id="comm-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {categories.filter(c => c !== 'All').map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tagline */}
        <div>
          <label htmlFor="comm-tagline" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            One-line Catchphrase / Purpose
          </label>
          <input
            id="comm-tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Sculpting reactive audio for spatial environments"
            className="input-field"
          />
        </div>

        {/* Description / Manifesto */}
        <div>
          <label htmlFor="comm-desc" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Manifesto & Collaboration Guidelines *
          </label>
          <textarea
            id="comm-desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this guild stand for? What kind of builders belong here?"
            className="textarea-field"
          />
        </div>

        {/* First Sprint Challenge */}
        <div>
          <label htmlFor="comm-challenge" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Inaugural Sprint Challenge (Optional)
          </label>
          <input
            id="comm-challenge"
            type="text"
            value={featuredChallenge}
            onChange={(e) => setFeaturedChallenge(e.target.value)}
            placeholder="e.g. 48h Binaural Field Recording Remix"
            className="input-field"
          />
        </div>

        {/* Topics */}
        <div>
          <label htmlFor="comm-topics" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Topic Tags (comma-separated)
          </label>
          <input
            id="comm-topics"
            type="text"
            value={topicsInput}
            onChange={(e) => setTopicsInput(e.target.value)}
            placeholder="e.g. ModularSynths, SpatialAudio, MaxMSP"
            className="input-field"
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="button" onClick={closeModal} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Compass size={16} /> Establish Guild 🏰
          </button>
        </div>
      </form>
    </Modal>
  );
}
