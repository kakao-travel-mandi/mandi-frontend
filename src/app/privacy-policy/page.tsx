import classNames from 'classnames/bind';

import styles from './privacy-policy.module.scss';

const cx = classNames.bind(styles);

const PrivacyPolicy = () => {
  return (
    <div className={cx('label3-regular', 'container')}>
      1. 개인정보의 처리 목적
      <br /> &lt;(주)만디&gt;은 다음의 목적을 위하여 개인정보를 처리하고 있으며,
      다음의 목적 이외의 용도로는 이용하지 않습니다.
      <br />
      - 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별. 인증,
      회원자격 유지. 관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는
      서비스의 공급. 배송 등
      <br /> <br />
      2. 개인정보의 처리 및 보유 기간
      <br />
      <ol>
        <li>
          &#9312; ‘만디’은 정보주체로부터 개인정보를 수집할 때 동의 받은
          개인정보 보유․이용기간 또는 법령에 따른 개인정보 보유․ 이용기간 내에서
          개인정보를 처리․보유합니다.
        </li>
        <br />
        <li>
          &#9313;구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다. <br />
          - 고객 가입 및 관리 : 카카오싱크를 통한 회원가입 및 카카오채널을 통한
          관리
          <br />- 보유 기간 : 카카오채널 탈퇴 시, 즉시 삭제
        </li>
      </ol>
    </div>
  );
};

export default PrivacyPolicy;
