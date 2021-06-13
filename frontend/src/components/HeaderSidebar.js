import React from 'react'
import { Link } from 'react-router-dom'

function HeaderSidebar() {
  return (
    <>
      <div className='main-content'>
        <header>
          <h2>
            <label htmlFor="nav-toggle">
                <span className="las la-house"></span>
            </label>
          </h2>
  
          <div className="search-wrapper">
            <span className="las la-search"></span>
            <input type="search" placeholder="Search here" />
          </div>
  
          <div className="user-wrapper">
            <img src="admin.jpg" width="40px" height="40px" alt="admin picture" />
            <div>
              <h4>Laura M.</h4>
              <small>Admin</small>
            </div>
          </div>
        </header>
      </div>

      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2><span className="lab la-accusoft"></span><span>ToyStorey</span></h2>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="" className="active"><span className="las la-igloo"></span>
              <span>Dashboard</span></Link>
            </li>
            <li>
              <Link to="/sales/customerlist"><span className="las la-users"></span>
              <span>Customers</span></Link>
            </li>
            <li>
              <Link to="/inventory"><span className="las la-receipt"></span>
              <span>Inventory</span></Link>
            </li>
            <li>
              <Link to="/sales/quotations"><span className="las la-shopping-bag"></span>
              <span>Quotation</span></Link>
            </li>
            <li>
              <Link to="/sales"><span className="las la-clipboard-list"></span>
              <span>Sales</span></Link>
            </li>
            <li>
              <Link to=""><span className="las la-user-circle"></span>
              <span>Accounts</span></Link>
            </li>
            <li>
              <Link to=""><span className="las la-clipboard-list"></span>
              <span>Tasks</span></Link>
            </li>
          </ul>
        </div>
      </div> 
    </>
  )
}

export default HeaderSidebar
