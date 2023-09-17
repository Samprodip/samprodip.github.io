const playlist = document.querySelector('#playlist');
const player = document.querySelector('#player');
const songName = document.querySelector('#song-name');
const pageTitle = document.querySelector('title');
const sbanner = document.querySelector('#sbanner');
const artt = document.querySelector('#artt');
const logoo = document.querySelector('#logoo');
const lyricsContainer = document.querySelector('#lyrics-container');
const lyricsText = document.querySelector('#lyrics-text');


let currentSongIndex = localStorage.getItem('currentSongIndex') || 0;
let isPlaying = false;
let repeatMode = false;
let shuffleMode = false;
let lyricsMode = false;

const lyricsData = {
  1: `
      [00:00.00]You Belong With Me (Taylor's Version)

      [00:07.51]You're on the phone with your girlfriend, she's upset
      [00:11.51]She's goin' off about somethin' that you said
      [00:15.24]'Cause she doesn't get your humor like I do
      [00:22.27]I'm in the room, it's a typical Tuesday night
      [00:26.15]I'm listenin' to the kind of music she doesn't like
      [00:30.13]And she'll never know your story like I do
      
      [00:36.82]'Cause she wears short skirts, I wear T-shirts
      [00:40.67]She's cheer captain and I'm on the bleachers
      [00:44.36]Dreamin' 'bout the day when you wake up and find
      [00:47.40]That what you're looking for has been here the whole time
      
      [00:51.12]If you could see that I'm the one who understands you
      [00:55.51]Been here all along, so why can't you see
      [01:01.69]You belong with me
      [01:05.06]You belong with me
      
      [01:10.25]Walkin' the streets with you and your worn-out jeans
      [01:14.23]I can't help thinkin' this is how it ought to be
      [01:18.02]Laughin' on a park bench, thinkin' to myself
      [01:21.68]"Hey, isn't this easy?"
      [01:24.90]And you've got a smile that could light up this whole town
      [01:28.92]I haven't seen it in a while since she brought you down
      [01:32.67]You say you're fine, I know you better than that
      [01:35.91]Hey, what you doin' with a girl like that?
      
      [01:39.68]She wears high heels, I wear sneakers
      [01:43.53]She's cheer captain and I'm on the bleachers
      [01:47.07]Dreamin' 'bout the day when you wake up and find
      [01:50.14]That what you're looking for has been here the whole time
      
      [01:53.86]If you could see that I'm the one who understands you
      [01:58.08]Been here all along, so why can't you see
      [02:04.22]You belong with me
      [02:09.25]Standin' by and waitin' at your back door
      [02:12.91]All this time, how could you not know, baby
      [02:18.97]You belong with me
      [02:22.65]You belong with me
      
      [02:37.09]Oh, I remember you drivin' to my house
      [02:40.35]In the middle of the night
      [02:42.14]I'm the one who makes you laugh
      [02:44.06]When you know you're 'bout to cry
      [02:45.87]And I know your favorite songs
      [02:47.70]And you tell me 'bout your dreams
      [02:49.56]Think I know where you belong
      [02:51.51]Think I know it's with me
      
      [02:54.89]Can't you see that I'm the one who understands you?
      [02:59.10]Been here all along, so why can't you see
      [03:05.04]You belong with me
      [03:10.20]Standin' by and waitin' at your back door
      [03:13.90]All this time, how could you not know, baby
      [03:19.92]You belong with me
      [03:23.53]You belong with me
      [03:27.29]You belong with me
      [03:30.07]Have you ever thought just maybe
      [03:34.71]You belong with me
      [03:38.34]You belong with me
      
  `,
  2: `
      [00:00]The Best Day (Taylor's Version)
      [00:16.94]I'm five years old, it's getting cold, I've got my big coat on
      [00:24.72]I hear your laugh and look up smiling at you, I run and run
      [00:32.07]Past the pumpkin patch and the tractor rides
      [00:36.01]Look now, the sky is gold
      [00:40.14]I hug your legs and fall asleep on the way home
      [00:48.02]I don't know why all the trees change in the fall
      [00:55.63]But I know you're not scared of anything at all
      [01:02.81]Don't know if Snow White's house is near or far away
      [01:08.64]But I know I had the best day with you today
      [01:15.92]♪
      [01:22.28]I'm 13 now
      [01:23.90]And don't know how my friends could be so mean
      [01:29.98]I come home crying, and you hold me tight and grab the keys
      [01:37.28]And we drive and drive until we found a town far enough away
      [01:44.95]And we talk and window shop 'til I've forgotten all their names
      [01:53.64]I don't know who I'm going to talk to now at school
      [02:00.79]But I know I'm laughing on the car ride home with you
      [02:08.24]Don't know how long it's going to take to feel okay
      [02:13.71]But I know I had the best day with you today
      [02:23.89]I have an excellent father, his strength is making me stronger
      [02:31.35]God smiles on my little brother, inside and out
      [02:36.13]He's better than I am
      [02:39.02]I grew up in a pretty house and I had space to run
      [02:45.84]And I had the best days with you
      [02:54.38]There is a video I found from back when I was three
      [03:01.94]You set up a paint set in the kitchen and you're talking to me
      [03:09.48]It's the age of princesses and pirate ships and the seven dwarves
      [03:17.44]Daddy's smart
      [03:18.44]And you're the prettiest lady in the whole wide world
      [03:25.49]Now I know why all the trees change in the fall
      [03:32.89]I know you were on my side even when I was wrong
      [03:39.45]And I love you for giving me your eyes
      [03:44.04]For staying back and watching me shine
      [03:47.01]And I didn't know if you knew, so I'm taking this chance to say
      [03:54.23]That I had the best day with you today
      [03:59.24]
  `,
  3: `
      [00:00]Superstar (Taylor's Version)
      [00:12.06]This is wrong, but I can't help but feel like
      [00:18.01]There ain't nothing more right, babe
      [00:23.24]Misty morning comes again and I can't
      [00:29.02]Help but wish I could see your face
      [00:33.97]I knew from the first note played
      [00:36.31]I'd be breaking all my rules to see you
      [00:45.35]You smile that beautiful smile
      [00:47.58]And all the girls in the front row scream your name
      [00:55.63]So dim that spotlight, tell me things like
      [01:01.29]"I can't keep my eyes off of you"
      [01:07.95]I'm no one special, just another wide-eyed girl
      [01:14.87]Who's desperately in love with you
      [01:19.21]Give me a photograph to hang on my wall
      [01:28.68]Superstar
      [01:41.47]Morning loneliness comes around
      [01:45.59]When I'm not dreaming about you
      [01:52.51]When my world wakes up today
      [01:55.70]You'll be in another town
      [02:03.32]And I knew when I saw your face
      [02:05.69]I'd be counting down the ways to see you
      [02:14.46]And you smile that beautiful smile
      [02:16.62]And all the girls in the front row scream your name
      [02:25.03]So dim that spotlight, tell me things like
      [02:30.75]"I can't take my eyes off of you"
      [02:37.61]I'm no one special, just another wide-eyed girl
      [02:44.31]Who's desperately in love with you
      [02:48.74]Give me a photograph to hang on my wall
      [02:57.70]Superstar
      [03:05.04]You played in bars, you play guitar
      [03:10.82]I'm invisible and everyone knows who you are
      [03:16.17]And you'll never see, you sing me to sleep
      [03:22.21]Every night from the radio
      [03:29.23]So dim that spotlight, tell me things like
      [03:34.52]"I can't take my eyes off of you"
      [03:41.43]I'm no one special, just another wide-eyed girl
      [03:48.31]Who's desperately in love with you
      [03:52.54]Give me a photograph to hang on my wall
      [04:02.08]Superstar
      [04:07.10]Sweet, sweet superstar
      [04:13.18]Superstar
      [04:14.88]...
  `,
  4: `
      [00:00]Tell Me Why (Taylor's Version)
      [00:06.09]I took a chance, I took a shot
      [00:10.67]And you might think I'm bulletproof but I'm not
      [00:15.69]You took a swing, I took it hard
      [00:20.14]And down here from the ground, I see who you are
      [00:25.10]I'm sick and tired of your attitude
      [00:27.81]I'm feeling like I don't know you
      [00:30.19]You tell me that you love me, then you cut me down
      [00:34.61]And I need you like a heartbeat
      [00:37.02]But you know you got a mean streak
      [00:39.40]Makes me run for cover when you're around
      [00:44.23]Here's to you and your temper
      [00:47.45]Yes, I remember what you said last night
      [00:52.00]And I know that you see what you're doing to me
      [00:56.62]Tell me why
      [01:00.88]♪
      [01:03.52]Well, you could write a book on
      [01:06.15]How to ruin someone's perfect day
      [01:13.22]Well, I get so confused and frustrated
      [01:16.76]Forget what I'm trying to say, oh-oh
      [01:22.71]I'm sick and tired of your reasons
      [01:25.09]I got no one to believe in
      [01:27.55]You tell me that you want me, then push me around
      [01:32.18]And I need you like a heartbeat
      [01:34.69]But you know you got a mean streak
      [01:37.15]Makes me run for cover when you're around
      [01:41.74]Here's to you and your temper
      [01:44.94]Yes, I remember what you said last night
      [01:49.64]And I know that you see what you're doing to me
      [01:54.34]Tell me why
      [01:58.98]Why do you have to make me feel small
      [02:04.54]So you can feel whole inside?
      [02:09.61]Why do you have to put down my dreams
      [02:13.97]So you're the only thing on my mind?
      [02:20.12]Well, I'm sick and tired of your attitude
      [02:22.73]Feeling like I don't know you
      [02:24.95]You tell me that you want me, and cut me down
      [02:29.96]I'm sick and tired of your reasons
      [02:32.47]I've got no one to believe in
      [02:34.69]You ask me for my love, then you push me around
      [02:39.68]Here's to you and your temper
      [02:42.42]Yes, I remember what you said last night
      [02:47.32]And I know that you see what you're doing to me
      [02:52.08]Tell me why, why?
      [02:56.88]Tell me why, oh
      [03:03.50]I take a step back, let you go
      [03:08.10]I told you I'm not bulletproof
      [03:11.26]Now you know
      [03:12.48]...
  `,
  5: `
      [00:00.51]Once upon a time
      [00:02.43]I believe it was a Tuesday when I caught your eye
      [00:06.17]And we caught onto something
      [00:08.06]I hold onto the night
      [00:10.22]You looked me in the eye and told me you loved me
      [00:14.32]Were you just kidding? 'Cause it seems to me
      [00:17.58]This thing is breaking down, we almost never speak
      [00:20.99]I don't feel welcome anymore
      [00:22.90]Baby, what happened? Please, tell me
      [00:25.13]'Cause one second it was perfect, now you're halfway out the door
      [00:29.66]And I stare at the phone, he still hasn't called
      [00:34.27]And then you feel so low you can't feel nothing at all
      [00:38.19]And you flashback to when he said "forever and always"
      [00:43.92]Oh-oh-oh, oh, and it rains in your bedroom, everything is wrong
      [00:49.68]It rains when you're here and it rains when you're gone
      [00:53.48]'Cause I was there when you said "forever and always"
      [01:00.66]Was I out of line?
      [01:02.33]Did I say something way too honest?
      [01:04.33]Made you run and hide like a scared little boy
      [01:07.84]I looked into your eyes
      [01:10.38]Thought I knew you for a minute, now I'm not so sure
      [01:15.36]So here's to everything coming down to nothing
      [01:19.49]Here's to silence that cuts me to the core
      [01:22.88]Where is this going?
      [01:25.23]Thought I knew for a minute, but I don't anymore
      [01:29.66]And I stare at the phone, he still hasn't called
      [01:34.60]And then you feel so low you can't feel nothing at all
      [01:38.27]And you flashback to when he said "forever and always"
      [01:43.98]Oh-oh-oh, and it rains in your bedroom, everything is wrong
      [01:49.61]It rains when you're here and it rains when you're gone
      [01:53.37]'Cause I was there when you said, "Forever and always"
      [01:59.30]You didn't mean it baby
      [02:03.06]I don't think so
      [02:08.34]Oh-oh, oh, oh
      [02:24.85]Oh, back up, baby, back up
      [02:28.57]Did you forget everything?
      [02:32.88]Back up, baby, back up
      [02:35.84]Did you forget everything?
      [02:43.37]'Cause it rains in your bedroom, everything is wrong
      [02:47.77]It rains when you're here and it rains when you're gone
      [02:51.48]'Cause I was there when you said "forever and always"
      [02:57.53]Oh, I stare at the phone, he still hasn't called
      [03:02.43]And then you feel so low you can't feel nothing at all
      [03:06.28]And you flashback to when we said "forever and always"
      [03:13.56]And it rains in your bedroom, everything is wrong
      [03:17.52]It rains when you're here and it rains when you're gone
      [03:21.47]'Cause I was there when you said "forever and always"
      [03:27.62]You didn't mean it, baby
      [03:31.26]You said "forever and always" yeah
      [03:36.60]...
  `,
  6: `
      [00:00]The Other Side Of The Door (Taylor’s Version)
      [00:12.01]In the heat of the fight, I walked away
      [00:18.67]Ignorin' words that you were sayin'
      [00:21.61]Tryna make me stay
      [00:23.76]I said, "This time I've had enough"
      [00:30.48]And you've called a hundred times
      [00:33.29]But I'm not picking up
      [00:36.77]'Cause I'm so mad, I might tell you that it's over
      [00:43.10]But if you look a little closer
      [00:47.93]I said, "Leave", but all I really want is you
      [00:53.51]To stand outside my window, throwin' pebbles
      [00:57.21]Screamin', "I'm in love with you"
      [00:59.78]Wait there in the pourin' rain, comin' back for more
      [01:05.30]And don't you leave, 'cause I know
      [01:07.86]All I need is on the other side of the door
      [01:14.55]♪
      [01:22.65]Me and my stupid pride are sittin' here alone
      [01:29.15]Goin' through the photographs, starin' at the phone
      [01:33.75]I keep goin' back over things we both said
      [01:40.28]And I remember the slamming door
      [01:43.22]And all the things that I misread
      [01:46.72]Oh, babe, if you know everything
      [01:49.13]Tell me why you couldn't see
      [01:52.88]When I left, I wanted you to chase after me, yeah
      [01:58.33]I said, "Leave", but all I really want is you
      [02:03.70]To stand outside my window, throwin' pebbles
      [02:07.72]Screamin', "I'm in love with you"
      [02:10.14]Wait there in the pourin' rain, comin' back for more
      [02:15.78]And don't you leave, 'cause I know
      [02:18.17]All I need is on the other side of the door
      [02:25.46]♪
      [02:32.95]And I'll scream out the window
      [02:36.49]I can't even look at you
      [02:39.93]I don't need you but I do, I do, I do
      [02:45.67]I say, "There's nothing you can say
      [02:48.56]To make this right again, I mean it, I mean it"
      [02:55.85]But what I mean is
      [03:02.63]I said, "Leave", but, baby, all I want is you
      [03:08.25]To stand outside my window, throwin' pebbles
      [03:11.84]Screamin', "I'm in love with you"
      [03:14.40]Wait there in the pourin' rain, comin' back for more
      [03:19.96]And don't you leave, 'cause I know
      [03:22.37]All I need is on the other side of the door
      [03:26.41]With your face and the beautiful eyes
      [03:28.88]And the conversation with the little white lies
      [03:31.75]And the faded picture of a beautiful night
      [03:34.81]You carried me from your car up the stairs
      [03:37.53]And I broke down crying, was she worth this mess?
      [03:40.41]After everything and that little black dress
      [03:43.47]After everything I must confess, I need you
      [03:52.12]...
  `,
  51: `
      [00:00]Enchanted (Taylor's Version)
      [00:13.21]There I was again tonight
      [00:16.23]Forcing laughter, faking smiles
      [00:19.13]Same old tired, lonely place
      [00:24.93]Walls of insincerity
      [00:27.71]Shifting eyes and vacancy
      [00:30.74]Vanished when I saw your face
      [00:34.38]All I can say is it was enchanting to meet you
      [00:45.27]♪
      [00:48.40]Your eyes whispered, "Have we met?"
      [00:51.38]Across the room, your silhouette
      [00:54.18]Starts to make its way to me
      [00:59.85]The playful conversation starts
      [01:03.04]Counter all your quick remarks
      [01:05.59]Like passing notes in secrecy
      [01:10.94]And it was enchanting to meet you
      [01:21.01]All I can say is I was enchanted to meet you
      [01:32.20]♪
      [01:35.99]This night is sparkling, don't you let it go
      [01:41.95]I'm wonderstruck, blushing all the way home
      [01:47.72]I'll spend forever wondering if you knew
      [01:53.12]I was enchanted to meet you
      [02:00.61]♪
      [02:04.44]The lingering question kept me up
      [02:07.48]2 a.m., who do you love?
      [02:10.34]I wonder 'til I'm wide awake
      [02:15.98]And now I'm pacing back and forth
      [02:19.14]Wishing you were at my door
      [02:21.94]I'd open up and you would say
      [02:26.50]"Hey, it was enchanting to meet you"
      [02:37.50]All I know is I was enchanted to meet you
      [02:49.50]
      [02:51.95]This night is sparkling, don't you let it go
      [02:58.04]I'm wonderstruck, blushing all the way home
      [03:03.61]I'll spend forever wondering if you knew
      [03:15.53]This night is flawless, don't you let it go
      [03:21.36]I'm wonderstruck, dancing around all alone
      [03:27.15]I'll spend forever wondering if you knew
      [03:32.65]I was enchanted to meet you
      [03:39.40]♪
      [03:58.60]This is me praying that
      [04:02.06]This was the very first page
      [04:04.90]Not where the storyline ends
      [04:08.19]My thoughts will echo your name
      [04:10.66]Until I see you again
      [04:13.78]These are the words I held back
      [04:16.57]As I was leaving too soon
      [04:19.62]I was enchanted to meet you
      [04:25.22]Please, don't be in love with someone else
      [04:30.77]Please, don't have somebody waiting on you
      [04:36.66]Please, don't be in love with someone else
      [04:42.54]Please, don't have somebody waiting on you
      [04:49.16]This night is sparkling, don't you let it go
      [04:54.91]I'm wonderstruck, blushing all the way home
      [05:00.86]I'll spend forever wondering if you knew
      [05:08.03]♪
      [05:12.59]This night is flawless, don't you let it go
      [05:18.46]I'm wonderstruck, dancing around all alone
      [05:24.25]I'll spend forever wondering if you knew
      [05:29.93]I was enchanted to meet you
      [05:35.34]Please, don't be in love with someone else
      [05:41.10]Please, don't have somebody waiting on you
      [05:47.19]...
  `,
  61: `
      [00:00]Better Than Revenge (Taylor's Version)
      [00:00]Now go stand in the corner and think about what you did
      [00:03]♪
      [00:08]Ha
      [00:10]♪
      [00:13]Ha-ha, time for a little revenge
      [00:17]The story starts when it was hot and it was summer, and
      [00:20]I had it all, I had him right there where I wanted him
      [00:24]She came along, got him alone, and let's hear the applause
      [00:27]She took him faster than you could say "sabotage"
      [00:30]I never saw it coming, wouldn't have suspected it
      [00:34]I underestimated just who I was dealing with (oh)
      [00:37]She had to know the pain was beating on me like a drum
      [00:40]She underestimated just who she was stealing from
      [00:45]She's not a saint, and she's not what you think
      [00:48]She's an actress, whoa
      [00:52]He was a moth to the flame
      [00:54]She was holding the matches, whoa
      [00:58]Soon she's gonna find stealing other people's toys
      [01:01]On the playground won't make you many friends
      [01:05]She should keep in mind, she should keep in mind
      [01:07]There is nothing I do better than revenge (revenge), ha
      [01:13]♪
      [01:18]She looks at life like it's a party and she's on the list
      [01:21]She looks at me like I'm a trend and she's so over it
      [01:25]I think her ever-present frown is a little troubling, and
      [01:28]She thinks I'm psycho, 'cause I like to rhyme her name with things
      [01:31]But sophistication isn't what you wear or who you know
      [01:34]Or pushing people down to get you where you wanna go
      [01:38]They didn't teach you that in prep school, so it's up to me
      [01:41]But no amount of vintage dresses gives you dignity (think about what you did)
      [01:46]She's not a saint and she's not what you think
      [01:49]She's an actress, whoa
      [01:52]He was a moth to the flame
      [01:54]She was holding the matches, whoa
      [01:59]Soon she's gonna find stealing other people's toys
      [02:02]On the playground won't make you many friends
      [02:05]She should keep in mind, she should keep in mind
      [02:08]There is nothing I do better than revenge (ha-ha)
      [02:15]I'm just another thing for you to roll your eyes at, honey
      [02:18]You might have him, but haven't you heard?
      [02:22]I'm just another thing for you to roll your eyes at, honey
      [02:25]You might have him, but I'll always get the last word
      [02:32]Whoa
      [02:36](Come on, can you take it back?)
      [02:39](Come on)
      [02:42]She's not a saint, and she's not what you think (no)
      [02:45]She's an actress, whoa (she deserves it)
      [02:48]He was a moth to the flame
      [02:50]She was holding the matches, whoa
      [02:55]Soon she's gonna find stealing other people's toys
      [02:58]On the playground won't make you many friends
      [03:01]She should keep in mind, she should keep in mind
      [03:04]There is nothing I do better than revenge (come on)
      [03:08]Do you still feel like you know what you're doing?
      [03:11]'Cause I don't think you do, oh (no, no, no, no)
      [03:14]Do you still feel like you know what you're doing? (No)
      [03:18]I don't think you do, I don't think you do (come on), let's hear the applause
      [03:22]Come show me how much better you are (feels so much better, yeah?)
      [03:26]See, you deserve some applause
      [03:29]'Cause you're so much better
      [03:31]She took him faster than you could say "sabotage"
      [03:34]...
  `,
};
//lyrics toggle
const lyricsButton = document.querySelector('#lyrics-btn');
lyricsButton.addEventListener('click', () => {
  lyricsMode = !lyricsMode;
  if (lyricsMode) {
    document.getElementById("lyrics-container").style.display="block";
    document.getElementById("lyrics-btn").style.color="rgb(0, 162, 255";
  }
  else {
    document.getElementById("lyrics-container").style.display="none";
    document.getElementById("lyrics-btn").style.color="rgba(241,243,244,255)";
  }
});
// Function to display lyrics for the current song
function displayLyrics(songIndex) {
  const lyrics = lyricsData[songIndex] || 'Lyrics not available for this song.';
  lyricsText.textContent = lyrics;
}

