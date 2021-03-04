const http = require("https");

export default class LeaderboardUtils {
    static get hostname() {
        return "sutdoverdue.dev";
    }

    static get port() {
        return 443;
    }

    static get(path, completeCallback, errorCallback) {
        var req = http.request(
            {
                hostname: LeaderboardUtils.hostname,
                port: LeaderboardUtils.port,
                path: path,
                method: "GET",
                headers: {
                    "Host": "sutdoverdue.dev"
                }
            },
            (res) => {
                var data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    completeCallback(data);
                });
            }
        );

        req.on("error", (err) => {
            errorCallback(err);
        });

        req.end();
    }

    static postJson(path, json, completeCallback, errorCallback) {
        var req = http.request(
            {
                hostname: LeaderboardUtils.hostname,
                port: LeaderboardUtils.port,
                path: path,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Host": "sutdoverdue.dev"
                },
            },
            (res) => {
                var data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    completeCallback(data);
                });
            }
        );

        req.on("error", (err) => {
            errorCallback(err);
        });
        req.write(json);
        req.end();
    }

    static getScores(n, difficulty, successCallback, errorCallback) {
        LeaderboardUtils.get(
            `/get_leaderboard?max_entries=${n}&difficulty=${difficulty}`,
            (response) => {
                var scores = JSON.parse(response);
                scores.sort(function (a, b) {
                    return a["score"] - b["score"];
                });
                successCallback(scores);
            },
            (err) => {
                errorCallback(err);
            }
        );
    }

    static getMaterials(successCallback, errorCallback) {
        LeaderboardUtils.get(
            "/get_materials",
            (response) => {
                var materialsJson = JSON.parse(response);
                successCallback(materialsJson);
            },
            (err) => {
                errorCallback(err);
            }
        );
    }

    static submitScore(
        name,
        gender,
        email,
        difficulty,
        score,
        bonus,
        materials,
        successCallback,
        errorCallback
    ) {
        var jsonObject = JSON.stringify({
            name: name,
            gender: gender,
            email: email,
            difficulty: difficulty,
            score: score,
            bonus: bonus,
            materials: materials
        });

        LeaderboardUtils.postJson(
            "/submit_score",
            jsonObject,
            (response)=>{
                var data = JSON.parse(response);
                successCallback(data);
            },
            errorCallback
        );
    }
}
