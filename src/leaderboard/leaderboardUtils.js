const http = require('http')

export default class LeaderboardUtils {

    static get hostname() {
        return "localhost";
    }

    static get port() {
        return 8000;
    }

    static get(path,completeCallback,errorCallback) {

        var req = http.request({
            "hostname": LeaderboardUtils.hostname,
            "port": LeaderboardUtils.port,
            "path": path,
            "method": "GET"
        }, (res) => {
            var data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                completeCallback(data);
            });
        });

        req.on("error", (err) => {
            errorCallback(err);
        });

        req.end();

    }

    static postJson(path,json,completeCallback,errorCallback) {
        var req = http.request({
            "hostname": LeaderboardUtils.hostname,
            "port": LeaderboardUtils.port,
            "path": path,
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json',
                'Content-Length': json.length
              }
        }, (res) => {
            var data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                completeCallback(data);
            });
        });

        req.on("error", (err) => {
            errorCallback(err);
        });

        req.end();
    }

    static getScores(n,successCallback,errorCallback) {
        LeaderboardUtils.get("/get_leaderboard", (response) => {
            var scoresJson = JSON.parse(response);
            var scores = [];
            for (var i in scoresJson) scores.push([scoresJson[i]["name"],parseInt(scoresJson[i]["score"])]);
            scores.sort( function(a,b) {return a[1] - b[1];} );
            successCallback(scores);
        }, () => {errorCallback(err)});
    }

    static getMaterials(successCallback,errorCallback) {
        LeaderboardUtils.get("/get_materials", (response) => {
            var materialsJson = JSON.parse(response);
            successCallback(materialsJson);
        }, () => {errorCallback(err)});
    }

    static submitScore(name,email,score,materials,successCallback,errorCallback) {
        var jsonObject = JSON.stringify({
            "name": name,
            "email": email,
            "score": score,
            "materials": materials
        });

        LeaderboardUtils.postJson("/submit_score",jsonObject,successCallback,errorCallback);
    }

}


