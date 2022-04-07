import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'My Files',
    path: '/home',
    icon: <AiIcons.AiFillFile />,
    cName: 'nav-text'
  },
  {
    title: 'Subscriptions',
    path: '/subscriptions',
    icon: <AiIcons.AiFillStar />,
    cName: 'nav-text'
  }
];