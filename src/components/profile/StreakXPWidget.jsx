import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Zap, Target, TrendingUp, Award, CheckCircle2, Circle } from 'lucide-react';

// Calculate level from XP (every 1000 XP = 1 level)
function getLevel(xp) {
  return Math.floor(xp / 1000) + 1;
}

function getXPInCurrentLevel(xp) {
  return xp % 1000;
}

function getLevelTitle(level) {
  if (level >= 10) return 'Legendary Architect';
  if (level >= 8) return 'Master Builder';
  if (level >= 6) return 'Senior Maker';
  if (level >= 4) return 'Active Creator';
  if (level >= 3) return 'Rising Spark';
  if (level >= 2) return 'Community Member';
  return 'Fresh Explorer';
}

function getLevelColor(level) {
  if (level >= 8) return '#f59e0b';
  if (level >= 6) return '#8b5cf6';
  if (level >= 4) return '#6366f1';
  if (level >= 2) return '#10b981';
  return '#64748b';
}

export function StreakXPWidget({ compact = false }) {
  const { streakData } = useApp();

  const level = useMemo(() => getLevel(streakData.xp), [streakData.xp]);
  const xpInLevel = useMemo(() => getXPInCurrentLevel(streakData.xp), [streakData.xp]);
  const progressPercent = (xpInLevel / 1000) * 100;
  const levelTitle = getLevelTitle(level);
  const levelColor = getLevelColor(level);

  const todayGoals = useMemo(() => [
    { id: 'post', label: 'Post a spark', done: streakData.todayActions.posted, xp: 50 },
    { id: 'comment', label: 'Comment on 2 posts', done: streakData.todayActions.commented >= 2, xp: 30 },
    { id: 'join', label: 'Join a guild or challenge', done: streakData.todayActions.joined, xp: 30 },
  ], [streakData.todayActions]);

  const completedGoals = todayGoals.filter(g => g.done).length;

  // Compact mode for sidebar
  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)',
          border: '1px solid rgba(249, 115, 22, 0.15)',
        }}
      >
        {/* Streak flame */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Flame size={20} color="#f97316" style={{ filter: 'drop-shadow(0 0 4px rgba(249, 115, 22, 0.5))' }} />
          <span style={{
            position: 'absolute',
            bottom: -4,
            fontSize: '0.6rem',
            fontWeight: 800,
            color: '#f97316',
            textShadow: '0 0 8px rgba(249, 115, 22, 0.4)',
          }}>
            {streakData.currentStreak}
          </span>
        </div>

        {/* XP Bar */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              Lv. {level}
            </span>
            <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>
              {xpInLevel}/1000 XP
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(100, 116, 139, 0.2)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              borderRadius: '2px',
              background: `linear-gradient(90deg, ${levelColor}, #8b5cf6)`,
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 0 8px ${levelColor}40`,
            }} />
          </div>
        </div>
      </div>
    );
  }

  // Full widget for profile
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--border-medium)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${levelColor}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={16} color={levelColor} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)' }}>
              Growth & Streak
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            background: `${levelColor}18`,
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            border: `1px solid ${levelColor}30`,
          }}>
            <Award size={12} color={levelColor} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: levelColor }}>{levelTitle}</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {/* Streak */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.15)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            textAlign: 'center',
          }}>
            <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '0.3rem' }}>
              <Flame size={28} color="#f97316" style={{ filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))' }} />
              {streakData.currentStreak > 0 && (
                <span style={{
                  position: 'absolute', top: -3, right: -8,
                  fontSize: '0.6rem', fontWeight: 800, color: '#fff',
                  background: '#ef4444', borderRadius: 'var(--radius-full)',
                  width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)',
                }}>
                  {streakData.currentStreak}
                </span>
              )}
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>{streakData.currentStreak}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Day Streak</div>
          </div>

          {/* Level */}
          <div style={{
            background: `linear-gradient(135deg, ${levelColor}12, ${levelColor}05)`,
            border: `1px solid ${levelColor}20`,
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '0.3rem' }}>
              <Zap size={28} color={levelColor} style={{ filter: `drop-shadow(0 0 8px ${levelColor}50)` }} />
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: levelColor }}>Lv.{level}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Level</div>
          </div>

          {/* Total XP */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '0.3rem' }}>
              <Target size={28} color="#8b5cf6" style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' }} />
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8b5cf6' }}>{streakData.xp.toLocaleString()}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total XP</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              Level {level} → Level {level + 1}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {xpInLevel} / 1,000 XP
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: 'rgba(100, 116, 139, 0.15)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              borderRadius: '4px',
              background: `linear-gradient(90deg, ${levelColor}, #8b5cf6, #6366f1)`,
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 0 12px ${levelColor}40`,
              position: 'relative',
            }}>
              {/* Shimmer effect */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                animation: 'shimmer 2s infinite',
              }} />
            </div>
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
            {1000 - xpInLevel} XP to next level • Best streak: {streakData.longestStreak} days
          </div>
        </div>

        {/* Today's Goals */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Target size={13} /> Today's Goals
            </span>
            <span style={{
              fontSize: '0.68rem', fontWeight: 700,
              color: completedGoals === todayGoals.length ? 'var(--color-accent-emerald)' : 'var(--color-text-muted)',
            }}>
              {completedGoals}/{todayGoals.length} done
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {todayGoals.map(goal => (
              <div
                key={goal.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: goal.done ? 'rgba(16, 185, 129, 0.06)' : 'var(--color-bg-elevated)',
                  border: `1px solid ${goal.done ? 'rgba(16, 185, 129, 0.15)' : 'var(--border-subtle)'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                {goal.done ? (
                  <CheckCircle2 size={15} color="var(--color-accent-emerald)" />
                ) : (
                  <Circle size={15} color="var(--color-text-muted)" />
                )}
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: goal.done ? 'var(--color-accent-emerald)' : 'var(--color-text-secondary)',
                  textDecoration: goal.done ? 'line-through' : 'none',
                  flex: 1,
                }}>
                  {goal.label}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: goal.done ? 'var(--color-accent-emerald)' : 'var(--color-text-muted)',
                  background: goal.done ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-bg-surface)',
                  padding: '0.15rem 0.4rem',
                  borderRadius: 'var(--radius-full)',
                }}>
                  +{goal.xp} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
