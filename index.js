const Discord  = require('discord.js')
const bot = new Discord.Client();
const weather = require('weather-js');
const prefix = '$'
const { Player } = require("discord-player");
var queue = []
// var songnum =0;
var j=0
const player = new Player(bot)
bot.player = player;
bot.player.on("trackStart", (message, track) => {
    // console.log("trackstart")
    // songnum = songnum+1
    queue.shift();
    // console.log(queue);

      if(queue.length>0){  
        //   console.log(`opore playing:${queue[songnum]}`)
    // bot.player.play(message , queue[songnum] , { firstResult: false }); 

          let embed = new Discord.MessageEmbed()
                embed.setTitle(`Songs Queue`)
                for(let i=0;i<queue.length;i++){
                    embed.addField(i+1, queue[i], true)
                }
        message.channel.send(embed)}

                
                if(queue.length==0){
                    let embed = new Discord.MessageEmbed()
                embed.setTitle(`No Songs In the Queue`)
        message.channel.send(embed)
        }

            
    message.channel.send(`***Now playing ${track.title}...***`)
        // message.channel.send('$play')
})
bot.login('ODM4NjgxODUwOTYwNDEyNjgy.YI-pVw.s4lTlfRKtAuYzaltufa6Ms76JZI');
bot.on('ready',()=>{
    console.log(`logged in as ${bot.user.tag}!`);
    
 
    
})
bot.on("message",(msg)=>{
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        
        const command = args.shift().toLowerCase();
        // console.log({args:args,
        //              command:command}); 
        

    


    if(command === 'pause'){
                const success = bot.player.pause(msg);

        if (success) msg.channel.send(`:relieved: - Song ${bot.player.getQueue(msg).playing.title} paused !`);
    }
    // if(command === "play" && args.join("")==""){
    //     bot.player.play(msg, queue[0] , { firstResult: false });
    // }
    if(command === "play"){
      
                queue.push(args.join(' '));
            
                if (!msg.member.voice.channel) return msg.channel.send(`:smiling_face_with_tear: - You're not in a voice channel !`);

                if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`:smiling_face_with_tear: - You are not in the same voice channel !`);

                if (!args[0]) return msg.channel.send(`:smiling_face_with_tear: - Please indicate the title of a song !`);


                // var song_name = queue[0]
                // bot.player.play(msg, song_name , { firstResult: false });
            //    console.log(`playing:${queue[songnum]}`)
            //     console.log(queue)
                if(queue.length>0){  let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Songs Queue`)
                    for(let i=0;i<queue.length;i++){
                        embed.addField(i+1, queue[i], true)

                    }
                    msg.channel.send(embed)
                bot.player.play(msg, queue[0] , { firstResult: false });


                    }
                    else{
                        let embed = new Discord.MessageEmbed()
                    embed.setTitle(`No Songs In the Queue`)
                    msg.channel.send(embed)
    
                    }


      }
      if(msg.content.toLowerCase()== 'botjoined'){
        bot.player.play(msg, 'pornhub intro patric M.', { firstResult: false });
        

      }
      if(command === 'resume'){
           const success = bot.player.resume(msg);

        if (success) msg.channel.send(`:innocent: - Song ${bot.player.getQueue(msg).playing.title} resumed !`);
      }
       
    if(command === 'help'){
        let embed = new Discord.MessageEmbed()
                embed.setTitle('$play "music name" to play the song $pause to pause song $resume to resume the song $queue to see the queue $weather for weather')
                msg.channel.send(embed)
    
    }
    if(command == 'queue'){
        
       if(queue.length>0){  let embed = new Discord.MessageEmbed()
                embed.setTitle(`Songs Queue`)
                for(let i=0;i<queue.length;i++){
                    embed.addField(i+1, queue[i], true)
                }
        msg.channel.send(embed)}
         else{
                    let embed = new Discord.MessageEmbed()
                embed.setTitle(`No Songs In the Queue`)
        msg.channel.send(embed)}

       }
               

                
        


    
    if (command === "weather") { 
        // console.log("asche")
         let embed  = new Discord.MessageEmbed()
         embed.setTitle("Enter the Place");
        msg.channel.send(embed)
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 5000 });
        collector.on('collect',(m)=>{
        //    console.log(`ei jo ami tuki : ${m}`)
                        // console.log('dhukche')
               weather.find({search: `${m}`, degreeType: 'C'}, function(err, result) {
                     if(err){
                   return msg.channel.send('Some error occured please try again')
                         }
                if (result) {
                    if(result[0] == undefined){
                        return msg.channel.send(`"${m}" - this place doesn't exist`)
                    }
                                    let embed = new Discord.MessageEmbed()
                                    embed.setTitle(`Weather - ${result[0].location.name}`)
                                    embed.setColor("#ff2050")
                                    embed.setDescription("Temperature units can may be differ some time")
                                    embed.addField("Temperature", `${result[0].current.temperature} Celcius`, true)
                                    embed.addField("Sky Text", result[0].current.skytext, true)
                                    embed.addField("Humidity", result[0].current.humidity, true)
                                    embed.addField("Wind Speed", result[0].current.windspeed, true)//What about image
                                    embed.addField("Observation Time", result[0].current.observationtime, true)
                                    embed.addField("Wind Display", result[0].current.winddisplay, true)
                                    embed.setThumbnail(result[0].current.imageUrl);
                                    msg.channel.send(embed)
                }
              
            });
        })
       
 
    }
    if(msg.content.toLowerCase() === 'ping'){
        msg.channel.send("tumi chitya")
        
    }
    if(msg.content.toLowerCase() === 'i'){
        msg.channel.send('Love You');
    }
    if(msg.content.toLowerCase() === 'sexting'){
        msg.channel.send('No, I am vodro bro tumi horniness masturbate kore komao');
    }
    if(msg.content.toLowerCase() === 'feeling'){
        msg.channel.send("Lonely Bro?");
    }
    if(msg.content.toLowerCase() === 'what is my avatar'){
        msg.channel.send(msg.author.displayAvatarURL());
    }
 
    if(msg.content.toLowerCase() === 'say my name'){
        msg.channel.send(msg.author.username);
    }
    if (msg.content.toLowerCase()==='srijita') {
        msg.channel.send(' "Ami tomake Bhalobasi :heart: "  ')
    }
    if(msg.content.toLowerCase()==='hello'){
        msg.channel.send('Hi Babes');
    }
   
})

