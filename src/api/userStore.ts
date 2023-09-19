import { BlacketUser } from "@utils/types";
import axios from "axios";
import User from "@utils/user";

class UserStore {
    #users: User[] = [];
    loading;

    async getUser(userID: string, reFetch = false): Promise<User> {
        const user = this.#users.find(user => user.id === userID);;
        if (user && !reFetch) return user;
        
        const { data } = await axios.get("/worker/user/".concat(userID));

        if (data.error) throw data;
        else return this.addToCache(data.user);
    }

    getCachedUsers(): { [key: string]: User } {
        return this.#users.reduce((userObject, user) => {
            userObject[user.id] = user;
            return userObject;
        }, {});
    }

    getLocalUser(): User {
        return this.#users.find(user => user.isLocal());
    }

    addToCache(data: BlacketUser, isLocal: boolean = false) {
        const user = new User(data, isLocal);
        this.#users.push(user);
        return user;
    }

    removeCachedUser(userID: string) {
        this.#users = this.#users.filter(user => user.id !== userID);
    }

    updateCachedUser(userID: string, updatedProperties: Partial<BlacketUser>) {
        const userIndex = this.#users.findIndex(user => user.id === userID);
        if (userIndex !== -1) {
            this.#users[userIndex] = {
                ...this.#users[userIndex],
                ...updatedProperties,
            } as User;
        }
    }

    clearCache() {
        this.#users = [];
    }

    filter(predicate) {
        return this.#users.filter(predicate);
    }

    forEach(callback) {
        this.#users.forEach(callback);
    }
}

const userStore = new UserStore();
// @ts-expect-error
unsafeWindow.us = userStore;
export default userStore;