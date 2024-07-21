const Contact = () => (
    <div
    className="wp-block-montoya-gutenberg-container content-row dark-section normal"
    data-bgcolor="#0c0c0c"
    style={{textAlign : "center"}}
  >
    <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-1 wp-block-columns-is-layout-flex">
      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <div className="box-icon-wrapper block-boxes text-align-center">
          <div className="box-icon">
            <i
              className="fa fa-paper-plane fa-2x fa-2x"
              aria-hidden="true"
            ></i>
          </div>
          <div className="box-icon-content">
            <h6 className="no-margins">office@montoya.com</h6>
            <p>Email</p>
          </div>
        </div>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <div className="box-icon-wrapper block-boxes text-align-center">
          <div className="box-icon">
            <i
              className="fa fa-map-marker fa-2x fa-2x"
              aria-hidden="true"
            ></i>
          </div>
          <div className="box-icon-content">
            <h6 className="no-margins">35 M Str, New York, USA</h6>
            <p>Address</p>
          </div>
        </div>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <div className="box-icon-wrapper block-boxes text-align-center">
          <div className="box-icon">
            <i
              className="fa fa-phone fa-2x fa-2x"
              aria-hidden="true"
            ></i>
          </div>
          <div className="box-icon-content">
            <h6 className="no-margins">0040 (7763) 574-8901</h6>
            <p>Phone</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
  
  export default Contact;