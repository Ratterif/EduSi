import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answers, Questions, Users } from './app.model';
import { JwtService } from '@nestjs/jwt';
import { SessionT } from './types';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    private jwtService: JwtService,
    @InjectModel(Questions) private questRepository: typeof Questions,
    @InjectModel(Answers) private answerRepository: typeof Answers,
  ) {}
  async askquest(session: SessionT, quest: string, des: string, prof: string) {
    if (session.userId) {
      console.log({
        question: quest,
        description: des,
        profile: prof,
        userId: session.userId,
      });
      const User = await this.questRepository.create(
        {
          question: quest,
          description: des,
          profile: prof,
          userId: session.userId,
        },
        {
          logging: console.log,
        },
      );
      return true;
    }
  }
  async searchquest(theme: string) {
    try {
      return await this.questRepository.findAll({ where: { profile: theme } });
    } catch (e) {
      console.log(e);
    }
  }
  async getQuest(id: number) {
    try {
      return await this.questRepository.findOne({ where: { id } });
    } catch (e) {
      console.log(e);
    }
  }
  async addAnswer(session: SessionT, answer: string, id: number) {
    if (session.userId) {
      const User = await this.answerRepository.create({
        answer,
        questionId: id,
        userId: session.userId,
      });
      return true;
    }
  }
  async getAnswers(id: number) {
    try {
      return await this.answerRepository.findAll({
        where: { questionId: id },
        include: {
          model: Users,
          attributes: ['username'],
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  async getMyQuests(session: SessionT) {
    try {
      return await this.questRepository.findAll({
        where: { userId: session.userId },
      });
    } catch (e) {
      console.log(e);
    }
  }
  async checkPass(session: SessionT, username: string, pass: string) {
    const User = await this.userRepository.findOne({
      where: { username },
    });
    if (User) {
      const Pass = User.password;
      if (User.password === pass) {
        session.username = username;
        session.userId = User.id;
        return true;
      }
    }
    return false;
  }
  async addPass(
    session: SessionT,
    user: string,
    password: string,
    profile: string,
  ) {
    const User = await this.userRepository.create({
      username: user,
      password,
      profile,
    });
    session.username = user;
    session.userId = User.id;
    return true;
  }
}
