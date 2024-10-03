 import confident from "../../../assets/confident-teacher-explaining-lesson-pupils 1.png"
export default function WhatisRean() {
    return (
        <div className=" What">
            <div className="cont">
            <div className=" header">
              
              <h2>
             <span>What is</span> REAN ?
              </h2>
              <p>
                        REAN is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams;
                        monitor due dates; grade results and provide students with feedback all in one place.

              </p>
      
      
                </div>
                <div className="cards">
                   
                    <div className="box1">
                        <div className="text">
                        <h2>FOR INSTRUCTORS</h2>
                            <button>
                                start free
                            </button>
                        </div>
                        

                        </div>
                    <div className="box2">
                        <div className="text">
                        <h2>FOR STUDENTS</h2>
                            <button>
                               join now
                            </button>
                        </div>
                    

               

                    </div>

                </div>
                <div className="thingstodo">
                    <div className="text">
                        <h2>
                            <span >Everything you can do in a physical classroom </span>, you can do with TOTC
                        </h2>
                        <p>TOTC’s school management software helps traditional and online schools manage scheduling,
                            attendance, payments and virtual classrooms all in one secure cloud-based system.</p>

                    </div>
                    <div className="img">
                        <img src={confident} alt="img" />
                    </div>

                </div>




            </div>

        </div>
    )
}