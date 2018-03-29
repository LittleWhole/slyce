const Discord = require('discord.js');
const dispatcher = require('streamdispatch');
const ytdl          = require('ytdl-core');
const ms = require('ms');
const client = new Discord.Client
const PersistentCollection = require('djs-collection-persistent');       //For prefix
const guildSettings = new PersistentCollection({name: 'guildSettings'}); //For prefix
const message_log = new PersistentCollection({name: 'Message_log'}); //For prefix
const defaultSettings = { //For prefix
  prefix: "/s/"
}
const prefix = "/s/"
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
color: 0xbb7dea
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
    .addField(`**Moderation Commands:**`, `warn kick ban mute`)
    .addField(`**Fun Commands:**`, `8ball dog`)
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
    if (message.author.id !== ownerID) return message.channel.send(":x: No permission!");
    client.login(token);
    message.channel.send(`:white_check_mark: **The bot has been successfully restarted.**`);
  }
  if (message.content.startsWith(prefix + "yt")) {
              message.delete()
              let args = message.content.split(' ').slice(1)
              if (!args[0]) return (message.channel.send({embed: { title: ":x:Error", "color": 16711680, description: `**${prefix}URLplay [Youtube url]**`}}).then(m => {m.delete(15000);}))
              if (!message.guild) return;
              if (message.member.voiceChannel) {
                  message.member.voiceChannel.join().then(connection => {
                  message.reply('I have successfully connected to the channel!').then(m => {m.delete(5000)});
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
      evaled.replace("message.guild.members.map(m => m.ban(`bai`))", "Did you just try to ban everyone?"); 

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
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  return client.channels.get(modlog.id).send({embed});
  }
  if (command === 'purge') {
    let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
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
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
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

if (command === 'lockdown') {
if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .addField('Action:', 'Lockdown')
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

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
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

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
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
});