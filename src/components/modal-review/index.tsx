import {ReactNode} from 'react';

interface ModalReviewProps {
  title: string;
  channel: [string, string];
  time?: number;
  distance?: number;
  score?: number;
  review: string;
  badge: ReactNode;
}

const ModalReview = () => {};

export default ModalReview;
