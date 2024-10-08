export type fileInterfase = {
  asset_id: string;
  public_id: string;
  version: number,
  version_id: string,
  signature: string,
  width: number,
  height: number,
  format: string,
  resource_type: string,
  created_at: string,
  tags: string[],
  bytes: number,
  type: string,
  etag: string,
  placeholder: false,
  url: string,
  secure_url:string,
  folder: string,
  overwritten: Boolean,
  original_filename: string,
  original_extension: string,
  api_key: string,
};
