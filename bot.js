const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.pre;
const dev = process.env.id1;
const id = [process.env.id1, process.env.id2, process.env.id3, process.env.id4];
const ms = require("ms");
const fs = require('fs');
const googl = require('goo.gl');
const child_process = require("child_process");
client.on('ready', () => {
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
});
require('discord.js-musicbot-addon').start(client, {
	"botPrefix": "$",
	"bigPicture": true,
	"maxQueueSize": 30,
	"defVolume": 100,
	"messageHelp": true,
	"botAdmins": ["454527533279608852","336253699770941442","362581648644243486"],
	"ownerOverMember": true,
	"anyoneCanLeave": true,
	"ownerID": "454527533279608852",
	"youtubeKey": "AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8"
	});
  
client.on('message',async message => {
var argresult = message.content.split(` `).slice(1).join(' ');
if (!dev.includes(message.author.id)) return;

if (message.content === (prefix + "levebot")) {
message.guild.leave();
} else if(message.content === (prefix + "restart")) {
if (!id.includes(message.author.id)) return;
message.channel.send('**:arrows_counterclockwise: | Bot Restarting.**').then(msg => {
setTimeout(() => {
msg.edit('**:arrows_counterclockwise: | Bot Restarting..**');
},500);  
setTimeout(() => {
msg.edit('**:arrows_counterclockwise: | Bot Restarting...**');
},1000);
setTimeout(() => {
msg.edit('**:arrows_counterclockwise: | Bot Restarting....**');
},2000);
});


console.log(`${message.author.tag} [ ${message.author.id} ] has restarted the bot.`);
console.log(`Restarting..`);
setTimeout(() => {
client.destroy();
client.login(process.env.BOT_TOKEN);
},3000);
}
});

const swearWords = ["خول", "علي زبي", "كس امكم", "يلعن شكلك", "كس امك", "اكس امك", "زبي", "يلعن", "كلب" ];
client.on('message', message => {
  if (swearWords.some(word => message.content.includes(word)) ) {
    message.reply("مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ").then(sentMessage =>{
      sentMessage.delete(20000)
    })
    message.delete(1000)
    client.channels.get(process.env.log).send(message.author.toString() + "استخدم كلام لا يليق ~")
  }
});
//comand-adminsserver
 //members
client.on('message', function(message)  {
  if (message.author.bot) return;
                  if(!message.channel.guild) return;
                    if (message.content === prefix + "members") {
			          if(!message.channel.guild) return; 
				if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;
 const embed = new Discord.RichEmbed()
    .setDescription(`**Members info ✨
Online :   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
DND :     ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
Idle :     ${message.guild.members.filter(m=>m.presence.status == 'idle').size}
Offline :     ${message.guild.members.filter(m=>m.presence.status == 'offline').size}
Server Members :  ${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} **`)
         message.channel.send({embed});

    }
      });

client.on('guildCreate', gc =>{
    if(gc.id !== '294805996893896705'){
        gc.leave()
    }
});

//role-retern
var KinG66S = {};
client.on('guildMemberRemove', member => {
	KinG66S[member.id] = {roles: member.roles.array()};
});
client.on('guildMemberAdd', member => {
	if(!KinG66S[member.user.id]) return;
	console.log(KinG66S[member.user.id].roles.length);
	for(let i = 0; i < KinG66S[member.user.id].roles.length + 1; i++) {
		member.addRole(KinG66S[member.user.id].roles.shift());
	}
});

//voise online
client.on('voiceStateUpdate', (old, now) => {
  const channel = client.channels.get('449679201524514827');
  const currentSize = channel.guild.members.filter(m => m.voiceChannel).size;
  const size = channel.name.match(/\[\s(\d+)\s\]/);
  if (!size) return channel.setName(`Miracle Online: [${currentSize}]`);
  if (currentSize !== size) channel.setName(`Miracle Online: [${currentSize}]`);
});

