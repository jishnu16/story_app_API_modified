const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();
const story = require('../../src/routes/stories');
const mockStoryService = require('../../src/services/storyServices');
const mockStoryValidator = require('../../validators/storyValidator');
const mockRoleValidator = require('../../validators/roleValidator');

const mockRequest = (userData) => ({
    body: userData,
    user:{id:1,},
    params:{id:7}
});

const mockResponse = () => {
    const res = {};
    res.status = sandbox.stub().returns(res);
    res.json = sandbox.stub().returns(res);
    res.send = sandbox.stub().returns(res);
    res.header = sandbox.stub().returns(res);
    return res;
};

describe('Story Tests',()=>{
    describe('createStory',()=>{
        it('should create a story',async () => {
            const storyDetails = {
                summary: "Summary here",
                description: "Bla bla bla",
                type: "enhancement",
                complexity: "low"
            };

            const insertedStoryDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": null,
                "created_by_user_id": "8"
            }
            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockStoryService,"insertStory").returns(insertedStoryDetails);
            sandbox.stub(mockStoryValidator,"validate").returns(true);

            await story.createStory(req,res);
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(insertedStoryDetails)).to.be.true;
        });

        it('should not create a story when validation fails',async () => {
            const storyDetails = {
                summary: "Summary here",
                description: "Bla bla bla",
            };
            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockStoryValidator,"validate").throws(new Error("Invalid"));
            await story.createStory(req,res);
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({"error": "Invalid"})).to.be.true;
        });

        afterEach(function () {
            sandbox.restore();
        });
    });

    describe('getStoryForId',()=>{
        it('should get a story with id when requested by admin ',async ()=>{
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": null,
                "created_by_user_id": "1"
            };

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(true);
            sandbox.stub(mockStoryService,"getStory").returns(storyDetails);
            await story.getStoryForId(req,res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(storyDetails)).to.be.true;
        });

        it('should not get a story with id when the story created and requested by different user ',async ()=>{
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": null,
                "created_by_user_id": "2"
            };

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(false);
            sandbox.stub(mockRoleValidator,"isUser").returns(true);
            sandbox.stub(mockStoryService,"getStory").returns(storyDetails);
            await story.getStoryForId(req,res);
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.send.calledWith('Requested Story created by another user')).to.be.true;

        });

        it('should not get a story with id when the story not exists  ',async ()=>{
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": null,
                "created_by_user_id": "2"
            };

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(false);
            sandbox.stub(mockRoleValidator,"isUser").returns(true);
            sandbox.stub(mockStoryService,"getStory").returns([]);
            await story.getStoryForId(req,res);
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.send.calledWith('Requested Story created by another user')).to.be.true;

        });

        it('should get a story with id when the story created and requested by same user ',async ()=>{
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": null,
                "created_by_user_id": "1"
            };

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(false);
            sandbox.stub(mockRoleValidator,"isUser").returns(true);
            sandbox.stub(mockStoryService,"getStory").returns(storyDetails);
            await story.getStoryForId(req,res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(storyDetails)).to.be.true;

        });

        afterEach(function () {
            sandbox.restore();
        });
    });

    describe('changeStatus',()=>{
        it('should change a story status by an admin',async ()=>{
            const storyList = [{
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "previousStatus",
                "created_by_user_id": "1"
            }];
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "accepted",
                "created_by_user_id": "1"
            }

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(true);
            sandbox.stub(mockRoleValidator,"isUser").returns(false);
            sandbox.stub(mockStoryService,"getAllStories").returns(storyList);
            sandbox.stub(mockStoryService,"updateStory").returns(storyDetails);
            await story.changeStatus(req,res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(storyDetails)).to.be.true;
        });

        it('should not change a story status by an user',async ()=>{
            const storyList = [{
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "previousStatus",
                "created_by_user_id": "1"
            }];
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "accepted",
                "created_by_user_id": "1"
            }

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(false);
            sandbox.stub(mockRoleValidator,"isUser").returns(true);
            sandbox.stub(mockStoryService,"getAllStories").returns(storyList);

            await story.changeStatus(req,res);
            expect(res.status.calledWith(403)).to.be.true;
            expect(res.send.calledWith("You Don't have permission to modify story")).to.be.true;
        });

        it('should not change a story status when invalid status given',async ()=>{
            const storyList = [{
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "previousStatus",
                "created_by_user_id": "1"
            }];
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "invalidStatus",
                "created_by_user_id": "1"
            }

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockStoryService,"getAllStories").returns(storyList);
            await story.changeStatus(req,res);
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.send.calledWith("Status should be 'accepted' or 'rejected'")).to.be.true;
        });

        it('should not change a story status when no stories found',async ()=>{
            const storyList = [];
            const storyDetails = {
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "accepted",
                "created_by_user_id": "1"
            }

            const req = mockRequest(storyDetails);
            const res = mockResponse();
            sandbox.stub(mockStoryService,"getAllStories").returns(storyList);
            await story.changeStatus(req,res);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.send.calledWith("No Stories Found")).to.be.true;
        });

        afterEach(function () {
            sandbox.restore();
        })
    });

    describe('getStories',()=>{
        it('should get all stories when requested by an admin',async ()=>{
            const storyList = [{
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "previousStatus",
                "created_by_user_id": "1"
            },{
                "id": 8,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "bug",
                "complexity": "high",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "previousStatus",
                "created_by_user_id": "2"
            }];

            const req = mockRequest();
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(true);
            sandbox.stub(mockRoleValidator,"isUser").returns(false);
            sandbox.stub(mockStoryService,"getAllStories").returns(storyList);
            await story.getStories(req,res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(storyList)).to.be.true;
        });

        it('should get all stories when requested and created by same user',async ()=>{
            const userStoryList = [{
                "id": 7,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "enhancement",
                "complexity": "low",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "previousStatus",
                "created_by_user_id": "1"
            },{
                "id": 8,
                "summary": "Summary here",
                "description": "Bla bla bla",
                "type": "bug",
                "complexity": "high",
                "estimated_time_of_completion": null,
                "cost": null,
                "status": "previousStatus",
                "created_by_user_id": "1"
            }]

            const req = mockRequest();
            const res = mockResponse();
            sandbox.stub(mockRoleValidator,"isAdmin").returns(false);
            sandbox.stub(mockRoleValidator,"isUser").returns(true);
            sandbox.stub(mockStoryService,"getAllStoriesForUser").returns(userStoryList);
            await story.getStories(req,res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(userStoryList)).to.be.true;
        });

        afterEach(function () {
            sandbox.restore();
        });
    })
})
