type GeneralResponse = {
  data?: any;
  status: 'success' | 'fail';
  errors?: {
    message: string;
    code: number;
    details?: any;
  }[];
};

export default GeneralResponse;
