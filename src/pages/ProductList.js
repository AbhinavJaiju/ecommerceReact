import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import FilteredProduct from "../components/filterProduct/FilteredProduct";

import Footer from "../components/footer/Footer";
import Newsletter from "../components/newsletter/Newsletter";
import { css } from "styled-components";
import { useEffect, useState } from "react";
import Products from "../components/product/Products";

const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
var catData = [];
const url = "http://localhost/ecommerce/admin/Api/getcategory.php";

const ProductList = (props) => {
  const [selected, setSelected] = useState(6);
  const [cat, setCat] = useState("");

  useEffect(() => {
    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => setCat(data));
  }, [selected]);

  if (cat) {
    catData = cat.data;
  }

  return (
    <Container>
      <>
        <Announcement />
        <Navbar />
        <Title>All Products</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Categories:</FilterText>
            <Select
              onChange={(e) => {
                setSelected(e.target.value);
              }}
            >
              <Option key="6" value="6"></Option>
              {catData.map((items) => (
                <Option key={items.id} value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
            <div>{props.category}</div>
          </Filter>
        </FilterContainer>
        {selected > 5?<Products/>: <FilteredProduct props={selected} />}
        
        <Newsletter />
        <Footer />
      </>
    </Container>
  );
};

export default ProductList;
