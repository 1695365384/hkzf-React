const MAP_OBJ = 'MAP_OBJ';

const setMapObj = Bmap => localStorage.setItem (MAP_OBJ, JSON.stringify (Bmap));
const getMapObj = () => JSON.parse(localStorage.getItem(MAP_OBJ));



export {getMapObj, setMapObj};
