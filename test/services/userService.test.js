const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();
const knex = require('../../src/knex/knex');
const userService = require('../../src/services/userService');

describe('userService',()=>{
    it('should get a user',async ()=>{
        const mockResponse = [{
            first_name: "jishnu",
            last_name: "sanyal",
            email: "mail@email.com",
            user_type_id: '1'
        }];
        const selectStub = sandbox.stub().returnsThis();
        const whereStub = sandbox.stub().resolves(mockResponse);
        sandbox.stub(knex, "from").callsFake(() => {
            return {
                select: selectStub,
                where: whereStub,
            };
        });
        const actual = await userService.getUser("email@mail.com")
        const expected = {
            first_name: "jishnu",
            last_name: "sanyal",
            email: "mail@email.com",
            user_type_id: '1'
        }
        expect(actual).to.be.deep.equal(expected);

    });

    it('should insert a user',async ()=>{
        const  hashedPassword = "hashedPassword"
        const userToBeSaved = {
            first_name: "jishnu",
            last_name: "sanyal",
            email: "mail@email.com",
            user_type_id: '1'
        };
        const intoStub = sandbox.stub().returnsThis();
        const returningStub = sandbox.stub().resolves("1");
        sandbox.stub(knex,"insert").callsFake(() => {
            return {
                into:intoStub,
                returning:returningStub
            };
        });

        const mResponse = [{
            first_name: "jishnu",
            last_name: "sanyal",
            email: "mail@email.com",
            user_type_id: '1'
        }];
        const selectStub = sandbox.stub().returnsThis();
        const whereStub = sandbox.stub().resolves(mResponse);
        sandbox.stub(knex, "from").callsFake(() => {
            return {
                select: selectStub,
                where: whereStub,
            };
        });
        const actual = await userService.insertUser(userToBeSaved,hashedPassword)
        const expected = {
            first_name: "jishnu",
            last_name: "sanyal",
            email: "mail@email.com",
            user_type_id: '1'
        }
        expect(actual).to.be.deep.equal(expected);

    });

    afterEach(function () {
        sandbox.restore();
    });

})


