import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

function App() {
  const { data, loading } = useFetch(url); //destructuring
  const [page, setPage] = useState(0); //the page
  const [followers, setFollowers] = useState([]); //that chunk
  let size = data.length;
  console.log(followers);
  console.log(loading);
  const handlePage = (index) => {
    setPage(index);
  };
  const prevPage = () => {
    const circularPage = (page - 1 + size) % size;
    setPage(circularPage);
  };

  const nextPage = () => {
    const circularPage = (page + 1) % size;
    setPage(circularPage);
  };
  useEffect(() => {
    // when page loads if loading is false, then I get the array of array and set that to followers of data[0], or 2
    if (loading) return; // if loading is true , return when loading changes due to set Loading, then change
    setFollowers(data[page]); //does not fetch again, only re renders
  }, [loading, page]);
  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading" : "FE Pagination"}</h1>
        <div className="underline"></div>
        {!loading && (
          <div className="btn-container">
            {/* now we map the data, that is no of arrays inside arrays */}
            <button className="prev-btn" onClick={prevPage}>
              Prev
            </button>
            {data.map((_, index) => {
              return (
                <button
                  onClick={() => handlePage(index)}
                  /* button styling */ style={{ marginTop: "15px" }}
                  className={`page-btn ${index === page && "active-btn"}`}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="prev-btn" onClick={nextPage}>
              Next
            </button>
            
          </div>
        )}
        <h4>
          Page <span style={{ color: "red" }}>{page + 1}</span>
        </h4>
      </div>
      <div className="followers">
        <div className="container">
          {followers.map((follower) => {
            const { id } = follower;
            return <Follower {...follower} key={id} />;
          })}
        </div>
        {!loading && (
          <div className="btn-container">
            {/* now we map the data, that is no of arrays inside arrays */}
            <button className="prev-btn" onClick={prevPage}>
              Prev
            </button>
            {data.map((_, index) => {
              return (
                <button
                  onClick={() => handlePage(index)}
                  /* button styling */ className={`page-btn ${
                    index === page && "active-btn"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="prev-btn" onClick={nextPage}>
              Next
            </button>
            <p style={{ textAlign: "center", marginTop: "10px" }}>{`Page ${
              page + 1
            }`}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
