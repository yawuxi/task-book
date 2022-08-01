// react
import React from "react"

// additional functional
// components
// styles
import './SidebarAddCategory.scss'

const SidebarAddCategory: React.FC = () => {
  return (
    <div className="sidebar-add-category sidebar-add-category--hidden">
      <div className="sidebar-add-category__content user-component">
        <input type="text" name="categoryTitle" />
        <button className="br10">Додати категорію</button>
      </div>
    </div>
  )
}

export default SidebarAddCategory
