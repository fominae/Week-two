/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export interface Users {
  id: Generated<string>;
  login: string;
  password: string;
  name: string;
  email: string;
}

export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export interface Objectives {
  id: Generated<string>;
  title: string;
  description: string | null;
  creatorid: string;
  notifyAt: Timestamp | null;
  createdAt: Generated<ColumnType<Date, Date | undefined, Date>>;
  updatedAt: Generated<ColumnType<Date, Date | undefined, Date>>;
  isCompleted: Generated<boolean>;
}

export interface UserObjectiveShares {
  id: Generated<string>;
  userId: string;
  objectiveId: string;
}

export interface DB {
  users: Users;
  objectives: Objectives;
  user_objective_shares: UserObjectiveShares;
}
