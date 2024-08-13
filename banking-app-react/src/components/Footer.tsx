export function Footer(): JSX.Element {
  return (
    <>
      <div className="account-detail sticky-bottom">
        <div className="align-div-c footer-dark">
          <footer className="footer-css">
            <div className="wrapper">
              <div className="primary list-of-line">
                <div className="link-row ">
                  <a className="link">
                    <span className="sr-only1">ABM Locater</span>
                  </a>
                  <div className="separator "></div>
                  <a className="link">
                    <span className="sr-only1">FAQs</span>
                  </a>
                  <div className="separator "></div>
                  <a className="link">
                    <span className="sr-only1">Careers</span>
                  </a>
                  <div className="separator "></div>
                  <a className="link">
                    <span className="sr-only1">Contact Us</span>
                  </a>
                  <div className="separator "></div>
                  <a className="link">
                    <span className="sr-only1">Rates</span>
                  </a>

                  <div className="list-on-right">
                    <a
                      className="link "
                      href="#"
                      target="_blank"
                      aria-label="Twitter (opens in new tab)"
                    >
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="3em"
                        width="3em"
                      >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 01-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 01-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 00229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" />
                      </svg>
                    </a>

                    <a
                      className="link "
                      href="#"
                      target="_blank"
                      aria-label="Facebook (opens in new tab)"
                    >
                      {/* <span className="social-media-icon"> */}
                      <svg
                        viewBox="0 0 960 1000"
                        fill="currentColor"
                        height="3em"
                        width="3em"
                      >
                        <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980s-246.667-47-340-141S0 632 0 500c0-133.333 46.667-246.667 140-340S346.667 20 480 20m114 330v-78h-72c-29.333 0-54 11-74 33s-30 49-30 81v44h-76v74h76v222h86V504h90v-74h-90v-52c0-18.667 6-28 18-28h72" />
                      </svg>
                      {/* </span> */}
                    </a>

                    <a
                      className="link"
                      href="#"
                      target="_blank"
                      aria-label="Linkedin (opens in new tab)"
                    >
                      {/* <span className="social-media-icon"> */}
                      <svg
                        viewBox="0 0 960 1000"
                        fill="currentColor"
                        height="3em"
                        width="3em"
                      >
                        <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                      </svg>
                      {/* </span> */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="secondary list-of-line">
              <div className="link-row">
                <a className="link-sec">
                  <span className="sr-only1">Privacy</span>
                </a>
                <a className="link-sec">
                  <span className="sr-only1">Legal</span>
                </a>
                <a className="link-sec">
                  <span className="sr-only1">Security</span>
                </a>
                <a className="link-sec">
                  <span className="sr-only1">Accessibility</span>
                </a>
                <a className="link-sec">
                  <span className="sr-only1">AdChoices</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
