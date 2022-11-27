export class RequestError {
  public message: string;
  public code: number;

  constructor(
    protected prismaErrCode: string,
    protected meta: Record<string, unknown>,
  ) {
    if (this.prismaErrCode !== 'P2002') {
      this.message = 'cannot complete the request, please try again';
      this.code = 400;

      return;
    }

    if (meta.target === 'user_profile_userId_key') {
      this.message = 'This user is already registered';
    }
    if (meta.target === 'user_profile_username_key') {
      this.message = 'This username already taken';
    }
  }
}
