import React from "react";

const List = ({
  campaign,
  items,
  section,
  onPageChange,
  onEdit,
  toggleModal
}) => (
  <ul className="list">
    <li>
      <small>
        <span onClick={() => toggleModal()}>{campaign}</span> /{" "}
        <span>{section}</span>
      </small>
    </li>
    <li onClick={() => onEdit({ id: "", name: "", content: "", campaign })}>
      <span className="fa fa-plus-circle" />
      Add New Item
    </li>
    {items.map(item => (
      <li key={item._id} onClick={() => onPageChange(item)}>
        {item.name}
      </li>
    ))}
  </ul>
);
export default List;
