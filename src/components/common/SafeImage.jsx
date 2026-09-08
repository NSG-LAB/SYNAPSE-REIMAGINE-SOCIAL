import React, { useState } from 'react';
import { getAvatarFallback, getCoverFallback, getPostFallback } from '../../utils/imageFallback';

/**
 * SafeImage provides a resilient image element that automatically falls back to an
 * offline SVG data URI when external sources (such as images.unsplash.com) fail to load,
 * hit rate limits, or encounter offline/spotty connections.
 */
export function SafeImage({
  src,
  alt = '',
  type = 'cover', // 'avatar' | 'cover' | 'post'
  name = '',
  title = '',
  category = '',
  fallbackSrc = null,
  style = {},
  className = '',
  loading = 'lazy',
  ...props
}) {
  const [failedSrc, setFailedSrc] = useState(null);

  const isFailed = !src || failedSrc === src;

  const getComputedFallback = () => {
    if (fallbackSrc) return fallbackSrc;
    if (type === 'avatar') {
      return getAvatarFallback(name || alt || 'Maker');
    }
    if (type === 'post') {
      return getPostFallback(title || alt || 'Spark');
    }
    return getCoverFallback(title || alt || 'Guild', category);
  };

  const handleError = (e) => {
    if (src) {
      setFailedSrc(src);
    }
    if (props.onError) {
      props.onError(e);
    }
  };

  return (
    <img
      src={isFailed ? getComputedFallback() : src}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={className}
      style={style}
      {...props}
    />
  );
}
