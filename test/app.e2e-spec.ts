import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { SignInDto, SignUpDto } from 'src/validation';

describe('Time Watch e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    app.listen(3333);

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });
  const SignUpDto: SignUpDto = {
    firstName: 'sajad',
    lastName: 'molaie',
    phoneNumber: '09025714078',
  };
  const SignInDto: SignInDto = {
    phoneNumber: SignUpDto.phoneNumber,
  };
  describe('Sign Up', () => {
    it('should Sign Up', () => {
      return pactum
        .spec()
        .post('/user/signUp')
        .withBody(SignUpDto)
        .expectStatus(201);
    });
    it('should throw when the Body is empty', () => {
      return pactum.spec().post('/user/signUp').expectStatus(400);
    });
    it('should throw when the user already exists', () => {
      return pactum
        .spec()
        .post('/user/signUp')
        .withBody(SignUpDto)
        .expectStatus(409);
    });
  });
  describe('Sign In', () => {
    it('should send SMS', () => {
      return pactum
        .spec()
        .post('/user/signIn')
        .withBody(SignInDto)
        .expectStatus(200);
    });
    it('should throw when the phone number is not found', () => {
      return pactum
        .spec()
        .post('/user/signIn')
        .withBody({ phoneNumber: '09020000000' })
        .expectStatus(404);
    });
    it('should throw when the body is empty or the phone number invalid', () => {
      return pactum.spec().post('/user/signIn').expectStatus(400);
    });
  });
});
