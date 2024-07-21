

const Header = () => (
    <>
        {/* <header className="invert-header fullscreen-menu" data-menuColor="#0c0c0c"> */}
        <header className="invert-header fullscreen-menu">
        <div id="header-container">
          {/* Logo  */}
          <div id="logo" className="hide-ball">
            <a
              className="ajax-link"
              data-type="page-transition"
              href="http://clapat-themes.com/wordpress/montoya"
            >
              <img
                className="black-logo"
                src="http://clapat-themes.com/wordpress/montoya/wp-content/themes/montoya/images/logo.png"
                alt="Logo Black"
              />
              <img
                className="white-logo"
                src="http://clapat-themes.com/wordpress/montoya/wp-content/themes/montoya/images/logo-white.png"
                alt="Logo White"
              />
            </a>
          </div>
          {/* Logo */}

          <nav className="menu-main-menu-container">
            <div className="nav-height">
              <div className="outer">
                <div className="inner">
                  <ul
                    id="menu-main-menu"
                    data-breakpoint="10025"
                    className="flexnav menu"
                  >
                    <li
                      id="menu-item-2742"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-2742 link menu-timeline active"
                    >
                      <a href="#" className="active">
                        <div className="before-span">
                          <span data-hover="Portfolio">Portfolio</span>
                        </div>
                      </a>
                      <ul className="sub-menu">
                        <li
                          id="menu-item-2741"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-2731 current_page_item menu-item-2741 link active"
                        >
                          <a
                            href="http://clapat-themes.com/wordpress/montoya/"
                            aria-current="page"
                            data-type="page-transition"
                            className="ajax-link active"
                          >
                            Overlapping Gallery
                          </a>
                        </li>
                        <li
                          id="menu-item-3077"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3077 link"
                        >
                          <a
                            href="http://clapat-themes.com/wordpress/montoya/parallax-gallery/"
                            data-type="page-transition"
                            className="ajax-link"
                          >
                            Parallax Gallery
                          </a>
                        </li>
                        <li
                          id="menu-item-2729"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2729 link"
                        >
                          <a
                            href="http://clapat-themes.com/wordpress/montoya/portfolio-grid/"
                            data-type="page-transition"
                            className="ajax-link"
                          >
                            Portfolio Grid
                          </a>
                        </li>
                        <li
                          id="menu-item-2740"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2740 link"
                        >
                          <a
                            href="http://clapat-themes.com/wordpress/montoya/archive-gallery/"
                            data-type="page-transition"
                            className="ajax-link"
                          >
                            Archive Gallery
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li
                      id="menu-item-2773"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2773 link menu-timeline"
                    >
                      <a
                        href="http://clapat-themes.com/wordpress/montoya/about/"
                        data-type="page-transition"
                        className="ajax-link"
                      >
                        <div className="before-span">
                          <span data-hover="About">About</span>
                        </div>
                      </a>
                    </li>
                    <li
                      id="menu-item-2802"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2802 link menu-timeline"
                    >
                      <a
                        href="http://clapat-themes.com/wordpress/montoya/stories/"
                        data-type="page-transition"
                        className="ajax-link"
                      >
                        <div className="before-span">
                          <span data-hover="Stories">Stories</span>
                        </div>
                      </a>
                    </li>
                    <li
                      id="menu-item-2772"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2772 link menu-timeline"
                    >
                      <a
                        href="http://clapat-themes.com/wordpress/montoya/contact/"
                        data-type="page-transition"
                        className="ajax-link"
                      >
                        <div className="before-span">
                          <span data-hover="Contact">Contact</span>
                        </div>
                      </a>
                    </li>
                    <li
                      id="menu-item-3026"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-3026 link menu-timeline"
                    >
                      <a href="#">
                        <div className="before-span">
                          <span data-hover="More">More</span>
                        </div>
                      </a>
                      <ul className="sub-menu">
                        <li
                          id="menu-item-3027"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3027 link"
                        >
                          <a
                            href="http://clapat-themes.com/wordpress/montoya/typography/"
                            data-type="page-transition"
                            className="ajax-link"
                          >
                            Typography
                          </a>
                        </li>
                        <li
                          id="menu-item-3028"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3028 link"
                        >
                          <a
                            href="http://clapat-themes.com/wordpress/montoya/multimedia/"
                            data-type="page-transition"
                            className="ajax-link"
                          >
                            Multimedia
                          </a>
                        </li>
                        <li
                          id="menu-item-3029"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3029 link"
                        >
                          <a
                            href="http://clapat-themes.com/wordpress/montoya/shortcodes/"
                            data-type="page-transition"
                            className="ajax-link"
                          >
                            Shortcodes
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          {/* Menu Burger */}
          <div className="button-wrap right menu burger-lines">
            <div className="icon-wrap parallax-wrap">
              <div className="button-icon parallax-element">
                <div id="burger-wrapper">
                  <div id="menu-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-text sticky right">
              <span data-hover="Menu">Menu</span>
            </div>
          </div>
          {/* Menu Burger */}
        </div>
        </header>
    </>
   
      
      
   
);

export default Header;
