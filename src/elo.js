// Expected Score of player given other player rating
function expectedScore(playerRating, otherRating) {
    const numerator = 1;
    const denom = 1 + (Math.pow(10, (otherRating - playerRating) / 400));
    return Number((numerator / denom).toFixed(2));
}

// Using a k-factor of 32
function calcNewRating(oldRating, expectedThisPlayer, observed) {
    const ans = oldRating + (32 * (observed - expectedThisPlayer));
    return Number(ans.toFixed(3));
}

// Take in 2 ratings, and match outcome
// matchResult == 0 => playerA won,
// matchResult == 1 => playerB won,
// matchResult == 2 => tie (should never happen)
function expectAndNewRating(ratingA, ratingB, matchResult) {
    const EA_1st = expectedScore(ratingA, ratingB);
    const EB_1st = expectedScore(ratingB, ratingA);
    console.log(`EA is: ${EA_1st}`);
    console.log(`EB is: ${EB_1st}`);

    let newA, newB;

    if (matchResult === 0) {
        newB = calcNewRating(ratingB, EB_1st, 0);
        newA = calcNewRating(ratingA, EA_1st, 1);
    } else if (matchResult === 1) {
        newB = calcNewRating(ratingB, EB_1st, 1);
        newA = calcNewRating(ratingA, EA_1st, 0);
    } else {
        console.log("this shouldn't print");
        newB = calcNewRating(ratingB, EB_1st, 0.5);
        newA = calcNewRating(ratingA, EA_1st, 0.5);
    }

    return [newA, newB];
}

// Example usage
function main() {
    const a = 1613;
    const b = 1609;

    const [newA, newB] = expectAndNewRating(a, b, 1);
    console.log(`newA is ${newA}`);
    console.log(`newB is ${newB}`);
}

// Run the example if this file is run directly
if (require.main === module) {
    main();
}

// Export the functions for use in other files
module.exports = {
    expectedScore,
    calcNewRating,
    expectAndNewRating
}; 