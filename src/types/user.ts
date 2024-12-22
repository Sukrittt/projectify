export type UserAvatar = {
  data: { avatarConfig: string };
  message: string;
};

export type UserInfo = {
  data: { avatarConfig: string; firstName: string; lastName: string };
  message: string;
};
