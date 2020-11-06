exports.sortUsers = function(userList, toCompare) {
    var scores = {};
    var username = toCompare['username'];
    for (user of userList) {
        scores[user['username']] = getCorrelation(toCompare, user);
    }
    return userList.sort((user1, user2) => scores[user2['username']] - scores[user1['username']]);
}



getCorrelation = function(user1, user2) {
    var score = 0;
    var responses1 = user1['responses'];
    var responses2 = user2['responses'];
    for (const[key, val] of Object.entries(responses1)) {
        if (val == responses2[key]) score++;
    }
    return score;
}