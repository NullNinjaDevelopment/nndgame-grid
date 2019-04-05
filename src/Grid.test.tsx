import * as React from "react";
import { Grid } from "./Grid";
import { shallow } from "enzyme";

describe('Grid', () => {
  it('should not be undefined', () => {
    expect(Grid).not.toBeUndefined();
  });

  it('should render "grid" class', () => {
    const wrapper = shallow(<Grid />);
    expect(wrapper.find('.grid')).not.toBeUndefined();
  });
});
