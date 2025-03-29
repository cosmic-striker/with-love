import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MessageCircleHeart, Camera, Music, Globe, Clock, Plus, Play, Trash2 } from 'lucide-react';
import YouTube from 'react-youtube';

interface Song {
  id: string;
  title: string;
  youtubeId: string;
}

function App() {
  const [daysTogethers, setDaysTogether] = useState(0);
  const [timeUntilNext, setTimeUntilNext] = useState('');
  const [songs, setSongs] = useState<Song[]>(() => {
    const savedSongs = localStorage.getItem('ourSongs');
    return savedSongs ? JSON.parse(savedSongs) : [];
  });
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongUrl, setNewSongUrl] = useState('');
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const startDate = new Date('2024-03-14');
  const nextMeeting = new Date('2024-04-14');

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysTogether(diffDays);
    };

    const updateCountdown = () => {
      const now = new Date();
      const difference = nextMeeting.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilNext(`${days}d ${hours}h ${minutes}m`);
    };

    calculateDays();
    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('ourSongs', JSON.stringify(songs));
  }, [songs]);

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const addSong = () => {
    const youtubeId = extractYouTubeId(newSongUrl);
    if (youtubeId && newSongTitle.trim()) {
      setSongs([...songs, {
        id: Date.now().toString(),
        title: newSongTitle.trim(),
        youtubeId
      }]);
      setNewSongTitle('');
      setNewSongUrl('');
    }
  };

  const deleteSong = (id: string) => {
    setSongs(songs.filter(song => song.id !== id));
    if (currentSong === id) {
      setCurrentSong(null);
    }
  };

  const memories = [
    {
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800",
      caption: "Our video call memories"
    },
    {
      image: "https://images.unsplash.com/photo-1627156863760-f49b81d8e9f4?auto=format&fit=crop&w=800",
      caption: "Letters we send"
    },
    {
      image: "https://images.unsplash.com/photo-1516589091380-5d8e21f43f43?auto=format&fit=crop&w=800",
      caption: "Our future together"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Falling Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute animate-fall text-pink-500/20 
              ${Math.random() > 0.5 ? 'animate-sway-left' : 'animate-sway-right'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center px-4 z-10">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold text-pink-100 mb-4">
            My Dearest 
          </h1>
          <p className="text-xl text-pink-200 mb-8">
            Distance means so little when someone means so much
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-pink-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-lg">{daysTogethers} Days Together</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              <span className="text-lg">Next Meeting in: {timeUntilNext}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Love Letter Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-pink-500/20">
          <MessageCircleHeart className="w-12 h-12 text-pink-500 mb-6" />
          <h2 className="text-3xl font-semibold mb-6 text-pink-100">My Love Letter to You</h2>
          <p className="text-gray-300 leading-relaxed">
            Though we may be separated by miles, my heart grows fonder with each passing day. 
            Every morning I wake up thinking of you, and every night I dream of the day we'll 
            be together again. The distance between us is just temporary, but my love for you 
            is eternal. I cherish every call, every message, and every moment we share, no 
            matter how far apart we are.
          </p>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Camera className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-3xl font-semibold text-pink-100">Our Beautiful Memories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-xl">
              <img
                src={memory.image}
                alt={memory.caption}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110 brightness-75"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                <p className="text-pink-100 text-lg">{memory.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Long Distance Features */}
      <div className="bg-gray-800/50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-3xl font-semibold mb-6 text-pink-100">Bridging the Distance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-pink-200">Our Time Zones</h3>
              <p className="text-gray-300">
                When it's morning here, I think of you starting your day.
                When it's night there, I send you sweet dreams across the miles.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-pink-200">Our Next Adventure</h3>
              <p className="text-gray-300">
                Planning our next meeting, counting down the days,
                dreaming of the moment we'll be together again.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Playlist Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Music className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h2 className="text-3xl font-semibold text-pink-100">Our Special Songs</h2>
          </div>

          {/* Add New Song Form */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Song Title"
                value={newSongTitle}
                onChange={(e) => setNewSongTitle(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="YouTube URL"
                value={newSongUrl}
                onChange={(e) => setNewSongUrl(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={addSong}
                className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Song
              </button>
            </div>
          </div>

          {/* Song List and Player */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Song List */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-pink-200">Our Playlist</h3>
              <div className="space-y-4">
                {songs.map((song) => (
                  <div key={song.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <span className="text-gray-200">{song.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentSong(song.id)}
                        className="text-pink-500 hover:text-pink-400 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteSong(song.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {songs.length === 0 && (
                  <p className="text-gray-400 text-center">Add your special songs to create your playlist</p>
                )}
              </div>
            </div>

            {/* YouTube Player */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-pink-200">Now Playing</h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                {currentSong ? (
                  <YouTube
                    videoId={songs.find(s => s.id === currentSong)?.youtubeId}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <p>Select a song to play</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50 py-8">
        <div className="text-center">
          <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
          <p className="text-pink-200">Made with love for you ❤️</p>
        </div>
      </footer>
    </div>
  );
}

export default App;