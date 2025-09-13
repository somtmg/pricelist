import { useState, useEffect } from "react";
import { ProductService } from "./services/api";
import "./styles.css";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { SearchIcon, Plus, Printer, Sliders } from "lucide-react";

function App() {
  const [items, setItems] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [newProduct, setNewProduct] = useState({
    article_no: "",
    product_name: "",
    in_price: "",
    price: "",
    unit: "",
    in_stock: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    "article_no",
    "product_name",
    "in_price",
    "price",
    "unit",
    "in_stock",
    "description",
  ]);
  const [editCell, setEditCell] = useState({ rowIndex: null, column: null });
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts();
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by ID and name
  const filteredItems = items.filter((item) => {
    const matchesId =
      searchId === "" ||
      (item.article_no &&
        item.article_no
          .toString()
          .toLowerCase()
          .includes(searchId.toLowerCase())) ||
      (item.article_no && item.article_no.toString().includes(searchId));
    const matchesName =
      searchName === "" ||
      (item.product_name &&
        item.product_name.toLowerCase().includes(searchName.toLowerCase()));
    return matchesId && matchesName;
  });

  // Toggle create form
  const handleAddItemClick = () => {
    setShowInput(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new product
  const handleAddItemSubmit = async () => {
    if (
      !newProduct.product_name.trim() ||
      !newProduct.article_no.trim() ||
      !newProduct.in_price.trim() ||
      !newProduct.price.trim()
    ) {
      setError("Article No, Product Name, In Price and Price are required");
      return;
    }
    try {
      const createdProduct = await ProductService.createProduct(newProduct);
      setItems([...items, createdProduct]);
      setNewProduct({
        article_no: "",
        product_name: "",
        in_price: "",
        price: "",
        unit: "",
        in_stock: "",
        description: "",
      });
      setShowInput(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle cell click for editing
  const handleCellClick = (rowIndex, column) => {
    setEditCell({ rowIndex, column });
  };

  // Handle cell value change
  const handleCellChange = (e, rowIndex, column) => {
    const newData = [...items];
    newData[rowIndex][column] = e.target.value;
    setItems(newData);
  };

  // Handle blur or Enter to save changes
  const handleBlurOrEnter = async (e, rowIndex) => {
    if (e.type === "blur" || e.key === "Enter") {
      setEditCell({ rowIndex: null, column: null });
      try {
        const product = items[rowIndex];
        const updatedProduct = await ProductService.updateProduct(
          product.id,
          product
        );
        const newData = [...items];
        newData[rowIndex] = updatedProduct;
        setItems(newData);
      } catch (error) {
        console.error("Error updating data:", error);
        setError("Failed to update product. Please try again.");
      }
    }
  };

  // Show full row
  const handleShowFullRow = (row) => {
    setSelectedRow(row);
  };

  // Determine input type based on column
  const getInputType = (column) => {
    switch (column) {
      case "product_name":
        return "textarea";
      case "in_price":
        return "text";
      case "unit":
        return "text";
      case "article_no":
        return "text";
      case "price":
        return "text";
      case "in_stock":
        return "text";
      case "description":
        return "textarea";
      default:
        return "arrow";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let colsToShow = [
        "article_no",
        "product_name",
        "in_price",
        "price",
        "unit",
        "in_stock",
        "description",
      ];
      const removeColumns = (originalArray, indicesToRemove) => {
        return originalArray.filter(
          (_, index) => !indicesToRemove.includes(index)
        );
      };

      if (width < 1200) {
        colsToShow = removeColumns(colsToShow, [2, 6]);
      }
      if (width < 1024) {
        colsToShow = removeColumns(colsToShow, [0, 3, 4]);
      }

      setVisibleColumns(colsToShow);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <SideBar />
        <div className="price-list">
          {error && <div className="error">{error}</div>}
          <div className="input-group">
            <div className="search-bar">
              <div className="search-container">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by Product ID"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
                <i className="search-icon">
                  <SearchIcon color="#007bff" />
                </i>
              </div>
              <div className="search-container">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by Product Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <i className="search-icon">
                  <SearchIcon color="#007bff" />
                </i>
              </div>
            </div>
            <div className="buttons-container">
              <div className="buttons">
                <a onClick={handleAddItemClick}>New Product</a>
                <span>
                  <Plus color="green" size={20} onClick={handleAddItemClick} />
                </span>
              </div>
              <div className="buttons">
                <a onClick={handleAddItemClick}>Print List</a>
                <span>
                  <Printer color="green" size={20} />
                </span>
              </div>
              <div className="buttons">
                <a onClick={handleAddItemClick}>Advanced Mode</a>
                <span>
                  <Sliders color="green" size={20} />
                </span>
              </div>
            </div>
          </div>
          {showInput && (
            <div className="add-price">
              <input
                className="product-input"
                type="text"
                name="article_no"
                placeholder="Article No"
                value={newProduct.article_no}
                onChange={handleInputChange}
                required
              />
              <input
                className="product-input"
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={newProduct.product_name}
                onChange={handleInputChange}
                required
              />
              <input
                className="product-input"
                type="number"
                name="in_price"
                placeholder="In Price"
                value={newProduct.in_price}
                onChange={handleInputChange}
                required
              />
              <input
                className="product-input"
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
              <input
                className="product-input"
                type="text"
                name="unit"
                placeholder="Unit"
                value={newProduct.unit}
                onChange={handleInputChange}
                required
              />
              <input
                className="product-input"
                type="number"
                name="in_stock"
                placeholder="In Stock"
                value={newProduct.in_stock}
                onChange={handleInputChange}
                required
              />
              <textarea
                className="product-input"
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
              <div className="submit-cancel">
                <button className="btn submit" onClick={handleAddItemSubmit}>
                  Submit
                </button>
                <button
                  className="btn cancel"
                  onClick={() => setShowInput(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="th-arrow">aa</th>{" "}
                  {/* Empty header for arrow column */}
                  {visibleColumns.map((col) => (
                    <th key={col}>
                      {col.charAt(0).toUpperCase() +
                        col.slice(1).replace(/([A-Z])/g, " $1")}
                    </th>
                  ))}
                  {visibleColumns.length < 7 && <th></th>}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((row, rowIndex) => (
                  <tr key={row.id}>
                    <td></td> {/* Empty cell for arrow */}
                    {visibleColumns.map((col) => (
                      <td
                        key={col}
                        onClick={() => handleCellClick(rowIndex, col)}
                      >
                        {editCell.rowIndex === rowIndex &&
                        editCell.column === col ? (
                          getInputType(col) === "textarea" ? (
                            <input
                              className="edit-input-textarea"
                              value={items[rowIndex][col] || ""}
                              onChange={(e) =>
                                handleCellChange(e, rowIndex, col)
                              }
                              onBlur={(e) =>
                                handleBlurOrEnter(e, rowIndex, col)
                              }
                              autoFocus
                            />
                          ) : getInputType(col) === "arrow" ? (
                            <input
                              className="edit-input-arrow"
                              value={items[rowIndex][col] || ""}
                              onChange={(e) =>
                                handleCellChange(e, rowIndex, col)
                              }
                              onBlur={(e) =>
                                handleBlurOrEnter(e, rowIndex, col)
                              }
                              autoFocus
                            />
                          ) : (
                            <input
                              className="edit-input"
                              type={getInputType(col)}
                              value={items[rowIndex][col] || ""}
                              onChange={(e) =>
                                handleCellChange(e, rowIndex, col)
                              }
                              onBlur={(e) =>
                                handleBlurOrEnter(e, rowIndex, col)
                              }
                              autoFocus
                            />
                          )
                        ) : (
                          row[col] || ""
                        )}
                      </td>
                    ))}
                    {visibleColumns.length < 7 && (
                      <td className="show-row-btn-cell">
                        <button
                          className="show-row-btn"
                          onClick={() => handleShowFullRow(items[rowIndex])}
                        >
                          ...
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedRow && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Selected Row</h2>
                  <p>Article No: {selectedRow.article_no}</p>
                  <p>Product/Service: {selectedRow.product_name}</p>
                  <p>In Price: {selectedRow.in_price}</p>
                  <p>Price: {selectedRow.price}</p>
                  <p>Unit: {selectedRow.unit}</p>
                  <p>In Stock: {selectedRow.in_stock}</p>
                  <p>Description: {selectedRow.description}</p>
                  <button onClick={() => setSelectedRow(null)}>Close</button>
                </div>
              </div>
            )}
          </div>

          {filteredItems.length === 0 && (
            <p className="no-items">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
