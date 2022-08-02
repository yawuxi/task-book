// Allows to use image imports in ts/tsx files
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}
