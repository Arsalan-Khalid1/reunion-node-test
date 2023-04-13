
import User from '../models/user.model';

export class UserService {
  async follow(userId: string, followerId: string) {
    console.log(userId, followerId)
    const query =[User.findByIdAndUpdate(followerId, {
        $push: {
            followers: userId
        }
    }), User.findByIdAndUpdate(userId, {
        $push: {
            following: followerId
        }
    })];
    const result = await Promise.all(query);

    if(result.length > 0)
    {
        return true
    }
  }

  async unfollow(userId: string, followerId: string) {
    const query =[User.findByIdAndUpdate(followerId, {
        $pull: {
            followers: userId
        }
    }), User.findByIdAndUpdate(userId, {
        $pull: {
            following: followerId
        }
    })];
    const result = await Promise.all(query);

    if(result.length > 0)
    {
        return true
    }
  }

  async getUser(userId: string) {
    const user = await User.findById(userId)
    if(user)
    {
        return {
            user: {
                fistName: user.firstName,
                lastName: user.lastName,
                followers: user.followers.length,
                followings: user.following.length,
            }
        }
    }
  }
}
