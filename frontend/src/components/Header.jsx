import { Menu } from "lucide-react";
const Header = () => {
  return (
    <div className="nav-container">
      <nav>
        <div className="hamburger">
          <Menu color="white" size={30} />
        </div>
        <div className="profile">
          <div className="avatar">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"
              alt=""
            />
            <div className="status"></div>
          </div>

          <div className="profile-name">
            <p>John Andre</p>
            <p>Sorfjord AS</p>
          </div>
        </div>{" "}
        <div className="flag">
          <p>Norsk Bokmal</p>
          <img
            src="https://storage.123fakturere.no/public/flags/SE.png"
            alt=""
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
