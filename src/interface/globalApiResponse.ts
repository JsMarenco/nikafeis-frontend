export default interface GlobalApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}