// Function to update lyrics based on the current time
function updateLyrics(currentTime, lyrics) {
  const lines = lyrics.split('\n');
  for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const [time, text] = line.split(']');
      if (time && text) {
          const [minutes, seconds] = time
              .replace('[', '')
              .split(':')
              .map(parseFloat);
          const lyricTime = minutes * 60 + seconds;
          if (lyricTime <= currentTime && lyricTime + 5 >= currentTime) {
              lyricsText.textContent = text.trim();
              return;
          }
      }
  }
}

// Player event listeners
player.addEventListener('timeupdate', () => {
  const currentTime = player.currentTime;
  const songIndex = currentSongIndex;
  const lyrics = lyricsData[songIndex];
  updateLyrics(currentTime, lyrics);
});



//player
function playSong(songIndex) {
  const song = playlist.querySelectorAll('.song')[songIndex];
  const src = song.getAttribute('data-src');
  const srcc = song.getAttribute('src');
  const arc = song.getAttribute('arc');
  songName.textContent = song.textContent;
  pageTitle.textContent = song.textContent + " - Playing Now";
  player.src = src;
  sbanner.src = srcc;
  artt.textContent = arc;
  logoo.href = srcc;
  player.currentTime = localStorage.getItem('currentTime') || 0; // resume from the stored time needs to be fixed
  player.play();
  displayLyrics(songIndex); // Display lyrics for the current song
  playlist.querySelectorAll('.song').forEach((song, index) => {
    if (index === songIndex) {
      song.classList.add('current-song');
    } else {
      song.classList.remove('current-song');
    }
  });
  currentSongIndex = songIndex;
  isPlaying = true;
// storing the song index and time
  localStorage.setItem('currentSongIndex', currentSongIndex);
  localStorage.setItem('currentTime', player.currentTime);
}

