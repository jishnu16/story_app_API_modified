const expect = require('chai').expect;
const  storyValidator = require('../../validators/storyValidator');

describe('storyValidator',async ()=>{
    it('should throw error when no story given',async ()=>{
        expect(() => {
            storyValidator.validate(undefined);
        }).to.throw(Error, 'No story found');

    });

    it('should throw error when story type not given',async ()=>{
        expect(() => {
            storyValidator.validate({});
        }).to.throw(Error, 'Story type missing');

    });
    it('should throw error when invalid story type given',async ()=>{
        expect(() => {
            storyValidator.validate({type:"invalid"});
        }).to.throw(Error, 'Invalid story type given');

    });

    it('should throw error when no story complexity given',async ()=>{
        expect(() => {
            storyValidator.validate({type:"enhancement"});
        }).to.throw(Error, 'Story complexity missing');
    });

    it('should throw error when invalid story complexity given',async ()=>{
        expect(() => {
            storyValidator.validate({type:"enhancement",complexity:"invalid"});
        }).to.throw(Error, 'Invalid complexity given');
    });

    it('should throw error when story summery not given',async ()=>{
        expect(() => {
            storyValidator.validate({type:"enhancement",complexity:"low"});
        }).to.throw(Error, 'Story summary missing');
    });

    it('should throw error when story description not given',async ()=>{
        expect(() => {
            storyValidator.validate({type:"enhancement",complexity:"low",summary:'Summery'});
        }).to.throw(Error, 'Story description missing');
    });

    it('should not throw error when all attributes oa a story is given',async ()=>{
        expect(() => {
            storyValidator.validate({type:"enhancement",complexity:"low",summary:'Summery',description:"description"});
        }).to.not.throw();
    });
})
