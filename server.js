const Discord = require('discord.js');
const dispatcher = require('streamdispatch');
const ytdl          = require('ytdl-core');
const getYouTubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const ms = require('ms');
const client = new Discord.Client
const PersistentCollection = require('enmap');       //For prefix
const guildSettings = new PersistentCollection({name: 'guildSettings'}); //For prefix
const message_log = new PersistentCollection({name: 'Message_log'}); //For prefix
const defaultSettings = { //For prefix
  prefix: "/s/"
}
const token = process.env.SECRET
const ownerID = "230880116035551233"
const gosealeID = "229016449593769984"
client.login(token);
client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setGame(`/s/help | on ${client.guilds.size} servers`)
    client.user.setStatus('idle');
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  let sendGuildChannel = guild.channels.find('name', 'general');
  sendGuildChannel.send("Hello! Thanks for adding me - **Slyce**! I am developed by LittleWhole#2107. Do /s/help for commands!");
  client.user.setGame(`/s/help | on ${client.guilds.size} servers`);
});
var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.on('message', async message => {

   
// =============================================================================================================================== Prefix  
    if (!guildSettings.get(message.guild.id)) guildSettings.set(message.guild.id, defaultSettings); //For prefix
  guildSettings.get(message.guild.id);                                                            //For prefix
  if (!guildSettings.get(message.guild.id)) guildSettings.set(message.guild.id, defaultSettings)  //For prefix
    var thisConf = guildSettings.get(message.guild.id)                                            //For prefix
  const prefix = thisConf.prefix;                                                                 //For prefix


  //cmd setprefix
var params = message.content.split(' ').slice(1)
if (message.content.startsWith(prefix + 'prefix')) {
message.delete()
if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD") &&  message.author.id !== ownerID) return message.channel.send({
embed: {
description: `**You can not do that** ${message.author}**!** :no_entry: \nYou need to have the permission __Manage Messages__ to use *${prefix}prefix*.`,
color: 0xbb7de8
}
})
if (!params[0]) return;

thisConf.prefix = params[0]

  
guildSettings.set(message.guild.id, thisConf)
message.guild.member(client.user).setNickname(`[${thisConf.prefix}] ${client.user.username}`) //Changin nickname
message.channel.send({
embed: {
title: `Prefix was changed!`,
description: `Prefix was changed to **${thisConf.prefix}**`,
color: 0xbb7de8
}
});
}
  //===================================================================================================================================================================== cmd prefix end
    
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  
  
  
  if (command === 'help') {
    var help = new Discord.RichEmbed()
    .setTitle(`**Slyce Commands**`)
    .addField(`**Server Prefix:** ${prefix}`, `${prefix}prefix to change`)
    .addField(`**Information Commands:**`, `help ping invite`)
    .addField(`**Moderation Commands:**`, `warn kick ban mute purge disablechannel`)
    .addField(`**Fun Commands:**`, `8ball cat`)
    .addField(`**Music Commands:**`, `yt stopyt`)
    .addField(`**Math Commands:**`, `add subtract multiply divide factorial sqrt exponent pythagorean`)
    .addField(`**Development Commands:**`, `eval restart`)
    .setColor("bb7de8")
    .setThumbnail("https://cdn.discordapp.com/attachments/282575854251278337/428661727056363521/tumblr_ncgtapL2c51qk3vnso1_500.gif")
    .setFooter(`Slyce Help`)
    .setTimestamp();
      message.channel.send({embed: help});
  }
  if (command === 'ping') {
    const m = await message.channel.send(":ping_pong: **| Pinging...**");
    m.edit(`:ping_pong: **| Pong**! Took: ${m.createdTimestamp - message.createdTimestamp}ms. API latency is ${Math.round(client.ping)}ms`);
  }
  if (command === 'invite') {
    var invite = new Discord.RichEmbed()
    .setTitle(`Invite`)
    .setDescription(`Thanks for wanting to invite me!\nIf you'd like to join the official Slyce server (along with the rest of my bots), **__[click here!](https://discord.gg/R4fK7H7)__**\nIf you'd like to invite Slyce to you own server, **__[click here!](https://discordapp.com/oauth2/authorize?client_id=428596331934646274&scope=bot&permissions=2146958591)__**`)
    .setColor("bb7de8")
    .setFooter("Invite Slyce!")
    .setTimestamp();
    message.channel.send({embed: invite});
  }
  if (command === 'restart') {
    if (message.author.id !== ownerID) return message.channel.send(":x: **No permission!** You must be bot owner LittleWhole#2107 to execute this commmand.");
    client.login(token);
    client.user.setGame(`/s/help | on ${client.guilds.size} servers`)
    client.user.setStatus('idle');
    message.channel.send(`:white_check_mark: **The bot has been successfully restarted.**`);
  }
  if (command === 'add') {
      var num1 = parseInt(args[0]);
      var num2 = parseInt(args[1]);
      var ans = num1 + num2
      message.channel.send(":atom: **|** *" + ans + "*");
   }
  
		if (command === 'multiply') {
      var num1 = parseInt(args[0]);
      var num2 = parseInt(args[1]);
      var ans = num1 * num2
      message.channel.send(":atom: **|** *" + ans + "*");
   }
		if (command === 'subtract') {
      var num1 = parseInt(args[0]);
      var num2 = parseInt(args[1]);
      var ans = num1 - num2
      message.channel.send(":atom: **|** *" + ans + "*");
   }
		if (command === 'divide') {
      var num1 = parseInt(args[0]);
      var num2 = parseInt(args[1]);
      var ans = num1 / num2
      message.channel.send(":atom: **|** *" + ans + "*");
   }
		if (command === 'factorial') {
      var num1 = parseInt(args[0]);
      var ans = factorial(num1);
      message.channel.send(":atom: **|** *" + ans + "*");
   }
      if (command === 'random') {
      var num1 = parseInt(args[0]);
      var num2 = parseInt(args[1]);
      var ans = Math.floor(Math.random() * num2) + num1
      message.channel.send(":atom: **|** *" + ans + "*");
   }
      if (command === 'sqrt') {
      var num1 = parseInt(args[0]);
      var ans = Math.sqrt(num1)
      message.channel.send(":atom: **|** *" + ans + "*");
   }

  if (message.content.startsWith(prefix + "yt")) {
              message.delete()
              let args = message.content.split(' ').slice(1)
              if (!args[0]) return (message.channel.send({embed: { title: ":x:Error", "color": 16711680, description: `**${prefix}yt [Youtube url]**`}}).then(m => {m.delete(15000);}))
              if (!message.guild) return;
              if (message.member.voiceChannel) {
                  message.member.voiceChannel.join().then(connection => {
                  message.reply('I have successfully connected to the channel!').then(m => {m.delete(5000)});
                    var VideoID = getYouTubeID(args[0]);
          fetchVideoInfo(VideoID, function (err, videoInfo) { if (err) throw new Error(err); 
                   var Vd = videoInfo; 
                  
    let richEmbed = new Discord.RichEmbed()
.setTitle(`Now Playing:`)
.setDescription(`**Title:** __[${Vd.title}](${Vd.url})__ 
**By: **${Vd.owner}
**Date published: **${Vd.datePublished} 
**:eye: **${Vd.views}
**:thumbsup::skin-tone-1: **${Vd.likeCount} | **:thumbsdown::skin-tone-1: **${Vd.dislikeCount}
`)
                  .setColor(0xbb7de8)
                  //.setThumbnail(`${user.avatarURL}`)
                  message.channel.send({embed: richEmbed});});
                  const stream = ytdl(args[0], {filter : 'audioonly'});
                  const dispatcher = connection.playStream(stream);
        })
              }else {message.reply('You need to join a voice channel first!').then(m => {m.delete(5000)})}
  }
  if (message.content.startsWith(prefix + "stopyt")) {
              message.delete();
              if (message.member.voiceChannel) {
              message.member.voiceChannel.leave()
              message.reply('I have successfully disconected from the channel!').then(m => {m.delete(5000)});
              } else {message.reply('Join the channel that you want me to disconect').then(m => {m.delete(5000)});
            }
  }
  if (command === 'eval') {
if (message.author.id !== ownerID && message.author.id !== gosealeID) return message.channel.send(":x: No permission!");
 try {
    var code = args.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

      evaled.replace(client.token, "[TOKEN]");
      evaled.replace(token, "[TOKEN]");

      if (evaled.length >= 2000) {
        message.channel.send(`Output was longer than 2000 characters (${evaled.length} to be exact)! You can find it in the console.`);
        console.log(evaled);
        return;
      }

     const embedSuccessful = new Discord.RichEmbed()
     .setColor(message.member.displayHexColor)
     .setTitle("Evaluated successfully:")
     .setDescription(`Input:\`\`\`JavaScript\n${code}\`\`\`\n\nOutput:\`\`\`JavaScript\n${evaled}\`\`\``)
     .setFooter("Slyce Eval")
     .setTimestamp();




      message.channel.send({embed: embedSuccessful});
  } catch(err) {
    const embedError = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setTitle("An error occured:")
    .setDescription(`Input:\`\`\`JavaScript\n${code}\`\`\`\nError:\`\`\`JavaScript\n${err}\`\`\``)
    .setFooter("Slyce Eval")
    .setTimestamp();

    message.channel.send({embed: embedError});
  }
    
            
  }
  
  if (command === 'warn') {
      let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'mod-logs');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
    message.channel.send(`**:warning: Warned user ${user}.**`);
  const embed = new Discord.RichEmbed()
  .setColor(0xbb7de8)
  .setTimestamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  return client.channels.get(modlog.id).send({embed});
  }
  if (command === 'purge') {
    let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
    message.channel.send(`:wastebasket: **Successfully purged ${messagecount} messages!**`)
}
    if (command === 'mute') {
    let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'mod-logs');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
      message.channel.send(`**:mute: Un/muted user ${user}.**`);
  const embed = new Discord.RichEmbed()
    .setColor(0xbb7de8)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  }
}

