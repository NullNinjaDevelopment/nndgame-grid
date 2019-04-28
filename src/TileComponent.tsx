import * as React from "react";

export interface TileComponentProps<Tile> {
  x: number;
  y: number;
  tile: Tile;
}

export type TileComponent<Tile> = React.ComponentType<TileComponentProps<Tile>>;

export interface EmptyTileComponentProps {
  x: number;
  y: number;
}

export type EmptyTileComponent = React.ComponentType<EmptyTileComponentProps>;
