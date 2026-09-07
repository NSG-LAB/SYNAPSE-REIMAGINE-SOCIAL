import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { mockUsers } from '../../data/users';
import { MessageSquare, UserPlus, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// Simple seeded random for deterministic layouts
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Collect all unique skills from users
function getAllSkills(users) {
  const skills = new Set();
  users.forEach(u => {
    u.skillsOffered?.forEach(s => skills.add(s.toLowerCase()));
    u.skillsNeeded?.forEach(s => skills.add(s.toLowerCase()));
  });
  return [...skills];
}

// Check if two users have a skill match (one offers what the other needs)
function getSkillMatches(userA, userB) {
  const aOffersToB = (userA.skillsOffered || []).filter(s =>
    (userB.skillsNeeded || []).some(n => n.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(n.toLowerCase()))
  );
  const bOffersToA = (userB.skillsOffered || []).filter(s =>
    (userA.skillsNeeded || []).some(n => n.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(n.toLowerCase()))
  );
  return { aOffersToB, bOffersToA, total: aOffersToB.length + bOffersToA.length };
}

// Simple force-directed positioning
function computePositions(users, width, height) {
  const rng = seededRandom(42);
  const positions = users.map((u, i) => ({
    id: u.id,
    x: width * 0.15 + rng() * width * 0.7,
    y: height * 0.15 + rng() * height * 0.7,
  }));

  // Run simple force simulation for clustering
  const allSkills = getAllSkills(users);
  const skillVectors = users.map(u => {
    const vec = allSkills.map(s => {
      const offered = (u.skillsOffered || []).some(sk => sk.toLowerCase().includes(s));
      const needed = (u.skillsNeeded || []).some(sk => sk.toLowerCase().includes(s));
      return offered ? 1 : needed ? 0.5 : 0;
    });
    return vec;
  });

  // Iterate force simulation
  for (let iter = 0; iter < 80; iter++) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[j].x - positions[i].x;
        const dy = positions[j].y - positions[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Compute skill similarity
        let similarity = 0;
        for (let k = 0; k < skillVectors[i].length; k++) {
          similarity += skillVectors[i][k] * skillVectors[j][k];
        }
        const norm = Math.sqrt(skillVectors[i].reduce((a, b) => a + b * b, 0)) *
          Math.sqrt(skillVectors[j].reduce((a, b) => a + b * b, 0)) || 1;
        similarity /= norm;

        // Attraction for similar skills
        const attractForce = similarity * 0.8;
        // Repulsion to prevent overlap
        const repulsionForce = Math.min(2000 / (dist * dist), 3);

        const fx = (dx / dist) * (attractForce - repulsionForce) * 0.5;
        const fy = (dy / dist) * (attractForce - repulsionForce) * 0.5;

        positions[i].x += fx;
        positions[i].y += fy;
        positions[j].x -= fx;
        positions[j].y -= fy;
      }

      // Keep in bounds
      const padding = 60;
      positions[i].x = Math.max(padding, Math.min(width - padding, positions[i].x));
      positions[i].y = Math.max(padding, Math.min(height - padding, positions[i].y));
    }
  }

  return positions;
}

