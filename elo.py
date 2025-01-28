import math


#Expcted Score of player given other player rating
def expectedScore(playerRating, otherRating):
    numerator = 1
    denom = 1 + (10 ** ((otherRating - playerRating) / 400))

    return numerator / denom



#usnig a k-factor of 32
def calcNewRating(oldRating:int, expectedThisPlayer:float, observed:float):
    return oldRating + (32 * (observed - expectedThisPlayer))



RatingA = 2000


EB_1st = expectedScore(1477, RatingA)

newB = calcNewRating(1477, EB_1st, 1)
print(newB)

