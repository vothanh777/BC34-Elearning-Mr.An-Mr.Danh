import React from "react";
import logo from "../../Assets/Images/cyberlogo-white.png";

export default function Footer() {
  return (
    <footer
      className="bg-dark text-white text-left px-lg-5 py-3"
      style={{ overflow: "hidden" }}
    >
      <div className="row m-0">
        <div className="col-lg-4 col-md-6">
          <img src={logo} alt="" height={50} />
          <p className="pb-3">
            Cybersoft Academy - Hệ thống đào tạo lập trình chuyên sâu theo dự án
            thực tế
          </p>
          <h6>NHẬN TIN SỰ KIỆN & KHUYẾN MÃI</h6>
          <p>
            Cybersoft sẽ gửi các khoá học trực tuyến và các chương trình học
            hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn đến các
            bạn
          </p>
          <form className="row m-0">
            <input
              type="text"
              className="form-control d-inline w-50 mr-2"
              placeholder="your-email@gmail.com"
            />
            <button className="btn btn-success">ĐĂNG KÝ</button>
          </form>
          <p className="m-0 pt-2">
            <i className="fa fa-map-marker-alt mr-2"></i>
            Cơ sở 1: Địa chỉ 1
          </p>
          <p className="m-0">
            <i className="fa fa-map-marker-alt mr-2"></i>
            Cơ sở 2: Địa chỉ 2
          </p>
          <p className="m-0">
            <i className="fa fa-map-marker-alt mr-2"></i>
            Cơ sở 3: Địa chỉ 3
          </p>
          <p className="m-0">
            <i className="fa fa-map-marker-alt mr-2"></i>
            Cơ sở 4: Địa chỉ4
          </p>
          <p className="m-0">
            <i className="fa fa-phone mr-2"></i> 0123456789
          </p>
        </div>
        <div className="col-lg-4 col-md-6">
          <h6>ĐĂNG KÝ TƯ VẤN</h6>
          <form>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Họ và tên *"
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Email liên hệ *"
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Điện thoại liên hệ *"
              required
            />
            <div className="text-center mt-2">
              <button className="btn btn-success">ĐĂNG KÝ TƯ VẤN</button>
            </div>
          </form>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            officiis dolores, molestiae maiores ex sit totam praesentium dicta
            consequuntur minus.
          </p>
        </div>
        <div className="col-lg-4 col-md-12 text-center">
          <div
            className="fb-page fb_iframe_widget w-100"
            data-href="https://www.facebook.com/lophocviet/"
            data-width={340}
            data-height={325}
            data-tabs="timeline"
            data-hide-cover={0}
            data-show-facepile={0}
            data-hide-cta={0}
            data-small-header={0}
            data-adapt-container-width={1}
            fb-xfbml-state="rendered"
            fb-iframe-plugin-query="adapt_container_width=true&app_id=&container_width=0&height=325&hide_cover=false&hide_cta=false&href=https%3A%2F%2Fwww.facebook.com%2Flophocviet%2F&locale=vi_VN&sdk=joey&show_facepile=false&small_header=false&tabs=timeline&width=340"
          >
            <span
              style={{ verticalAlign: "bottom", width: "100%", height: 325 }}
            >
              <iframe
                width="340px"
                height="325px"
                data-testid="fb:page Facebook Social Plugin"
                title="fb:page Facebook Social Plugin"
                frameBorder={0}
                allowTransparency="true"
                allowFullScreen="true"
                scrolling="no"
                allow="encrypted-media"
                src="https://www.facebook.com/v2.12/plugins/page.php?adapt_container_width=true&app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df143a997695f21%26domain%3Dcybersoft.edu.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fcybersoft.edu.vn%252Ff3ba97712122a44%26relation%3Dparent.parent&container_width=0&height=325&hide_cover=false&hide_cta=false&href=https%3A%2F%2Fwww.facebook.com%2Flophocviet%2F&locale=vi_VN&sdk=joey&show_facepile=false&small_header=false&tabs=timeline&width=340"
                style={{
                  border: "none",
                  visibility: "visible",
                  width: 340,
                  height: 325,
                }}
                className
              />
            </span>
          </div>
          <h5 className="mt-3 ">
            <span>Get Socials: </span>
            <i className="fab fa-facebook mx-2" />
            <i className="fab fa-youtube" />
          </h5>
        </div>
        <div
          className="mx-3 w-100 my-2"
          style={{
            borderTop: "3px solid white",
          }}
        ></div>
      </div>
      <p className="text-center m-0">
        <i className="fa fa-copyright" aria-hidden="true"></i> Copyright
      </p>
    </footer>
  );
}
