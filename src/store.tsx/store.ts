import { UserType } from "../types/user.type";

class store {
  constructor() {}

  user() {
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      return JSON.parse(rawUser) as UserType;
    }
  }
}

export default new store();
