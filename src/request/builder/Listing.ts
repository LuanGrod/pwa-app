import { Methods } from "@/type/Methods";
import { RequestBuilder } from "./Builder";
import { Listing as ResponseHandler } from "@request/response/handler/Listing";

type ListingProps = {
  entity: string;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
};

export class Listing extends RequestBuilder {
  constructor({ entity, parentEntity = null, parentId = null, params = {} }: ListingProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = parentEntity ? `${apiUrl}/${parentEntity}/${parentId}/${entity}` : `${apiUrl}/${entity}`;

    const method: Methods = "GET";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6Im1haWxAbWFpbC5jb20iLCJleHAiOjE3NTAxOTUwMzZ9.sDrRcixmSI2mCPMpTjF611d0R7wlqGmHvy4Yh59q0m4",
    };

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, headers, data: null, responseHandler });

    const query = this.buildQuery(params);
    if (query) {
      this.endpoint += `?${query}`;
    }
  }

  buildQuery(params: Record<string, any>) {
    const esc = encodeURIComponent;
    return Object.entries(params)
      .map(([k, v]) => `${esc(k)}=${esc(v)}`)
      .join("&");
  }
}
