import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

function HomeScreen() {
    return (
    <div>
    {/* Sidebar Component */}
 
    <div className="main-content">
        {/* Header */}
        

        <main>
            <div className="cards">
                <div className="card-single">
                    <div>
                        <h1>54</h1>
                        <span>Customers</span>
                    </div>
                    <div>
                        <span className="las la-users"></span>
                    </div>
                </div>

                <div className="card-single">
                    <div>
                        <h1>79</h1>
                        <span>Projects</span>
                    </div>
                    <div>
                        <span className="las la-clipboard"></span>
                    </div>
                </div>

                <div className="card-single">
                    <div>
                        <h1>124</h1>
                        <span>Orders</span>
                    </div>
                    <div>
                        <span className="las la-shopping-bag"></span>
                    </div>
                </div>

                <div className="card-single">
                    <div>
                        <h1>Php67k</h1>
                        <span>Income</span>
                    </div>
                    <div>
                        <span className="las la-wallet"></span>
                    </div>
                </div>
            </div>

            <div className="recent-grid">
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h3>Recent Projects</h3>

                            <button>See All <span className="las la-arrow-right"></span></button>

                        </div>

                        <div className="card-body">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <td>Project Title</td>
                                        <td>Department</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Web Development</td>
                                        <td>Frontend</td>
                                        <td><span className="status purple"></span>
                                            In Progress
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Store Application</td>
                                        <td>Mobile Development</td>
                                        <td><span className="status pink"></span>
                                            Pending
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>UI/UX Design</td>
                                        <td>UI Team</td>
                                        <td><span className="status orange"></span>
                                            Completed
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Web Development</td>
                                        <td>Frontend</td>
                                        <td><span className="status purple"></span>
                                            In Progress
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Store Application</td>
                                        <td>Mobile Development</td>
                                        <td><span className="status pink"></span>
                                            Pending
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>UI/UX Design</td>
                                        <td>UI Team</td>
                                        <td><span className="status orange"></span>
                                            Completed
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                
                            </div>
                        </div>

                    </div>

                </div>
               

        
                <div className="customers">
                    <div className="card">
                        <div className="card-header">
                            <h3>Clients</h3>
                            <button>See All <span className="las la-arrow-right"></span></button>
                        </div>

                        <div className="card-body">
                            <div className="customer">
                                <div className="info">
                                    <img src="cu1.jpg" width="40px" height="40px" alt="Customer" />
                                    <div>
                                        <h4>Trisha Dominguez</h4>
                                        <small>Sales Management</small>

                                    </div>
                                </div>
                                <div className="contact">
                                    <span className="las la-user-circle"></span>
                                    <span className="las la-comment"></span>
                                    <span className="las la-phone"></span>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src="cu1.jpg" width="40px" height="40px" alt="Customer" />
                                    <div>
                                        <h4>Trisha Dominguez</h4>
                                        <small>Sales Management</small>

                                    </div>
                                </div>
                                <div className="contact">
                                    <span className="las la-user-circle"></span>
                                    <span className="las la-comment"></span>
                                    <span className="las la-phone"></span>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src="cu1.jpg" width="40px" height="40px" alt="Customer" />
                                    <div>
                                        <h4>Trisha Dominguez</h4>
                                        <small>Sales Management</small>

                                    </div>
                                </div>
                                <div className="contact">
                                    <span className="las la-user-circle"></span>
                                    <span className="las la-comment"></span>
                                    <span className="las la-phone"></span>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src="cu1.jpg" width="40px" height="40px" alt="Customer" />
                                    <div>
                                        <h4>Trisha Dominguez</h4>
                                        <small>Sales Management</small>

                                    </div>
                                </div>
                                <div className="contact">
                                    <span className="las la-user-circle"></span>
                                    <span className="las la-comment"></span>
                                    <span className="las la-phone"></span>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src="cu1.jpg" width="40px" height="40px" alt="Customer" />
                                    <div>
                                        <h4>Trisha Dominguez</h4>
                                        <small>Sales Management</small>

                                    </div>
                                </div>
                                <div className="contact">
                                    <span className="las la-user-circle"></span>
                                    <span className="las la-comment"></span>
                                    <span className="las la-phone"></span>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src="cu1.jpg" width="40px" height="40px" alt="Customer" />
                                    <div>
                                        <h4>Trisha Dominguez</h4>
                                        <small>Sales Management</small>

                                    </div>
                                </div>
                                <div className="contact">
                                    <span className="las la-user-circle"></span>
                                    <span className="las la-comment"></span>
                                    <span className="las la-phone"></span>
                                </div>
                            </div>
                        </div>  
                </div>
            </div>
            </div>
        </main>
    </div>
    </div>
    )
}

export default HomeScreen
