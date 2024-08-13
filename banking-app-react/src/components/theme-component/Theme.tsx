const Theme = () => {
  return (
    <>
      <div className="box-container ">
        <h1>Div Conatiner Component</h1>
        {/* Headings H1-H6 */}
        <h1>H1 Heading</h1>
        <h2>H2 Heading</h2>
        <h3>H3 Heading</h3>
        <h4>H4 Heading</h4>
        <h5>H5 Heading</h5>
        <h6>H6 Heading</h6>

        {/* Label Example */}
        <label>Example Label</label>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputTextBox">Example TextBox</label>
            <input
              type="text"
              id="exampleInputTextBox"
              aria-describedby="TextHelp"
              placeholder="Enter Value"
            />
            <small id="TextHelp" className="form-text text-muted">
              Description for TextBox.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Example select</label>
            <select id="exampleFormControlSelect1" defaultValue="null">
              <option disabled hidden value="null">
                Select Value
              </option>
              <option>Item 1</option>
              <option>Item 2</option>
              <option>Item 3</option>
              <option>Item 4</option>
              <option>Item 5</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Example textarea
            </label>
            <textarea id="exampleFormControlTextarea1" rows={3}></textarea>
          </div>

          <div className="form-group row">
            <label htmlFor="row-TextBox" className="col-sm-2 col-form-label">
              Example Row TextBox
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="row-TextBox"
                aria-describedby="TextHelp-Row-TextBox"
                placeholder="Enter Value"
              />
              <small id="TextHelp-Row-TextBox" className="form-text text-muted">
                Description for TextBox.
              </small>
            </div>
          </div>

          <label>Check Box</label>
          <div className="form-check">
            <input type="checkbox" value="Example" id="defaultCheck1" />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Default checkbox
            </label>
          </div>
          <div className="form-check">
            <input type="checkbox" value="Example" id="defaultCheck3" />
            <label className="form-check-label" htmlFor="defaultCheck3">
              Default checkbox
            </label>
          </div>
          <div className="form-check">
            <input type="checkbox" value="" id="defaultCheck2" disabled />
            <label className="form-check-label" htmlFor="defaultCheck2">
              Disabled checkbox
            </label>
          </div>
          <div className="form-group">
            <label>Inline Radio Button</label>{" "}
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
                disabled
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                3 (disabled)
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Example file input</label>
            <input type="file" id="exampleFormControlFile1" />
          </div>
          <div>
            <button type="button" className="btn-outline-primary">
              Primary
            </button>
            <button type="button" className="btn-outline-secondary">
              Secondary
            </button>
            <button type="button" className="btn-outline-success">
              Success
            </button>
            <button type="button" className="btn-outline-danger">
              Danger
            </button>
            <button type="button" className="btn-outline-warning">
              Warning
            </button>
            <button type="button" className="btn-outline-info">
              Info
            </button>
            <button type="button" className="btn-outline-light">
              Light
            </button>
            <button type="button" className="btn-outline-light-2">
              Light-2
            </button>
            <button type="button" className="btn-outline-dark">
              Dark
            </button>
            <button type="button" className="btn-link">
              Link
            </button>
          </div>
          <div className="forn-group">
            <label>Example TextBox without any params</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Example TextArea without any params</label>
            <textarea rows={3}></textarea>
          </div>
        </form>
        <div>
          <label>Colors</label>
          <div style={{ backgroundColor: "#F28500", height: "2rem" }}>
            <span>#F28500</span>
          </div>
          <div style={{ backgroundColor: "#F5F5F5", height: "2rem" }}>
            <span>#F5F5F5</span>
          </div>
          <div
            style={{
              backgroundColor: "#333333",
              height: "2rem",
              color: "#F5F5F5",
            }}
          >
            <span>#333333</span>
          </div>
        </div>

        <label>Spinner</label>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>

        <div>
          <div className="custom-div-alert">
            <div className="alert alert-danger" role="alert">
              <span className="custom-div-alert-message">
                <strong>Messege</strong>
              </span>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Theme;
