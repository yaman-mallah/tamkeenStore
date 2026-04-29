import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import Newsletter from "../Components/Newsletter";
import "./Products.css";
import { api_config } from "../Config/API";
import CardProducts from "./CardProducts";


import { offset } from "dom-helpers";


const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [initialize, setInitialize] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    category_id: null,
    search: "",
    price_from: "",
    price_to: "",
    order_by: "",
    order: "",
  });
  const [pagination, setPagination] = useState({});

  const base_url = api_config.BASE_URL;
  const productsPath = api_config.ENDPOINTS.PRODUCT;
  const categoryPath = api_config.ENDPOINTS.CATEGORY;

  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value !== null,
    ),
  );

  const params = new URLSearchParams(activeFilters);

  const CallProductsAPI = () => {
    setInitialize(false);
    fetch(`${base_url}${productsPath}?${params}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No products found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data.data);
        setPagination(data.meta);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("Call API Ended");
        setInitialize(true);
      });
  };

  const CallCategoriesAPI = () => {
    fetch(`${base_url}${categoryPath}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No products found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("Call API Ended");
      });
  };

  useEffect(() => {
    CallProductsAPI();
  }, [filters]);

  useEffect(() => {
    CallCategoriesAPI();
  }, []);

    //animation 


  if (!initialize) return <div className="loader"></div>;

  return (
    <>
      <Container>
        <Row>
          <Col lg={3}>
            <Accordion flush defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="cat-title">
                  Categories
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="productFilters">
                    <li>
                      <input
                        type="radio"
                        id="all"
                        value={null}
                        name="product_category"
                        onChange={(e) => {
                          console.log(e);
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              category_id: null,
                              page: 1,
                            });
                          }
                        }}
                      />
                      <label htmlFor="all">All Categories</label>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <input
                          type="radio"
                          id={`category${cat.id}`}
                          value={cat.id}
                          name="product_category"
                          onChange={(e) => {
                            console.log(e);
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                category_id: e.target.value,
                                page: 1,
                              });
                            } else {
                              setFilters({
                                ...filters,
                                category_id: null,
                                page: 1,
                              });
                            }
                          }}
                        />
                        <label htmlFor={`category${cat.id}`}>{cat.name}</label>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col lg={9} sm={12}>
            <Row>
              <Col sm={12} className="filters-row">
                <select
                  name="priceRange"
                  className="range mb-4"
                  value={
                    filters.price_to
                      ? `${filters.price_from}-${filters.price_to}`
                      : filters.price_from
                  }
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val === "") {
                      setFilters({
                        ...filters,
                        price_from: "",
                        price_to: "",
                        page: 1,
                      });
                      return;
                    }

                    const price = val.split("-");
                    setFilters({
                      ...filters,
                      price_from: price[0],
                      price_to: price[1] || "",
                      page: 1,
                    });
                  }}
                >
                  <option value="" disabled hidden selected>
                    Select Price
                  </option>
                  <option value="0-">All Prices</option>
                  <option value="10-500">10 - 500</option>
                  <option value="500-1000">500 - 1000</option>
                  <option value="1000-2000">1000 - 2000</option>
                  <option value="2000-3000">2000 - 3000</option>
                  <option value="3000-4000">3000 - 4000</option>
                  <option value="5000">5000+</option>
                </select>
                <select
                  name=""
                  id=""
                  value={filters.order_by || ""}
                  className="range mb-4"
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      order_by: e.target.value,
                      page: 1,
                    });
                  }}
                >
                  <option hidden selected value="">
                    Order By
                  </option>
                  <option value="">All</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="created_at">Created at</option>
                  <option value="most_purchased">Most Purchased</option>
                </select>
                <select
                  name=""
                  id=""
                  value={filters.order || ""}
                  className="range mb-4"
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      order: e.target.value,
                      page: 1,
                    });
                  }}
                >
                  <option hidden selected value="">
                    Order
                  </option>
                  <option value="">All</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </Col>
            </Row>
            <Row >
              {products.map((pdct) => (
                <Col lg={4} md={6} sm={12} className="mb-3" key={pdct.id}>
                  <NavLink to={`/products/${pdct.id}`}>
                    <CardProducts
                      key={pdct.id}
                      pdctImg={pdct.image}
                      pdctTitle={pdct.name}
                      pdctPrice={pdct.price}
                      pdctDesc={pdct.description}
                    />
                  </NavLink>
                </Col>
              ))}
            </Row>
            <Row className="mt-2">
              <Col sm={12}>
                <div className="pagination-container mt-4 d-flex justify-content-center">
                  <button
                    disabled={filters.page === 1}
                    onClick={() =>
                      setFilters({ ...filters, page: filters.page - 1 })
                    }
                  >
                    Previous
                  </button>
                  <span className="pages">
                    Page {pagination.current_page} of {pagination.last_page}
                  </span>
                  <button
                    disabled={filters.page === pagination.last_page}
                    onClick={() =>
                      setFilters({ ...filters, page: filters.page + 1 })
                    }
                  >
                    Next
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </>
  );
};

export default Products;
