const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();
const user = require('../../src/routes/user');
const mockUserService = require('../../src/services/userService');
const emailValidator = require('../../validators/emailValidator');

const mockRequest = (userData) => ({
    body: userData
});

const mockResponse = () => {
    const res = {};
    res.status = sandbox.stub().returns(res);
    res.json = sandbox.stub().returns(res);
    res.send = sandbox.stub().returns(res);
    res.header = sandbox.stub().returns(res);
    return res;
};

describe('User Tests',()=>{
    describe('register',()=>{
        it('Should register a new user with email id and name and other information',async ()=>{
            const userDetails = {
                first_name: "jishnu",
                last_name: "sanyal  ",
                email: "jishnu@email.com",
                password: "qwerty1234",
                user_type_id: "1"

            };

            const insertedUSedDetails =  {
                id: 9,
                first_name:'jishnu',
                last_name: 'sanyal',
                email: 'jishnu@email.com',
                user_type_id:'1'
            }
            const req = mockRequest(userDetails);
            const res = mockResponse();
            sandbox.stub(mockUserService,"getUser").returns(null);
            sandbox.stub(mockUserService,"insertUser").returns(insertedUSedDetails);
            sandbox.stub(emailValidator,"isValid").returns(true);
            await user.register(req,res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(insertedUSedDetails)).to.be.true;
        });

        it('Should not register a new user with an invalid email id',async ()=>{
            const userDetails = {
                email: "invalid-email",
            };

            const req = mockRequest(userDetails);
            const res = mockResponse();
            await user.register(req,res);
            sandbox.stub(emailValidator,"isValid").returns(false);
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.send.calledWith('Invalid Email Format. Please Give valid mail id')).to.be.true;
        })

        it('Should not register a new user with an existing email id',async ()=>{
            const userDetails = {
                email: "existingEmail@email.com",
            };

            const req = mockRequest(userDetails);
            const res = mockResponse();
            sandbox.stub(mockUserService,"getUser").returns({});
            sandbox.stub(emailValidator,"isValid").returns(true);
            await user.register(req,res);
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.send.calledWith('E-mail Already Registered.')).to.be.true;
        });

        afterEach(function () {
            sandbox.restore();
        });
    });

    describe('login',()=>{
        it('Should not able to login a user with a non registered email id ',async ()=>{
            const userDetails = {
                email: "nonRegistered@email.com",
                password: 'password'

            };
            const req = mockRequest(userDetails);
            const res = mockResponse();
            sandbox.stub(mockUserService,"getUser").returns(null);
            await user.login(req,res);
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.send.calledWith('Invalid Email.')).to.be.true;
        });

        it('Should able to login as a user with a valid email id',async ()=>{
            const userDetails = {
                email: "jishnu@email.com",
                password: 'qwerty1234'
            };

            const req = mockRequest(userDetails);
            const res = mockResponse();
            sandbox.stub(mockUserService,"getUser").returns({password:'$2a$10$nZ6Wg78OEIAjuq.t2Q.zneK57iiDzclH9MMejHPPcedNZiegSoYy6'});

            await user.login(req,res);
            expect(res.status.calledWith(200)).to.be.true;
        })

        it('Should not able to login as a user with a valid email id and invalid password',async ()=>{
            const userDetails = {
                email: "jishnu@email.com",
                password: 'qwerty1234'
            };

            const req = mockRequest(userDetails);
            const res = mockResponse();
            sandbox.stub(mockUserService,"getUser").returns({password:'invalidHashedPassword'});

            await user.login(req,res);
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.send.calledWith("Password is wrong.")).to.be.true;
        });
        afterEach(function () {
            sandbox.restore();
        });
    });

})
