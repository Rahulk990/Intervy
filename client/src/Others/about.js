import React from 'react';

function About() {
    var img_url = "https://media-exp1.licdn.com/dms/image/C4D03AQHeMy9dQaf6IA/profile-displayphoto-shrink_200_200/0?e=1600300800&v=beta&t=62oDP0Pj55E4j5TuHISo6ZwW5cjYQVsA8TR-ob226-Y";
    img_url = "https://previews.123rf.com/images/grgroup/grgroup1705/grgroup170503298/78206137-colorful-portrait-half-body-of-man-with-beard-and-formal-suit-vector-illustration.jpg";

    return (
        <div className="text-center p-3">
            <img src={img_url} className="w-50 mb-3 img-fluid rounded-circle" alt="Rahul990" />
            <h6 className="mb-1"> Meet the Creator of Intervy</h6>
            <h6 className="lead mt-1"> - Rahul</h6>
            <div style={{ fontSize: "30px" }}>
                <a href="mailto:rahulv0530@gmail.com"><i className="fas fa-envelope"></i></a>
                <a className="ml-3" href="https://www.linkedin.com/in/rahul990"><i className="fab fa-linkedin"></i></a>
                <a className="ml-3" href="https://github.com/Rahulk990"><i className="fab fa-github"></i></a>
            </div>
        </div>
    );
}

export default About;