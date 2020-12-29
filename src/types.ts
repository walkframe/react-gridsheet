import { Renderer } from "./renderers/core";
import { Parser } from "./parsers/core";

export type RenderersType = {[s: string]: Renderer};
export type ParsersType = {[s: string]: Parser};

export type Y = number;
export type X = number;

export type CellType = any;
export type MatrixType = CellType[][];

export type CellOptionType = {
  label?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  verticalAlign?: string;
  renderer?: typeof Renderer;
  parser?: typeof Parser;
};

export type CellsOptionType = {[s: string]: CellOptionType};

export interface OptionsType {
  historySize?: number;
  defaultHeight?: string;
  defaultWidth?: string;
  headerHeight?: string;
  headerWidth?: string;
  verticalAlign?: string;
  cellLabel?: boolean;
  cells?: CellsOptionType;
};

export interface Props {
  data: MatrixType;
  options?: OptionsType;
};

export type RangeType = [number, number]; // [start, end]
export type PositionType = [Y, X]; // [y, x]
export type DraggingType = [Y, X, Y, X]; // [startY, startX, endY, endX]
export type AreaType = DraggingType; // [top, left, bottom, right] (subtype of DraggingType)

export type HistoryType = {
  index: number;
  size: number;
  operations: OperationType[];
};

export type OperationCommandType = "write" | "copy" | "cut" | "addRows" | "delRows" | "addCols" | "delCols";

export type OperationType = {
  command: OperationCommandType;
  src: AreaType;
  dst: AreaType;
  before: MatrixType;
  after: MatrixType;
};

export type ReactionsType = {[s: string]: boolean};