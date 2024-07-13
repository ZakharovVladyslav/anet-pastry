type TRgb = {
   r: number;
   g: number;
   b: number;
};

type TRgba = {
   r: number;
   g: number;
   b: number;
   a: number;
};

type THsv = {
   h: number;
   s: number;
   v: number;
};

type TColorParams = {
   rgb: TRgb;
   rgba: TRgba;
   hsv: THsv;
   hex: string;
};
