const { Router } = require("express");
const pokemonRouter = require("../routes/pokemonRoutes");
const typesRouter = require("../routes/typesRoutes");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", pokemonRouter);
router.use("/type", typesRouter);

module.exports = router;