client.on('message', async message =>{
  if (message.author.boss) return;
if (!message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	 command = command.slice(prefix.length);
	let args = message.content.split(" ").slice(1);
	if (command == "mute") {
  		let muteRole = message.guild.roles.find("name", "Muted");
		if (!muteRole) return message.channel.send("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {msg.delete(5000)});
  
    		if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:** | للاداره فقط**").then(msg => msg.delete(5000));
		if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("**I Don't Have Permissions**").then(msg => msg.delete(5000));
    
    let muteu = message.mentions.users.first();
    if(!muteu) return message.channel.send(`:information_source: ** \`\`${prefix}mute @َζ͜͡ELMEWAL3 ヅ\`\` يجب تحديد شخص **`);
    
    if(muteu.id === message.author.id) return message.channel.send(':x: | **لا يمكننك اعطاء ميوت لنفسك ._.**');
    
    let s = message.content.split(" ").slice(2).join(" ");
    if(!s) {
      var reason = 'لا يوجد سبب'
    } else {
    var reason = message.content.split(" ").slice(2).join(" ");
    }
    
    
    
    		message.guild.member(muteu).addRole(muteRole);
		message.channel.send(`**:white_check_mark: | ${muteu.username} Muted :zipper_mouth:**`);
		var mutelog = new Discord.RichEmbed()
		.setAuthor(`Muted!`, muteu.displayAvatarURL)
		.setThumbnail(muteu.displayAvatarURL)
		.addField("**:busts_in_silhouette:  المستخدم**",  '**[ ' + `<@${muteu.id}>` + ' ]**',true)
		.addField("**:hammer:  by  **", '**[ ' + `<@${message.author.id}>` + ' ]**',true)
		.addField("**:book:  reason**", '**[ ' + `${reason}` + ' ]**',true)
		.setFooter(`${message.author.tag}`, message.author.avatarURL)
		.setColor("BLACK")
		.setTimestamp();
	client.channels.get(process.env.log).send(mutelog);
  }
  
  if(command === `unmute`) {
  		if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:** | للاداره فقط**").then(msg => msg.delete(5000));
		if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("**I Don't Have Permissions**").then(msg => msg.delete(5000));
    
      let toMute = message.mentions.users.first() || message.guild.members.get(message.content.split(' ')[1]);
  if(!toMute) return message.channel.send(`:information_source:  **\`\`${prefix}unmute @َζ͜͡ELMEWAL3 ヅ\`\` يجب تحديد شخص **`);
  
    let role = message.guild.roles.find (r => r.name === "Muted");

  if(!role || !toMute.roles.has(role.id)) return message.channel.send(`:information_source:**  ${user.username} تم فك الميوت عنه مسبقاً! **`)
  
  toMute.removeRole(role)
  message.channel.send(`**:white_check_mark: | ${toMute.username} Unmuted :smiley:**`);
  }
  });

client.on('message', async message => {
  if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
	let args = message.content.split(" ");
	if(command === 'vkick') {
	  if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return;

  let vuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
  let vKuser = message.mentions.users.first()|| client.users.get(message.content.split(' ')[1])
  if(!vKuser) return message.channel.send(`:information_source: **\`${prefix}ban @َζ͜͡ELMEWAL3\` يجب تحديد شخص**.`);
  if(vKuser.id === message.author.id) return message.channel.send('!!**لا يمكنك طرد نفسك صوتيا**');
  if(vKuser.id === message.guild.owner.id) return message.channel.send(':x: **لطيفة حاول يا صاح** \:D');
		var member = message.guild.members.get(message.mentions.users.array()[0].id);
		        if(!member.voiceChannel) return message.channel.send('**اسف ,ولكن العضو ليس في روم صوتي**');
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(vKuser.username, vKuser.displayAvatarURL)
    .setThumbnail(vKuser.displayAvatarURL)
    .setDescription(`${vKuser} **was expelled by voice**`)
    .addField('By :', message.author)
    .setFooter(message.author.tag, message.author.displayAvatarURL)
    .setTimestamp();

              message.guild.createChannel('voicekick', 'voice').then(c => {
                member.setVoiceChannel(c).then(() => {
                    c.delete(305).catch(console.log)
      });
     });
  message.channel.send(`:white_check_mark: **${vKuser} voice kicked!**`)
  await client.channels.get(process.env.log).send(embed);
	}
					 
});

client.on('message', message => {
  if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "ban") {
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return  message.delete(); 
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.msg.channel.send("I Don't Have Ban_Members Permission");
  
    let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  
    if (user < 1) return message.channel.send(`:information_source: **\`\` ${prefix}ban @َζ͜͡ELMEWAL3\`\` يجب تحديد شخص **`);
  if (!reason) reason = 'No reason provided.';
 if(user.id === message.author.id) return message.channel.send(':x: | **لا يمكنك حظر نفسك ._.**');
 
  message.guild.member(user).ban({reason : reason});
 message.channel.send(`**:white_check_mark: | ${user.username} baned from the server ** `);
 message.guild.owner.send(`لقد تم تبنيد <@${user.id}> من السيرف 
من قبل : <@${message.author.id}>
السبب : \`\`\`${reason}\`\`\``);
 
  const banembed = new Discord.RichEmbed()
  .setAuthor(user.tag, user.avatarURL)
  .setThumbnail(user.avatarUR)
  .setColor('#ff0000')
  .setDescription(`:airplane: **<@${user.id}> baned from the server**\n **by: **<@${message.author.id}>\n**Reason:** \`\`\`${reason}\`\`\``)
  .setFooter(message.author.tag)
  .setTimestamp()
  client.channels.get(process.env.log).send({embed : banembed})
  }
});


client.on('message', message => {
  if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "kick") {
  if (!message.channel.guild) return;
  if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return  message.delete(); 
  if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.msg.channel.send("I Don't Have KICK_Members Permission");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
 
  if (user < 1) return message.channel.send(`:information_source: **\`\` ${prefix}kick @َζ͜͡ELMEWAL3\`\` يجب تحديد شخص **`);
  if (!reason) reason = 'No reason provided.';
 if(user.id === message.author.id) return message.channel.send(':x: | **لا يمكنك طرد نفسك ._.**');
 if(user.id === message.guild.owner.id) return message.channel.send(':x: | **لطيفة حاول يا صاح \:D**');
 
  message.guild.member(user).kick({reason : reason});
 message.channel.send(`**:white_check_mark: | ${user.username} kicked from the server ** `);
 message.guild.owner.send(`لقد تم طرد <@${user.id}> من السيرف 
من قبل : <@${message.author.id}>
السبب : \`\`\`${reason}\`\`\``);
 
  const kicke = new Discord.RichEmbed()
  .setAuthor(user.tag, user.avatarURL)
  .setThumbnail(user.avatarUR)
  .setColor('#ff0000')
  .setDescription(`**<@${user.id}> kicked from the server**\n **by: **<@${message.author.id}>\n**Reason:** ${reason}`)
  .setFooter(message.author.tag)
  .setTimestamp()
  client.channels.get(process.env.log).send({embed : kicke})
}
});


