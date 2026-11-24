import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipForward, SkipBack, Music2, Disc,
  Library, ChevronUp, ChevronDown, X, Search,
  Heart, ExternalLink, Volume2, ListMusic
} from 'lucide-react';
import { DEFAULT_TRACK_ID, genres, musicLibrary } from '../data/musicData';
import { sound } from '../utils/sound';

/*
  SPOTIFY-STYLE MUSIC WIDGET
  ───────────────────────────
  1. Compact mini player bar: album art, track name, artist, play (Spotify embed)
  2. Expandable full library panel (Spotify-inspired dark UI)
  3. Genre filter pills: Chill, Hip Hop, Motivation, etc.
  4. Track list with hover play
  5. "Timeless" by The Weeknd as default
  6. Spotify embed iframe for actual playback
*/

function SpotifyEmbed({ trackId, compact = false }) {
  const height = compact ? 80 : 152;
  return (
    <div className="spotify-embed-wrapper w-full overflow-hidden rounded-xl">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '12px' }}
        title="Spotify Player"
      />
    </div>
  );
}

function TrackRow({ track, isActive, onPlay }) {
  return (
    <button
      onClick={() => onPlay(track)}
      className="w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-150 group text-left"
      style={{
        background: isActive ? 'var(--player-hover)' : 'transparent',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--player-hover)'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
    >
      {/* Cover art */}
      <div
        className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 shadow-md relative"
        style={{ background: 'var(--bg-raised)' }}
      >
        {track.cover ? (
          <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music2 className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
          </div>
        )}
        {/* Play overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          {isActive
            ? <Pause className="w-4 h-4 text-white fill-current" />
            : <Play className="w-4 h-4 text-white fill-current ml-0.5" />}
        </div>
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-semibold truncate"
          style={{ color: isActive ? 'var(--spotify-green)' : 'var(--accent)' }}
        >
          {track.title}
        </div>
        <div className="text-xs truncate" style={{ color: 'var(--player-text)' }}>
          {track.artist}
        </div>
      </div>

      {/* Duration */}
      <div className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--player-text)' }}>
        {track.duration}
      </div>

      {/* Like button */}
      <Heart
        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0"
        style={{ color: 'var(--player-text)' }}
      />
    </button>
  );
}

