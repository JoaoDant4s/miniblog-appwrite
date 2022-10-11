import { Client, Account, Databases } from 'appwrite'

export const client = new Client().setEndpoint("https://localhost/v1").setProject("garagem-DepsOps")
//garagem-Deps-Ops
export const account = new Account(client)

//Db

export const databases = new Databases(client, "brincouCom")
