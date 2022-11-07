import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "..";


const ModalNav = ({
  children,
  modalVisible,
  setModalVisible, 
  modalContent, 
}) => {
  let rootClasses = "modal-fade";
  let contentModalClass = "modal-contentt";
  if (modalVisible) {
    rootClasses = "modal-fade active-modal-nav ";
  }

  if (modalContent) {
    contentModalClass = "modal-contentt active-modal-nav ";
  }
  const { type } = useContext(Context);

  let arrayLinks = type.TitleTypes[0].filter((item) => {
    return item.typeId == children;
  });

  let currentType = type?.Types[0].filter((item) => {
    return item.id === children
  })

  let subCategoryItems = {}
  arrayLinks.forEach(item => {
    subCategoryItems[item.name] = [...type.SubTypes[0].filter((subType)=>{
      return item.id === subType.titleTypeId
    })]
  });

  let categoryNumbers = type.Category[0]


  const clickTitleTypeCategory = (id)=>{
    let result = categoryNumbers.filter((item)=>{
      return item.titleTypeId === id
    })
    return result[0].id
  }

  const clickSubTypeCategory = (id)=>{

    let result = categoryNumbers.filter((item)=>{
      return item.subTypeId === id
    })
    return result[0].id
  }

  return (
    <div className="sub-links">
      <div
        className={rootClasses}
        onClick={() => setModalVisible(false)}
        // onMouseMove={(e) => setModalVisible(false)}
      >
        <div
          className="modal-nav"
          onClick={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
        >
          <div className={contentModalClass}>
            <div className="modal-nav-links col-10">
              {arrayLinks.map((item) => 
                <ul key={item.id} className="category-title-link">
                  <li>
                    <Link key={item.id} onClick={(e)=>setModalVisible(false)} className="c-bold" to={`product/${clickTitleTypeCategory(item.id)}`}>
                      {item.name}
                    </Link>
                  </li>

                  {subCategoryItems[item.name].map((link, index) => (
                        <li key={link.id}>
                          <Link onClick={(e)=>setModalVisible(false)}  to={`product/${clickSubTypeCategory(link.id)}`}>{link.name}</Link>
                        </li>
                      ))
                    }
                </ul>
              )}
            </div>
            <div className="modal-nav-banner d-flex .flex-column  col-2">
              <div className="modal-nav-banner-img p-2">
                <img className="mb-2" alt="" src={`${process.env.REACT_APP_API_URL}/${currentType[0]?.imgOne}`} />
              </div>
              <div className="modal-nav-banner-img p-2">
                <img className="mt-2" alt="" src={`${process.env.REACT_APP_API_URL}/${currentType[0]?.imgTwo}`} />
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNav;
