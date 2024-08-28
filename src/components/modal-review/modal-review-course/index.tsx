import {ReactNode} from 'react';

import ModalReviewSectionUp from '../modal-review-section-up';

interface ModalReviewCourseProps {
  img: string;
  title: string;
  channel: [string, string];
  time?: number;
  distance?: number;
  date: string;
  //modal?: 'write' | 'unWrite' | 'complete-course';
}

const ModalReviewCourse = ({
  img,
  title,
  channel,
  time,
  distance,
  date,
}: ModalReviewCourseProps) => {
  return (
    <div>
      <ModalReviewSectionUp
        modal='unWrite'
        img={img}
        title={title}
        channel={channel}
        time={time}
        distance={distance}
      />
      <div>
        <span>Date</span>
        <span>{date}</span>
      </div>
    </div>
  );
};
export default ModalReviewCourse;
