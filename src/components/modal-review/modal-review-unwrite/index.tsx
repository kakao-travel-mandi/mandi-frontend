import Button from '@/components/common/button/index';

import ModalReviewSectionUp from '../modal-review-section-up';

interface ModalReviewUnWriteProps {
  img: string;
  title: string;
  channel: [string, string];
  time?: number;
  distance?: number;
}

const ModalReviewUnWrite = ({
  img,
  title,
  channel,
  time,
  distance,
}: ModalReviewUnWriteProps) => {
  <div>
    <ModalReviewSectionUp
      modal='unWrite'
      img={img}
      title={title}
      channel={channel}
      time={time}
      distance={distance}
    />
    <Button color='white' size='full'>
      후기작성
    </Button>
  </div>;
  return;
};
export default ModalReviewUnWrite;
