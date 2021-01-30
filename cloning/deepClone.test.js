const { deepCloneSerialize, deepCloneRecursive } = require("./deepClone")

function getObject () {
    let paddy = {name: 'Paddy', address: {town: 'Lerum', country: 'Sweden'}};
    return { paddy }
}


describe("deepCloneSerialize", () => {
    const { paddy } = getObject();
    let paddyClone = deepCloneSerialize(paddy);

    test("is unequal to target source ", () => 
        expect(paddyClone !== paddy).toBe(true)
    )

    test("is unequal to nested source", () => 
        expect(paddyClone.address !== paddy.address).toBe(true)
    )

    test("nested value is the same", () => 
        expect(paddyClone.address.town === paddy.address.town).toBe(true)
    )
});

describe("deepCloneRecursive", () => {
    const { paddy } = getObject();
    let paddyClone = deepCloneRecursive(paddy);

    test("is unequal to target source ", () => 
        expect(paddyClone !== paddy).toBe(true)
    )

    test("is unequal to nested source", () => 
        expect(paddyClone.address !== paddy.address).toBe(true)
    )
    
    test("nested value is the same", () => 
        expect(paddyClone.address.town === paddy.address.town).toBe(true)
    )
}); 