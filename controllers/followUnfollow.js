const User = require('../models/user_Schema');

// user1  follow user2  where user1 is login and he follow user2
exports.follow = async(req, res)=>{
    const user2Id = req.params.id;    // get user jisse follow karna hai from req paramter
    const currUserId = req._id;       // that is me 

    try {
        // geting users schema
        const user2 = await User.findById(user2Id);
        const user1 = await User.findById(currUserId);
        // if user 2 is not in DB
        if(!user2){
            return res.status(404).send({message : " not valid request !"});
        }
        // if user follow himself or user already follow same user
        if(user2Id == currUserId || user1.follow.includes(user2Id)){
            return res.status(404).send({message : " already followed || your self !"});
        }
        // save user1 in user2 follower list
        user2.follower.push(currUserId);
        await user2.save();

        // save user1 follow user2
        user1.follow.push(user2Id);
        await user1.save();
        res.status(201).send({
            message : user1.username + " follow "+ user2.username,
            User : user1.username,
            Follows : user1.follow.length,
            Followers : user1.follower.length
        });
    }catch(error){
        res.status(500).send({
            message : 'Internal Error !'
        });
    }   
}

// Handler for user1 unfollow user2

exports.unfollow = async(req, res)=>{
    const user2Id = req.params.id;     // get user jisse unfollow karna hai from req paramter
    const currUser = req._id;
    try {
        // geting users schema
        const user2 = await User.findById(user2Id);
        const user1 = await User.findById(currUser);
        // if user 2 is not in DB
        if(!user2){
            return res.status(404).send({message : " not valid request !"});
        }
        // if user unfollow himself or user2 does not exist in user1 follow list
        if(user2Id == currUser || !user1.follow.includes(user2Id)){
            return res.status(404).send({message : " already unfollowed || it self !"});
        }
        // save user1 in user2 follower list
        let arr = user2.follower;
        let n = arr.length;
        function recursive(arr, n, currUser){
            if(n < 0 ){
                return;
            }
            let temp = arr.pop();
            recursive(arr, n-1, currUser);
            if(currUser !== temp){
                arr.push(temp);
            }
        }
        recursive(arr, n, currUser);
        arr.shift();  // its remove undefined 
        user2.follower = arr;
        await user2.save();   

        // save user1 unfollow user2
        let arr1 = user1.follow;
        let n1 = arr1.length;
        function recursive(arr, n, user){
            if(n < 0 ){
                return;
            }
            let temp = arr.pop();
            recursive(arr, n-1, user);
            if(user !== temp){
                arr.push(temp);
            }
        }
        recursive(arr1, n1, user2Id);
        arr1.shift();  // its remove undefined 
        user1.follow = arr1;
        await user1.save();   
        res.status(201).send({
            message : user1.username + " unfollow "+ user2.username,
            User : user1.username,
            Follows : user1.follow.length,
            Followers : user1.follower.length
        });
    }catch(error){
        res.status(500).send({
            message : 'Internal Error !'
        });
    }   
}