import classNames from "classnames/bind";
import { useRouter } from "next/navigation";

import Back from "@/assets/icon/icon-arrow-left-small-mono.svg";
import Mandi from "@/assets/logo/Mandi.svg";

import styles from "./TopNavBar.module.scss";

const cx = classNames.bind(styles);

interface TextActionButtonProps {
  text: string;
  onClick: () => void;
}

interface IconActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const TextButton = ({ text, onClick }: TextActionButtonProps) => {
  return (
    <button className={cx("textButton")} onClick={onClick}>
      {text}
    </button>
  );
};
const IconButton = ({ icon, onClick }: IconActionButtonProps) => {
  return (
    <button className={cx("iconButton")} onClick={onClick}>
      {icon}
    </button>
  );
};

interface TopNavBarProps {
  logo?: boolean;
  title?: string;
  actions?: (TextActionButtonProps | IconActionButtonProps)[];
  back?: boolean;
}

export const TopNavBar = ({
  logo: icon,
  title,
  actions,
  back,
}: TopNavBarProps) => {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <div className={cx("container")}>
      <div className={cx("leading")}>
        {icon && <Mandi />}
        {back && <IconButton icon={<Back />} onClick={handleBack} />}
      </div>
      <div className={cx("height")}></div>
      <div className={cx("title")}>{title}</div>
      <div className={cx("actions")}>
        {actions &&
          actions.map((Action, index) => {
            // 액션타입이 TextButtonProps면 TextButton 컴포넌트로 렌더링
            if ("text" in Action) {
              const { text, onClick } = Action as TextActionButtonProps;
              return <TextButton text={text} onClick={onClick} key={index} />;
            } else {
              const { icon, onClick } = Action as IconActionButtonProps;
              return <IconButton icon={icon} onClick={onClick} key={index} />;
            }
          })}
      </div>
    </div>
  );
};
