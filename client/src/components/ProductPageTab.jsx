import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

const ProductPageTab = ({ tabDescription, tabMoreInfo }) => {
  const [key, setKey] = useState("moreInfo");
  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        className="mt-3 tab-btn"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="moreInfo" title="Häsiýetler">
          <table className="table table-bordered table-striped bg-white">
            <tbody>
              {tabMoreInfo.map((i) => (
                <tr key={i.id}>
                  <td className="w-50 text-muted text-start">{i.title}</td>
                  <td className="text-start">{i.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
        <Tab
          eventKey="description"
          title="Beýany"
          className="bg-white border rounded p-3"
        >
          <p style={{ textAlign: "justify" }}>{tabDescription}</p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductPageTab;
