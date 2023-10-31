const f = require('fetch');

const my_PUUID = "x-lACuwHZzNL5LUtJYdDAL3Dq9AljuF_x4F3OzNQjxqoKmpS-Z1JmUNmRaBPqNpFPuErGm-kbPBm9g";
const my_api_key = "RGAPI-e98bb5c0-e68d-4cea-9f7d-e28b234cfe69"
const api_url = "https://europe.api.riotgames.com";
const match_history_suffix = "/lol/match/v5/matches/by-puuid/" + my_PUUID + "/ids?start=0&count=20&api_key=" + my_api_key;
const match_details_suffix = "/lol/match/v5/matches/"
const my_match_history_url = api_url + match_history_suffix;

let match_history = null
let match_history_details = [];
let my_match_history = []


async function get_match_info(history) {
    for (let i=0; i<history.length; i++) {

        let current_url = api_url + match_details_suffix + history[i] + "?api_key=" + my_api_key;

        let result = await fetch(current_url)
        result = await result.json()
        match_history_details.push(result);
        find_my_match_stats(match_history_details[i])
    }
    put_match_history_to_dom();
}

function find_my_match_stats(history_details) {
    let participants = history_details['info']['participants'];

    for (let i = 0; i < 10; i++) {
        if (participants[i]['puuid'] === my_PUUID) {
            my_match_history.push(participants[i]);
        }
    }
}


function put_match_history_to_dom() {

    for (let i=0; i<my_match_history.length; i++) {
        let current_match = my_match_history[i];

        let match_result = current_match['win'] ? 'match-win' : 'match-loss';
        let champion_name = current_match['championName'];

        let kill = current_match['kills'];
        let death = current_match['deaths'] === 0 ? 1 : current_match['deaths'];
        let assist = current_match['assists'];

        let kda_ratio = (kill + assist) / death;

        let creep_score = current_match['totalMinionsKilled'];

        let item1 = current_match['item0'];
        let item2 = current_match['item1'];
        let item3 = current_match['item2'];
        let item4 = current_match['item3'];
        let item5 = current_match['item4'];
        let item6 = current_match['item5'];

        let template_str = `
                <img class="history-img" src="../resources/lol_data/13.20.1/img/champion/${champion_name}.png" alt="${champion_name}.jpg">
                <div class="history-stats">Statystyki: <br>${kill}/${death}/${assist}</div>
                <div class="history-kda">KDA:<br>${kda_ratio.toFixed(2)}</div>
                <div class="history-cs">Zabite stwory:<br>${creep_score}</div>
                <div class="history-items">
                    <img class="game-item" src="../resources/lol_data/13.20.1/img/item/${item1}.png" alt="${item1}.png">
                    <img class="game-item" src="../resources/lol_data/13.20.1/img/item/${item2}.png" alt="${item2}.png">
                    <img class="game-item" src="../resources/lol_data/13.20.1/img/item/${item3}.png" alt="${item3}.png">
                    <img class="game-item" src="../resources/lol_data/13.20.1/img/item/${item4}.png" alt="${item4}.png">
                    <img class="game-item" src="../resources/lol_data/13.20.1/img/item/${item5}.png" alt="${item5}.png">
                    <img class="game-item" src="../resources/lol_data/13.20.1/img/item/${item6}.png" alt="${item6}.png">
                </div>`

        let new_element = document.createElement('div');
        new_element.setAttribute('class', `match ${match_result}`);
        new_element.innerHTML = template_str;
        document.getElementById("match-history-container").appendChild(new_element);
    }
}


fetch(my_match_history_url)
    .then(res => res.json())
    .then(res => {
        match_history = res;
        get_match_info(match_history);
    })



