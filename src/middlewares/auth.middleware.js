"use strict";
// import express from 'express';
// import jwt from 'jsonwebtoken';
//
// export function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).send('Accès refusé');
//
//     jwt.verify(token, process.env.TOKEN_SECRET || 'your-secret-key', (err, user: any) => {
//         if (err) return res.status(403).send('Token invalide');
//         req.user = user;
//         next();
//     });
// }
//
// app.get('/secure-route', authenticateToken, (req, res) => {
//     res.json({ message: 'Route sécurisée' });
// });