bot.on('guildMemberAdd', member => {
    // console.log('activatedmemberadd');
    let channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Welcome to mindver, ${member}`);
}); 

bot.on('presenceUpdate', (oldMember, newMember) => {
    // console.log(newMember.userID);
   var user =  bot.users.cache.find(user => user.id === newMember.userID)
//    console.log(user)
   var username = user.username
    let channel = newMember.guild.channels.cache.find(ch => ch.name === 'general');
    if (newMember.status=="online") {
        // console.log(`someone just came online`)
      
        if(!channel){
            return
        }
        else{
            channel.send(`${username} joined the chat`)
        }
    }
        if (newMember.status=="offline") {
        // console.log(`someone just went offline`)
         
        if(!channel){
            return
        }
        else{
            channel.send(`${username} left the chat`)
        }
    }

    
});

bot.on('voiceStateUpdate', ( oldMember,newMember ) =>{
    // console.log('joined')
    
    var voiceChannel = newMember.channelID;
    // console.log(newMember)
    let channel = newMember.guild.channels.cache.find(ch => ch.name === 'general');
    if(newMember.id!='838681850960412682'){
        channel.send('botjoined')
    }
    
    if(voiceChannel){

            var user =  bot.users.cache.find(user => user.id === newMember.id)
            var username = user.username
            var channel2 =  bot.channels.cache.find(channel => channel.id === newMember.channelID)
            
            var channelname = channel2.name
            
            let channel3 = bot.channels.cache.get(newMember.channelID);
            channel3.join()
            
    // console.log(channel);
     if(j==0){
           let embed = new Discord.MessageEmbed()
        embed.setTitle(`press "$help" to know song commands`)
        channel.send(embed)
        j=1;
     }
        channel.send(`${username} joined ${channelname} voice channel`);
        
    }
    else{
          var user =  bot.users.cache.find(user => user.id === newMember.id)
            var username = user.username
        channel.send(`${user} Lefts voice channel`);
    }
});


