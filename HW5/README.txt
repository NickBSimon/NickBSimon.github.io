github url: https://nickbsimon.github.io/HW5/
github repo: https://github.com/NickBSimon/NickBSimon.github.io/tree/main/HW5

writeup:

For my implementation of the scrabble program, I was unable to get everything completely working. I hit an impass when trying to figure out how to keep track of which letters
were on the board and get the score from them. Eventually I fixed most of this problem, but a few issues are still around:
  Known issues:
  You can stack tiles ontop of eachother, they won't be counted multiple times but they are reshuffled
  Moving a tile in and out of a spot will count it multiple times, theres a function i commented out at the bottom that attempted to solve this issue but it didn't work.