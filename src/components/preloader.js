const Preloader = () => (
  <div class="preloader-wrap" data-centerLine="Loading">
  <div class="outer">
    <div class="inner">
      <div class="trackbar">
        <div class="preloader-intro"></div>
        <div class="loadbar"></div>
        <div class="percentage-wrapper">
          <div class="percentage" id="precent"></div>
        </div>
      </div>

      <div class="percentage-intro">Please wait, content is loading</div>
    </div>
  </div>
</div>
  );
  
  export default Preloader;