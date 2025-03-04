// @ts-check
const { test, expect } = require('@jest/globals')
const { dependencies } = require('./package.json')
const fs = require('fs')

let endpoint
function getDeploymentURL() {
  if (endpoint) return endpoint

  const data = fs.readFileSync('./deployment-url.txt', { encoding: 'utf8' })
  endpoint = data.trim()

  return endpoint
}

jest.setTimeout(30_000)

test('prisma version and output', async () => {
  const response = await fetch(await getDeploymentURL() + '/api')
  const { regResult, itxResult } = await response.json()

  expect(regResult).toEqual(itxResult)
  expect(regResult.prismaVersion).toMatch(dependencies['@prisma/client'])
  expect(regResult.deleteMany.count).toBe(0)
  expect(regResult.create).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.createMany.count).toBe(2)
  expect(regResult.findMany).toMatchInlineSnapshot(`
Array [
  Object {
    "age": 27,
    "email": "test-1@prisma.io",
    "name": "Test 1",
  },
  Object {
    "age": 29,
    "email": "test-2@prisma.io",
    "name": "Test 2",
  },
  Object {
    "age": 29,
    "email": "test-3@prisma.io",
    "name": "Test 3",
  },
]
`)
  expect(regResult.findUnique).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.update).toMatchInlineSnapshot(`
Object {
  "age": 26,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.updateMany.count).toBe(1)
  expect(regResult.findFirst).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.delete).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.count).toBe(2)
  expect(regResult.aggregate).toMatchInlineSnapshot(`
Object {
  "age": 29,
}
`)
  expect(regResult.groupBy).toMatchInlineSnapshot(`
Array [
  Object {
    "_count": Object {
      "age": 2,
    },
    "age": 29,
  },
]
`)
  expect(regResult.findFirstOrThrow).toMatchInlineSnapshot(`
Object {
  "age": 29,
  "email": "test-2@prisma.io",
  "name": "Test 2",
}
`)
  expect(regResult.findUniqueOrThrow).toMatchInlineSnapshot(`
Object {
  "age": 29,
  "email": "test-2@prisma.io",
  "name": "Test 2",
}
`)
  expect(regResult.upsert).toMatchInlineSnapshot(`
Object {
  "age": 30,
  "email": "test-4@prisma.io",
  "name": "Test 4",
}
`)
})

