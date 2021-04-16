const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();
const knex = require('../../src/knex/knex');
const storyService = require('../../src/services/storyServices');

describe('storyService',()=>{
    it('should insert a story',async ()=>{
        const storyToBeSaved = {
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
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
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        }];

        const selectStub = sandbox.stub().returnsThis();
        const whereStub = sandbox.stub().resolves(mResponse);
        sandbox.stub(knex, "from").callsFake(() => {
            return {
                select: selectStub,
                where: whereStub,
            };
        });
        const actual = await storyService.insertStory(storyToBeSaved,"1");

        const expected = {
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        };
        expect(actual).to.be.deep.equal(expected);
    });

    it('should get a story with id',async ()=>{
        const mResponse = [{
            id:"1",
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        }];

        const selectStub = sandbox.stub().returnsThis();
        const whereStub = sandbox.stub().resolves(mResponse);
        sandbox.stub(knex, "from").callsFake(() => {
            return {
                select: selectStub,
                where: whereStub,
            };
        });
        const actual = await storyService.getStory("1");

        const expected = {
            id:"1",
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        };
        expect(actual).to.be.deep.equal(expected);
    });

    it('should get all stories for a user',async ()=>{
        const user = {id:"1"};
        const mResponse = [{
            id:"1",
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        }];

        const selectStub = sandbox.stub().returnsThis();
        const whereStub = sandbox.stub().resolves(mResponse);
        sandbox.stub(knex, "from").callsFake(() => {
            return {
                select: selectStub,
                where: whereStub,
            };
        });
        const actual = await storyService.getAllStoriesForUser(user);

        const expected = [{
            id:"1",
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        }];
        expect(actual).to.be.deep.equal(expected);
    });

    it('should get all stories',async ()=>{
        const mResponse = [{
            id:"1",
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        }];

        const selectStub = sandbox.stub().resolves(mResponse);
        sandbox.stub(knex, "from").callsFake(() => {
            return {
                select: selectStub,
            };
        });
        const actual = await storyService.getAllStories();

        const expected = [{
            id:"1",
            summary: "summary",
            description: "description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        }];
        expect(actual).to.be.deep.equal(expected);
    });

    it('should update a story',async ()=>{

        const mResponse = [{
            id:"1",
            summary: "updated summary",
            description: "updated description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        }];

        const intoStub = sandbox.stub().returnsThis();
        const whereStub = sandbox.stub().resolves(mResponse);
        sandbox.stub(knex,"update").callsFake(() => {
            return {
                into:intoStub,
                where:whereStub
            };
        });

        const selectStub = sandbox.stub().returnsThis();
        const newWhereStub = sandbox.stub().resolves(mResponse);
        sandbox.stub(knex, "from").callsFake(() => {
            return {
                select: selectStub,
                where:newWhereStub,
            };
        });
        const actual = await storyService.updateStory({});

        const expected = {
            id:"1",
            summary: "updated summary",
            description: "updated description",
            type: "type",
            complexity: "complexity",
            estimated_time_of_completion: "5",
            cost: "10",
            created_by_user_id: "1"
        };
        expect(actual).to.be.deep.equal(expected);
    });

    afterEach(function () {
        sandbox.restore();
    });
})
