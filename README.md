User stories:

game play
1. As a user, I want to see three cups on the screen so that I can choose where I think the ball is hidden.
2. As a user, I want to click on a cup to make my guess so that I can try to find the ball.
3. As a user, I want to see an animation of cups shuffling so that the game feels challenging and fun.
4. As a user, I want the ball to be revealed after I make my guess so that I can know if I won or lost.

scoring 
5. As a user, I want to see a message when I win or lose so that I get immediate feedback on my guess.
6. As a user, I want my score to increase when I guess correctly so that I can track my progress.
7. As a user, I want my score to reset when I start a new game so that I can play again from zero.
8. As a user, I want to know my highest score so i can challenge myself.






Pseudocode:

1. start the game

2. show three cups to the player //const elements

3. hide a ball under one of the cups //use let for ball position

4. shuffle the cups  randomly // function shuffleCups()

5. ask the player to choose a cup //add event listener to each cup element

6. reveal if the player chosen cup has the the ball // if statement chosen cup index === ball position var //alert() to show win&lose massage

6. Ask if the player wants to play again// button with addListener to restart

7. End game



