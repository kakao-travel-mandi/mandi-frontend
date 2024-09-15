import { useForm, Controller } from 'react-hook-form';

import classNames from 'classnames/bind';

import IconPot from '@/assets/icon/icon-pot.svg';
import IconSprout from '@/assets/icon/icon-sprout.svg';
import IconTree from '@/assets/icon/icon-tree.svg';
import Button from '@/components/common/button';
import Layout from '@/components/layout';

import styles from './common.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'step';

interface Step3Props {
  onNext: (data: any) => void;
  onBack: () => void;
}

const Step3 = ({ onNext, onBack }: Step3Props) => {
  const { control, handleSubmit, watch } = useForm();
  const selected = watch('level');

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
            How good are you at trekking?
          </h1>
          <Controller
            name='level'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <div className={cn(`${BLOCK}__select-container--controller`)}>
                <div
                  onClick={() => field.onChange('Beginner')}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === 'Beginner',
                  })}
                >
                  <IconSprout />
                  <p>Beginner</p>
                </div>
                <div
                  onClick={() => field.onChange('Intermediate')}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === 'Intermediate',
                  })}
                >
                  <IconPot />
                  <p>Intermediate</p>
                </div>
                <div
                  onClick={() => field.onChange('Advanced')}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === 'Advanced',
                  })}
                >
                  <IconTree />
                  <p>Advanced</p>
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

export default Step3;
