// Real Spotify & Curated Music Data for 9CELL Portfolio
// Default Track: "Timeless (feat. Playboi Carti)" by The Weeknd (from Hurry Up Tomorrow)

export const DEFAULT_TRACK = {
  id: '1Es7AUAhQvapIcoh3qMKDL',
  spotifyId: '1Es7AUAhQvapIcoh3qMKDL',
  title: 'Timeless',
  artist: 'The Weeknd, Playboi Carti',
  album: 'Hurry Up Tomorrow',
  year: '2025',
  duration: '4:16',
  durationSeconds: 256,
  cover: 'https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5',
  lyricsPreview: "Sun is shinin', it's over...",
  previewUrl: null, // Spotify embed handles full audio
  isDefault: true,
  plays: '820,124,114'
};

export const HURRY_UP_TOMORROW_TRACKS = [
  {
    id: 'hut-1',
    spotifyId: '2LBqCSfJFBFSBJ3gHlJXZp',
    title: 'Wake Me Up (feat. Justice)',
    artist: 'The Weeknd, Justice',
    album: 'Hurry Up Tomorrow',
    duration: '5:08',
    plays: '116,284,955',
    cover: 'https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5',
  },
  {
    id: 'hut-2',
    spotifyId: '7gOdHgIoIKoe4i9Tta6qdD',
    title: 'Cry For Me',
    artist: 'The Weeknd',
    album: 'Hurry Up Tomorrow',
    duration: '3:44',
    plays: '474,898,256',
    cover: 'https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5',
  },
  {
    id: 'hut-3',
    spotifyId: '0VjIjW4GlUZAMYd2vXMi3b',
    title: "I Can't Fucking Sing",
    artist: 'The Weeknd',
    album: 'Hurry Up Tomorrow',
    duration: '0:12',
    plays: '70,668',
    cover: 'https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5',
  },
  {
    id: 'hut-4',
    spotifyId: '1Es7AUAhQvapIcoh3qMKDL',
    title: 'Timeless (feat. Playboi Carti)',
    artist: 'The Weeknd, Playboi Carti',
    album: 'Hurry Up Tomorrow',
    duration: '4:16',
    plays: '820,124,114',
    cover: 'https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5',
  },
  {
    id: 'hut-5',
    spotifyId: '3dPtXHP0oIGhPkiOmEhJYI',
    title: 'São Paulo (feat. Anitta)',
    artist: 'The Weeknd, Anitta',
    album: 'Hurry Up Tomorrow',
    duration: '5:01',
    plays: '520,380,102',
    cover: 'https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5',
  }
];

export const LIKED_SONGS_TRACKS = [
  {
    id: 'ls-1',
    spotifyId: '1Es7AUAhQvapIcoh3qMKDL',
    title: 'Timeless (feat. Playboi Carti)',
    artist: 'The Weeknd, Playboi Carti',
    album: 'Hurry Up Tomorrow',
    duration: '4:16',
    dateAdded: 'Today',
    cover: 'https://i.scdn.co/image/ab67616d0000b273a48397e17e63e3d85baebcd5',
  },
  {
    id: 'ls-2',
    spotifyId: '3rKRGxkMTciJmYblNigGCE',
    title: 'Last Last',
    artist: 'Burna Boy',
    album: 'Love, Damini',
    duration: '2:43',
    dateAdded: 'Oct 14, 2025',
    cover: 'https://i.scdn.co/image/ab67616d0000b2735ed85ae57c0bf04ee11a5b22',
  },
  {
    id: 'ls-3',
    spotifyId: '2LMkwUfqC6S6s6qDVlEuzV',
    title: 'Calm Down',
    artist: 'Rema',
    album: 'Rave & Roses Ultra',
    duration: '3:39',
    dateAdded: 'Sep 20, 2025',
    cover: 'https://i.scdn.co/image/ab67616d0000b273c06be7b03f96d0b3eaf1be47',
  },
  {
    id: 'ls-4',
    spotifyId: '7qiZfU4dY1lWllzX7mPBI3',
    title: 'Sleazy Flow (feat. Lil Baby)',
    artist: 'SleazyWorld Go, Lil Baby',
    album: 'Sleazy Flow Remix',
    duration: '2:41',
    dateAdded: 'Jul 12, 2025',
    cover: 'https://i.scdn.co/image/ab67616d0000b273768629f8bc5b89e3a7fbb1c3',
  },
  {
    id: 'ls-5',
    spotifyId: '1zi7xx7UVEFkmKfv06H8x0',
    title: 'Lucid Dreams',
    artist: 'Juice WRLD',
    album: 'Goodbye & Good Riddance',
    duration: '3:59',
    dateAdded: 'May 03, 2025',
    cover: 'https://i.scdn.co/image/ab67616d0000b273c17e7d2a9382be4aa03baf74',
  },
  {
    id: 'ls-6',
    spotifyId: '5gqhueRUFsdnOEozSrjan6',
    title: 'Deep Focus Coding Beats',
    artist: '9CELL Sessions',
    album: 'Coding Flow Vol. 1',
    duration: '3:20',
    dateAdded: 'Nov 19, 2026',
    cover: 'https://i.scdn.co/image/ab67616d0000b273df1849e09e49b18982ef7e88',
  }
];

export const PLAYLISTS = [
  { id: 'liked', name: 'Liked Songs', count: 591, icon: 'heart', isPin: true },
  { id: 'weeknd', name: 'Hurry Up Tomorrow', artist: 'The Weeknd', count: 22 },
  { id: 'afrobeats', name: 'Afro Beats 🔥', artist: 'Burna Boy, Rema, Wizkid', count: 74 },
  { id: 'coding', name: 'Coding Flow 💻', artist: 'Focus Instrumental', count: 42 },
  { id: 'juicewrld', name: '💖 JUICE WRLD', artist: 'Juice WRLD', count: 35 },
  { id: 'mood', name: 'Mood sings', artist: 'Gunna, Lil Baby', count: 88 }
];

export const GENRES = [
  'Chill', 'Hip Hop', 'Motivation', 'Pop', 'Rap', 'Beats', 'New Age', 'Emotional', 'Afro Beats'
];

// Live Music Search API (using iTunes Public Search API for instant worldwide song lookup with audio previews)
export async function searchLiveMusic(query) {
  if (!query || query.trim().length === 0) return [];
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=12`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((item) => ({
      id: `itunes-${item.trackId}`,
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName || 'Single',
      duration: formatMillis(item.trackTimeMillis),
      cover: item.artworkUrl100?.replace('100x100bb', '600x600bb') || item.artworkUrl100,
      previewUrl: item.previewUrl,
      spotifyId: null,
      externalUrl: item.trackViewUrl
    }));
  } catch (err) {
    console.error('Music search failed:', err);
    return [];
  }
}

function formatMillis(ms) {
  if (!ms) return '3:30';
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
