const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { validateTable, validateToken } = require('../middleware/validation');

const router = express.Router();
const prisma = new PrismaClient();

//protect all routes with jwt
//router.use(validateToken)

//param validation
router.param('table', validateTable);

//get table and columns info
router.get('/table-info/:table', async (req, res) => {
  const { table } = req.params;
  try {
    const tableInfo = await prisma.table_info.findFirst({
      where: { name: table },
      include: {
        columns: {
          orderBy: { id: 'asc' },
          include: {
            referenceTo: {
              select: { name: true },
            },
            referenceToDropdown: {
              select: { name: true },
            },
          },
        },
      },
    });
    tableInfo.columns.unshift({
      id: 0,
      name: 'id',
      displayName: 'ID',
      type: 'number',
      readonly: true,
    });

    res.send(tableInfo);
  } catch (e) {
    res.status(400).send();
  }
});

//get table and columns info
router.get('/dropdown-info/', async (req, res) => {
  try {
    const tableInfo = {
      columns: [
        {
          id: 0,
          name: 'id',
          displayName: 'ID',
          type: 'number',
          readonly: true,
        },
        {
          id: 1,
          name: 'value',
          displayName: 'VALUE',
          type: 'text',
          readonly: false,
        },
      ],
    };

    res.send(tableInfo);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
