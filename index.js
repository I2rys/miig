//Dependencies
const Axios = require("axios")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <menti_id>")
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log("menti_id is not a number.")
    process.exit()
}

void async function Main(){
    console.log("Grabbing the menti_id information, please wait.")

    try{
        var response = await Axios({
            method: "GET",
            url: `https://www.menti.com/core/vote-ids/${Self_Args[0]}/series`
        })
    
        response = response.data

        console.log(`
Vote id: ${response.vote_id}
Vote key: ${response.vote_key}
Name: ${response.name}
Visible: ${response.visible}

Pace mode: ${response.pace.mode}
Pace active: ${response.pace.active}
Pace state: ${response.pace.state}

Owner id: ${response.owner_id}
Can comment: ${response.comments_enabled}
Leaderboard hidden: ${response.hide_leaderboard}
Closed: ${response.closed_for_voting}

Presentation time: ${response.presentation_time}
Created at: ${response.created_at}
Updated at: ${response.updated_at}
        `)

        Fs.writeFileSync("./temp.json", JSON.stringify(response, null, 2), "utf8")
        console.log("Additional information has been saved to temp.json")
    }catch{
        console.log("The menti_id either does not exist or is invalid.")
    }
}()