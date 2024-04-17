# Focalmancy
This Hack-sprint project is relatively simple in concept. It's a game that tracks your eye movements. Or tries to, anyway (our Webgazer.js library is...spotty sometimes). 

The premise: you're a transcendent Being in charge of a pocket-dimension. In much the same way that Schrödinger theorized that quantum systems must be perceived in order to exist, your task is to keep this infant dimension alive through your mere observation. Too much diverted attention, however, will cause the destruction of your dimension and any inhabitants therein.

# Mechanics
A brief description of the tools used. This game is primarily run through vanilla Javascript. It incorporates a free eye-tracking library, called Webgazer.js, to give a rough estimate of the location you happen to be staring at (hopefully, the bright orb on the screen). We acknowledge performance issues. Apparently, JavaScript is not intended for complex and repeated mathematical operations and our program does reflect that.

# Instructions
The primary requirement is a WEBCAMERA. Webgazer.js has problems running in browsers other than Chrome. Allow the browser to access your webcam. Assuming we didn't goof, you should simply be able to experience our project at the following URL: https://npr95.pythonanywhere.com/

# Inspiration
This game was inspired by a [study](https://www.mdpi.com/1660-4601/17/13/4780) we read about fixation focus training. Elementary school children were given a simple task: stare at an object on the wall for 1-3 minutes. They were then examined for increases in attention and concentration. While it didn't result in superhuman attention, there were significant statistical increases in attention as well as increases in their ability to filter stimuli which is just as important for sustained concentration bouts. Obviously, we changed things up a little bit. It would have been boring to make a game where participants only looked at a solitary object, even if that would have corresponded closer with the study that this project derives its inspiration from.
