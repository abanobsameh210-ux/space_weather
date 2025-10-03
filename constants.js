export const GameScene = {
  StartMenu: 'StartMenu',
  LevelSelect: 'LevelSelect',
  Story: 'Story',
  Travel: 'Travel',
  EarthArrival: 'EarthArrival',
  Quiz: 'Quiz',
  DeployResources: 'DeployResources',
  Defend: 'Defend',
  Aftermath: 'Aftermath',
  Loss: 'Loss',
  Victory: 'Victory',
};

// --- LEVEL 1: THE SOLAR FLARE ---

export const LEVEL_1_STORY = [
    { character: 'Narrator', text: "Deep within the sun's fiery heart, a massive tangle of magnetic energy is building...", effect: 'shake' },
    { character: 'Narrator', text: "Suddenly, it snaps! A brilliant flash of light and energy erupts from the surface.", effect: 'boom' },
    { character: 'Flavo', text: "I'm Flavo! A solar flare, born of light and speed! I'm racing towards Earth at nearly the speed of light!", effect: 'speak' },
    { character: 'Narrator', text: "Flavo is incredibly fast, arriving at Earth in just minutes.", effect: 'travel' },
    { character: 'Flavo', text: "My intense X-rays and radiation can disrupt radio signals and mess with satellites!", effect: 'glitch' },
    { character: 'Narrator', text: "If we don't prepare, our communication systems could be knocked out.", effect: 'info' },
    { character: 'Narrator', text: "Earth's defenses must be ready for this swift and powerful electromagnetic storm.", effect: 'earth' },
];

export const LEVEL_1_QUIZ = [
    {
        question: "How quickly does a solar flare reach Earth?",
        answers: ["At the speed of light", "Takes a few days"],
        correctAnswerIndex: 0,
        resource: "Light-Speed Detectors"
    },
    {
        question: "What is the main danger from a solar flare's radiation?",
        answers: ["Causing earthquakes", "Disrupting communications"],
        correctAnswerIndex: 1,
        resource: "Communication Buffers"
    },
    {
        question: "Which atmospheric layer is most hit by a solar flare?",
        answers: ["The Troposphere", "The Ionosphere"],
        correctAnswerIndex: 1,
        resource: "Ionospheric Stabilizers"
    },
    {
        question: "What type of energy does a solar flare release?",
        answers: ["Electromagnetic radiation", "Kinetic energy only"],
        correctAnswerIndex: 0,
        resource: "Magnetic Field Analyzers"
    },
    {
        question: "How are astronauts in space protected from solar flares?",
        answers: ["With special shielding", "By flying faster"],
        correctAnswerIndex: 0,
        resource: "Radiation Shielding"
    },
    {
        question: "What else is threatened by a solar flare besides communications?",
        answers: ["GPS satellite accuracy", "Ocean tides"],
        correctAnswerIndex: 0,
        resource: "Astronaut Health Monitors"
    }
];


// --- LEVEL 2: THE CME ---

export const LEVEL_2_STORY = [
    { character: 'Narrator', text: "Following a flare, a much larger, slower entity begins its journey from the Sun.", effect: 'shake' },
    { character: 'Narrator', text: "A colossal cloud of superheated gas, called plasma, billows into space.", effect: 'boom' },
    { character: 'Riho', text: "I am Riho! A Coronal Mass Ejection. I am not as fast as a flare, but I am immense and powerful!", effect: 'speak' },
    { character: 'Narrator', text: "Riho, the CME, travels for several days, but carries billions of tons of solar material.", effect: 'travel' },
    { character: 'Riho', text: "When I strike a planet, my magnetic field can wreak havoc on its power grids, causing massive blackouts!", effect: 'power' },
    { character: 'Narrator', text: "Earth's own magnetic field, the magnetosphere, is our first line of defense.", effect: 'aurora' },
    { character: 'Narrator', text: "We must reinforce our defenses to withstand this planetary-scale impact.", effect: 'earth' },
];

