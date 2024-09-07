'use client';
import { useState } from 'react';

import BottomSheet from '@/components/common/bottomsheet';
import DraggableBottomSheet from '@/components/common/draggable-bottomsheet';
import Layout from '@/components/layout';

const Course = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} title='Course'>
      <div>Course</div>
      <DraggableBottomSheet isOpen={true} onClose={() => setIsOpen(false)}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}>
          <div
            style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'green',
            }}
          />
          <div
            style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'green',
            }}
          />
          <div
            style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'green',
            }}
          />
        </div>
      </DraggableBottomSheet>
    </Layout>
  );
};

export default Course;
