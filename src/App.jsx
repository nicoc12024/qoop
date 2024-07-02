import { useState, useEffect } from "react";
import SecondaryNav from "./SecondaryNav";
import Cube from "./Cube";
import Legal from "./Legal";
import MusicCard from "./MusicCard";
import Navbar from "./Navbar";
import FirstScreen from "./FirstScreen";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOutText, setFadeOutText] = useState(false);
  const [fadeOutComplete, setFadeOutComplete] = useState(false);
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

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="overflow-x-hidden relative h-screen">
      {loading && (
        <FirstScreen fadeOutText={fadeOutText} fadeOutComplete={fadeOutComplete} />
      )}
      {
        <div>
          <Cube
            className="z-30"
            isMotionClicked={isMotionClicked}
            isColorClicked={isColorClicked}
          />
          <div
            className={`z-10 fixed w-screen h-screen top-0 left-0 right-0 bottom-0 p-[24px] m-auto flex flex-col 
              justify-between gap-[24px] delay-1000 duration-1000 ease-in
              ${fadeOutComplete ? "opacity-100" : "opacity-0"}
            `}
          >
            {/* NAV TOP */}
            <div className="md:pt-4 text-white flex md:flex-row flex-col justify-between md:items-start gap-[24px]">
              <MusicCard />
              <Navbar
                isMotionClicked={isMotionClicked}
                setIsMotionClicked={setIsMotionClicked}
                isColorClicked={isColorClicked}
                setIsColorClicked={setIsColorClicked}
              />
            </div>

            {/* NAV BOTTOM */}
            <div className="pt-4 xl:pb-4 text-white flex md:flex-row flex-col justify-between md:items-end gap-[24px]">
              <SecondaryNav />
              <Legal />
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
