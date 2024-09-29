import { useForm, Controller } from 'react-hook-form';

import classNames from 'classnames/bind';

import Button from '@/components/common/button';
import Layout from '@/components/layout';

import styles from './common.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'step';
interface Step4Props {
  onNext: (data: any) => void;
  onBack: () => void;
}

const Step4 = ({ onNext, onBack }: Step4Props) => {
  const { control, handleSubmit, watch } = useForm();
  const selected = watch('time');

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} onBack={onBack}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(`${BLOCK}__container`)}
      >
        <div className={cn(`${BLOCK}__select-container`)}>
          <h1 className={cn(`${BLOCK}__title`)}>
            Which trekking distance
            <br />
            do you prefer?
          </h1>
          <Controller
            name='time'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <div className={cn(`${BLOCK}__select-container--controller`)}>
                <div
                  onClick={() => field.onChange('less than 3 hours')}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === 'less than 3 hours',
                  })}
                >
                  less than 3 hours
                </div>
                <div
                  onClick={() => field.onChange('3 to 6 hours')}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === '3 to 6 hours',
                  })}
                >
                  3 to 6 hours
                </div>
                <div
                  onClick={() => field.onChange('6 to 9 hours')}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === '6 to 9 hours',
                  })}
                >
                  6 to 9 hours
                </div>
                <div
                  onClick={() => field.onChange('more than 9 hours')}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === 'more than 9 hours',
                  })}
                >
                  more than 9 hours
                </div>
              </div>
            )}
          />
        </div>

        <Button
          type='submit'
          size='full'
          color='green'
          disabled={!selected}
          className={cn(`${BLOCK}__button`)}
        >
          Next
        </Button>
      </form>
    </Layout>
  );
};

export default Step4;
