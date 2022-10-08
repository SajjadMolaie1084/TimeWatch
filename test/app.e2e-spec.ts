import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { SignUpDto } from 'src/validation';

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
  describe('Sign Up', () => {
    it('should Sign Up', () => {
      return pactum
        .spec()
        .post('/user/signUp')
        .withBody(SignUpDto)
        .expectStatus(201);
    });
    it('should throw when Body empty', () => {
      return pactum.spec().post('/user/signUp').expectStatus(400);
    });
    it('should throw when user already exists', () => {
      return pactum
        .spec()
        .post('/user/signUp')
        .withBody(SignUpDto)
        .expectStatus(409);
    });
  });
});
