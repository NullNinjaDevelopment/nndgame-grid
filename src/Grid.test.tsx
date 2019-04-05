import { shallow } from "enzyme";
import * as React from "react";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("should not be undefined", () => {
    expect(Grid).not.toBeUndefined();
  });

  it('should render "grid" class', () => {
    const wrapper = shallow(<Grid tileMap={""} />);
    expect(wrapper.find(".grid")).not.toBeUndefined();
  });
});
