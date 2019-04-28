import { mount, ReactWrapper } from "enzyme";
import { Geometry, Tiles } from "nndgame-common";
import * as React from "react";
import { TileComponentProps } from ".";
import { Grid } from "./Grid";
import { EmptyTileComponentProps } from "./TileComponent";

// Example Tile type
type Tile = number;

const generateTileMap = () => {
  const tileArray = Array.from(new Array(10), (_, rowIndex: number) => {
    return Array.from(
      new Array(10),
      (__, columnIndex: number) => new Geometry.Point(columnIndex, rowIndex)
    );
  });
  const tiles = new Map<Geometry.Point, Tile>();
  tileArray.forEach((points: Geometry.Point[]) => {
    points.forEach((point: Geometry.Point) => {
      tiles.set(point, 0);
    });
  });
  return new Tiles.TileMap<Tile>(tiles);
};

describe("Grid", () => {
  const TILE_MAP = generateTileMap();
  const FOCAL_POINT = new Geometry.Point(0, 0);
  const VIEW_DIMENSIONS = new Geometry.Dimensions(5, 5);
  const VIEW_MAX_X = 2;
  const VIEW_MAX_Y = 2;
  const VIEW_MIN_X = -2;
  const VIEW_MIN_Y = -2;
  const TOTAL_TILES_IN_VIEW = 25; // 5x5 grid
  const NOOP_COMPONENT = () => null;

  const mockTileComponent = (props: TileComponentProps<any>) => (
    <div data-x={props.x} data-y={props.y} />
  );
  const mockEmptyTileComponent = (props: EmptyTileComponentProps) => null;

  it("should be defined", () => {
    expect(Grid).not.toBeUndefined();
  });

  it('should render "grid" class', () => {
    const wrapper = mount(
      <Grid
        tileMap={TILE_MAP}
        focalPoint={FOCAL_POINT}
        viewDimensions={VIEW_DIMENSIONS}
        tileComponent={NOOP_COMPONENT}
        emptyTileComponent={NOOP_COMPONENT}
      />
    );
    expect(wrapper.find(".grid").length).toStrictEqual(1);
  });

  it("should render the four corner tiles", () => {
    const wrapper = mount(
      <Grid
        tileMap={TILE_MAP}
        focalPoint={FOCAL_POINT}
        viewDimensions={VIEW_DIMENSIONS}
        tileComponent={mockTileComponent}
        emptyTileComponent={mockEmptyTileComponent}
      />
    );

    const topLeftComponents = cellsAtPosition(wrapper, VIEW_MIN_X, VIEW_MIN_Y);
    expect(topLeftComponents.length).toBe(1);

    const topRightComponents = cellsAtPosition(wrapper, VIEW_MAX_X, VIEW_MIN_Y);
    expect(topRightComponents.length).toBe(1);

    const bottomLeftComponents = cellsAtPosition(
      wrapper,
      VIEW_MIN_X,
      VIEW_MAX_Y
    );
    expect(bottomLeftComponents.length).toBe(1);

    const bottomRightComponents = cellsAtPosition(
      wrapper,
      VIEW_MAX_X,
      VIEW_MAX_Y
    );
    expect(bottomRightComponents.length).toBe(1);
  });

  it("should render all tiles in the view", () => {
    const wrapper = mount(
      <Grid
        tileMap={TILE_MAP}
        focalPoint={FOCAL_POINT}
        viewDimensions={VIEW_DIMENSIONS}
        tileComponent={mockTileComponent}
        emptyTileComponent={mockEmptyTileComponent}
      />
    );

    const topLeftComponents = wrapper.find(".cell");
    expect(topLeftComponents.length).toBe(25);
  });

  it("should not render cells outside of the view dimensions", () => {
    const wrapper = mount(
      <Grid
        tileMap={TILE_MAP}
        focalPoint={FOCAL_POINT}
        viewDimensions={VIEW_DIMENSIONS}
        tileComponent={NOOP_COMPONENT}
        emptyTileComponent={NOOP_COMPONENT}
      />
    );
    const componentsOutsideViewDimensions = wrapper
      .find(".cell")
      .filterWhere(
        (e: ReactWrapper) =>
          e.prop("data-x") > VIEW_MAX_X ||
          e.prop("data-x") < VIEW_MIN_X ||
          e.prop("data-y") > VIEW_MAX_Y ||
          e.prop("data-y") < VIEW_MIN_Y
      );
    expect(componentsOutsideViewDimensions.length).toBe(0);
  });
});

/**
 * Returns a component wrapper that contains all cells at the given coordinates
 * @param gridWrapper ReactWrapper that contains the grid to search within
 * @param x x-coordinate of cell to find
 * @param y y-coordinate of cell to find
 */
function cellsAtPosition(
  gridWrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  x: number,
  y: number
): ReactWrapper {
  return gridWrapper
    .find(".cell")
    .filterWhere(
      (e: ReactWrapper) => e.prop("data-x") === x && e.prop("data-y") === y
    );
}
