exports.sortUsers = function(userList, toCompare) {
    for (user of userList) {
        user['score'] = exports.getCorrelation(toCompare, user) * 100 / 4;
    }
    return userList.sort((user1, user2) => user2['score'] - user1['score']);
}

var compatibility = [
    [3, 3, 3, 4, 3, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 4, 3, 4, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 4, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0],
    [3, 4, 3, 3, 3, 3, 3, 4, 2, 2, 2, 2, 0, 0, 0, 0],
    [4, 3, 3, 3, 3, 3, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 4, 3, 3, 2, 2, 2, 2, 0, 0, 0, 4],
    [3, 3, 4, 3, 4, 3, 3, 3, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 4, 2, 2, 2, 2, 1, 1, 1, 1, 2, 4, 2, 4],
    [0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 4, 2, 4, 2],
    [0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 2, 4, 2, 4],
    [0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 4, 2, 4, 2],
    [0, 0, 0, 0, 1, 2, 1, 1, 2, 4, 2, 4, 3, 3, 3, 3],
    [0, 0, 0, 0, 1, 2, 1, 1, 4, 2, 4, 2, 3, 3, 3, 3],
    [0, 0, 0, 0, 1, 2, 1, 1, 2, 4, 2, 4, 3, 3, 3, 3],
    [0, 0, 0, 0, 1, 2, 4, 1, 4, 2, 4, 2, 3, 3, 3, 3]
]

var pTypes = {
    "INFP": 0,
    "ENFP": 1,
    "INFJ": 2,
    "ENFJ": 3,
    "INTJ": 4,
    "ENTJ": 5,
    "INTP": 6,
    "ENTP": 7,
    "ISFP": 8,
    "ESFP": 9,
    "ISTP": 10,
    "ESTP": 11,
    "ISFJ": 12,
    "ESFJ": 13,
    "ISTJ": 14,
    "ESTJ": 15
}

exports.getCorrelation = function(user1, user2) {
    if (user1 == null || user2 == null) return 0;
    var personality1 = pTypes[user1["personality"]];
    var personality2 = pTypes[user2["personality"]];
    var score = 0;
    if (personality1 != null && personality2 != null) {
        score = 1 * compatibility[personality1][personality2];
    }
    //score = 0;
    var responses1 = user1['responses'];
    var responses2 = user2['responses'];
    if (responses1 == null || responses2 == null) return score;
    for (const[key, val] of Object.entries(responses1)) {
        if (val == responses2[key]) score++;
    }
    return score;
}