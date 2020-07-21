import React from 'react';
import './dashboard.css'

const CourseCard =({name,level,duration,status})=>{
    return (
        <div className="course-card">
            <div className="top">
                <h4>{name}</h4>
                <p>{level}</p>
            </div>
            <p><span className="fa fa-history"></span>{duration} Weeks </p>
            <p style={{color:'black'}}>status:{status}</p>
        </div>
    )
}

export default CourseCard;