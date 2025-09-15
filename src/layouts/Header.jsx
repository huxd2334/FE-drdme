import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";
import { Home, LogIn, LogOut, Menu, X, ChevronRight, User} from "lucide-react";
import "./styles.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const navItems = [
    { path: ROUTES.HOME,        label: "Home",    },
    { path: ROUTES.ANALYSIS,    label: "Analyze",  },
    { path: ROUTES.HISTORY,  label: "History",  },
    { path: ROUTES.COMPARE,       label: "Compare", },
  ];

  const displayName =
    user?.name || user?.username || user?.email || user?.doctorId || "Doctor";

  return (
    <header className="hdr" role="banner">
      <div className="hdr__container">
        <div className="hdr__bar">
          <div
            className="hdr__brand"
            onClick={() => navigate(ROUTES.HOME)}
            role="button"
            tabIndex={0}
          >
            <img
              src="/design.png"
              className="hdr__logoFull"
              style={{ width: "300px", height: "80px" }}
            />
          </div>

          <nav className="hdr__nav" aria-label="Main navigation">
            {navItems.map(({ path, label }, index) => (
              <NavLink
                key={`${path}-${index}`}
                to={path}
                className={({ isActive }) =>
                  `hdr__link ${isActive ? "hdr__link--active" : ""}`
                }
              >
                <span>{label}</span>
                <span className="hdr__linkDot" aria-hidden="true" />
              </NavLink>
            ))}

            {isAuthenticated && (
              <div className="hdr__greet" title={displayName}>
                <span className="hdr__greetText">Hello, {displayName}</span>
              </div>
            )}

            {isAuthenticated ? (
              <button
                className="hdr__btn hdr__btn--danger"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut className="hdr__btnIcon" aria-hidden="true" />
                <span>Log out</span>
              </button>
            ) : (
              <NavLink
                className="hdr__btn hdr__btn--primary"
                to={ROUTES.LOGIN}
                aria-label="Login"
              >
                <LogIn className="hdr__btnIcon" aria-hidden="true" />
                <span>Log in</span>
              </NavLink>
            )}
          </nav>

          <button
            className="hdr__mobileToggle"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? (
              <X className="hdr__mobileIcon" aria-hidden="true" />
            ) : (
              <Menu className="hdr__mobileIcon" aria-hidden="true" />
            )}
          </button>
        </div>

{/*         <div */}
{/*           id="mobile-nav" */}
{/*           className={`hdr__mobile ${isMobileMenuOpen ? "is-open" : ""}`} */}
{/*         > */}
{/*           <nav className="hdr__mobileNav" aria-label="Mobile navigation"> */}
{/*             {isAuthenticated && ( */}
{/*               <div className="hdr__mobileHello"> */}
{/*                 <User className="hdr__mobileIcon" aria-hidden="true" /> */}
{/*                 <span>Hello, {displayName}</span> */}
{/*               </div> */}
{/*             )} */}

{/*             {navItems.map(({ path, label }, index) => ( */}
{/*               <NavLink */}
{/*                 key={`${path}-${index}`} */}
{/*                 to={path} */}
{/*                 className={({ isActive }) => */}
{/*                   `hdr__mobileLink ${isActive ? "is-active" : ""}` */}
{/*                 } */}
{/*               > */}
{/*                 <div className="hdr__mobileLeft"> */}
{/*                   <span>{label}</span> */}
{/*                 </div> */}
{/*                 <ChevronRight className="hdr__chev" aria-hidden="true" /> */}
{/*               </NavLink> */}
{/*             ))} */}

{/*             {isAuthenticated ? ( */}
{/*               <button className="hdr__mobileLogout" onClick={handleLogout}> */}
{/*                 <div className="hdr__mobileLeft"> */}
{/*                   <LogOut className="hdr__mobileIcon" aria-hidden="true" /> */}
{/*                   <span>Log out</span> */}
{/*                 </div> */}
{/*                 <ChevronRight className="hdr__chev" aria-hidden="true" /> */}
{/*               </button> */}
{/*             ) : ( */}
{/*               <NavLink to={ROUTES.LOGIN} className="hdr__mobileLogin"> */}
{/*                 <div className="hdr__mobileLeft"> */}
{/*                   <LogIn className="hdr__mobileIcon" aria-hidden="true" /> */}
{/*                   <span>Log in</span> */}
{/*                 </div> */}
{/*                 <ChevronRight className="hdr__chev" aria-hidden="true" /> */}
{/*               </NavLink> */}
{/*             )} */}
{/*           </nav> */}
{/*         </div> */}
      </div>
    </header>
  );
};

export default Header;