//Initialize the display lyrics
displayLyrics(currentSongIndex);

playlist.addEventListener('click', event => {
  const song = event.target.closest('.song');
  if (song) {
    const songIndex = Array.from(playlist.querySelectorAll('.song')).indexOf(song);
    playSong(songIndex);
  }
});

//getting total number of songs
function getTotalSongs() {
  const playlist = document.getElementById("playlist");
  const songs = playlist.getElementsByTagName("li");
  return songs.length;
}
var totalSongs = getTotalSongs();

//modes and default
player.addEventListener('ended', () => {
  if (repeatMode) {
    playSong(currentSongIndex);
  }
  else if (shuffleMode){
    const shuffleSongIndex = Math.floor((Math.random() * totalSongs) + 1);
    playSong(shuffleSongIndex);
  }
  else {
    const nextSongIndex = (currentSongIndex + 1) % playlist.childElementCount;
    playSong(nextSongIndex);
  }
});

//repeat
const repeatButton = document.querySelector('#repeat-btn');
repeatButton.addEventListener('click', () => {
  repeatMode = !repeatMode;
  if (repeatMode) {
    repeatButton.classList.add('active');
    document.getElementById("repeat-btn").style.color="rgb(0, 162, 255";
    if (shuffleButton.classList.contains("active")) {
      shuffleButton.classList.remove("active");
    }
    if(shuffleMode){
      shuffleMode = !shuffleMode
      document.getElementById("shuffle-btn").style.color="rgba(241,243,244,255)";
    }  
  }
  else {
    repeatButton.classList.remove('active');
    document.getElementById("repeat-btn").style.color="rgba(241,243,244,255)";
  }
});

