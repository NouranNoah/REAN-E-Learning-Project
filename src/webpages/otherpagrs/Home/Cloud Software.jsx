import first from "../../../assets/Group 79.png"
import second from "../../../assets/Group 80.png"
 import third from "../../../assets/Group 81.png"
export default function CloudSoftware() {
    return (
        <div className="cloud">
            <div className="cont">
            <div className=" header">
              
              <h2>
             <span>All-In-One </span> Cloud Software
              </h2>
              <p>
              REAN is one powerful online software suite that combines all the tools needed to run a successful school or office.

              </p>
      
      
                </div>
                <div className=" cards">
                    <div className="cont">
                        <div className="box">
                            <img src={first}></img>
                            <div className="text" alt="img">
                            <h2>
                            Online Billing, Invoicing, & Contracts

                            </h2>
                            <p>
                                Simple and secure control of your
                                organization’s financial and legal transactions. Send customized invoices and contracts
                            </p>
                            </div>
                   
                        </div>
                        <div className="box">
                            <img src={second} alt="img"></img>
                            <div className="text">
                            <h2>
                            Easy Scheduling & Attendance Tracking

                            </h2>
                            <p>
                            Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance
                            </p>
                            </div>
            
                        </div>
                        <div className="box">
                            <img src={third} alt="img"></img>
                            <div className=" text">
                            <h2 className="th">
                            Customer Tracking

                            </h2>
                            <p className="th">
                                Automate and track emails to individuals or groups.
                            Skilline’s built-in system helps organize your organization
                            </p>
                            </div>
             
                        </div>

                    </div>

                </div>
            </div>

        </div>
     
    )

}