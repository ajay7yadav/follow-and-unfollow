# follow-and-unfollow


- how i post follow req to another user

localhost:8080/dosto/v1/users/follow/62d6bfb367bc2b805919b509

- what i get res from application

{
    "message": "ajay follow tiger",
    "User": "ajay",
    "Follows": 1,
    "Followers": 2
}

- how i post unfollow req to another user

localhost:8080/dosto/v1/users/unfollow/62d6bfb367bc2b805919b509

- what i get res

{
    "message": "ajay unfollow tiger",
    "User": "ajay",
    "Follows": 0,
    "Followers": 2
}
