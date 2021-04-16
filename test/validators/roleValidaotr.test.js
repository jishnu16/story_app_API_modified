const expect = require('chai').expect;
const  roleValidator = require('../../validators/roleValidator');



describe('roleValidator',()=>{
    describe('isAdmin',()=>{
        it('should return true if the user is admin',()=>{
            expect(roleValidator.isAdmin("1")).to.be.true;
        });

        it('should return false if the user is not admin',()=>{
            expect(roleValidator.isAdmin("0")).to.be.false;
        });

    });

    describe('isUser',()=>{
        it('should return true if the user is user',()=>{
            expect(roleValidator.isUser("0")).to.be.true;
        });

        it('should return false if the user is not user',()=>{
            expect(roleValidator.isUser("1")).to.be.false;
        });

    });
})


