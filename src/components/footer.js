
const Footer = () => (
    <footer className="hidden">
    <div id="footer-container">
      <div id="backtotop" className="button-wrap left">
        <div className="icon-wrap parallax-wrap">
          <div className="button-icon parallax-element">
            <i className="fa-solid fa-angle-up"></i>
          </div>
        </div>
        <div className="button-text sticky left">
          <span data-hover="Back Top">Back Top</span>
        </div>
      </div>

      <div className="footer-middle">
        <div className="copyright">
          2024 ©
          <a
            className="link"
            target="_blank"
            href="https://www.clapat-themes.com/"
          >
            ClaPat
          </a>
          . All rights reserved.
        </div>
      </div>

      <div className="socials-wrap">
        <div className="socials-icon">
          <i className="fa-solid fa-share-nodes"></i>
        </div>
        <div className="socials-text">Follow Us</div>
        <ul className="socials">
          <li>
            <span className="parallax-wrap">
              <a
                className="parallax-element"
                href="https://dribbble.com/clapat/"
                target="_blank"
              >
                Db
              </a>
            </span>
          </li>
          <li>
            <span className="parallax-wrap">
              <a
                className="parallax-element"
                href="https://twitter.com/clapatdesign/"
                target="_blank"
              >
                Tw
              </a>
            </span>
          </li>
          <li>
            <span className="parallax-wrap">
              <a
                className="parallax-element"
                href="https://www.behance.com/clapat/"
                target="_blank"
              >
                Be
              </a>
            </span>
          </li>
          <li>
            <span className="parallax-wrap">
              <a
                className="parallax-element"
                href="https://www.facebook.com/clapat.ro"
                target="_blank"
              >
                Fb
              </a>
            </span>
          </li>
          <li>
            <span className="parallax-wrap">
              <a
                className="parallax-element"
                href="https://www.instagram.com/clapat.themes/"
                target="_blank"
              >
                In
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
