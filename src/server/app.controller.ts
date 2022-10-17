import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post, Query,
  Render,
  Session,
  UseInterceptors
} from "@nestjs/common";
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from './config.interceptor';
import {SessionT} from "./types";

interface PersonDto {
  name: string;
  des: string;
  username: string;
  pass: string;
  prof: string;
  question: string;
  theme: string;
  id: number;
  answer: string;
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  home() {
    return {};
  }


  @Get('/qa')
  @Render('qa')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  qa() {
    return {};
  }

  @Get('/questions')
  @Render('questions')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  questions() {
    return {};
  }

  @Get('/myQuestions')
  @Render('myQuestions')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  myQuestions() {
    return {};
  }

  @Get('/privateChat')
  @Render('privateChat')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  privateChat() {
    return {};
  }

  @Get('/posts/:id')
  @Render('posts/[id]')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public post() {
    return {};
  }

  @Post('/api/passreq')
  public checkpass(
    @Body() person: {username: string, pass: string},
    @Session() session: SessionT
  ) {
    return this.appService.checkPass(session, person.username, person.pass);
  }
  @Post('/api/passreg')
  public addpass(
    @Body() person: {username: string, pass: string, prof: string},
    @Session() session: SessionT
  ) {
    return this.appService.addPass(session, person.username, person.pass, person.prof);
  }
  @Post('/api/ask')
  public askquest(
    @Body() person: {question: string, descr: string, prof: string},
    @Session() session: SessionT
  ) {
    return this.appService.askquest(session, person.question, person.descr, person.prof);
  }
  @Get('/api/getMyQuests')
  public getMyQuests(@Session() session: SessionT) {
    return this.appService.getMyQuests(session);
  }
  @Post('/api/searchQuest')
  public searchquest(
    @Body() person: {theme: string},
  ) {
    return this.appService.searchquest(person.theme);
  }
  @Post('/api/getQuest')
  public getQuest(
    @Body() person: {id: number},
  ) {
    return this.appService.getQuest(person.id);
  }
  @Post('/api/addAnswer')
  public addAnswer(
    @Body() person: {answer: string, id: number},
    @Session() session: SessionT
  ) {
    return this.appService.addAnswer(session, person.answer, person.id);
  }
  @Post('/api/getAnswers')
  public getAnswers(
    @Body() person: {id: number},
  ) {
    return this.appService.getAnswers(person.id);
  }
  @Get('/api/prof')
  public getProfile(@Session() session: SessionT) {
    if(session.username) return {username: session.username};
    return false;
  }
  @Get('/api/logout')
  public LogOut(@Session() session: SessionT) {
    session.username = undefined;
    session.userId = undefined;
    return {}
  }

}
