function getData (list) {
  let cityLists = {};
  let cityIndex = [];
  list.forEach (item => {
    const firstName = item.pinyin[0];
    if (firstName in cityLists) {
      cityLists[firstName].push (item);
    } else {
      cityLists[firstName] = [item];
      cityIndex.push (firstName);
    }
  });
  cityIndex = cityIndex.sort ();
  return {cityLists, cityIndex};
}

function formatCityIndex (letter) {
  switch (letter) {
    case '#':
      return '当前定位';
    case 'hot':
      return '热门城市';
    default:
      return letter.toUpperCase ();
  }
}

export {getData, formatCityIndex};
