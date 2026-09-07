import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

export function EditProfileModal() {
  const { activeModal, closeModal, userProfile, updateUserProfile } = useApp();
  const isOpen = activeModal.type === 'editProfile';

  const [name, setName] = useState(userProfile.name);
  const [handle, setHandle] = useState(userProfile.handle);
  const [role, setRole] = useState(userProfile.role);
  const [bio, setBio] = useState(userProfile.bio);
  const [location, setLocation] = useState(userProfile.location || '');
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [skillsOfferedInput, setSkillsOfferedInput] = useState(userProfile.skillsOffered?.join(', ') || '');
  const [skillsNeededInput, setSkillsNeededInput] = useState(userProfile.skillsNeeded?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim(),
      handle: handle.trim().replace(/^@/, ''),
      role: role.trim(),
      bio: bio.trim(),
      location: location.trim(),
      avatar: avatar.trim(),
      skillsOffered: skillsOfferedInput ? skillsOfferedInput.split(',').map(s => s.trim()).filter(Boolean) : [],
      skillsNeeded: skillsNeededInput ? skillsNeededInput.split(',').map(s => s.trim()).filter(Boolean) : []
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Edit Your Impact Profile">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Name & Handle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="edit-name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Full Name *
            </label>
            <input
              id="edit-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="edit-handle" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Handle (@) *
            </label>
            <input
              id="edit-handle"
              type="text"
              required
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Headline / Role */}
        <div>
          <label htmlFor="edit-role" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Primary Role / Craft Headline *
          </label>
          <input
            id="edit-role"
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="edit-bio" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Bio & Manifesto *
          </label>
          <textarea
            id="edit-bio"
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea-field"
            style={{ minHeight: '90px' }}
          />
        </div>

        {/* Location & Avatar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="edit-location" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Location / Timezone
            </label>
            <input
              id="edit-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="edit-avatar" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Avatar Image URL
            </label>
            <input
              id="edit-avatar"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Skills Offered */}
        <div>
          <label htmlFor="edit-skills-offered" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Skills You Can Offer (comma-separated)
          </label>
          <input
            id="edit-skills-offered"
            type="text"
            value={skillsOfferedInput}
            onChange={(e) => setSkillsOfferedInput(e.target.value)}
            placeholder="e.g. React & WebGL, Design Systems, Generative Sound"
            className="input-field"
          />
        </div>

        {/* Skills Needed */}
        <div>
          <label htmlFor="edit-skills-needed" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Skills You Are Seeking (comma-separated)
          </label>
          <input
            id="edit-skills-needed"
            type="text"
            value={skillsNeededInput}
            onChange={(e) => setSkillsNeededInput(e.target.value)}
            placeholder="e.g. Rust & WASM, Biomimicry Research, Shader Math"
            className="input-field"
          />
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="button" onClick={closeModal} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Profile Updates ✨
          </button>
        </div>
      </form>
    </Modal>
  );
}
