import { createPool } from "mysql2/promise";

export const pool = createPool({
    host:'localhost',
    port:0,
    user:'',
    password:'',
    database:'iad'
})