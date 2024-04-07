type GeneralResponse = {
  data?: any;
  status: 'success' | 'fail';
  errors?: {
    message: string;
    code: number;
    details?: {
      message: string;
      path: string;
    }[];
  };
};

export default GeneralResponse;
