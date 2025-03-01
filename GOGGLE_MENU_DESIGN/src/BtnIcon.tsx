interface BtnIconProps {
  icon: string;
  grey: boolean;
  onClick?: () => void;
}

const BtnIcon = ({ icon, grey, onClick }: BtnIconProps) => {
  return (
    <div className="icon_btn center" onClick={onClick}>
      <img
        src={icon}
        className={`bar_icon ${grey ? "grey" : ""}`}
        alt="Loading..."
      />
    </div>
  );
};

export default BtnIcon;
