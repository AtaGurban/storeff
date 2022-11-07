import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "react-bootstrap";
import { fetchDevices, deleteDevice } from "../../../http/deviceAPI";
import { Context } from "../../..";
import { Link } from "react-router-dom";
import ModalEditDevice from "./ModalEditDevice";

const AdminDeviceTable = () => {
  const [paginationActive, setPaginationActive] = useState(1);
  const [devices, setDevices] = useState([]);
  const [modalEditDeviceVisible, setModalEditDeviceVisible] = useState(false);
  const [currentEditDevice, setCurrentEditDevice] = useState({});
  const { type, brand } = useContext(Context);
  let queryString = `?page=${paginationActive}`;

  useEffect(async () => {
    await fetchDevices(queryString).then((data) => setDevices(data));
  }, [paginationActive]);

  const tableAttributes = [
    "id",
    "Ady",
    "Bahasy",
    "Baş kategoriýa",
    "Podkategoriýa",
    "Kiçi kategoriýa",
    "Brend",
    "Reýting",
    "Döredilen wagty",
    "Üýtgedilen wagty",
    "Düwmeler",
  ];
  let paginationLimit = 5;
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(devices.count / paginationLimit);
    number++
    ) {
      items.push(
        <Pagination.Item
        onClick={(e) => setPaginationActive(number)}
        key={number}
        active={number === paginationActive}
        >
        {number}
      </Pagination.Item>
    );
  }


  const removeDevice = (id) => {
    deleteDevice(id).then((data) => {
      window.location.reload();
    });
  };

  const showModalEditDevice = (device) => {
    setCurrentEditDevice(device);
    setModalEditDeviceVisible(true);
  };
  return (
    <div className="admin-device-table">
      {devices.rows ? (
        <div>
          <table width="100%" border="2" className="mt-3">
            <thead>
              <tr>
                {tableAttributes.map((item, index) => (
                  <th key={index} className="p-1">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {devices?.rows.map((item) => (
                <tr key={item.id}>
                  <td className="p-1">{item.id}</td>
                  <td style={{ minWidth: "200px" }} className="p-1 text-wrap">
                    {item.name}
                  </td>
                  <td className="p-1">{item.price}</td>
                  <td className="p-1">
                    {
                      type.Types[0].filter((itemType) => {
                        return itemType.id === item.typeId;
                      })[0]?.name
                    }
                  </td>
                  <td className="p-1">
                    {
                      type.TitleTypes[0].filter((itemType) => {
                        return itemType.id === item.titleTypeId;
                      })[0]?.name
                    }
                  </td>
                  <td className="p-1">
                    {
                      type.SubTypes[0].filter((itemType) => {
                        return itemType.id === item.subTypeId;
                      })[0]?.name
                    }
                  </td>
                  <td className="p-1">
                    {
                      brand.Brands[0].filter((itemBrand) => {
                        return itemBrand.id === item.brandId;
                      })[0]?.name
                    }
                  </td>
                  <td className="p-1">{item.rating}</td>
                  <td className="p-1">{item.createdAt}</td>
                  <td className="p-1">{item.updatedAt}</td>
                  <td className="p-1">
                    <Link to={`/admin/device/${item.id}`}>
                      <button className="btn btn-primary me-2">
                        Görnüşler
                      </button>
                    </Link>

                    <button
                      onClick={() => showModalEditDevice(item)}
                      className="btn btn-success me-2"
                    >
                      Üýtgetmek
                    </button>
                    <button
                      onClick={() => removeDevice(item.id)}
                      className="btn btn-danger"
                    >
                      Pozmak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <Pagination style={{ justifyContent: "center" }}>
              {items}
            </Pagination>
          </div>
        </div>
      ) : (
        <h1 className="text-center mt-3">Maglumatlar ýok</h1>
      )}
      <ModalEditDevice
        currentEditDevice={currentEditDevice}
        show={modalEditDeviceVisible}
        onHide={() => setModalEditDeviceVisible(false)}
      />
    </div>
  );
};

export default AdminDeviceTable;
