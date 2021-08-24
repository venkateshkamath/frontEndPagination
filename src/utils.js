const paginate = (followers) => {
  const personPerPage = 10;
  const pages = Math.round(followers.length / personPerPage);
  console.log(pages);
  //creating newArrays of Arrays
  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const start = index * personPerPage;
    console.log(start);
    //take the main followers and add followers from 0 to personPerPage
    return followers.slice(start, start + personPerPage);
    // return it
  });
  return newFollowers;
};

export default paginate;
