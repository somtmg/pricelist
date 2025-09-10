import { useState, useEffect } from "react";
import { getProducts, createProduct } from "./services/api";
import "./styles.css";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { Plus, Printer, Sliders } from "lucide-react";

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
    in_stock: 0,
    description: "",
  });
  const [error, setError] = useState(null);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
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
      item.article_no.toString().toLowerCase().includes(searchId) ||
      item.article_no.toString().includes(searchId);
    const matchesName =
      searchName === "" ||
      item.product_name.toLowerCase().includes(searchName.toLowerCase());
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
      [name]: name === "in_stock" ? parseInt(value, 10) || 0 : value,
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
      const createdProduct = await createProduct(newProduct);
      setItems([...items, createdProduct]);
      setNewProduct({
        article_no: "",
        product_name: "",
        in_price: "",
        price: "",
        unit: "",
        in_stock: 0,
        description: "",
      });
      setShowInput(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Enter key for submit
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItemSubmit();
    }
  };

  //show full description
  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  return (
    <>
      <Header />
      <div className="container">
        <SideBar />
        <div className="price-list">
          {error && <div className="error">{error}</div>}
          <div className="input-group">
            <div className="search-bar">
              <input
                className="input"
                type="text"
                placeholder="Search by Product ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Search by Product Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="buttons-container">
              <div className="buttons">
                <a className="btn" onClick={handleAddItemClick}>
                  Add Product
                </a>
                <span>
                  <Plus color="green" size={20} onClick={handleAddItemClick} />
                </span>
              </div>
              <div className="buttons">
                <a className="btn" onClick={handleAddItemClick}>
                  Print List
                </a>
                <span>
                  <Printer color="green" size={20} />
                </span>
              </div>
              <div className="buttons">
                <a className="btn" onClick={handleAddItemClick}>
                  Advanced Mode
                </a>
                <span>
                  <Sliders color="green" size={20} />
                </span>
              </div>
            </div>
          </div>
          {showInput && (
            <div className="add-price">
              <input
                className="input"
                type="text"
                name="article_no"
                placeholder="Article No"
                value={newProduct.article_no}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                required
              />
              <input
                className="input"
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={newProduct.product_name}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                required
              />
              <input
                className="input"
                type="number"
                name="in_price"
                placeholder="In Price"
                value={newProduct.in_price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
              <input
                className="input"
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />

              <input
                className="input"
                type="text"
                name="unit"
                placeholder="Unit"
                value={newProduct.unit}
                onChange={handleInputChange}
                required
              />
              <input
                className="input"
                type="number"
                name="in_stock"
                placeholder="In Stock"
                value={newProduct.in_stock}
                onChange={handleInputChange}
                required
              />

              <textarea
                className="input"
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
              <div className="submit-cancel">
                {" "}
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

          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Article No.</th>
                <th>Product/Service</th>
                <th>In Price</th>
                <th>Price</th>
                <th>Unit</th>
                <th>In Stock</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <>
                  <tr key={item.id}>
                    {/* <td>{item.id}</td> */}
                    <td>{item.article_no}</td>
                    <td>{item.product_name}</td>
                    <td>{item.in_price}</td>
                    <td>{item.price}</td>
                    <td>{item.unit}</td>
                    <td>{item.in_stock}</td>
                    <td className="description-cell">
                      <span className="description-text">
                        {item.description && item.description.length > 50
                          ? `${item.description.substring(0, 70)}`
                          : item.description || "N/A"}
                      </span>
                      {item.description && item.description.length > 50 && (
                        <a
                          className="descr"
                          onClick={() => toggleDescription(item.id)}
                        >
                          ...
                        </a>
                      )}
                      {expandedDescriptionId === item.id && (
                        <>
                          <td>
                            {item.description.substring(71, 140)}
                            {item.description.substring(141, 210)}
                          </td>
                        </>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <p className="no-items">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