export default function MusicWidget() {
  const [currentTrack, setCurrentTrack] = useState(
    musicLibrary.find(t => t.isDefault) || musicLibrary[0]
  );
  const [expanded, setExpanded] = useState(false);
  const [activeGenre, setActiveGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredTracks = musicLibrary.filter(track => {
    const matchesGenre = activeGenre === 'all' || track.genre.includes(activeGenre);
    const matchesSearch = !searchQuery ||
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handlePlayTrack = (track) => {
    sound.playPop();
    setCurrentTrack(track);
  };

  const handleNext = () => {
    const idx = musicLibrary.findIndex(t => t.id === currentTrack.id);
    const next = musicLibrary[(idx + 1) % musicLibrary.length];
    sound.playPop();
    setCurrentTrack(next);
  };

  const handlePrev = () => {
    const idx = musicLibrary.findIndex(t => t.id === currentTrack.id);
    const prev = musicLibrary[(idx - 1 + musicLibrary.length) % musicLibrary.length];
    sound.playPop();
    setCurrentTrack(prev);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ═══════════ COMPACT MINI PLAYER ═══════════ */}
      <div
        className="rounded-2xl overflow-hidden shadow-xl transition-all duration-300"
        style={{
          background: 'var(--player-bg)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Top section: Current track info + expand toggle */}
        <div className="p-4 flex items-center gap-4">

          {/* Album art */}
          <div
            className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-lg cursor-pointer"
            style={{ background: 'var(--bg-raised)' }}
            onClick={() => { sound.playPop(); setExpanded(!expanded); }}
          >
            {currentTrack.cover ? (
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Disc className="w-8 h-8" style={{ color: 'var(--accent)' }} />
              </div>
            )}
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1" style={{ color: 'var(--spotify-green)' }}>
                <Music2 className="w-3 h-3" />
                NOW PLAYING
              </span>
            </div>
            <h4
              className="text-base font-bold tracking-tight mt-0.5 truncate cursor-pointer"
              style={{ color: 'var(--accent)' }}
              onClick={() => { sound.playPop(); setExpanded(!expanded); }}
            >
              {currentTrack.title}
            </h4>
            <p className="text-xs font-mono truncate" style={{ color: 'var(--player-text)' }}>
              {currentTrack.artist} • {currentTrack.album}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full transition-colors"
              style={{ color: 'var(--player-text)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--player-text)'; }}
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-full transition-colors"
              style={{ color: 'var(--player-text)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--player-text)'; }}
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Expand/Collapse & Library */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => { sound.playPop(); setExpanded(!expanded); }}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: expanded ? 'var(--player-hover)' : 'transparent',
                color: expanded ? 'var(--spotify-green)' : 'var(--player-text)',
              }}
              title={expanded ? 'Collapse library' : 'Open library'}
            >
              <ListMusic className="w-4 h-4" />
            </button>
            <button
              onClick={() => { sound.playPop(); setExpanded(!expanded); }}
              className="p-1 transition-colors"
              style={{ color: 'var(--player-text)' }}
            >
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Spotify Embed Player (compact) */}
        <div className="px-4 pb-3">
          <SpotifyEmbed trackId={currentTrack.id} compact />
        </div>

        {/* ═══════════ EXPANDED LIBRARY PANEL ═══════════ */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                className="px-4 pb-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {/* Library Header */}
                <div className="flex items-center justify-between pt-4 pb-3">
                  <div className="flex items-center gap-2">
                    <Library className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    <h5 className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
                      Music Library
                    </h5>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--player-hover)', color: 'var(--player-text)' }}>
                      {musicLibrary.length} tracks
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Search toggle */}
                    <button
                      onClick={() => setShowSearch(!showSearch)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{
                        background: showSearch ? 'var(--player-hover)' : 'transparent',
                        color: showSearch ? 'var(--accent)' : 'var(--player-text)',
                      }}
                    >
                      <Search className="w-4 h-4" />
                    </button>

                    {/* Spotify external link */}
                    <a
                      href="https://open.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: 'var(--spotify-green)' }}
                      title="Open Spotify"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Search bar */}
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-3"
                    >
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--player-text)' }} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          placeholder="Search tracks or artists..."
                          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                          style={{
                            background: 'var(--player-hover)',
                            color: 'var(--accent)',
                            border: '1px solid var(--border)',
                          }}
                          onFocus={e => { e.target.style.borderColor = 'var(--border-hover)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Genre filter pills */}
                <div className="flex flex-wrap gap-1.5 mb-3 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  {genres.map(genre => {
                    const isActive = activeGenre === genre.key;
                    return (
                      <button
                        key={genre.key}
                        onClick={() => { sound.playPop(); setActiveGenre(genre.key); }}
                        className="px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-150"
                        style={
                          isActive
                            ? { background: 'var(--accent)', color: 'var(--on-accent)' }
                            : { background: 'var(--player-hover)', color: 'var(--player-text)' }
                        }
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--player-text)'; }}
                      >
                        {genre.label}
                      </button>
                    );
                  })}
                </div>

                {/* Track list */}
                <div className="max-h-[280px] overflow-y-auto pr-1 space-y-0.5">
                  {/* Column headers */}
                  <div className="flex items-center gap-3 px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--player-text)' }}>
                    <div className="w-10 flex-shrink-0">#</div>
                    <div className="flex-1">Title</div>
                    <div className="flex-shrink-0 w-12 text-right">Time</div>
                  </div>

                  {filteredTracks.map((track, idx) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      isActive={currentTrack.id === track.id}
                      onPlay={handlePlayTrack}
                    />
                  ))}

                  {filteredTracks.length === 0 && (
                    <div className="py-8 text-center text-sm font-mono" style={{ color: 'var(--player-text)' }}>
                      No tracks match your search
                    </div>
                  )}
                </div>

                {/* Footer: Spotify branding */}
                <div
                  className="flex items-center justify-between pt-3 mt-3 text-[10px] font-mono"
                  style={{ borderTop: '1px solid var(--border)', color: 'var(--player-text)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ color: 'var(--spotify-green)' }}>
                      <path
                        fill="currentColor"
                        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
                      />
                    </svg>
                    <span>Powered by Spotify</span>
                  </div>
                  <span>Browse more on <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--spotify-green)' }}>open.spotify.com</a></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
