import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const recordsPerPage = 5; 

  useEffect(() => {
    const fetchProjects = async () => {
        setLoading(true);
        setError("");           
        try {
            const response = await fetch(
                "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/master/frontend-assignment.json"
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();              
            setProjects(data); 
            }catch (err) {
              setError("Failed to fetch data");
              console.error("Error:", err);
           }finally {
              setLoading(false);
          }
      };

    fetchProjects();
  }, []);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentProjects = projects.length > 0 ? projects.slice(firstIndex, lastIndex) : [];
    const totalPages = Math.ceil(projects.length / recordsPerPage);

    return (
      <div className="app">
        <h1>Kickstarter Projects</h1>
          {loading ? (
            <p>Loading...</p>
            ) : (
              <div>
                  <table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Amount Pledged</th>
                        <th>Percentage Funded</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProjects.map((project, index) => (
                        <tr key={index}>
                          <td>{project["s.no"]}</td>
                          <td>{project["amt.pledged"]}</td>
                          <td>{project["percentage.funded"]}%</td>
                        </tr>
                            ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                  </div>
              </div>
            )}
      </div>
    );
}

export default App;
