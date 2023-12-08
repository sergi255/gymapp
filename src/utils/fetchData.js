export const exerciseOptions = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  headers: {
    'X-RapidAPI-Key': 'dc77e9e895msh9acbf186e9f04d0p1ca461jsnf3061f442e9f',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};
export  const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'dc77e9e895msh9acbf186e9f04d0p1ca461jsnf3061f442e9f',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}