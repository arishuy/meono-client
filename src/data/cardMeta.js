import imgExplodingKitten from '../assets/cards/EXPLODING_KITTEN.jpeg';
import imgDefuse from '../assets/cards/DEFUSE.jpeg';
import imgAttack from '../assets/cards/ATTACK.jpeg';
import imgSkip from '../assets/cards/SKIP.jpeg';
import imgSeeTheFuture from '../assets/cards/SEE_THE_FUTURE.jpeg';
import imgShuffle from '../assets/cards/SHUFFLE.jpeg';
import imgFavor from '../assets/cards/FAVOR.jpeg';
import imgNope from '../assets/cards/NOPE.jpeg';
import imgTacoCat from '../assets/cards/TACO_CAT.jpeg';
import imgPotatoCat from '../assets/cards/HAIRY_POTATO_CAT.jpeg';
import imgRainbowCat from '../assets/cards/RAINBOW_RALPHING_CAT.jpeg';
import imgBeardCat from '../assets/cards/BEARD_CAT.jpeg';
import imgCattermelon from '../assets/cards/CATTERMELON.jpeg';

// Card type metadata — mirrors server CardTypes.js
export const CARD_META = {
  EXPLODING_KITTEN: {
    name: 'Exploding Kitten',
    emoji: '💣',
    description: 'You explode! Unless you have a Defuse card.',
    color: '#E74C3C',
    bgColor: '#2C0B0B',
    borderColor: '#E74C3C',
    image: imgExplodingKitten,
  },
  DEFUSE: {
    name: 'Defuse',
    emoji: '🛡️',
    description: 'Defuse an Exploding Kitten and re-insert it into the deck.',
    color: '#2ECC71',
    bgColor: '#0B2C15',
    borderColor: '#2ECC71',
    image: imgDefuse,
  },
  ATTACK: {
    name: 'Attack',
    emoji: '⚔️',
    description: 'End your turn. Next player takes 2 turns.',
    color: '#E67E22',
    bgColor: '#2C1A07',
    borderColor: '#E67E22',
    image: imgAttack,
  },
  SKIP: {
    name: 'Skip',
    emoji: '⏭️',
    description: 'End your turn without drawing.',
    color: '#3498DB',
    bgColor: '#071E2C',
    borderColor: '#3498DB',
    image: imgSkip,
  },
  SEE_THE_FUTURE: {
    name: 'See the Future',
    emoji: '🔮',
    description: 'Peek at the top 3 cards.',
    color: '#9B59B6',
    bgColor: '#1A0B2C',
    borderColor: '#9B59B6',
    image: imgSeeTheFuture,
  },
  SHUFFLE: {
    name: 'Shuffle',
    emoji: '🔀',
    description: 'Shuffle the draw pile.',
    color: '#1ABC9C',
    bgColor: '#072C22',
    borderColor: '#1ABC9C',
    image: imgShuffle,
  },
  FAVOR: {
    name: 'Favor',
    emoji: '🙏',
    description: 'Force a player to give you a card.',
    color: '#F39C12',
    bgColor: '#2C1F03',
    borderColor: '#F39C12',
    image: imgFavor,
  },
  NOPE: {
    name: 'Nope',
    emoji: '🚫',
    description: 'Cancel any action card.',
    color: '#E74C3C',
    bgColor: '#2C0707',
    borderColor: '#E74C3C',
    image: imgNope,
  },
  TACO_CAT: {
    name: 'Taco Cat',
    emoji: '🌮',
    description: 'Pair to steal a random card.',
    color: '#F1C40F',
    bgColor: '#2C2703',
    borderColor: '#F1C40F',
    image: imgTacoCat,
  },
  HAIRY_POTATO_CAT: {
    name: 'Potato Cat',
    emoji: '🥔',
    description: 'Pair to steal a random card.',
    color: '#D4A574',
    bgColor: '#2C1F0F',
    borderColor: '#D4A574',
    image: imgPotatoCat,
  },
  RAINBOW_RALPHING_CAT: {
    name: 'Rainbow Cat',
    emoji: '🌈',
    description: 'Pair to steal a random card.',
    color: '#E91E63',
    bgColor: '#2C071A',
    borderColor: '#E91E63',
    image: imgRainbowCat,
  },
  BEARD_CAT: {
    name: 'Beard Cat',
    emoji: '🧔',
    description: 'Pair to steal a random card.',
    color: '#8D6E63',
    bgColor: '#2C1A10',
    borderColor: '#8D6E63',
    image: imgBeardCat,
  },
  CATTERMELON: {
    name: 'Cattermelon',
    emoji: '🍉',
    description: 'Pair to steal a random card.',
    color: '#4CAF50',
    bgColor: '#0B2C10',
    borderColor: '#4CAF50',
    image: imgCattermelon,
  },
};

export const CAT_TYPES = [
  'TACO_CAT',
  'HAIRY_POTATO_CAT',
  'RAINBOW_RALPHING_CAT',
  'BEARD_CAT',
  'CATTERMELON',
];
