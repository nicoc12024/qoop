import { useState, useRef, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

const fetchTracks = async () => {
  // Simulate a delay in the API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
          title: "Chords of Life",
          artist: "Madza",
        },
        {
          url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
          title: "Late Night Drive",
          artist: "Madza",
        },
        {
          url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
          title: "Persistence",
          artist: "Madza",
        },
      ]);
    }, 4000); // Retraso de 4 segundos
  });
};

const MusicCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialPlay, setIsInitialPlay] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    // Llamada a la API simulada
    const getTracks = async () => {
      const fetchedTracks = await fetchTracks();
      const randomTrack = fetchedTracks[Math.floor(Math.random() * fetchedTracks.length)];
      setCurrentTrack(randomTrack);
      audioRef.current.src = randomTrack.url;
      setIsLoading(false);
    };

    getTracks();
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFirstPlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
    setIsInitialPlay(false);
  };

  return (
    <div className="min-w-[290px] flex items-center justify-between border rounded-full border-black bg-transparent">
      <div className="cursor-pointer rounded-l-full w-full hover:bg-[#FFFEFF] ease-in transition-all pl-5 flex h-[56px] items-center justify-between border-black bg-transparent">
        {/* Loading Spinner */}
        {isLoading ? (
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        ) : (
          <>
            {/* First Play */}
            {isInitialPlay && currentTrack && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="flex items-center"
                  onClick={handleFirstPlay}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5V19L19 12L8 5Z" fill="black" />
                  </svg>
                </button>
                <div className="mx-3 h-[24px]">
                  <p className="text-black font-bold text-[11px] leading-3 font-pilat">
                    {isLogoHovered ? "Full playlist on Tidal" : " Block Vibes"}
                  </p>
                  <p className="text-black font-pilat text-[10px] leading-3">
                    Curated by JAY-Z
                  </p>
                </div>
              </div>
            )}

            {/* Logo listening */}
            {isPlaying && currentTrack && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="flex items-center"
                  onClick={handlePlayPause}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9"></path>
                  </svg>
                </button>
                <div className="mx-3 h-[24px]">
                  <p className="text-black font-bold text-[11px] leading-3 font-pilat">
                    {isLogoHovered ? "Full playlist on Tidal" : currentTrack.title}
                  </p>
                  <p className="text-black font-pilat text-[10px] leading-3">
                    Curated by {currentTrack.artist}
                  </p>
                </div>
              </div>
            )}

            {/* Logo no listening */}
            {!isPlaying && !isInitialPlay && currentTrack && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="flex items-center"
                  onClick={handlePlayPause}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M12 4c3.87 0 7 3.13 7 7v2h-2.92L21 17.92V11a9 9 0 0 0-9-9c-1.95 0-3.76.62-5.23 1.68l1.44 1.44A6.9 6.9 0 0 1 12 4M2.27 1.72 1 3l3.33 3.32A8.9 8.9 0 0 0 3 11v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-1.17.29-2.26.79-3.22L15 17v4h3c.3 0 .59-.06.86-.14L21 23l1.27-1.27z"></path>
                  </svg>
                </button>
                <div className="mx-3 h-[24px]">
                  <p className="text-black font-bold text-[11px] leading-3 font-pilat">
                    {isLogoHovered ? "Full playlist on Tidal" : currentTrack.title}
                  </p>
                  <p className="text-black font-pilat text-[10px] leading-3">
                    Curated by {currentTrack.artist}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* LOGO: to Music Website */}
      <div
        className="cursor-pointer rounded-r-full hover:bg-[#FFFEFF] ease-in transition-all flex items-center pr-5 pl-4 py-[16px] border-l border-black"
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M4 4 0 8l4 4 4-4 4 4-4 4 4 4 4-4-4-4 4-4 4 4 4-4-4-4-4 4-4-4-4 4z"></path>
        </svg>
      </div>
    </div>
  );
};

export default MusicCard;
