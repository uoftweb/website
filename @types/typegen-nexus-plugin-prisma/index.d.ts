import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  Account: Prisma.Account
  Session: Prisma.Session
  User: Prisma.User
  VerificationRequest: Prisma.VerificationRequest
  Article: Prisma.Article
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'compoundId' | 'userId' | 'providerType' | 'providerId' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'accessTokenExpires' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'compoundId' | 'userId' | 'providerType' | 'providerId' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'accessTokenExpires' | 'createdAt' | 'updatedAt'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'expires' | 'sessionToken' | 'accessToken' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'userId' | 'expires' | 'sessionToken' | 'accessToken' | 'createdAt' | 'updatedAt'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt' | 'starredArticles'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt'
    }
    verificationRequests: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'identifier' | 'token' | 'expires' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'identifier' | 'token' | 'expires' | 'createdAt' | 'updatedAt'
    }
    articles: {
      filtering: 'AND' | 'OR' | 'NOT' | 'slug' | 'stargazers'
      ordering: 'slug'
    }
  },
  Account: {

  }
  Session: {

  }
  User: {
    starredArticles: {
      filtering: 'AND' | 'OR' | 'NOT' | 'slug' | 'stargazers'
      ordering: 'slug'
    }
  }
  VerificationRequest: {

  }
  Article: {
    stargazers: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt' | 'starredArticles'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    account: 'Account'
    accounts: 'Account'
    session: 'Session'
    sessions: 'Session'
    user: 'User'
    users: 'User'
    verificationRequest: 'VerificationRequest'
    verificationRequests: 'VerificationRequest'
    article: 'Article'
    articles: 'Article'
  },
  Mutation: {
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'BatchPayload'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'BatchPayload'
    upsertOneAccount: 'Account'
    createOneSession: 'Session'
    updateOneSession: 'Session'
    updateManySession: 'BatchPayload'
    deleteOneSession: 'Session'
    deleteManySession: 'BatchPayload'
    upsertOneSession: 'Session'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneVerificationRequest: 'VerificationRequest'
    updateOneVerificationRequest: 'VerificationRequest'
    updateManyVerificationRequest: 'BatchPayload'
    deleteOneVerificationRequest: 'VerificationRequest'
    deleteManyVerificationRequest: 'BatchPayload'
    upsertOneVerificationRequest: 'VerificationRequest'
    createOneArticle: 'Article'
    updateOneArticle: 'Article'
    updateManyArticle: 'BatchPayload'
    deleteOneArticle: 'Article'
    deleteManyArticle: 'BatchPayload'
    upsertOneArticle: 'Article'
  },
  Account: {
    id: 'Int'
    compoundId: 'String'
    userId: 'Int'
    providerType: 'String'
    providerId: 'String'
    providerAccountId: 'String'
    refreshToken: 'String'
    accessToken: 'String'
    accessTokenExpires: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Session: {
    id: 'Int'
    userId: 'Int'
    expires: 'DateTime'
    sessionToken: 'String'
    accessToken: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  User: {
    id: 'Int'
    name: 'String'
    email: 'String'
    emailVerified: 'DateTime'
    image: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    starredArticles: 'Article'
  }
  VerificationRequest: {
    id: 'Int'
    identifier: 'String'
    token: 'String'
    expires: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Article: {
    slug: 'String'
    stargazers: 'User'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Account: Typegen.NexusPrismaFields<'Account'>
  Session: Typegen.NexusPrismaFields<'Session'>
  User: Typegen.NexusPrismaFields<'User'>
  VerificationRequest: Typegen.NexusPrismaFields<'VerificationRequest'>
  Article: Typegen.NexusPrismaFields<'Article'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  