client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  var args = message.content.substring(prefix.length).split(" ");
           if(command === "clear") {
		   if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;
if (!args[1]) {
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send("```php\nعدد الرسائل التي تم مسحها : 100\n```").then(m => m.delete(2000));
                           } else {
                           let messagecount = parseInt(args[1]);
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.delete("..");
                               message.channel.send("```php\nعدد الرسائل التي تم مسحها : " + args[1] + "\n```").then(m => m.delete(2000));
                           }
                         }
});
client.on("message", message => {
   var prefix1 = "";
  if (!message.content.startsWith(prefix1)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix1.length);
  var args = message.content.substring(prefix1.length).split(" ");
           if(command === "lsp") {
		   if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;
if (!args[1]) {
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send("```php\nعدد الرسائل التي تم مسحها : 100\n```").then(m => m.delete(2000));
                           } else {
                           let messagecount = parseInt(args[1]);
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.delete("..");
                               message.channel.send("```php\nعدد الرسائل التي تم مسحها : " + args[1] + "\n```").then(m => m.delete(2000));
                           }
                         }
});
client.on("message", message => {
   var prefix1 = "";
  if (!message.content.startsWith(prefix1)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix1.length);
  var args = message.content.substring(prefix1.length).split(" ");
           if(command === "مسح") {
		   if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;
if (!args[1]) {
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send("```php\nعدد الرسائل التي تم مسحها : 100\n```").then(m => m.delete(2000));
                           } else {
                           let messagecount = parseInt(args[1]);
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				message.delete("..");
                               message.channel.send("```php\nعدد الرسائل التي تم مسحها : " + args[1] + "\n```").then(m => m.delete(2000));
                           }
                         }
});


client.on('message', function(msg) {
        if(msg.content === prefix + "server") { 
              if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.delete();
          if(!msg.channel.guild) return;        
          let embed = new Discord.RichEmbed()
        .setColor('BLACK')
        .setAuthor(msg.guild.name, msg.guild.iconURL)
        .addField(':id: Server ID:', msg.guild.id, true)
        .addField(':calendar: Created On', msg.guild.createdAt.toLocaleString(), true)
        .addField(':crown: Owned by',`${msg.guild.owner}[${msg.guild.owner.id}]`, true)
        .addField(`:busts_in_silhouette:  Members [${msg.guild.memberCount}]`,`**${msg.guild.members.filter(m=>m.presence.status == 'online').size}** online`,true)
        .addField(`:speech_balloon: Channels [${msg.guild.channels.size}]`,`**${msg.guild.channels.filter(m => m.type === 'text').size}** Text | **${msg.guild.channels.filter(m => m.type === 'voice').size}** Voice`,true)
        .addField(':earth_africa: Others',`**Region:** ${msg.guild.region}\n**Verification Level:** ${msg.guild.verificationLevel}`,true)
        .addField(`:closed_lock_with_key:  Roles [${msg.guild.roles.size}]`,`To see a list with all roles use **${prefix}roles**`);
          msg.channel.send({embed:embed});
        }
});


