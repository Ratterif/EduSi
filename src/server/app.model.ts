import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

interface UserCreateAttrs {
  username: string;
  password: string;
  profile: string;
}

interface QuestionsCreateAttrs {
  question: string;
  description: string;
  profile: string;
  userId: number;
}

interface AnswersCreateAttrs {
  answer: string;
  questionId: number;
  userId: number;
}

@Table({ tableName: 'Users' })
export class Users extends Model<Users, UserCreateAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number | undefined;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string | undefined;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string | undefined;

  @Column({
    type: DataType.ENUM('IT', 'Phis-Math', 'Design'),
    defaultValue: 'IT',
  })
  profile: string | undefined;
}

@Table({ tableName: 'Questions' })
export class Questions extends Model<Questions, QuestionsCreateAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number | undefined;

  @Column({ type: DataType.STRING, unique: true })
  question: string | undefined;

  @Column({ type: DataType.STRING })
  description: string | undefined;

  @Column({
    type: DataType.ENUM('IT', 'Phis-Math', 'Design'),
    defaultValue: 'IT',
  })
  profile: string | undefined;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Users)
  userId: number | undefined;
}

@Table({ tableName: 'Answers' })
export class Answers extends Model<Answers, AnswersCreateAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number | undefined;

  @Column({ type: DataType.STRING, unique: true })
  answer: string | undefined;

  @Column({ type: DataType.NUMBER, defaultValue: 0 })
  verification: number | undefined;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Questions)
  questionId: number | undefined;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Users)
  userId: number | undefined;

  @BelongsTo(() => Users)
  user: Users | undefined;
}
