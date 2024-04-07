export class AuthenticateResultModel  {
    accessToken: string | undefined;
    tokenType: string | undefined;
    expiresIn: string | undefined;
    refreshToken: string | undefined;
}