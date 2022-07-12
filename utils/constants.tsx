import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad, FaQuoteRight, } from 'react-icons/fa';
import { BiMusic } from 'react-icons/bi';
import { IoIosFitness } from 'react-icons/io';

export const topics = [
  {
    name: 'development',
    icon: <BsCode />,
  },
  {
    name: 'comedy',
    icon: <BsEmojiSunglasses />,
  },
  {
    name: 'gaming',
    icon: <FaGamepad />,
  },
  {
    name: 'food',
    icon: <GiCakeSlice />,
  },
  {
    name: 'dance',
    icon: <GiGalaxy />,
  },
  {
    name: 'beauty',
    icon: <GiLipstick />,
  },
  {
    name: 'animals',
    icon: <FaPaw />,
  },
  {
    name: 'sports',
    icon: <FaMedal />,
  },
  {
    name : 'music',
    icon : <BiMusic />
  },
  {
    name : 'fitness',
    icon : <IoIosFitness />,
  },
  {
    name : 'motivation',
    icon : <FaQuoteRight />,
  }
];

export const footerList1 = ['About', 'Pinzeal', 'Store', 'Contact']
export const footerList2 = [ 'Transparency','DoTok Rewards' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms & Privacy', 'Community Guidelines' ]