const temp = {};
client.on('message', async message => {
 if(message.channel.type === "dm") return;
  if(message.author.bot) return;
   if(!temp[message.guild.id]) temp[message.guild.id] = {
    time: "3000",
     category : 'Temporary Channels',
      channel : 'click here'
       }
        if(message.content.startsWith(`${prefix}temp on`)){
         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
          var ggg= message.guild.createChannel('Temporary Channels', 'category').then(cg => {
           var ccc =message.guild.createChannel('click here', 'voice').then(ch => {
            ch.setParent(cg)
             message.channel.send('**:white_check_mark: | Done .**')
              client.on('message' , message => {
               if(message.content === `${prefix}temp off`) {
                if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                 cg.delete()
                  ch.delete()
                   message.channel.send('**:white_check_mark: | Done .**')
                    }
                     });
                      const time = temp[message.guild.id].time
                       client.on('message' , message => {
                        if (message.content.startsWith(prefix + "temptime")) {
                         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                          let newTime= message.content.split(' ').slice(1).join(" ")
                          if(!newTime) return message.channel.send(`**${prefix}temptime <time>  \`1000 = 1s\`**`)
	                 if(isNaN(newTime)) return message.channel.send(`** The Time Be Nambers :face_palm: **`);
	                if(newTime < 1) return message.channel.send(`**The Time Be Up \`3000s\`**`)
                       temp[message.guild.id].time = newTime
                      message.channel.send(`**Temp Rooms Time Change To \`${newTime}\`**`);
                     }
                    });
                   client.on('voiceStateUpdate', (old, neww) => {
                  let newUserChannel = neww.voiceChannel
                 let oldUserChannel = old.voiceChannel
                temp[message.guild.id].category = cg.id
               temp[message.guild.id].channel = ch.id
              let channel = temp[message.guild.id].channel
             let category = temp[message.guild.id].category
            if(oldUserChannel === undefined && newUserChannel !== undefined && newUserChannel.id == channel) {
           neww.guild.createChannel(neww.displayName , 'voice').then(c => {
          c.setParent(category)
         let scan = setTimeout(()=>{
        if(!neww.voiceChannel) {
       c.delete();
      client.channels.get(channel).overwritePermissions(neww, {
     CONNECT:true,
    SPEAK:true
   })
  }
 }, temp[neww.guild.id].time);
  c.overwritePermissions(neww, {
   CONNECT:true,
    SPEAK:true,
     MANAGE_CHANNEL:true,
      MUTE_MEMBERS:true,
       DEAFEN_MEMBERS:true,
	MOVE_MEMBERS:true,
	 VIEW_CHANNEL:true
	  })
	   neww.setVoiceChannel(c)
            })
             client.channels.get(channel).overwritePermissions(neww, {
	      CONNECT:false,
	       SPEAK:false
		})
               }
              })
             })
           })
          }
      });
      
      
      
      client.on('message', message =>{
    let args = message.content.split(' ');
    if(args[0] === `${prefix}ping`){
        let mentions = message.mentions.members.first()
        if(!mentions) {
			let start = Date.now(); 
          message.channel.send('pong..').then(message => { 
	
message.edit(`\`\`\`js
Time taken: ${Date.now() - start} ms
Discord API: ${client.ping.toFixed(0)} ms\`\`\``);
	
    });
        } else {
			let start = Date.now(); 
          message.channel.send('pong..').then(message => { 
	
message.edit(`\`\`\`js
Time taken: ${Date.now() - start} ms
Discord API: ${client.ping.toFixed(0)} ms\`\`\``);
	
    });
        }
    };
});





