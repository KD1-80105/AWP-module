import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
      productid: "",
      producttitle: "",
      price: "",
      stock: "",
    });
    const URL = "http://127.0.0.1:5000/products";

  const fetchRecord = () => {
    axios.get(URL).then((result) => {
      setProducts(result.data);
    });
  };
  useEffect(() => {
    fetchRecord();
  }, []);

  const RemoveRecord = (productid) => {
    console.log(productid);
    var deleteurl = URL + "/" + productid;
    axios.delete(deleteurl).then((result) => {
      if (
        result.data.affectedRows !== undefined &&
        result.data.affectedRows > 0
      ) {
        fetchRecord();
      }
    });
  };

  const OnTextChanged = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const AddRecord = () => {
    axios.post(URL, product)
      .then((result) => {
        if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
          fetchRecord();
          Reset();
        }
      })
      .catch((error) => {
        console.error("Error adding record:", error);
      });
  };

// const EditRecord=(productid)=>{
//     for (let index = 0; index < products.length; index++) {
//         if (products[index].productid===productid) {
//             let productToEdit={...products[index]}
//             setProducts(productToEdit);
//             break;
//         }        
//     }
// }

const EditRecord = (productid) => {
    const updatedProducts = products.map((product) => {
      if (product.productid === productid) {
        return { ...product }; // Create a new object for the specific product to edit
      }
      return product; // Return unchanged product if it doesn't match the ID
    });
    setProducts(updatedProducts);
  };
  

const UpdateRecord = () => {
    const updateURL = `${URL}/${product.productid}`;
    axios.put(updateURL, product)
      .then((result) => {
        if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
          fetchRecord();
          Reset();
        }
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };
  const Reset = () => {
    setProduct({ productid: "", producttitle: "", price: "", stock: "" });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Product ID:</td>
                  <td>
                    <input
                      type="number"
                      name="productid"
                      value={product.productid}
                      onChange={OnTextChanged}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Product Title:</td>
                  <td>
                    <input
                      type="text"
                      name="producttitle"
                      value={product.producttitle}
                      onChange={OnTextChanged}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Price:</td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={OnTextChanged}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stock:</td>
                  <td>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={OnTextChanged}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button className="btn btn-primary mr-2" onClick={AddRecord}>
                      ADD Record
                    </button>{" "}
                    <button className="btn btn-success mr-2" onClick={UpdateRecord}>
                      UPDATE Record
                    </button>{" "}
                    <button className="btn btn-danger" onClick={Reset}>
                      RESET
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Title</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.productid}>
                    <td>{prod.productid}</td>
                    <td>{prod.producttitle}</td>
                    <td>{prod.price}</td>
                    <td>{prod.stock}</td>
                    <td>
                      <button className="btn btn-warning btn-sm mr-2" onClick={() => EditRecord(prod.productid)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => RemoveRecord(prod.productid)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
