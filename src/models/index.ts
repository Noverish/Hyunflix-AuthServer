export interface AccessTokenPayload {
  userId: number;
  authority: number;
  allowedPaths: string[];
}

export interface RefreshTokenPayload {
  userId: number;
}
