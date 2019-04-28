import { Geometry, Tiles } from "nndgame-common";
import * as React from "react";
import { isNullOrUndefined } from "util";
import { EmptyTileComponent, TileComponent } from "./TileComponent";
import { TileContainer } from "./TileContainer";

export interface GridProps<Tile> {
  tileMap: Tiles.TileMap<Tile>;
  focalPoint: Geometry.Point;
  viewDimensions: Geometry.Dimensions;
  tileComponent: TileComponent<Tile>;
  emptyTileComponent: EmptyTileComponent;
}

function range(from: number, to: number) {
  return Array.from(
    new Array(to - from + 1),
    (_, value: number) => from + value
  );
}

/**
 * Renders a grid of tiles
 */
export const Grid = <Tile extends any>(props: GridProps<Tile>) => {
  const viewBoundingRect: Geometry.BoundingRectangle = Geometry.calculateBoundingRectangle(
    props.focalPoint,
    props.viewDimensions
  );
  const TypedTileComponent = props.tileComponent;
  const TypedEmptyTileComponent = props.emptyTileComponent;
  return (
    <>
      <div className="grid">
        {range(viewBoundingRect.min.y, viewBoundingRect.max.y).map(
          (y: number) => (
            <div key={y} className="row" data-row={y}>
              {range(viewBoundingRect.min.x, viewBoundingRect.max.x).map(
                (x: number) => {
                  // console.log(`(x, y) = (${x}, ${y})`);
                  const tile = props.tileMap.get(new Geometry.Point(x, y));
                  return (
                    <TileContainer
                      key={`${x},${y}`}
                      position={new Geometry.Point(x, y)}
                    >
                      {isNullOrUndefined(tile) ? (
                        <TypedEmptyTileComponent x={x} y={y} />
                      ) : (
                        <TypedTileComponent x={x} y={y} tile={tile} />
                      )}
                    </TileContainer>
                  );
                }
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};
