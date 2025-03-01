import menuicon from "/MENU.png";
import gmailicon from "/GMAIL.png";
import Menu from "./Menu";
import BtnIcon from "./BtnIcon";
import { createPortal } from "react-dom";
import { useState } from "react";
import DROPDOWN from "/dropdown.png";
import SETTINGS from "/settings.png";
import PROFILE from "/PROFILE.png";

function App() {
  const [showmenu, setshowmenu] = useState(false);

  const togglemenu = () => setshowmenu((p) => !p);

  return (
    <>
      <div className="topbar_container">
        <div className="left_container">
          <BtnIcon icon={menuicon} grey />
          <div className="gmail_icon_container center">
            <img src={gmailicon} className="gmail_icon" alt="Loading..." />
            <h2>Gmail</h2>
          </div>
        </div>
        <div className="right_container">
          {showmenu &&
            createPortal(
              <Menu togglemenu={togglemenu} showmenu={showmenu} />,
              document.body
            )}
          <div className="icons_container">
            <BtnIcon icon={DROPDOWN} grey onClick={togglemenu} />
            <BtnIcon icon={SETTINGS} grey />
            <BtnIcon icon={PROFILE} grey={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
