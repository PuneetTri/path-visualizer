import React, { useEffect, useState } from "react";

type Props = {
  isLandingModalVisibile: boolean;
  setIsLandingModalVisibile: React.Dispatch<React.SetStateAction<boolean>>;
};

const LandingModal = ({
  isLandingModalVisibile,
  setIsLandingModalVisibile,
}: Props) => {
  const [currentPage, setCurrentPage] = useState<String>("landing");

  useEffect(() => console.log(currentPage), [currentPage]);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center ${
        isLandingModalVisibile ? "block" : "hidden"
      }`}
    >
      {/* Landing text */}

      <div
        className={`bg-white z-20 p-4 rounded-lg m-4 lg:w-1/2 text-center space-y-4 ${
          currentPage === "landing" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold">Hello, there! 👋</h1>
        <p className="text-sm font-bold">
          {`Thank you so much for checking out my path visualization project! It's
          a mini-project I worked on during my third year, and I drew a lot of
          inspiration from Clément Mihailescu. My passion for Data Structures and
          Algorithms (DSA) played a big role in creating this. In this project,
          I aimed to address some issues I noticed with Clément's website. I
          focused on optimizing the performance for PCs with lower specs and
          also ensured that the design is mobile-friendly. I hope you enjoy
          exploring and visualizing different paths!`}
        </p>

        <p className="text-sm">
          If you are familiar with this project, you can dive in by using Skip
          button or else I would recommend you take a short tour explaining the
          project.
        </p>

        <div>
          <button
            onClick={() => setIsLandingModalVisibile(false)}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-red-500"
          >
            Skip
          </button>

          <button
            onClick={() => setCurrentPage("page1")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-green-500"
          >
            Take a tour
          </button>
        </div>
      </div>

      {/* page 1 */}

      <div
        className={`bg-white z-20 p-4 rounded-lg m-4 lg:w-1/2 text-center space-y-4 ${
          currentPage === "page1" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold">Try different alogrithms</h1>
        <p className="text-sm">
          So, the title currently says "Breadth First Search," but guess what?
          It's not just about that. Give it a little click, and voilà! There's a
          dropdown menu with more algorithms to play around with. It's like a
          secret menu just for you! 🕵️‍♂️ Switch between those algorithms, compare
          them, and let the fun begin! Dive in and enjoy! 🎉
        </p>

        <div>
          <button
            onClick={() => setCurrentPage("landing")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-red-500"
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentPage("page2")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-green-500"
          >
            Next
          </button>
        </div>
      </div>

      {/* page 2 */}

      <div
        className={`bg-white z-20 p-4 rounded-lg m-4 lg:w-1/2 text-center space-y-4 ${
          currentPage === "page2" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold">Add some challenges</h1>
        <p>
          Now, you can throw some challenges into the mix by adding blocks to
          the grid. Watch as the algorithm navigates through, factoring in those
          tricky blocked paths, all while aiming for the shortest route. To add
          blocks, just click or tap on a grid cell. And guess what? You can
          spice things up even more by dragging your mouse to add multiple
          blocks at once. Mobile users, don't feel left out—you can do the same
          by swiping across the grid. Let the strategic blocking begin! 🔒✨
        </p>

        <div>
          <button
            onClick={() => setCurrentPage("page1")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-red-500"
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentPage("page3")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-green-500"
          >
            Next
          </button>
        </div>
      </div>

      {/* page 3 */}

      <div
        className={`bg-white z-20 p-4 rounded-lg m-4 lg:w-1/2 text-center space-y-4 ${
          currentPage === "page3" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold">Add maze in to the mix</h1>
        <p>
          No need to break a sweat! If adding blocks isn't your thing, we've got
          you covered. Hit the "Add Maze" button, and voila! The recursive
          division maze generation algorithm will automatically weave its magic,
          creating a challenging maze for you. Compete with different algorithms
          and see which one conquers the maze the fastest. Ready for the
          challenge? Click that "Add Maze" button and let the games begin! 🏁✨
        </p>

        <div>
          <button
            onClick={() => setCurrentPage("page2")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-red-500"
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentPage("page4")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-green-500"
          >
            Next
          </button>
        </div>
      </div>

      {/* page 4 */}

      <div
        className={`bg-white z-20 p-4 rounded-lg m-4 lg:w-1/2 text-center space-y-4 ${
          currentPage === "page4" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold">Dynamic grid size</h1>
        <p>
          Take control of the grid size! If you find the current grid a bit
          cramped, no worries. Use the slider to resize it according to your
          taste. Whether you want to go big or keep it cozy, the power is in
          your hands. Slide away and customize the grid size just the way you
          like it! 📏✨
        </p>

        <div>
          <button
            onClick={() => setCurrentPage("page3")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-red-500"
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentPage("page5")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-green-500"
          >
            Next
          </button>
        </div>
      </div>

      {/* page 5 */}

      <div
        className={`bg-white z-20 p-4 rounded-lg m-4 lg:w-1/2 text-center space-y-4 ${
          currentPage === "page5" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold">That's about it!</h1>
        <p>
          Explore the stats tucked neatly at the bottom of the grid. I crafted
          this tool to enhance my own understanding of the algorithms we're
          diving into during our curriculum. My goal is that this project serves
          as a helpful guide for you too, shedding light on how these algorithms
          work and making the learning experience more engaging. Dive in and
          enjoy the insights! 📊🚀
        </p>

        <div>
          <button
            onClick={() => setCurrentPage("page4")}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-red-500"
          >
            Previous
          </button>

          <button
            onClick={() => setIsLandingModalVisibile(false)}
            className="p-4 outline-none border-none rounded-lg text-white w-1/3 m-4 bg-green-500"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingModal;
