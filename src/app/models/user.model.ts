export interface User {
  user_id?: string;
  user_name?: string;
  user_email?: string;
  user_phone_no?: string;
  user_pwd?: string;
  user_gender?: string;
  user_reg_date?: string;
  user_status?: string;
}

export interface UserCred {
  user_email: string;
  user_pwd: string;
}