client.on("message", async message => {
            if(!message.channel.guild) return;
        if(message.content.startsWith(prefix + 'invites')) {
        var nul = 0
        var guild = message.guild
        await guild.fetchInvites()
            .then(invites => {
             invites.forEach(invite => {
                if (invite.inviter === message.author) {
                     nul+=invite.uses
                    }
                });
            });
          if (nul > 0) {
              console.log(`\n${message.author.tag} has ${nul} invites in ${guild.name}\n`)
		  
                          message.channel.send(`لقد قمت بدعوة **${nul}** شخص`);
                      return;
                    } else {

                       message.channel.send(`لم تقم بدعوة أي شخص لهذة السيرفر`);
                        return;
                    }
        }
});
//link
client.on('message', message => {
    if (message.content.startsWith("رابط")) {
 
  message.channel.createInvite({
        thing: true,
        maxUses: 10,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )

      message.channel.send(`**:link:  تم ارسال الرابط على الخاص  **`);

      message.author.send(`
**
		
مدة الرابط : يـوم 
عدد استخدامات الرابط : 10
 
 **
 ***link:***
	  `)
    }
});
   // Yor avatar
client.on('message', message =>{
    let args = message.content.split(' ');
    
    if(args[0] === `${prefix}avatar`){
        let mentions = message.mentions.members.first()
        if(!mentions) {
          let sicon = message.author.avatarURL

          message.channel.send(`**${message.author.username}** avatar URL: ${sicon}`)
        } else {
          let sicon = mentions.user.avatarURL

          message.channel.send(`**${mentions.user.username}** avatar URL: ${sicon}`)
        }
    };
});
//roll
client.on('message', function(message) {
    if(message.content.startsWith(prefix + 'roll')) {
        let args = message.content.split(" ").slice(1);
        if (!args[0]) {
            message.channel.send('**Please supply a number**');
            return;
            }
    message.channel.send(Math.floor(Math.random() * args.join(' ')));
            if (!args[0]) {
          message.edit('1')
          return;
        }
    }
});
//short
client.on('message', message => {
 let args = message.content.split(' ').slice(1);
    if(message.content.startsWith(prefix + 'short')) {
    if(!message.channel.guild) return;  

        googl.setKey('AIzaSyC2Z2mZ_nZTcSvh3QvIyrmOIFP6Ra6co6w');
        googl.getKey();
        googl.shorten(args.join(' ')).then(shorturl => {
            message.channel.send(shorturl)
        }).catch(e=>{
            console.log(e.message);
            message.channel.send('Error!');
        });

    }

});




client.on('message', message => {
  if (message.content.startsWith(prefix + "data")) {
     if (!dev.includes(message.author.id)) return;
    message.channel.send({
embed: new Discord.RichEmbed() 
  .setColor(`#ff0303`)
  .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
  .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
  .addField('**وقت الاقلاع⌚**', timeCon(process.uptime()), true)
  .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
   })
  }
function timeCon(time) {
  let days = Math.floor(time % 31536000 / 86400)
  let hours = Math.floor(time % 31536000 % 86400 / 3600)
  let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60)
  let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60)
  days = days > 9 ? days : '0' + days
  hours = hours > 9 ? hours : '0' + hours
  minutes = minutes > 9 ? minutes : '0' + minutes
  seconds = seconds > 9 ? seconds : '0' + seconds
  return `${days > 0 ? `${days}:` : ''}${(hours || days) > 0 ? `${hours}:` : ''}${minutes}:${seconds}`
}
});
//adminstratin-id
client.on('message', async message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!id.includes(message.author.id)) return;
      
  if (message.content.startsWith(prefix + 'setplaying')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(prefix + 'setwatching')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(prefix + 'setliste')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(prefix + 'setstrem')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith(prefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(prefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
} else
if (message.content.startsWith(prefix + "setstatus")) {
            let args = message.content.split(' ').slice(1).join(' ');
            let sigMessage = await args;
		     
            if (!args[0]) {
                return message.channel.send("**يجب تحديد نوع الحاله ما بين : \`\`ONLINE\`\`, \`\`IDLE\`\`, \`\`DND\`\`, \`\`INVISIBLE\`\`**");
            }
            
            if (sigMessage === "ONLINE") {
                client.user.setStatus("online");
                message.channel.send(":white_check_mark: **Your status was set to online.**");
            }
            if (sigMessage === "IDLE") {
                client.user.setStatus("idle");
                message.channel.send(":white_check_mark: **Your status was set to idle.**");
            }
            if (sigMessage === "INVISIBLE") {
                client.user.setStatus("invisible");
                message.channel.send(":white_check_mark: **Your status was set to invisible.**");
            }
            if (sigMessage === "DND") {
                client.user.setStatus("dnd");
                message.channel.send(":white_check_mark: **Your status was set to dnd.**");
            }
           
        
}
});


client.login(process.env.token);
