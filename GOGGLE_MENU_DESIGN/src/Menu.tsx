import { MENU_ITEMS } from "../Constants";

const Menu = ({
  showmenu,
  togglemenu,
}: {
  showmenu: boolean;
  togglemenu: () => void;
}) => {
  return (
    <>
      {showmenu && <div className="overlay" onClick={togglemenu} />}
      <div className={`menu_container  animate_menu`}>
        {MENU_ITEMS.map(({ image, text }, index) => (
          <div className="single_menu_item" key={index}>
            <img
              src={image}
              className={`menu_icon ${index == 0 ? "border-round" : ""}`}
              alt="Loading..."
            />
            <h3>{text}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
