export type GameLevel = 1 | 2 | 3;

export enum GameScene {
  StartMenu,
  LevelSelect,
  Story,
  Travel,
  EarthArrival,
  Quiz,
  DeployResources,
  Defend,
  Aftermath,
  Loss,
  Victory,
}

export interface QuizQuestion {
  question: string;
  answers: [string, string];
  correctAnswerIndex: number;
  resource: string;
}

export type StoryCharacter = 'Flavo' | 'Riho' | 'Narrator' | 'Both';

export interface StoryLine {
    character: StoryCharacter;
    text: string;
    interaction?: 'boom' | 'colors' | 'choice';
    effect?: 'boom' | 'aurora' | 'glitch' | 'power' | 'shake' | 'travel' | 'speak' | 'earth' | 'info';
}