//next and prev
function prevSong(){
  if(shuffleMode){
    const shuffleSongIndex = Math.floor((Math.random() * totalSongs) + 1);
    playSong(shuffleSongIndex);
  }
  else{  
    const prevSongIndex = (currentSongIndex - 1) % playlist.childElementCount;
    playSong(prevSongIndex);
  }  
}

function nextSong(){
  if(shuffleMode){
    const shuffleSongIndex = Math.floor((Math.random() * totalSongs) + 1);
    playSong(shuffleSongIndex);
  }
  else{
    const nextSongIndex = (currentSongIndex + 1) % playlist.childElementCount;
    playSong(nextSongIndex);
  }
}

const prevButton = document.querySelector('#prev-btn')
prevButton.addEventListener('click', () => {
  prevSong();
});
const nextButton = document.querySelector('#next-btn')
nextButton.addEventListener('click', () => {
  nextSong()
});


//play and pause
const playPause = document.querySelector('#playpause')
playPause.addEventListener('click', () => {
  if(player.paused == true){
    player.play();

  }
  else{
    player.pause();
  }
});
player.addEventListener("play", function() {
  playPause.src = "css/images/pause.svg";
});

player.addEventListener("pause", function() {
  playPause.src = "css/images/play.svg";
});

//time updates
const currentTime = document.getElementById("currentTime");
const totalDuration = document.getElementById("totalDuration");

