import { useState, useEffect } from "react";
import SecondaryNav from "./SecondaryNav";
import Cube from "./Cube/Cube";
import Legal from "./Legal";
import MusicCard from "./MusicCard";
import Navbar from "./Navbar";
import FirstScreen from "./FirstScreen";

function App() {
  // State to manage the loading state of the page
  const [loading, setLoading] = useState(true);

  // State to manage the fade-out text effect on the loading screen
  const [fadeOutText, setFadeOutText] = useState(false);

  // State to manage the completion of the fade-out effect on the loading screen
  const [fadeOutComplete, setFadeOutComplete] = useState(false);

  // State to manage if the motion option has been clicked, saved in localStorage
  const [isMotionClicked, setIsMotionClicked] = useState(() => {
    const saved = localStorage.getItem("isMotionClicked");
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return false;
      }
    }
    return false;
  });

  // State to manage if the color option has been clicked, saved in localStorage
  const [isColorClicked, setIsColorClicked] = useState(() => {
    const saved = localStorage.getItem("isColorClicked");
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return false;
      }
    }
    return false;
  });

  // useEffect to handle the fade-out timers and loading screen
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOutText(true);
    }, 900);

    const timer2 = setTimeout(() => {
      setFadeOutComplete(true);
    }, 1200);

    const timer3 = setTimeout(() => {
      setLoading(false);
    }, 2200);

    // Clear timers when the component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="overflow-x-hidden relative h-screen">
      {/* First white loading screen before the Home Page */}
      {loading && (
        <FirstScreen fadeOutText={fadeOutText} fadeOutComplete={fadeOutComplete} />
      )}
      {/* Cube and background of the Home Page */}
      <Cube
        className="absolute top-0! left-0 right-0 bottom-0 z-20"
        isMotionClicked={isMotionClicked}
        isColorClicked={isColorClicked}
      />
      {/* Home Page */}
      <main
        className={`z-10 fixed w-screen h-screen top-0 left-0 right-0 bottom-0 p-[24px] m-auto flex flex-col 
              justify-between gap-[24px] delay-1000 duration-1000 ease-in
              ${fadeOutComplete ? "opacity-100" : "opacity-0"}
            `}
      >
        {/* Header */}
        <header className="md:pt-4 text-white flex md:flex-row flex-col justify-between md:items-start gap-[24px]">
          <MusicCard />
          <Navbar
            isMotionClicked={isMotionClicked}
            setIsMotionClicked={setIsMotionClicked}
            isColorClicked={isColorClicked}
            setIsColorClicked={setIsColorClicked}
          />
        </header>
        {/* Footer */}
        <footer className="pt-4 xl:pb-4 text-white flex md:flex-row flex-col justify-between md:items-end gap-[24px]">
          <SecondaryNav />
          <Legal />
        </footer>
      </main>
    </div>
  );
}

export default App;
