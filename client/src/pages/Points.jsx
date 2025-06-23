import React from "react";

const Table = () => {
  const wastePoints = [
    { category: "Plastic", points: "2 Points" },
    { category: "Glass", points: "3 Points" },
    { category: "Metal", points: "10 Points" },
    { category: "Cardboard", points: "5 Points" },
    { category: "Paper", points: "1 Points" },

  ];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Waste Point Table</h1>
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {wastePoints.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;