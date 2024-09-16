export interface adminGifType {
    picture_id?: number;
    full_picture_id?: number;
    url?: string;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    language?: string;
    name?: string;
    color_text?: string;
    country?: string;
    format?: string;
    topic?: string;
    value?: string;
    size?: string;
    start_frame?: number,
    end_frame?: number,
    is_publish?: boolean
  }
  
  export interface adminGifScheme {
    images?: adminGifType[];
  }