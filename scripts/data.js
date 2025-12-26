/* Mock video data for LiteTube */
const MOCK_VIDEOS = [
  {
    id: 'bunny',
    title: 'Big Buck Bunny — 4K Nature Short Film',
    channel: 'Blender Foundation',
    views: 12803456,
    publishedAt: '2008-05-30T00:00:00Z',
    duration: '10:34',
    thumbUrl: 'https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'A short computer-animated comedy film by the Blender Institute. Licensed as Creative Commons Attribution.'
  },
  {
    id: 'sintel',
    title: 'Sintel — Open Movie by Blender',
    channel: 'Blender',
    views: 9034567,
    publishedAt: '2010-09-27T00:00:00Z',
    duration: '14:48',
    thumbUrl: 'https://i.ytimg.com/vi/eRsGyueVLvQ/hqdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'Sintel is an independently produced short film, initiated by the Blender Foundation.'
  },
  {
    id: 'elephants',
    title: 'Elephant Dream — First Open Movie',
    channel: 'Orange Open Movie',
    views: 3456789,
    publishedAt: '2006-03-24T00:00:00Z',
    duration: '10:54',
    thumbUrl: 'https://i.ytimg.com/vi/eMUTcDut8G4/hqdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'The first open movie, made entirely with open source graphics software such as Blender, GIMP, and Inkscape.'
  },
  {
    id: 'for_bigger_joyrides',
    title: 'For Bigger Joyrides — Google Glass',
    channel: 'Google',
    views: 2300456,
    publishedAt: '2013-04-01T00:00:00Z',
    duration: '00:15',
    thumbUrl: 'https://i.ytimg.com/vi/1La4QzGeaaQ/hqdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Short commercial clip.'
  },
  {
    id: 'flower',
    title: 'Beautiful Flowers Timelapse — 4K',
    channel: 'Nature Lab',
    views: 560234,
    publishedAt: '2020-07-12T00:00:00Z',
    duration: '05:05',
    thumbUrl: 'https://picsum.photos/seed/flowers/640/360',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Relaxing flowers timelapse in 4K.'
  },
  {
    id: 'city',
    title: 'City Drive — POV 60fps',
    channel: 'Urban Scenes',
    views: 1245034,
    publishedAt: '2021-11-08T00:00:00Z',
    duration: '08:22',
    thumbUrl: 'https://picsum.photos/seed/city/640/360',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Peaceful city drive with ambient soundtrack.'
  }
];

function formatViews(n){
  if(n>=1_000_000_000) return (n/1_000_000_000).toFixed(1).replace(/\.0$/,'')+'B views';
  if(n>=1_000_000) return (n/1_000_000).toFixed(1).replace(/\.0$/,'')+'M views';
  if(n>=1_000) return (n/1_000).toFixed(1).replace(/\.0$/,'')+'K views';
  return n + ' views';
}

function timeSince(iso){
  const s = Math.floor((Date.now()-new Date(iso).getTime())/1000);
  const y = Math.floor(s/31536000); if(y>0) return y+` year${y>1?'s':''} ago`;
  const mo = Math.floor(s/2592000); if(mo>0) return mo+` month${mo>1?'s':''} ago`;
  const d = Math.floor(s/86400); if(d>0) return d+` day${d>1?'s':''} ago`;
  const h = Math.floor(s/3600); if(h>0) return h+` hour${h>1?'s':''} ago`;
  const m = Math.floor(s/60); if(m>0) return m+` minute${m>1?'s':''} ago`;
  return 'just now';
}

function getVideoById(id){
  return MOCK_VIDEOS.find(v => v.id === id);
}

function getSuggestions(excludeId){
  return MOCK_VIDEOS.filter(v => v.id !== excludeId);
}
