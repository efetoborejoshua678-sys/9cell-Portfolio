import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat,
  Volume2, VolumeX, Heart, Search, Library, Maximize2,
  Minimize2, ExternalLink, Music, Disc3, ChevronDown, Check,
  Clock3, Sparkles, X, ListMusic, Radio
} from 'lucide-react';
import {
  DEFAULT_TRACK,
  HURRY_UP_TOMORROW_TRACKS,
  LIKED_SONGS_TRACKS,
  PLAYLISTS,
  GENRES,
  searchLiveMusic
} from '../data/spotifyData';
import { sound } from '../utils/sound';

export default function SpotifyPlayer() {
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_TRACK);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(9); // 0:09 seconds
  const [duration, setDuration] = useState(256); // 4:16
  const [isLiked, setIsLiked] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // View state: 'player' (default embedded Spotify player), 'library' (1 for lib), 'current' (2 when click on current music show current music)
  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'library' | 'current'
  const [selectedPlaylist, setSelectedPlaylist] = useState('weeknd');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const audioRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Debounced live music search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchLiveMusic(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Audio playback simulator / preview player
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(progressTimerRef.current);
    }
    return () => clearInterval(progressTimerRef.current);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    sound.playPop();
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (currentTrack.previewUrl && audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleSelectTrack = (track) => {
    sound.playPop();
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);

    if (track.durationSeconds) {
      setDuration(track.durationSeconds);
    }

    if (track.previewUrl && audioRef.current) {
      audioRef.current.src = track.previewUrl;
      audioRef.current.play().catch(() => {});
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Tracks for the currently selected playlist
  const displayedTracks =
    selectedPlaylist === 'weeknd'
      ? HURRY_UP_TOMORROW_TRACKS
      : selectedPlaylist === 'liked'
      ? LIKED_SONGS_TRACKS
      : LIKED_SONGS_TRACKS;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-950 text-slate-100 transition-all duration-300">
      
      {/* Hidden audio element for preview stream */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      {/* Top Spotify Header Bar */}
      <div className="bg-[#121212] px-6 py-3.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1DB954] fill-current">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="font-bold text-white tracking-wider text-sm font-sans">Spotify</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">9CELL Verified Sound System</span>
        </div>

        {/* View Switcher Tabs matching user request: 1 for lib, 2 for current music */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900 border border-slate-800">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('player');
            }}
            className={`px-3 py-1 rounded-full text-xs font-sans font-semibold transition-colors ${
              activeTab === 'player'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Player
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('library');
            }}
            className={`px-3 py-1 rounded-full text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'library'
                ? 'bg-[#1DB954] text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="1. Browse Library & Playlists"
          >
            <Library className="w-3.5 h-3.5" />
            <span>1. Library</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('current');
            }}
            className={`px-3 py-1 rounded-full text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'current'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="2. Show Current Music (Full Art View)"
          >
            <Disc3 className="w-3.5 h-3.5" />
            <span>2. Current Music</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          VIEW 1: FULL SPOTIFY LIBRARY (Matching Screenshot 1 & 2)
          "1 for lib"
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'library' && (
        <div className="bg-[#121212] p-4 sm:p-6 min-h-[500px]">
          
          {/* Top Search Input */}
          <div className="mb-6 relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to play? (e.g. Timeless, Burna Boy, Rema)"
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#1DB954] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results if user searched */}
          {searchQuery.trim().length > 0 ? (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                <span>LIVE SEARCH RESULTS FOR "{searchQuery}"</span>
                {isSearching && <span className="text-[#1DB954] animate-pulse">Searching music API...</span>}
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {searchResults.map((song) => (
                    <div
                      key={song.id}
                      onClick={() => handleSelectTrack(song)}
                      className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-[#1DB954]/50 cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-md group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate group-hover:text-[#1DB954] transition-colors">
                          {song.title}
                        </div>
                        <div className="text-xs text-slate-400 truncate">{song.artist}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{song.album}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#1DB954] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !isSearching ? (
                <div className="text-center py-10 text-slate-500 font-mono text-xs">
                  No tracks found. Try searching for "The Weeknd", "Drake", "Burna Boy" or "Rema".
                </div>
              ) : null}
            </div>
          ) : (
            /* Desktop Layout: Left Playlists Sidebar + Center Album View (From Screenshot 1 & 2) */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Playlists Column */}
              <div className="md:col-span-4 bg-slate-900/60 rounded-2xl p-4 border border-slate-800/80">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Library className="w-4 h-4 text-[#1DB954]" />
                    <span>Your Library</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">572 / 574</span>
                </div>

                <div className="space-y-1.5">
                  {PLAYLISTS.map((pl) => {
                    const isSelected = selectedPlaylist === pl.id;
                    return (
                      <button
                        key={pl.id}
                        onClick={() => {
                          sound.playPop();
                          setSelectedPlaylist(pl.id);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                          isSelected
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-700 to-indigo-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                          {pl.id === 'liked' ? <Heart className="w-4 h-4 fill-current text-white" /> : <Music className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate">{pl.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Playlist • {pl.count} songs
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Tracks & Album Showcase (Screenshot 2: Hurry Up Tomorrow) */}
              <div className="md:col-span-8 flex flex-col justify-between">
                
                {/* Album Header Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4a2a1a] to-slate-900/90 border border-amber-900/30 flex flex-col sm:flex-row items-center sm:items-end gap-5 mb-5 shadow-xl">
                  <img
                    src="https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5"
                    alt="The Weeknd Hurry Up Tomorrow"
                    className="w-32 h-32 rounded-xl object-cover shadow-2xl flex-shrink-0"
                  />
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                      ALBUM SPOTLIGHT
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-white mt-1">
                      Hurry Up Tomorrow
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 font-mono">
                      The Weeknd • 2025 • 22 songs, 1 hr 24 min
                    </p>
                    <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
                      <button
                        onClick={() => handleSelectTrack(DEFAULT_TRACK)}
                        className="px-5 py-2 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                        <span>Play Timeless</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Genre Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 scrollbar-none text-xs">
                  {GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        sound.playPop();
                        setSelectedGenre(genre);
                      }}
                      className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-mono transition-colors ${
                        selectedGenre === genre
                          ? 'bg-white text-black font-semibold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>

                {/* Tracklist Table */}
                <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="grid grid-cols-12 px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 border-b border-slate-800">
                    <div className="col-span-1">#</div>
                    <div className="col-span-7">Title</div>
                    <div className="col-span-2 hidden sm:block">Plays</div>
                    <div className="col-span-2 text-right">Time</div>
                  </div>

                  <div className="divide-y divide-slate-800/40">
                    {displayedTracks.map((trk, i) => {
                      const isCurrent = currentTrack.title === trk.title;
                      return (
                        <div
                          key={trk.id}
                          onClick={() => handleSelectTrack(trk)}
                          className={`grid grid-cols-12 px-4 py-3 items-center text-xs cursor-pointer transition-colors group ${
                            isCurrent
                              ? 'bg-slate-800/80 text-[#1DB954]'
                              : 'text-slate-300 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="col-span-1 font-mono text-slate-500 group-hover:text-white">
                            {isCurrent && isPlaying ? (
                              <div className="w-3.5 h-3.5 flex items-end gap-0.5">
                                <span className="w-1 h-3 bg-[#1DB954] animate-pulse" />
                                <span className="w-1 h-2 bg-[#1DB954] animate-pulse" />
                              </div>
                            ) : (
                              <span>{i + 1}</span>
                            )}
                          </div>
                          <div className="col-span-7 flex items-center gap-3 min-w-0 pr-2">
                            <img
                              src={trk.cover}
                              alt={trk.title}
                              className="w-8 h-8 rounded object-cover flex-shrink-0"
                            />
                            <div className="truncate">
                              <div className={`font-semibold truncate ${isCurrent ? 'text-[#1DB954]' : 'text-white'}`}>
                                {trk.title}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono truncate">
                                {trk.artist}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 hidden sm:block text-[11px] font-mono text-slate-500">
                            {trk.plays || '—'}
                          </div>
                          <div className="col-span-2 text-right font-mono text-slate-400">
                            {trk.duration}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW 2: FULL "CURRENT MUSIC" VIEW (Matching Screenshot 3!)
          "2 when click on current music show current music"
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'current' && (
        <div className="relative min-h-[520px] bg-gradient-to-b from-[#3a1d0f] via-[#24130a] to-[#120a05] p-6 sm:p-10 flex flex-col justify-between items-center text-center">
          
          {/* Top Bar with Return Button */}
          <div className="w-full flex items-center justify-between z-10">
            <span className="text-xs font-mono tracking-widest uppercase text-amber-400/80 font-bold">
              NOW PLAYING // IMMERSIVE VIEW
            </span>
            <button
              onClick={() => {
                sound.playPop();
                setActiveTab('player');
              }}
              className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Back to Compact</span>
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Centered Large Album Art matching screenshot 3 (The Weeknd Face) */}
          <div className="relative my-6 max-w-sm w-full aspect-square rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-amber-900/40 group">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {isPlaying && (
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#1DB954] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
                <span>STREAMING</span>
              </div>
            )}
          </div>

          {/* Track Details & Music Video Tag (Directly from Screenshot 3) */}
          <div className="w-full max-w-md text-left z-10 bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/5">
            <h3 className="text-2xl font-display font-black text-white tracking-tight">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-1 flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">E</span>
              <span>Music video • {currentTrack.artist}</span>
            </p>
            {currentTrack.lyricsPreview && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800/30 text-xs text-amber-200/90 font-mono">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block mb-1">LYRICS PREVIEW</span>
                "{currentTrack.lyricsPreview}"
              </div>
            )}
          </div>

          {/* Spotify Direct Web Player link */}
          <div className="mt-4 z-10 flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>Official Stream:</span>
            <a
              href={`https://open.spotify.com/track/${currentTrack.spotifyId || '1Es7AUAhQvapIcoh3qMKDL'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DB954] hover:underline flex items-center gap-1"
            >
              <span>Open in Spotify App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW 3: DEFAULT EMBEDDED SPOTIFY PLAYER VIEW
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'player' && (
        <div className="bg-[#121212] p-5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Cover Art & Track info */}
            <div
              className="lg:col-span-5 flex items-center gap-4 cursor-pointer group"
              onClick={() => {
                sound.playPop();
                setActiveTab('current');
              }}
              title="Click to view full current music art"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 border border-slate-700">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/30 text-[10px] font-mono text-[#1DB954]">
                  <Disc3 className="w-3 h-3 animate-spin" />
                  <span>DEFAULT TRACK</span>
                </span>
                <h4 className="text-lg sm:text-xl font-display font-extrabold text-white mt-1 truncate group-hover:text-[#1DB954] transition-colors">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono truncate">
                  {currentTrack.artist}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500 font-mono">
                  <span>Click art to open large view</span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">{currentTrack.album}</span>
                </div>
              </div>
            </div>

            {/* Right: Real Official Spotify Embed Iframe (Plays full song on desktop/mobile!) */}
            <div className="lg:col-span-7 w-full overflow-hidden rounded-2xl border border-slate-800 shadow-xl bg-slate-900">
              <iframe
                src={`https://open.spotify.com/embed/track/${currentTrack.spotifyId || '1Es7AUAhQvapIcoh3qMKDL'}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Live Player"
                className="w-full"
              />
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM PERSISTENT SPOTIFY PLAYBACK BAR (Direct from screenshot 1 & 2)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#181818] px-4 sm:px-6 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Track Info & Heart (Screenshot 1: "Sleazy Flow / Timeless") */}
        <div
          className="flex items-center gap-3 w-full sm:w-1/4 cursor-pointer"
          onClick={() => {
            sound.playPop();
            setActiveTab('current');
          }}
          title="Click to show current music view"
        >
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-white truncate hover:underline">
              {currentTrack.title}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {currentTrack.artist}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playPop();
              setIsLiked(!isLiked);
            }}
            className="text-slate-400 hover:text-white"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-[#1DB954] fill-current' : ''}`} />
          </button>
        </div>

        {/* Center: Controls & Progress Scrubber */}
        <div className="w-full sm:w-2/4 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-1">
            <button
              onClick={() => sound.playPop()}
              className="text-slate-400 hover:text-white transition-colors"
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playPop();
                handleSelectTrack(HURRY_UP_TOMORROW_TRACKS[0]);
              }}
              className="text-slate-400 hover:text-white transition-colors"
              title="Previous"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 shadow-md transition-all"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button
              onClick={() => {
                sound.playPop();
                handleSelectTrack(LIKED_SONGS_TRACKS[1]);
              }}
              className="text-slate-400 hover:text-white transition-colors"
              title="Next"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => sound.playPop()}
              className="text-slate-400 hover:text-white transition-colors"
              title="Repeat"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Seek Bar */}
          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>{formatTime(progress)}</span>
            <div
              className="flex-1 h-1 bg-slate-700/80 rounded-full cursor-pointer relative group overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                setProgress(Math.floor(ratio * duration));
              }}
            >
              <div
                className="h-full bg-white group-hover:bg-[#1DB954] transition-all"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Quick Action Buttons (1 for Lib, 2 for Current Music) */}
        <div className="w-full sm:w-1/4 flex items-center justify-end gap-3 text-xs">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('library');
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[11px] flex items-center gap-1 transition-colors"
            title="Browse full music library & search API"
          >
            <Library className="w-3.5 h-3.5 text-[#1DB954]" />
            <span>Lib</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('current');
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[11px] flex items-center gap-1 transition-colors"
            title="Open current music artwork view"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Now</span>
          </button>

          {/* Volume */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <button onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-slate-300 hover:bg-[#1DB954]"
                style={{ width: isMuted ? '0%' : `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
