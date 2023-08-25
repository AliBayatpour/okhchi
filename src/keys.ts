const keys = {
    pgHost: process.env.POSTGRES_HOST,
    pgPort: process.env.POSTGRES_PORT,
    pgDb: process.env.POSTGRES_DB,
    pgUser: process.env.POSTGRES_USER,
    pgPass: process.env.POSTGRES_PASSWORD,
    port: process.env.PORT,
    jwtKey: process.env.JWT_KEY,
}
export default keys;