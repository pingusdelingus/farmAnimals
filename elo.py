import math


#Expcted Score of player given other player rating
def expectedScore(playerRating, otherRating):
    numerator = 1
    denom = 1 + (10 ** ((otherRating - playerRating) / 400))

    return round(numerator / denom, 2)



#usnig a k-factor of 32
def calcNewRating(oldRating:int, expectedThisPlayer:float, observed:float):
    ans = oldRating + (32 * (observed - expectedThisPlayer))
    return round(ans, 3)

# take in 2 ratings, and match outcome
# matchResult == 0 => playerA won,
# matchResult == 1 => playerB won,
# matchResult == 2 => tie (should never happen
def expectAndNewRating(ratingA, ratingB, matchResult) -> list[int]:
    EA_1st = expectedScore(ratingA, ratingB)
    EB_1st = expectedScore(ratingB, ratingA)
    print(f"EA is :{EA_1st}")
    print(f"EB is :{EB_1st}")

    if matchResult == 0:
        newB = calcNewRating(ratingB, EB_1st,0)
        newA = calcNewRating(ratingA, EA_1st,1)
        return [newA, newB]
    elif matchResult == 1:
        newB = calcNewRating(ratingB, EB_1st, 1)
        newA = calcNewRating(ratingA,EA_1st,0)
        return [newA, newB]
    else:
        print("this shouldnt print")
        newB = calcNewRating(ratingB, EB_1st, 0.5)
        newA = calcNewRating(ratingA,EA_1st,0.5)
        return [newA, newB]

def main():
    a= 1613
    b = 1609

    newb, newa = expectAndNewRating(a,b,1)
    print(f"newa is {newa}")
    print(f"new b is {newb}")


if __name__ == "__main__":
    main()

