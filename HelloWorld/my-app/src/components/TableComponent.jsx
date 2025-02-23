import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/TableComponent.css";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/data")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(data);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredData(
        data.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(lowerSearch)
          )
        )
      );
    }
    setCurrentPage(1);
  }, [search, data]);

  const handleViewDetails = (row) => {
    navigate("/details", { state: { row } });
  };

  const handleCompareColumns = () => {
    navigate("/compare", { state: { data } });
  };

  const handleCompareRows = () => {
    navigate("/compare-rows", { state: { data } });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Data Table</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="buttons-container">
        <div className="buttons-container"><button className="compare-button stylish-button" onClick={handleCompareColumns}>
          🔍 Compare Columns
        </button></div>
        <button className="compare-button stylish-button" onClick={handleCompareRows}>
          📊 Compare Rows
        </button>
      </div>
      <br></br>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {currentRows.length > 0 &&
                Object.keys(currentRows[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, index) => (
                <tr key={index}>
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key}>{typeof value === "object" ? JSON.stringify(value) : value}</td>
                  ))}
                  <td>
                    <button className="details-button" onClick={() => handleViewDetails(row)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={data.length > 0 ? Object.keys(data[0]).length + 1 : 1} className="no-data">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">
          Previous
        </button>
        <span className="pagination-text">
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