player.addEventListener("timeupdate", function() {
  // Display current time
  const currentTimeValue = player.currentTime;
  const minutes = Math.floor(currentTimeValue / 60);
  const seconds = Math.floor(currentTimeValue % 60);
  currentTime.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const remainingTimeValue = player.duration - currentTimeValue;
  const remainingMinutes = Math.floor(remainingTimeValue / 60);
  const remainingSeconds = Math.floor(remainingTimeValue % 60);
  totalDuration.innerHTML = `-${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
});
// check if there is a stored song index and resume playing the song
if (localStorage.getItem('currentSongIndex')) {
  playSong(currentSongIndex);
}  
//key binds
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    if (isPlaying) {
      player.pause();
      playPause.src = "css/images/play.svg";
    } 
    else {
      player.play();
      playPause.src = "css/images/pause.svg";
    }
  } 
  else if (event.code === 'ArrowRight') {
    nextSong();
  } 
  else if (event.code === 'ArrowLeft') {
    prevSong();
  }
});
//shuffle
const shuffleButton = document.querySelector('#shuffle-btn');
shuffleButton.addEventListener('click', () => {
  shuffleMode = !shuffleMode;
  if (shuffleMode) {
    shuffleButton.classList.add('active');
    document.getElementById("shuffle-btn").style.color="rgb(0, 162, 255";
    if (repeatButton.classList.contains("active")) {
      repeatButton.classList.remove("active");
    }
    if(repeatMode){  
      repeatMode = !repeatMode
      document.getElementById("repeat-btn").style.color="rgba(241,243,244,255)";
    }  
  } else {
    shuffleButton.classList.remove('active');
    document.getElementById("shuffle-btn").style.color="rgba(241,243,244,255)";
  }
});
//seek
var music = document.getElementById('player')
var progessed = document.getElementById('progessed')
var progess_bar = document.getElementById('progess_bar')

music.ontimeupdate = function(e){
  progessed.style.width = Math.floor(music.currentTime*100/music.duration)+"%";
}
progess_bar.onclick = function(e){
  music.currentTime = ((e.offsetX/progess_bar.offsetWidth) * music.duration)
}

//Sticky Header
window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Check if the website is already open in another window or tab
if (document.cookie.split(';').some(function(item) {
  return item.trim().indexOf('websiteOpen=') == 0;
})) {
alert('Another instance of the website is already open.');
// Redirect to another page or perform any other action
window.location.href = 'about:home'; // Replace with your desired URL
} else {
// Set a cookie to indicate that the website is open
document.cookie = 'websiteOpen=true; path=/';

// Remove the cookie when the user closes the window or tab
window.addEventListener('beforeunload', function() {
  document.cookie = 'websiteOpen=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});
}



/*
//to prevent context menu
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(event) {
  if (event.keyCode == 123) { // F12 key
    return false;
  }
  else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Ctrl+Shift+I
    return false;
  }
};
*/
/*
//loading of song

// Hide the loading overlay by default
document.addEventListener("DOMContentLoaded", function () {
  var loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.opacity = "0";
  loadingOverlay.style.pointerEvents = "none";
});

// Show the loading overlay when a song or next/previous button is clicked
var songs = document.querySelectorAll(".song");
//var nextButton = document.getElementById("next-button");
//var prevButton = document.getElementById("prev-button");

songs.forEach(function (song) {
  song.addEventListener("click", showLoadingOverlay);
});

nextButton.addEventListener("click", showLoadingOverlay);
prevButton.addEventListener("click", showLoadingOverlay);

function showLoadingOverlay() {
  var loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.opacity = "1";
  loadingOverlay.style.pointerEvents = "auto";

  // Simulating the music loading with setTimeout
  setTimeout(function () {
    loadingOverlay.style.opacity = "0";
    loadingOverlay.style.pointerEvents = "none";
  }, 2500); // Adjust the time to match the actual loading time
}*/
