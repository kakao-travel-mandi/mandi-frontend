import {ReactNode} from 'react';

import ModalReviewSectionUp from '../modal-review-section-up';
// import StarScope from '@/components/star-scope';

interface ModalReviewWriteProps {
  img: string;
  title: string;
  channel: [string, string];
  time?: number;
  distance?: number;
  score: number;
  review: string;
  reviewBadge: string[];
}

const ModalReviewWrite = ({
  img,
  title,
  channel,
  time,
  distance,
  score,
  review,
  reviewBadge,
}: ModalReviewWriteProps) => {
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
        <p>{review}</p>
      </div>
    </div>
  );
};
export default ModalReviewWrite;
