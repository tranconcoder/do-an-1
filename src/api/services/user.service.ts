import type { RootFilterQuery } from 'mongoose';
import type { UserModel } from '../models/user.model';

import userModel from '../models/user.model';
import _ from 'lodash';

export default class UserService {
	public static checkUserExist = async (query: RootFilterQuery<UserModel>) => {
		return await userModel.exists(query).lean();
	};

	public static createUser = async (data: UserModel) => {
		const user = await userModel.create(data);

		return user ? _.pick(user, ['role', 'id']) : null;
	};
}
