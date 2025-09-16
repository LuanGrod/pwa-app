import { RequestBuilderProps } from "./RequestBuilderProps";

export type ListingBuilderProps = RequestBuilderProps & {
  id?: string;
  parentEntity?: string;
  parentId?: number;
  params?: Record<string, any>;
};