export function SkillConstellation() {
  const { userProfile, openModal, startConversationWithUser, followedUserIds, toggleFollowUser } = useApp();
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(rect.width, 320),
          height: Math.max(Math.min(rect.width * 0.65, 600), 350)
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const users = useMemo(() => mockUsers.filter(u => u.id !== userProfile.id), [userProfile.id]);

  const positions = useMemo(
    () => computePositions(users, dimensions.width, dimensions.height),
    [users, dimensions.width, dimensions.height]
  );

  // Compute connections (skill matches)
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const matches = getSkillMatches(users[i], users[j]);
        if (matches.total > 0) {
          conns.push({
            from: positions[i],
            to: positions[j],
            strength: Math.min(matches.total / 3, 1),
            fromUser: users[i],
            toUser: users[j],
            matches
          });
        }
      }
    }
    return conns;
  }, [users, positions]);

  // Current user's matches
  const currentUserMatches = useMemo(() => {
    return users.map((u, i) => {
      const matches = getSkillMatches(userProfile, u);
      return { user: u, position: positions[i], matches };
    }).filter(m => m.matches.total > 0);
  }, [userProfile, users, positions]);

  // Current user position (center)
  const currentPos = useMemo(() => ({
    x: dimensions.width / 2,
    y: dimensions.height / 2
  }), [dimensions]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.tagName !== 'circle' && e.target.tagName !== 'image') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const handleMouseMove = useCallback((e) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsPanning(true);
      setPanStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  }, [pan]);

  const handleTouchMove = useCallback((e) => {
    if (isPanning && e.touches.length === 1) {
      const touch = e.touches[0];
      setPan({ x: touch.clientX - panStart.x, y: touch.clientY - panStart.y });
    }
  }, [isPanning, panStart]);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedUser(null);
  }, []);

  const nodeRadius = 22;

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            {connections.length} skill connections · {users.length} makers
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))}
            className="btn btn-sm btn-secondary"
            style={{ padding: '0.3rem', borderRadius: 'var(--radius-sm)' }}
            title="Zoom in"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
            className="btn btn-sm btn-secondary"
            style={{ padding: '0.3rem', borderRadius: 'var(--radius-sm)' }}
            title="Zoom out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={resetView}
            className="btn btn-sm btn-secondary"
            style={{ padding: '0.3rem', borderRadius: 'var(--radius-sm)' }}
            title="Reset view"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-medium)',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.06) 0%, var(--color-bg-elevated) 70%)',
          cursor: isPanning ? 'grabbing' : 'grab',
          touchAction: 'none',
          position: 'relative'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        >
          <defs>
            {/* Glow filter */}
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Clip paths for avatars */}
            {users.map((u, i) => (
              <clipPath key={u.id} id={`clip-${u.id}`}>
                <circle cx={positions[i].x} cy={positions[i].y} r={nodeRadius - 2} />
              </clipPath>
            ))}
            <clipPath id="clip-current">
              <circle cx={currentPos.x} cy={currentPos.y} r={nodeRadius + 4} />
            </clipPath>
          </defs>

          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Background star particles */}
            {Array.from({ length: 40 }).map((_, i) => {
              const rng = seededRandom(i + 100);
              return (
                <circle
                  key={`star-${i}`}
                  cx={rng() * dimensions.width}
                  cy={rng() * dimensions.height}
                  r={rng() * 1.5 + 0.3}
                  fill="rgba(148, 163, 184, 0.25)"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.6;0.2"
                    dur={`${2 + rng() * 3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}

            {/* Connection lines between all matched users */}
            {connections.map((conn, i) => (
              <line
                key={`conn-${i}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke={`rgba(99, 102, 241, ${0.08 + conn.strength * 0.12})`}
                strokeWidth={0.5 + conn.strength}
                strokeDasharray={conn.strength > 0.5 ? 'none' : '3,4'}
              />
            ))}

            {/* Connection lines from current user to matches */}
            {currentUserMatches.map((match, i) => (
              <line
                key={`my-conn-${i}`}
                x1={currentPos.x}
                y1={currentPos.y}
                x2={match.position.x}
                y2={match.position.y}
                stroke="rgba(16, 185, 129, 0.35)"
                strokeWidth={1.5 + match.matches.total * 0.5}
                strokeDasharray="6,4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;20"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>
            ))}

            {/* User nodes */}
            {users.map((user, i) => {
              const pos = positions[i];
              const isHovered = hoveredUser === user.id;
              const isSelected = selectedUser === user.id;
              const isMatch = currentUserMatches.some(m => m.user.id === user.id);
              const isFollowed = followedUserIds.includes(user.id);
              const r = isHovered || isSelected ? nodeRadius + 4 : nodeRadius;

              return (
                <g key={user.id}>
                  {/* Pulse ring for matches */}
                  {isMatch && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={nodeRadius + 8}
                      fill="none"
                      stroke="rgba(16, 185, 129, 0.4)"
                      strokeWidth="1.5"
                    >
                      <animate
                        attributeName="r"
                        values={`${nodeRadius + 4};${nodeRadius + 14};${nodeRadius + 4}`}
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0;0.6"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Node border ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r + 2}
                    fill={isMatch ? 'rgba(16, 185, 129, 0.8)' : isFollowed ? 'rgba(99, 102, 241, 0.7)' : 'rgba(71, 85, 105, 0.5)'}
                    filter={isHovered || isSelected ? 'url(#node-glow)' : 'none'}
                    style={{ transition: 'r 0.2s ease' }}
                  />

                  {/* Avatar image */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r}
                    fill="var(--color-bg-elevated)"
                    style={{ cursor: 'pointer', transition: 'r 0.2s ease' }}
                    onMouseEnter={() => setHoveredUser(user.id)}
                    onMouseLeave={() => setHoveredUser(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(selectedUser === user.id ? null : user.id);
                    }}
                  />
                  <image
                    href={user.avatar}
                    x={pos.x - r}
                    y={pos.y - r}
                    width={r * 2}
                    height={r * 2}
                    clipPath={`circle(${r - 1}px at ${r}px ${r}px)`}
                    style={{ cursor: 'pointer', borderRadius: '50%', pointerEvents: 'none' }}
                    preserveAspectRatio="xMidYMid slice"
                  />
                  {/* Circular clip overlay */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredUser(user.id)}
                    onMouseLeave={() => setHoveredUser(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(selectedUser === user.id ? null : user.id);
                    }}
                  />

                  {/* Name label */}
                  <text
                    x={pos.x}
                    y={pos.y + r + 14}
                    textAnchor="middle"
                    fill="var(--color-text-secondary)"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="'Inter', sans-serif"
                    style={{ pointerEvents: 'none' }}
                  >
                    {user.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* Current user node (center, bigger) */}
            <g>
              <circle
                cx={currentPos.x}
                cy={currentPos.y}
                r={nodeRadius + 12}
                fill="none"
                stroke="rgba(99, 102, 241, 0.3)"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  values={`${nodeRadius + 8};${nodeRadius + 18};${nodeRadius + 8}`}
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={currentPos.x}
                cy={currentPos.y}
                r={nodeRadius + 8}
                fill="rgba(99, 102, 241, 0.8)"
                filter="url(#strong-glow)"
              />
              <circle
                cx={currentPos.x}
                cy={currentPos.y}
                r={nodeRadius + 6}
                fill="var(--color-bg-elevated)"
              />
              <image
                href={userProfile.avatar}
                x={currentPos.x - nodeRadius - 6}
                y={currentPos.y - nodeRadius - 6}
                width={(nodeRadius + 6) * 2}
                height={(nodeRadius + 6) * 2}
                clipPath="url(#clip-current)"
                preserveAspectRatio="xMidYMid slice"
              />
              <text
                x={currentPos.x}
                y={currentPos.y + nodeRadius + 22}
                textAnchor="middle"
                fill="var(--color-primary)"
                fontSize="11"
                fontWeight="800"
                fontFamily="'Inter', sans-serif"
              >
                You
              </text>
            </g>
          </g>
        </svg>

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: '10px', left: '10px',
          background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem',
          display: 'flex', gap: '0.85rem', fontSize: '0.68rem', color: 'var(--color-text-muted)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.8)' }} /> You
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.8)' }} /> Skill Match
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 20, height: 2, background: 'rgba(16, 185, 129, 0.5)', display: 'inline-block', borderBottom: '2px dashed rgba(16,185,129,0.5)' }} /> Connection
          </span>
        </div>
      </div>

      {/* Selected User Panel */}
      {selectedUser && (() => {
        const user = users.find(u => u.id === selectedUser);
        if (!user) return null;
        const matches = getSkillMatches(userProfile, user);
        const isFollowed = followedUserIds.includes(user.id);

        return (
          <div
            className="glass-panel"
            style={{
              marginTop: '1rem',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--border-medium)',
              animation: 'fadeInUp 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{user.role}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="btn-icon"
                style={{ width: 28, height: 28 }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Skill Match Display */}
            {matches.total > 0 && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '0.75rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-emerald)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  🤝 Skill Synergy Detected
                </div>
                {matches.aOffersToB.length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem' }}>
                    You can help with: <strong style={{ color: 'var(--color-text-primary)' }}>{matches.aOffersToB.join(', ')}</strong>
                  </div>
                )}
                {matches.bOffersToA.length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    They can help with: <strong style={{ color: 'var(--color-text-primary)' }}>{matches.bOffersToA.join(', ')}</strong>
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => openModal('profileDetail', user)}
                className="btn btn-sm btn-secondary"
                style={{ borderRadius: 'var(--radius-full)', flex: 1 }}
              >
                View Profile
              </button>
              <button
                onClick={() => toggleFollowUser(user.id)}
                className={`btn btn-sm ${isFollowed ? 'btn-secondary' : 'btn-primary'}`}
                style={{ borderRadius: 'var(--radius-full)', flex: 1 }}
              >
                <UserPlus size={13} />
                {isFollowed ? 'Connected' : 'Connect'}
              </button>
              <button
                onClick={() => startConversationWithUser(user)}
                className="btn btn-sm btn-ghost"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <MessageSquare size={13} />
              </button>
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