export const LEVEL_2_QUIZ = [
    {
        question: "What is a CME (Coronal Mass Ejection) made of?",
        answers: ["Light and heat", "Magnetized plasma"],
        correctAnswerIndex: 1,
        resource: "Plasma Containment Fields"
    },
    {
        question: "How fast is a CME's journey to Earth compared to a flare?",
        answers: ["Much faster", "Much slower"],
        correctAnswerIndex: 1,
        resource: "Early Warning Satellite Network"
    },
    {
        question: "What is the biggest threat from a CME to our planet?",
        answers: ["Widespread power outages", "Internet slowdowns"],
        correctAnswerIndex: 0,
        resource: "Grid Surge Protectors"
    },
    {
        question: "What is Earth's natural magnetic shield called?",
        answers: ["The Atmosphere", "The Magnetosphere"],
        correctAnswerIndex: 1,
        resource: "Magnetosphere Reinforcement"
    },
    {
        question: "What beautiful side-effect is caused by a CME?",
        answers: ["Warmer weather", "Auroras (Northern/Southern Lights)"],
        correctAnswerIndex: 1,
        resource: "Atmospheric Density Matrix"
    },
    {
        question: "What technology is most vulnerable to a CME?",
        answers: ["Satellites in orbit", "Undersea cables"],
        correctAnswerIndex: 0,
        resource: "Satellite Shielding"
    }
];

// --- LEVEL 3: THE PERFECT STORM ---

export const LEVEL_3_STORY = [
    { character: 'Narrator', text: "On the sun, an unprecedented event unfolds. An explosive flare and a massive CME erupt from the same region, at the same time!", effect: 'boom' },
    { character: 'Both', text: "We are coming together! A perfect storm of space weather!", effect: 'shake' },
    { character: 'Flavo', text: "My flare will arrive first, weakening Earth's defenses and disrupting communications!", effect: 'glitch' },
    { character: 'Riho', text: "And my CME will follow close behind, delivering a devastating blow to the already-strained power grid!", effect: 'power' },
    { character: 'Narrator', text: "This combined assault is the ultimate threat. The flare clears the path for the CME to cause maximum damage.", effect: 'travel' },
    { character: 'Narrator', text: "Every defense system must work in perfect sync to protect the planet from a global catastrophe.", effect: 'info' },
    { character: 'Narrator', text: "The fate of our world's technology rests on your decisions.", effect: 'earth' },
];

export const LEVEL_3_QUIZ = [
    {
        question: "Why is a flare dangerous before a CME in a 'perfect storm'?",
        answers: ["It clears a path for the CME", "It slows the CME down"],
        correctAnswerIndex: 0,
        resource: "Dual-Phenomenon Particle Sorter"
    },
    {
        question: "What is the most critical first step to defend against this storm?",
        answers: ["Shutting down all power", "A synchronized, rapid alert"],
        correctAnswerIndex: 1,
        resource: "Synchronized Alert System"
    },
    {
        question: "What tool helps predict the storm's path from the Sun?",
        answers: ["A powerful telescope", "Solar Origin Triangulator"],
        correctAnswerIndex: 1,
        resource: "Solar Origin Triangulator"
    },
    {
        question: "What is needed to protect High-Frequency (HF) radio?",
        answers: ["HF Radio Wave Stabilizer", "Building taller antennas"],
        correctAnswerIndex: 0,
        resource: "HF Radio Wave Stabilizer"
    },
    {
        question: "How can we protect the power grid from a CME's energy?",
        answers: ["Large batteries (capacitors)", "Turning off lights"],
        correctAnswerIndex: 0,
        resource: "Power Grid Capacitors"
    },
    {
        question: "What software is crucial for understanding this double-event?",
        answers: ["Event Correlation Software", "A faster internet connection"],
        correctAnswerIndex: 0,
        resource: "Event Correlation Software"
    }
];
