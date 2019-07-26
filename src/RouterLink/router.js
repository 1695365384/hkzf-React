import {lazy} from 'react';

const CItyList = lazy (() => import ('../pages/CityList'));
const map = lazy (() => import ('../pages/map'));
const Home = lazy (() => import ('../pages/Home/Home.js'));
const Index = lazy (() => import ('../pages/Index/Index'));
const HoseList = lazy (() => import ('../pages/HoseList'));

export {CItyList, map, Home, Index, HoseList};
