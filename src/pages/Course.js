import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../styles/course.css';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../components/common/CourseSidebar';

import 'bootstrap/dist/css/bootstrap.min.css';
import VideoPlayer from './Course-Components/videoPlayer';
import CodePlayground from './Course-Components/codePlayground';
import QuizPanel from './Course-Components/quizPanel';
import AppContext from '../context/AppContext';

// import { db } from '../firebase';

// Dummy object
const videoObj = {
  videoName: 'Introduction to HTML - Lesson 1',
  instructor: 'John Doe',
  createdDate: 'Jan 1st, 2021',
};

function Course({ match }) {
  const { user, courses } = useContext(AppContext);
  const history = useHistory();

  const [navbarHeight, setNavbarHeight] = useState('75px');
  const [courseData, setCourseData] = useState('75px');

  useEffect(() => {
    setNavbarHeight(document.getElementById('app_navbar').style.height);
    if (courses.length > 0) {
      const courseName = match.params.id;
      console.log(courseName);
      if (courseName) {
        console.log(courses);
        const currentCourseData = courses.filter((course) => {
          return course.name === courseName;
        });
        console.log(currentCourseData);
        if (currentCourseData && currentCourseData.length > 0) {
          setCourseData(currentCourseData);
        } else {
          history.push('/');
        }
      } else {
        history.push('/');
      }
    }
  }, [courses]);

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
  }, [user]);

  return (
    <div
      className="course_container"
      style={{ height: `calc(100vh - ${navbarHeight})` }}
    >
      <Row>
        <Col xs={3} lg={3}>
          <Sidebar />
        </Col>
        <Col
          xs={9}
          lg={9}
          style={{ height: `calc(100vh - ${navbarHeight})`, overflowY: 'auto' }}
        >
          <Switch>
            <Route path="/course/video">
              <VideoPlayer video={videoObj} />
            </Route>
            <Route path="/course/code">
              <CodePlayground />
            </Route>
            <Route path="/course/test">
              <QuizPanel />
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
}
export default Course;
