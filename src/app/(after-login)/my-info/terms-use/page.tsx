import classNames from 'classnames/bind';

import Layout from '@/components/layout';

import styles from './terms-use.module.scss';

const cx = classNames.bind(styles);

const TermsUse = () => {
  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} title='Terms of Use'>
      <div className={cx('label3-regular', 'container')}>
        제 1조 (목적)
        <br />
        본 약관은 (주)만디(이하 “회사”라 합니다)이 운영하는 모바일 플랫폼
        ‘만디’에서 제공하는 온라인 서비스(이하 “서비스”라 한다)를 이용함에 있어
        사이버몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        <br />
        <br />제 2 조 (용어의 정의)
        <br /> 본 약관에서 사용하는 용어는 다음과 같이 정의한다.
        <br />
        <ol>
          <li>
            “웹사이트”란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여
            컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래 할 수 있도록
            설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의
            의미로도 사용합니다.
          </li>
          <li>
            “이용자”란 “웹사이트”에 접속하여 서비스를 이용하는 회원 및 비회원을
            말합니다.
          </li>
          <li>
            “회원”이라 함은 “웹사이트”에 개인정보를 제공하여 회원등록을 한
            자로서, “웹사이트”의 정보를 지속적으로 제공받으며, “웹사이트”이
            제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
          </li>
          <li>
            “비회원”이라 함은 회원에 가입하지 않고, “웹사이트”이 제공하는
            서비스를 이용하는 자를 말합니다.
          </li>
          <li>
            “ID”라 함은 이용자가 회원가입당시 등록한 사용자 “개인이용문자”를
            말합니다.
          </li>
          <li>
            “멤버십”이라 함은 회원등록을 한 자로서, 별도의 온/오프라인 상에서
            추가 서비스를 제공 받을 수 있는 회원을 말합니다.
          </li>
        </ol>
      </div>
    </Layout>
  );
};

export default TermsUse;
