import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const ProductCount = ({ countFunc }) => {
  const [count, setCount] = useState(1);


  useEffect(() => {
    countFunc(count);
  }, [count]);



  return (
    <Form.Select aria-label="Default select example" onChange={e=> setCount(e.target.value)}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </Form.Select>
  );
};

export default ProductCount;
