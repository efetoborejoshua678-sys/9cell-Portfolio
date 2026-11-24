// Curated music library for the Spotify-style player
// Default track: "Timeless" by The Weeknd (feat. Playboi Carti)
// Users can browse this library and play any track via Spotify embed

export const DEFAULT_TRACK_ID = '1Es7AUAhQvapIcoh3qMKDL';

export const genres = [
  { label: 'All',         key: 'all' },
  { label: 'Chill',       key: 'chill' },
  { label: 'Hip Hop',     key: 'hiphop' },
  { label: 'Motivation',  key: 'motivation' },
  { label: 'Pop',         key: 'pop' },
  { label: 'Rap',         key: 'rap' },
  { label: 'R&B',         key: 'rnb' },
  { label: 'Afro Beats',  key: 'afro' },
  { label: 'Coding Flow', key: 'code' },
];

export const musicLibrary = [
  // ── DEFAULT / FEATURED ──
  {
    id: '1Es7AUAhQvapIcoh3qMKDL',
    title: 'Timeless',
    artist: 'The Weeknd, Playboi Carti',
    album: 'Hurry Up Tomorrow',
    duration: '4:16',
    genre: ['rnb', 'hiphop', 'pop'],
    isDefault: true,
    cover: 'https://i.scdn.co/image/ab67616d00004851a48397e17e63e3d85baebcd5',
  },
  // ── The Weeknd ──
  {
    id: '2LBqCSfJFBFSBJ3gHlJXZp',
    title: 'Wake Me Up (feat. Justice)',
    artist: 'The Weeknd, Justice',
    album: 'Hurry Up Tomorrow',
    duration: '5:08',
    genre: ['rnb', 'pop'],
    cover: 'https://i.scdn.co/image/ab67616d00004851a48397e17e63e3d85baebcd5',
  },
  {
    id: '7gOdHgIoIKoe4i9Tta6qdD',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    genre: ['pop', 'rnb'],
    cover: 'https://i.scdn.co/image/ab67616d00004851ef017e899c0547766997d874',
  },
  {
    id: '0VjIjW4GlUZAMYd2vXMi3b',
    title: 'Starboy (feat. Daft Punk)',
    artist: 'The Weeknd, Daft Punk',
    album: 'Starboy',
    duration: '3:50',
    genre: ['pop', 'rnb'],
    cover: 'https://i.scdn.co/image/ab67616d00004851a048415d3e49e37b0bde1f0f',
  },
  // ── Hip Hop / Rap ──
  {
    id: '3dPtXHP0oIGhPkiOmEhJYI',
    title: 'HUMBLE.',
    artist: 'Kendrick Lamar',
    album: 'DAMN.',
    duration: '2:57',
    genre: ['hiphop', 'rap'],
    cover: 'https://i.scdn.co/image/ab67616d00004851768629f8bc5b89e3a7fbb1c3',
  },
  {
    id: '1zi7xx7UVEFkmKfv06H8x0',
    title: 'One Dance',
    artist: 'Drake, Wizkid, Kyla',
    album: 'Views',
    duration: '2:54',
    genre: ['hiphop', 'afro', 'pop'],
    cover: 'https://i.scdn.co/image/ab67616d00004851c17e7d2a9382be4aa03baf74',
  },
  // ── Afro Beats ──
  {
    id: '3rKRGxkMTciJmYblNigGCE',
    title: 'Last Last',
    artist: 'Burna Boy',
    album: 'Love, Damini',
    duration: '2:43',
    genre: ['afro', 'pop'],
    cover: 'https://i.scdn.co/image/ab67616d000048515ed85ae57c0bf04ee11a5b22',
  },
  {
    id: '2LMkwUfqC6S6s6qDVlEuzV',
    title: 'Calm Down',
    artist: 'Rema, Selena Gomez',
    album: 'Rave & Roses Ultra',
    duration: '3:59',
    genre: ['afro', 'pop'],
    cover: 'https://i.scdn.co/image/ab67616d00004851c06be7b03f96d0b3eaf1be47',
  },
  // ── Motivation / Chill ──
  {
    id: '7qiZfU4dY1lWllzX7mPBI3',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    genre: ['pop', 'chill'],
    cover: 'https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96',
  },
  {
    id: '5HCyWlXZPP0y6Gqq8TgA20',
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    album: 'Blurryface',
    duration: '3:22',
    genre: ['motivation', 'pop'],
    cover: 'https://i.scdn.co/image/ab67616d000048510fdfb6629413e3c7cfe56fa6',
  },
  // ── Coding Flow ──
  {
    id: '5gqhueRUFsdnOEozSrjan6',
    title: 'Lofi Study',
    artist: 'ChilledCow',
    album: 'Lofi Beats',
    duration: '3:00',
    genre: ['code', 'chill'],
    cover: 'https://i.scdn.co/image/ab67616d00004851df1849e09e49b18982ef7e88',
  },
];
