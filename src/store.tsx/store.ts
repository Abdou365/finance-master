import { UserType } from "../types/user.type";

class store {
  constructor() {}

  user() {
    const rawUser = localStorage.getItem("user");
    try {
      return JSON.parse(rawUser!) as UserType;
    } catch (error) {
      localStorage.removeItem("user");
      window.location.replace("/auth");
    }
  }

  setUser(user: UserType) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!this.user();
  }

  isAdmin() {
    return this.user()?.role === "admin";
  }

  isSuperAdmin() {
    return this.user()?.role === "superadmin";
  }

  isPremium() {
    return this.user()?.role === "premium";
  }

  isNotNormalUser() {
    return this.isAdmin() || this.isSuperAdmin() || this.isPremium();
  }

  isFreeUser() {
    return !this.isAdmin() && !this.isSuperAdmin() && !this.isPremium();
  }
}

export default new store();