if (command === 'disablechannel') {
if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  const embed = new Discord.RichEmbed()
  .setColor(0xbb7de8)
  .setTimestamp()
  .addField('Action:', 'Channel Lockdown')
  .addField('Channel:', message.channel)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Time:', `${ms(ms(time), { long:true })}`);
  if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.sendMessage('Lockdown lifted.');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send({ embed: embed }).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.sendMessage('Lockdown lifted.')).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
}
    if (command === 'ban') {
    let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'mod-logs');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  message.guild.ban(user, 2);
  message.channel.send(`**:hammer: Banned user ${user}.**`);
  const embed = new Discord.RichEmbed()
    .setColor(0xbb7de8)
    .setTimestamp()
    .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  return client.channels.get(modlog.id).send({embed});
}
if (command === 'kick') {
let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'mod-logs');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();
  message.channel.send(`**:boot: Kicked user ${user}.**`);
  const embed = new Discord.RichEmbed()
    .setColor(0xbb7de8)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  return client.channels.get(modlog.id).send({embed});
}
if (command === 'unban') {
let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  let modlog = message.guild.channels.find('name', 'mod-logs');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
  message.guild.unban(user);
  message.channel.send(`**:ok_hand::skin-tone-1: Unbanned user ${user}.**`);
}
  if (command === 'repeat') {
let times = parseInt(args[0])
let message = "hi"
for (var repeat;  repeat <= times; repeat++) {
message.channel.sendMessage(`${message}`);
}
}
if (command === 'say') {
if (message.author.id !== ownerID && message.author.id !== gosealeID) return;
var logchannel = client.channels.find('name', args[0]);
var saymessage = args.slice(1).join(' ');
message.delete()
return client.channels.get(logchannel.id).send(saymessage).catch(console.error);
return client.channels.get(logchannel.id).send({saymessage}).catch(console.error);
}
  if (command === '8ball') {
    if (message.content.indexOf("?") !== message.content.length - 1) return message.channel.send("That doesn't look like a question to me!");
        //Responses
        const responses = [
            "Yes, definitely.",
            "Most likely.",
            "Cannot predict now.",
            "You may rely on it.",
            "Reply hazy, try again.",
            "Very doubtful.",
            "It is decidedly so.",
            "No.",
            "Ask again later.",
            "It is certain.",
            "Concentrate and ask again.",
            "My reply is no.",
            "Outlook good.",
            "Signs point to yes.",
            "My sources say no.",
            "Outlook not so good.",
            "Don't count on it.",
            "Better not tell you now.",
            "Without a doubt.",
            "As I see it, yes.",
        ];

        // Send a response
        message.channel.send(`**__${message.member.displayName}__ :8ball: __${args.join(" ")}__**\n${responses[Math.floor(Math.random() * responses.length)]}`);
  }
  if (command === 'cat') {
    Object.defineProperty(this, "cats", {
            value: [
                "http://random.cat/i/uUi0a.jpg",
                "http://random.cat/i/mFC8oVK.jpg",
                "http://random.cat/i/YTgRq.jpg",
                "http://random.cat/i/o7pjQLT.jpg",
                "http://random.cat/i/iVpaM.jpg",
                "http://random.cat/i/249053_10151615620946211_1427883182_n.jpg",
                "http://random.cat/i/Nmn7a.jpg",
                "http://random.cat/i/VjIboF2.jpg",
                "http://random.cat/i/img_20161017_122411.jpg",
                "http://random.cat/i/GQXOl.png",
                "http://random.cat/i/t3nMb.jpg",
                "http://random.cat/i/iVpaM.jpg",
                "http://random.cat/i/riGL8.jpg",
                "http://random.cat/i/uWjbg.jpg",
                "https://purr.objects-us-west-1.dream.io/i/img_3499.jpg",
                "https://purr.objects-us-west-1.dream.io/i/image.jpeg",
                "https://purr.objects-us-west-1.dream.io/i/fergus_05.jpg",
                "https://purr.objects-us-west-1.dream.io/i/8O1TS.jpg",
                "https://purr.objects-us-west-1.dream.io/i/montyhiking.jpeg",
                "https://purr.objects-us-west-1.dream.io/i/0c7gC.jpg",
                "https://purr.objects-us-west-1.dream.io/i/img_0178.jpg",
                "https://purr.objects-us-west-1.dream.io/i/OoNx6.jpg",
                "https://purr.objects-us-west-1.dream.io/i/ginger2.jpg",
                "https://purr.objects-us-west-1.dream.io/i/221.jpg",
                "https://purr.objects-us-west-1.dream.io/i/6160178551_e828a193b2_z.jpg",
                "https://purr.objects-us-west-1.dream.io/i/isabel.jpg",
                "https://purr.objects-us-west-1.dream.io/i/2015-09-17-214.jpg",
                "https://purr.objects-us-west-1.dream.io/i/oThuh.jpg",
                "https://purr.objects-us-west-1.dream.io/i/7VnxKqw.jpg",
                "https://purr.objects-us-west-1.dream.io/i/DOjFh.jpg",
                "https://purr.objects-us-west-1.dream.io/i/4d7f9782cda044f0847c28803adb0f6b.jpg",
                "https://purr.objects-us-west-1.dream.io/i/tcjk2051.jpg",
                "https://purr.objects-us-west-1.dream.io/i/img_20170520_143600.jpg",
                "https://purr.objects-us-west-1.dream.io/i/lmiGH.jpg",
                "https://purr.objects-us-west-1.dream.io/i/p6bnR.jpg",
                "https://purr.objects-us-west-1.dream.io/i/QPhJb.jpg",
                "https://purr.objects-us-west-1.dream.io/i/pallascat-pileoffloof.jpg",
                "https://purr.objects-us-west-1.dream.io/i/img_20160411_061203.jpg",
                "https://purr.objects-us-west-1.dream.io/i/esI3L.jpg",
                "https://purr.objects-us-west-1.dream.io/i/33image2.jpg",
                "https://purr.objects-us-west-1.dream.io/i/img_20170904_234526.jpg",
                "https://purr.objects-us-west-1.dream.io/i/hgyw6Tc.jpg",
                "https://purr.objects-us-west-1.dream.io/i/1NfYmpq.jpg",
                "https://purr.objects-us-west-1.dream.io/i/EwXHN.jpg",
                "https://purr.objects-us-west-1.dream.io/i/iqROl.jpg",
                "https://purr.objects-us-west-1.dream.io/i/20170214_180225.jpg",
                "https://purr.objects-us-west-1.dream.io/i/UNb83.jpg",
                "https://purr.objects-us-west-1.dream.io/i/img_0736.jpg",
                "https://purr.objects-us-west-1.dream.io/i/4392155750_100d81d83b_b.jpg",
                "https://purr.objects-us-west-1.dream.io/i/OADxt.jpg",
                "https://purr.objects-us-west-1.dream.io/i/catiiidi.jpg",
                "https://purr.objects-us-west-1.dream.io/i/W8Er0Bt.jpg",
                "https://purr.objects-us-west-1.dream.io/i/11226561_939465719444268_5011472048854498701_n.jpg",
                "https://purr.objects-us-west-1.dream.io/i/scottishfold.jpg",
                "https://purr.objects-us-west-1.dream.io/i/8kWBuwm.jpg",
                "https://purr.objects-us-west-1.dream.io/i/lyYNd.jpg",
                "https://purr.objects-us-west-1.dream.io/i/esI3L.jpg",
                "https://purr.objects-us-west-1.dream.io/i/xhfMW.jpg",
                "https://purr.objects-us-west-1.dream.io/i/image1-3.jpg",
                "https://purr.objects-us-west-1.dream.io/i/gandalf1.jpg",
                "https://purr.objects-us-west-1.dream.io/i/urYhUVm.jpg",
                "https://purr.objects-us-west-1.dream.io/i/my_2cats_black&white1.jpg",
                "https://purr.objects-us-west-1.dream.io/i/img_20131111_094048.jpg",
                "https://purr.objects-us-west-1.dream.io/i/montybeach.jpeg",
                "https://purr.objects-us-west-1.dream.io/i/dozTO.jpg",
                "https://purr.objects-us-west-1.dream.io/i/XueQd.jpg",
                "https://purr.objects-us-west-1.dream.io/i/uUyDqNj.jpg",
                "https://purr.objects-us-west-1.dream.io/i/r124.jpg",
                "https://purr.objects-us-west-1.dream.io/i/simonthecat..jpg",
                "https://purr.objects-us-west-1.dream.io/i/sB7Y9.jpg",
                "https://purr.objects-us-west-1.dream.io/i/montybeach.jpeg",
             // GIFS
                "http://random.cat/i/068_-_6vuLGR1.gif",
                "http://random.cat/i/054_-_o8Oe3pb.gif",
                "https://purr.objects-us-west-1.dream.io/i/059_-_RJ9CufX.gif",
                "https://purr.objects-us-west-1.dream.io/i/085_-_uRuU0ni.gif",
            ]
        });

        Object.defineProperty(this, "chosen", { value: this.cats[Math.floor(Math.random() * this.cats.length)], writable: true });
    message.channel.send(`*Meow* ${this.chosen}`);
        // Get a new cat
        this.chosen = this.cats[Math.floor(Math.random() * this.cats.length)];
  }
});