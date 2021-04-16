const expect = require('chai').expect;
const emailValidator = require('../../validators/emailValidator');

describe('emailValidator',()=>{
    it('should return true for an valid email',()=>{
        expect(emailValidator.isValid("jishnu@mail.com")).to.be.true;
    });

    it('should return false for an invalid valid email',()=>{
        expect(emailValidator.isValid("invalidEmail")).to.be.false;
    });
})
